/**
 * Lightbox 元件
 * 全螢幕放大照片、左右切換、下載原檔
 */
(function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var imgEl = lightbox.querySelector('.lightbox-img');
  var captionEl = lightbox.querySelector('.lightbox-caption');
  var counterEl = lightbox.querySelector('.lightbox-counter');
  var downloadEl = lightbox.querySelector('.lightbox-download');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var closeBtn = lightbox.querySelector('.lightbox-close');

  var photos = [];
  var currentIndex = 0;

  // 從頁面上收集照片資料
  function collectPhotos() {
    photos = [];
    var thumbs = document.querySelectorAll('.photo-thumb');
    thumbs.forEach(function (thumb) {
      photos.push({
        id: thumb.getAttribute('data-id'),
        caption: thumb.getAttribute('data-caption') || '',
        filename: thumb.getAttribute('data-filename') || 'photo.jpg',
      });
    });
  }

  function driveUrl(id, size) {
    return 'https://drive.google.com/thumbnail?id=' + id + '&sz=w' + size;
  }

  function downloadUrl(id) {
    return 'https://drive.google.com/uc?export=download&id=' + id;
  }

  function showPhoto(index) {
    if (index < 0 || index >= photos.length) return;
    currentIndex = index;
    var photo = photos[index];

    imgEl.src = driveUrl(photo.id, 1600);
    imgEl.alt = photo.caption || photo.filename;
    captionEl.textContent = photo.caption;
    counterEl.textContent = (index + 1) + ' / ' + photos.length;
    downloadEl.href = downloadUrl(photo.id);
    downloadEl.setAttribute('download', photo.filename);

    // 按鈕顯示控制
    prevBtn.style.display = index > 0 ? '' : 'none';
    nextBtn.style.display = index < photos.length - 1 ? '' : 'none';
  }

  function open(index) {
    collectPhotos();
    showPhoto(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    imgEl.src = '';
  }

  // 事件綁定
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { showPhoto(currentIndex - 1); });
  nextBtn.addEventListener('click', function () { showPhoto(currentIndex + 1); });

  // 點擊遮罩關閉
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  // 鍵盤操作
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });

  // 觸控滑動
  var touchStartX = 0;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    var diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showPhoto(currentIndex - 1);
      else showPhoto(currentIndex + 1);
    }
  }, { passive: true });

  // 將 open 方法暴露給全域
  window.openLightbox = open;

  // 綁定縮圖點擊
  document.addEventListener('click', function (e) {
    var thumb = e.target.closest('.photo-thumb');
    if (thumb) {
      var index = Array.from(document.querySelectorAll('.photo-thumb')).indexOf(thumb);
      if (index !== -1) open(index);
    }
  });
})();
