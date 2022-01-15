"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var runSequence = require("run-sequence");
var browserSync = require("browser-sync").create();
var del = require("del");
var fs = require("fs");
var pug = require("pug");
var wait = require("gulp-wait");

function getModules(key = "css") {
  var config = require("./config.json");
  var using = config.using;
  var data = config.data;

  return using.reduce((total, item) => {
    if (data[item] && data[item][key]) {
      return total.concat(data[item][key]);
    }

    return total;
  }, []);
}

var source = "source/",
  dest = "dest/";
/**
 * Filter block:
 * Allow add filter
 *
 */
pug.filters.code = function (block) {
  return block.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
};

var options = {
  del: [dest],
  browserSync: {
    server: {
      baseDir: dest,
      index: "links.html",
    },
  },
  htmlPrettify: {
    indent_size: 4,
    unformatted: ["pre", "code"],
    indent_with_tabs: false,
    preserve_newlines: true,
    brace_style: "expand",
    end_with_newline: true,
  },
  include: {
    hardFail: true,
    includePaths: [__dirname + "/", __dirname + "/node_modules", __dirname + "/source/modules", __dirname + "/source/js"],
  },
  pug: {
    pug: pug,
    pretty: "\t",
  },
};

var scss = {
  sassOpts: {
    outputStyle: "nested",
    precison: 3,
    errLogToConsole: true,
    includePaths: ["./source/"],
  },
};

// fonts
var fonts = {
  // in: [source + "fonts/*.*", "./node_modules/font-awesome/fonts/*"],
  in: [source + "fonts/*.*"],
  out: dest + "fonts/",
};

// js
var js = {
  in: [
    source + "js/*.*",
    // './node_modules/bootstrap/dist/bootstrap.min.js'
  ],
  out: dest + "js/",
};

/**
 * Tasks
 * Allow add filter
 *
 */
gulp.task("browser-sync", function () {
  return browserSync.init(options.browserSync);
});

gulp.task("watch", function (cb) {
  $.watch(source + "/**/*.scss", function () {
    gulp.start("compile-styles");
  });

  $.watch(source + "/images/**/*", function () {
    gulp.start("compile-images");
    gulp.start("build-images-name");
  });

  $.watch([source + "/*.html", source + "/**/*.html"], function () {
    return runSequence("compile-html", browserSync.reload);
  });

  // $.watch([source + '/*.pug', source + '/**/*.pug'], function () {
  $.watch([source + "/*.pug"], function () {
    return runSequence("compile-pug", browserSync.reload);
  });

  $.watch(source + "/**/*.js", function () {
    return runSequence("compile-js", browserSync.reload);
  });

  $.watch(source + "/modules/*/data/*.json", function () {
    return runSequence("build-html", browserSync.reload);
  });
});

gulp.task("copy-resources", function () {
  gulp.src(fonts.in).pipe(gulp.dest(fonts.out));
  gulp.src(source + "media/**/*.*").pipe(gulp.dest(dest + "media/"));
  gulp.src(source + "vendor/**/*.*").pipe(gulp.dest(dest + "vendor/"));
  return;
});

gulp.task("build-libs", function () {
  // css libs
  gulp
    .src(getModules("css"))
    .pipe($.concat("libs.css"))
    .pipe($.cleanCss())
    .pipe(gulp.dest(dest + "/css"));

  // js libs
  gulp
    .src(getModules("js"))
    .pipe($.concat("libs.js"))
    .pipe($.uglify())
    .pipe(gulp.dest(dest + "/js"));

  return;
});

// = Delete
gulp.task("cleanup", function (cb) {
  return del(options.del, cb);
});

// = Build Style
// gulp.task('compile-styles',['fonts', 'scss-lint'], function (cb) {
gulp.task("compile-styles", function (cb) {
  return gulp
    .src([source + "/sass/*.scss", "!" + source + "/sass/_*.scss"])
    .pipe(wait(1800))
    .pipe($.sourcemaps.init())
    .pipe($.sass(scss.sassOpts).on("error", $.sass.logError))
    .pipe($.autoprefixer("last 2 versions"))
    .pipe($.cleanCss())
    .pipe($.sourcemaps.write("./"))
    .pipe(gulp.dest(dest + "/css"))
    .pipe(browserSync.stream())
    .pipe(gulp.dest(dest + "/css"))
    .pipe(browserSync.stream());
});

gulp.task("scss-lint", function (cb) {
  return gulp.src([source + "/sass/*.scss", source + "/sass/**/*.scss"]).pipe($.scssLint());
});

// = Build HTML
gulp.task("compile-html", function (cb) {
  return gulp
    .src(["*.html", "!_*.html"], {
      cwd: "source",
    })
    .pipe($.prettify(options.htmlPrettify))
    .pipe(gulp.dest(dest));
});

// = Build Pug
gulp.task("compile-pug", function (cb) {
  var jsonData = JSON.parse(fs.readFileSync("./tmp/data.json"));
  options.pug.locals = jsonData;

  return gulp
    .src(["*.pug", "!_*.pug"], {
      cwd: "source",
    })
    .pipe(
      $.plumber(function (error) {
        console.log("Task compile-pug has error", error.message);
        this.emit("end");
      })
    )
    .pipe(
      $.changed("dest", {
        extension: ".html",
      })
    )
    .pipe(
      $.pugInheritance({
        basedir: "source",
        skip: ["node_modules"],
      })
    )
    .pipe($.pug(options.pug))
    .on("error", function (error) {
      console.error("" + error);
      this.emit("end");
    })
    .pipe($.prettify(options.htmlPrettify))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(dest));
});

gulp.task("build-html", function (cb) {
  return runSequence(
    "combine-data",
    "compile-pug",
    // 'compile-html',
    cb
  );
});

// = Build JS
gulp.task("compile-js", function () {
  return (
    gulp
      .src(["*.js", "!_*.js"], {
        cwd: "source/js",
      })
      .pipe(
        $.plumber(function (error) {
          console.log("Task compile-js has error", error.message);
          this.emit("end");
        })
      )
      .pipe($.include(options.include))
      .pipe($.babel())
      .pipe($.plumber.stop())
      // .pipe($.uglify())
      .pipe(gulp.dest(js.out))
  );
});

// = Build image
gulp.task("compile-images", function () {
  return gulp.src(source + "/images/**/*.*").pipe(gulp.dest(dest + "/images"));
});

// = Build images name in json file
gulp.task("build-images-name", function () {
  return gulp
    .src(source + "/images/**/*")
    .pipe(require("gulp-filelist")("filelist.json"))
    .pipe(gulp.dest(dest));
});

// = Build DataJson
gulp.task("combine-modules-json", function (cb) {
  return gulp
    .src(["**/*.json", "!**/_*.json"], {
      cwd: "source/modules/*/data",
    })
    .pipe($.mergeJson("data-json.json"))
    .pipe(gulp.dest("tmp/data"));
});

gulp.task("combine-modules-data", function (cb) {
  return gulp
    .src("**/*.json", {
      cwd: "tmp/data",
    })
    .pipe($.mergeJson("data.json"))
    .pipe(gulp.dest("tmp"));
});

// Service tasks
gulp.task("combine-data", function (cb) {
  return runSequence(["combine-modules-json"], "combine-modules-data", cb);
});

// ================ Develop
gulp.task("dev", function (cb) {
  return runSequence("build", ["browser-sync", "build-images-name", "watch"], cb);
});

// ================ Build
gulp.task("build", function (cb) {
  return runSequence("cleanup", "copy-resources", "build-libs", "compile-images", "compile-styles", "compile-js", "build-html", cb);
});
