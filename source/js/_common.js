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
const $btnAddPath = $('.js-add-path');

var coin = false;
var count = 0;

SVG.el = $svg[0];

if (SVG.img) {
  getMeta(SVG.img, function({w, h}) {
    buildSvg({src:SVG.img, width: w, height: h});
  });

  $('.js-map-img').val(SVG.img);
}

// EVENTS FIRE
$(function() {
  $(SVG.el).on('mousedown', function(e) {
    if (!SVG.currentKey) {
      return;
    };

    var p = SVG.el.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    var ctm = SVG.el.getScreenCTM().inverse();
    var p =  p.matrixTransform(ctm);

    svgAddPoint(p);
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
    .on('click', '.js-path-delete', function() {
      const key = $(this).closest('[data-object]').data('object');
      svgPathDelete(key);
      localSave();
    })
    .on('click', '.js-path-select', function() {
      const key = $(this).closest('[data-object]').data('object');
      svgPathSelect(key);
    })
    .on('click', '.js-add-path', function() {
      $(this).removeClass('btn-info').addClass('btn-danger').attr('disabled', true);
      const key = getUniqId();
      SVG.objects[key] = {
        points: []
      };

      svgAddPath(key);
      svgPathSelect(key);
    })
    .on('click', '.js-export', function() {
      var html = $container.html();
      $('.js-result').val(html);
      $('.md-result').modal('show');
    })
    .on('change', '.js-map-img', function() {
      const imageUrl = $(this).val();
      getMeta(imageUrl, function({w, h}) {
        buildSvg({
          src: imageUrl,
          width: w,
          height: h,
        })
      });
    })
    .on('change', '.js-path-thumbnail', function() {
      const imageUrl = $(this).val();
      const key = $(this).closest('[data-object]').data('object');

      getMeta(imageUrl, function({w, h}) {
        SVG.objects[key].thumbnail = {
          url: imageUrl,
          width: w,
          height: h,
        };
        svgPathRender(key);
        localSave();
      });
    })
    .on('change', '.js-path-color', function() {
      const key = $(this).closest('[data-object]').data('object');
      SVG.objects[key].color = $(this).val();
      svgPathRender(key);
      localSave();
    })
    .on('change', '.js-path-link', function() {
      const key = $(this).closest('[data-object]').data('object');
      SVG.objects[key].link = $(this).val();
      svgPathRender(key);
      localSave();
    });
});

function buildSvg({src, width, height}) {
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

  $svg.append(svgImg);

  Object.keys(SVG.objects).forEach((key) => {
    svgAddPath(key);
  });
}

function svgAddPath(key) {
  svgPathRender(key);
  sidebarAddObject(key);
}

function drawingFinish() {
  $btnAddPath.removeClass('btn-danger').addClass('btn-info').attr('disabled', false);
  unSelectObject();
  localSave();
}

function drawingCancel() {
  svgPathDelete();
  drawingFinish();
}

function drawingUndo() {
  const key = SVG.currentKey;
  if (!key || !SVG.objects[key].points.length) return;

  SVG.objects[key].points = SVG.objects[key].points.slice(0, -1);
}

function svgPathRender(key) {
  if (!SVG.objects[key]) return;

  $(SVG.el).find(`g[data-object="${key}"]`).remove();

  let path_d = 'M ';

  SVG.objects[key].points.forEach((point) => {
    path_d += `${point.x},${point.y} `;
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
  colorPath.setAttribute('d', path_d);
  colorPath.setAttribute('data-role', 'color-path');
  colorPath.setAttribute('fill', 'transparent');
  colorPath.setAttribute('stroke', SVG.objects[key].color || 'rgba(0, 0, 0, 1)');
  colorPath.setAttribute('stroke-width', Math.round(SVG.viewWidth / 150));
  colorPath.classList.add('svg-path-color');

  $(SVG.el).append(group);
  $(group).append(path);
  $(group).append(colorPath);

  if (SVG.objects[key].thumbnail && SVG.objects[key].thumbnail.url) {
    const pathBBox = path.getBBox();
    const thumbnail = SVG.objects[key].thumbnail;
    const width = Math.round(SVG.viewWidth / 10);
    const height = Math.round(
      width * thumbnail.height / thumbnail.width
    );
    const x = Math.round(pathBBox.x + pathBBox.width / 2 - width / 2);
    const y = Math.round(pathBBox.y - height * 0.9);
    const svgThumbnail = document.createElementNS('http://www.w3.org/2000/svg', 'image');

    svgThumbnail.setAttribute('href', SVG.objects[key].thumbnail.url);
    svgThumbnail.setAttribute('width', width);
    svgThumbnail.setAttribute('height', height);
    svgThumbnail.setAttribute('x', x > 0 ? x : 0);
    svgThumbnail.setAttribute('y', y > 0 ? y : 0);
    svgThumbnail.classList.add('svg-path-thumbnail');

    if (SVG.objects[key].link) {
      const link = document.createElementNS('http://www.w3.org/2000/svg', 'a');
      link.setAttribute('href', SVG.objects[key].link);
      link.setAttribute('target', '_blank');

      $(link).append(svgThumbnail);
      $(group).append(link);
    } else {
      $(group).append(svgThumbnail);
    }
  }
}

function svgPathSelect(key) {
  SVG.currentKey = key;
  $sidebar.find(`[data-object="${key}"]`).find('.js-btn-select').attr('disabled', true).text('Selected');
}

function svgPathDelete(key) {
  if (!SVG.objects[key]) return;

  delete SVG.objects[key];
  SVG.currentKey = null;

  $container.find(`[data-object="${key}"]`).remove();
  $sidebar.find(`[data-object="${key}"]`).remove();
}

function svgAddPoint({x, y}) {
  if (!SVG.currentKey) return;

  const key = SVG.currentKey;

  SVG.objects[key].points.push({x, y});

  svgPathRender(key);
  svgPointRender(key, {x, y});
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

  $(SVG.el).append(rect);
}

function svgPointDelete() {
  $container.find('rect[data-object]').remove();
}

function sidebarAddObject(key) {
  const object = SVG.objects[key];
  if (!object) return;

  html = `
<div class="mt-3 p-2 border bg-light" data-object="${key}">
  <div class="d-flex flex-wrap align-items-center">
    <span class="me-auto">${key}</span>
    <button class="btn btn-sm btn-primary js-path-select me-3">Select</button>
    <button class="btn btn-sm btn-danger js-path-delete">Delete</button>
  </div>
  <div class="mt-2">
    <label class="form-label mb-1 fw-700 fs-12">Link:</label>
    <input type="text" value="${object.link || ''}" class="form-control form-control-sm js-path-link", placeholder="" />
  </div>
  <div class="mt-2">
    <label class="form-label mb-1 fw-700 fs-12">Color (HEX, ex: #ff0000):</label>
    <input type="text" value="${object.color || ''}" class="form-control form-control-sm js-path-color", placeholder="" />
  </div>
  <div class="mt-2">
    <label class="form-label mb-1 fw-700 fs-12">Thumbnail URL:</label>
    <input type="text" value="${object.thumbnail && object.thumbnail.url || ''}" class="form-control form-control-sm js-path-thumbnail", placeholder="" />
  </div>
</div>
  `;

  $sidebar.append($(html));
}

function unSelectObject() {
  if (!SVG.currentKey) return;

  const key = SVG.currentKey;
  $sidebar.find(`[data-object="${key}"]`).find('.js-btn-select').attr('disabled', false).text('Select');

  SVG.currentKey = null;
  svgPointDelete();
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
