/**
 * 導覽列功能
 * 滾動時微縮陰影效果
 */
(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  var scrolled = false;
  window.addEventListener('scroll', function () {
    var isScrolled = window.scrollY > 10;
    if (isScrolled !== scrolled) {
      scrolled = isScrolled;
      nav.style.boxShadow = scrolled
        ? '0 2px 12px rgba(61, 50, 41, 0.1)'
        : '0 1px 3px rgba(61, 50, 41, 0.08)';
    }
  }, { passive: true });
})();
