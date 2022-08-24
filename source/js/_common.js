const SVG_OBJECTS = localStorage.getItem('SVG_OBJECTS') || '{}';
const SVG_IMAGE = localStorage.getItem('SVG_IMAGE') || '';
const SVG = {
  img: SVG_IMAGE,
  objects: JSON.parse(SVG_OBJECTS),
  el: null,
  currentKey: null,
  viewWidth: 4001,
  viewHeight: 2251,
};
const $container = $('.box');
const $sidebar = $('.sidebar');
const $svg = $('.js-svg');

window.SVG = SVG;

SVG.el = $svg[0];
SVG.group = $svg.find('#zoom-scene')[0];

if (SVG.img) {
  getMeta(SVG.img, function({w, h}) {
    svgBuild({src:SVG.img, width: w, height: h});
  });

  $('.js-map-img').val(SVG.img);
}

// EVENTS FIRE
$(function() {
  $(SVG.el).on('mousedown', function(e) {
    if (!SVG.currentKey) return;

    var p = SVG.el.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    var ctm = SVG.el.getScreenCTM().inverse();
    var p =  p.matrixTransform(ctm);

    const { x, y } = p;
    const key = SVG.currentKey;

    if (SVG.objects[key].type === 'dot') {
      SVG.objects[key].x = x;
      SVG.objects[key].y = y;
      drawingFinish();
    }

    if (SVG.objects[key].type === 'path') {
      SVG.objects[key].points.push({x, y});
    }

    svgObjectRender(key);
  });

  $(document)
    .on('keydown', function(e) {
      if (e.keyCode === 13) { // Enter
        drawingFinish();
      } else if (e.keyCode === 27) { // ESC
        drawingCancel();
      } else if (e.keyCode === 90 && e.ctrlKey === true) { // ctl+Z
        drawingUndo();
      }
    })
    .on('click', '.js-object-add', function() {
      const $this = $(this);
      const type = $this.data('type');
      const key = getUniqId();

      $this.removeClass('btn-info').addClass('btn-danger').attr('disabled', true);

      SVG.objects[key] = { type };

      if (type === 'path') {
        SVG.objects[key]['points'] = [];
      }

      svgObjectAdd(key);
    })
    .on('click', '.js-object-delete', function() {
      const key = $(this).closest('[data-object]').data('object');
      svgObjectDelete(key);
      localSave();
    })
    .on('change', '.js-object-field', function() {
      const key = $(this).closest('[data-object]').data('object');
      const role = $(this).data('role');

      if (role === undefined) {
        return;
      } else if (role === 'thumbnail') {
        const imageUrl = $(this).val();
        getMeta(imageUrl, function({w, h}) {
          SVG.objects[key].thumbnail = {
            url: imageUrl,
            width: w,
            height: h,
          };
          svgObjectRender(key);
        });
      } else {
        SVG.objects[key][role] = $(this).val();
        svgObjectRender(key);
      }
    })
    .on('change', '.js-map-img', function() {
      const imageUrl = $(this).val();
      getMeta(imageUrl, function({w, h}) {
        svgBuild({
          src: imageUrl,
          width: w,
          height: h,
        })
      });
    })
    .on('click', '.js-export', function() {
      var html = $container.html();
      $('.js-result').val(html);
      $('.md-result').modal('show');
    });
});

function svgBuild({src, width, height}) {
  SVG.img = src;
  SVG.viewWidth = width;
  SVG.viewHeight = height;
  SVG.el.setAttribute('viewBox', `0 0 ${width} ${height}`);

  $svg.find('[data-object]').remove();
  $sidebar.find('[data-object]').remove();

  localStorage.setItem('SVG_IMAGE', src);

  const svgImg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
  svgImg.setAttribute('href', src);
  svgImg.setAttribute('width', width);
  svgImg.setAttribute('height', height);

  $(SVG.group).append(svgImg);

  Object.keys(SVG.objects).forEach((key) => {
    svgObjectAdd(key);
  });

  svgObjectUnSelect();
}

function drawingFinish() {
  $('.js-object-add').removeClass('btn-danger').addClass('btn-info').attr('disabled', false);
  svgObjectUnSelect();
  localSave();
}

function drawingCancel() {
  svgObjectDelete();
  drawingFinish();
}

function drawingUndo() {
  const key = SVG.currentKey;
  if (!key || !SVG.objects[key].points.length) return;

  SVG.objects[key].points = SVG.objects[key].points.slice(0, -1);
}

function svgObjectAdd(key) {
  svgObjectRender(key);
  svgObjectAddSidebar(key);
  svgObjectSelect(key);
}

function svgObjectRender(key) {
  if (!SVG.objects[key]) return;
  $(SVG.el).find(`g[data-object="${key}"]`).remove();

  if (SVG.objects[key].type === 'dot') {
    svgDotRender(key);
  } else if (SVG.objects[key].type === 'path') {
    svgPathRender(key);
  }
  localSave();
}

function svgObjectSelect(key) {
  SVG.currentKey = key;
}

function svgObjectUnSelect() {
  if (!SVG.currentKey) return;
  SVG.currentKey = null;
  $container.find('rect[data-object]').remove();
}

function svgObjectDelete(key) {
  if (!SVG.objects[key]) return;

  delete SVG.objects[key];
  SVG.currentKey = null;

  $container.find(`[data-object="${key}"]`).remove();
  $sidebar.find(`[data-object="${key}"]`).remove();
}

function svgObjectAddSidebar(key) {
  const object = SVG.objects[key];
  if (!object) return;

  if (object.type === 'path') {
    html = `
  <div class="mt-3 p-2 border bg-light" data-object="${key}">
    <div class="d-flex flex-wrap align-items-center">
      <span class="me-auto">Path: ${key}</span>
      <button class="btn btn-sm btn-danger js-object-delete">Delete</button>
    </div>
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label mb-1 fw-700 fs-12">Thumbnail URL:</label>
        <input type="text" value="${object.thumbnail && object.thumbnail.url || ''}" class="form-control form-control-sm js-object-field", placeholder="", data-role="thumbnail" />
      </div>
      <div class="col-12">
        <label class="form-label mb-1 fw-700 fs-12">Thumbnail Link:</label>
        <input type="text" value="${object.link || ''}" class="form-control form-control-sm js-object-field", data-role="link" />
      </div>
      <div class="col-lg-6">
        <label class="form-label mb-1 fw-700 fs-12">Horizontal Pos (default: 0):</label>
        <input type="text" value="${object.x || ''}" class="form-control form-control-sm js-object-field", data-role="x" />
      </div>
      <div class="col-lg-6">
        <label class="form-label mb-1 fw-700 fs-12">Vertical Pos (default: 0):</label>
        <input type="text" value="${object.y || ''}" class="form-control form-control-sm js-object-field", data-role="y" />
      </div>
      <div class="col-lg-6">
        <label class="form-label mb-1 fw-700 fs-12">Thumbnail Size (default: 10%):</label>
        <input type="text" value="${object.size || ''}" class="form-control form-control-sm js-object-field", data-role="size" />
      </div>
      <div class="col-lg-6">
        <label class="form-label mb-1 fw-700 fs-12">Stroke (default: #000):</label>
        <input type="text" value="${object.color || ''}" class="form-control form-control-sm js-object-field", data-role="color" />
      </div>
      <div class="col-lg-6">
        <label class="form-label mb-1 fw-700 fs-12">Background (default: #000):</label>
        <input type="text" value="${object.bg || ''}" class="form-control form-control-sm js-object-field", data-role="bg" />
      </div>
      <div class="col-lg-6">
        <label class="form-label mb-1 fw-700 fs-12">Opacity (Default: 0.3):</label>
        <input type="text" value="${object.opacity || ''}" class="form-control form-control-sm js-object-field", data-role="opacity" />
      </div>
    </div>
  </div>
    `;
  }

  if (object.type === 'dot') {
    html = `
  <div class="mt-3 p-2 border bg-light" data-object="${key}">
    <div class="d-flex flex-wrap align-items-center">
      <span class="me-auto">Dot: ${key}</span>
      <button class="btn btn-sm btn-danger js-object-delete">Delete</button>
    </div>
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label mb-1 fw-700 fs-12">Thumbnail URL:</label>
        <input type="text" value="${object.thumbnail && object.thumbnail.url || ''}" class="form-control form-control-sm js-object-field", placeholder="", data-role="thumbnail" />
      </div>
      <div class="col-12">
        <label class="form-label mb-1 fw-700 fs-12">Thumbnail Link:</label>
        <input type="text" value="${object.link || ''}" class="form-control form-control-sm js-object-field", data-role="link" />
      </div>
      <div class="col-lg-6">
        <label class="form-label mb-1 fw-700 fs-12">Horizontal Pos (default: 0):</label>
        <input type="text" value="${object.x || ''}" class="form-control form-control-sm js-object-field", data-role="x" />
      </div>
      <div class="col-lg-6">
        <label class="form-label mb-1 fw-700 fs-12">Vertical Pos (default: 0):</label>
        <input type="text" value="${object.y || ''}" class="form-control form-control-sm js-object-field", data-role="y" />
      </div>
      <div class="col-lg-12">
        <label class="form-label mb-1 fw-700 fs-12">Thumbnail Size (default: 10%):</label>
        <input type="text" value="${object.size || ''}" class="form-control form-control-sm js-object-field", data-role="size" />
      </div>
      <div class="col-lg-6">
        <label class="form-label mb-1 fw-700 fs-12">Duration (default: 2000ms)</label>
        <input type="text" value="${object.duration || ''}" class="form-control form-control-sm js-object-field", data-role="duration" />
      </div>
      <div class="col-lg-6">
        <label class="form-label mb-1 fw-700 fs-12">Delay (default: 0ms)</label>
        <input type="text" value="${object.delay || ''}" class="form-control form-control-sm js-object-field", data-role="delay" />
      </div>
    </div>
  </div>
    `;
  }

  $sidebar.append($(html));
}

function svgPathRender(key) {
  if (!SVG.objects[key]) return;

  $(SVG.el).find(`g[data-object="${key}"]`).remove();

  let path_d = 'M ';

  SVG.objects[key].points.forEach((point) => {
    path_d += `${point.x},${point.y} `;
    svgPointRender(key, {x: point.x, y: point.y});
  });

  if (SVG.objects[key].points.length < 3) return;

  path_d += `${SVG.objects[key].points[0].x},${SVG.objects[key].points[0].y} `;

  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('data-object', key);
  group.classList.add('svg-path');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', path_d);
  path.setAttribute('stroke', 'transparent');
  path.setAttribute('stroke-width', Math.ceil(SVG.viewWidth / 1000));
  path.setAttribute('fill', 'transparent');
  path.setAttribute('data-role', 'draw-path');
  path.classList.add('svg-path-draw');

  const colorPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const opacity = SVG.objects[key].opacity || 0.3;
  const bgRgb = hexToRgb(SVG.objects[key].bg || '#000');
  const bg = `rgba(${bgRgb.r},${bgRgb.g},${bgRgb.b},${opacity})`;
  colorPath.setAttribute('d', path_d);
  colorPath.setAttribute('data-role', 'color-path');
  colorPath.setAttribute('fill', bg);
  colorPath.setAttribute('stroke', SVG.objects[key].color || '#000');
  colorPath.setAttribute('stroke-width', Math.round(SVG.viewWidth / 1000));
  colorPath.classList.add('svg-path-color');

  $(SVG.group).append(group);
  $(group).append(path);
  $(group).append(colorPath);

  if (
    SVG.objects[key].thumbnail &&
    SVG.objects[key].thumbnail.url && (
      !SVG.objects[key].x ||
      !SVG.objects[key].y
    )
  ) {
    const pathBBox = path.getBBox();
    const x = Math.round(pathBBox.x + pathBBox.width / 2 - width / 2);
    const y = Math.round(pathBBox.y - height * 0.9);

    SVG.objects[key].x = x > 0 ? x : 0;
    SVG.objects[key].y = y > 0 ? y : 0;
  }

  svgThumbnailAdd(group, key);
}

function svgPointRender(key, {x, y}) {
  if (!SVG.objects[key]) return;

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('data-object', key);
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('width', Math.ceil(SVG.viewWidth / 500));
  rect.setAttribute('height', Math.ceil(SVG.viewWidth / 500));
  rect.setAttribute('stroke', 'rgb(0,0,0)');
  rect.setAttribute('stroke-width', Math.ceil(SVG.viewWidth / 500));

  $(SVG.group).append(rect);
}

function svgDotRender(key) {
  if (!SVG.objects[key]) return;

  const { x, y, type } = SVG.objects[key];

  if (type !== 'dot' || x === undefined || y === undefined) return;

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('data-object', key);
  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', Math.ceil(SVG.viewWidth / 400));
  circle.setAttribute('fill', 'transparent');
  circle.classList.add('dot-circle');

  $(SVG.group).append(circle);

  svgThumbnailAdd(SVG.group, key, 'svg-icon');
}

function svgThumbnailAdd(el, key, className='svg-thumbnail') {
  const object = SVG.objects[key];
  if (
    !object ||
    !object.thumbnail ||
    !object.thumbnail.url ||
    object.x === undefined ||
    object.y === undefined
  ) return;

  const thumbnail = object.thumbnail;
  const size = parseInt(object.size) || 10;
  const width = Math.round(SVG.viewWidth * size / 100);
  const height = Math.round(
    width * thumbnail.height / thumbnail.width
  );

  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  group.setAttribute('data-object', key);
  group.setAttribute('data-width', width);
  group.setAttribute('data-height', height);
  group.setAttribute('data-x', object.x - width / 2);
  group.setAttribute('data-y', object.y - height / 2);
  group.setAttribute('data-duration', object.duration || 0);
  group.setAttribute('data-delay', object.delay || 0);
  group.classList.add(className);

  const svgThumbnail = document.createElementNS('http://www.w3.org/2000/svg', 'image');

  svgThumbnail.setAttribute('href', object.thumbnail.url);
  svgThumbnail.setAttribute('width', width);
  svgThumbnail.setAttribute('height', height);
  svgThumbnail.setAttribute('x', object.x - width / 2);
  svgThumbnail.setAttribute('y', object.y - height / 2);

  if (object.link) {
    const link = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    link.setAttribute('href', object.link);
    link.setAttribute('target', '_blank');

    $(link).append(svgThumbnail);
    $(group).append(link);
  } else {
    $(group).append(svgThumbnail);
  }

  $(el).append(group);
}

function localSave() {
  localStorage.setItem('SVG_OBJECTS', JSON.stringify(SVG.objects));
}

function getUniqId() {
  const ts = `${(new Date()).getTime()}`.substring(3,13);
  const map = [
      ['0','a','b'],
      ['1','c','d'],
      ['2','e','f'],
      ['3','g','h'],
      ['4','i','j'],
      ['5','k','l'],
      ['6','m','n'],
      ['7','o','p'],
      ['8','q','r'],
      ['9','s','t'],
  ]
  let id = ''
  for (let i = 0; i < ts.length; i++) {
      const n = Number(ts.charAt(i))
      const arr = map[n];
      id += arr[Math.floor(Math.random() * arr.length)];
  }
  return id
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getMeta(url, cb){
  const img = new Image();
  img.addEventListener("load", function() {
    if (cb) {
      cb({
        w: this.naturalWidth,
        h: this.naturalHeight
      });
    }
  });
  img.src = url;
}
