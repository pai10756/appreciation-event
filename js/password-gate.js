/**
 * 簡易密碼驗證
 * 密碼頁使用：驗證後寫入 sessionStorage
 * 其他頁面使用：檢查 sessionStorage，未通過跳轉回密碼頁
 */
(function () {
  var STORAGE_KEY = 'album_auth';

  // 在密碼頁上：綁定表單事件
  var form = document.getElementById('password-form');
  if (form) {
    var input = document.getElementById('password-input');
    var errorEl = document.getElementById('password-error');
    var correctPassword = form.getAttribute('data-password');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = input.value.trim();

      if (value === correctPassword) {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        window.location.href = 'home.html';
      } else {
        input.classList.add('error');
        errorEl.textContent = '密碼不正確，請再試一次';
        setTimeout(function () {
          input.classList.remove('error');
        }, 400);
      }
    });

    // 若已通過驗證，直接跳轉首頁
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
      window.location.href = 'home.html';
    }

    return;
  }

  // 在其他頁面上：檢查是否已通過驗證
  if (sessionStorage.getItem(STORAGE_KEY) !== 'true') {
    window.location.href = 'index.html';
  }
})();
