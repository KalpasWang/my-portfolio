$(function () {
  const $window = $(window);
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.menu');
  var menuNav = document.querySelector('.menu-nav');
  var menuItems = document.querySelectorAll('.menu-item');
  var showMenu = false;

  menuBtn.addEventListener('click', function () {
    if (!showMenu) {
      menuBtn.classList.add('close');
      menu.classList.add('show');
      menuNav.classList.add('show');
      menuItems.forEach((item) => item.classList.add('show'));
      showMenu = true;
    } else {
      menuBtn.classList.remove('close');
      menu.classList.remove('show');
      menuNav.classList.remove('show');
      menuItems.forEach((item) => item.classList.remove('show'));
      showMenu = false;
    }
  });

  // scrollSpy - 偵測捲軸位置並且自動切換目前所在區域的選單選項

  // function addScrollSpy(extraHeight)

  $('#home, #about, #experience, #skills, #works').each(function () {
    var $this = $(this);
    const $window = $(window);
    var position = $this.offset();
    const id = $this.attr('id');

    // 計算剛載入頁面時要 highlight 的 menu item
    const extraHeight = $window.height() / 3;
    const min = id === 'home' ? 0 : position.top - extraHeight;
    const max =
      id === 'works'
        ? $(document).height()
        : position.top + $this.height() - extraHeight;

    if ($window.scrollTop() >= min && $window.scrollTop() <= max) {
      $('#' + $this.data('menu')).addClass('current');
    }

    // 偵測是否接觸到邊界，當進入該區域就切換 current 位置
    $this.scrollspy({
      min: (function () {
        const extraHeight = $window.height() / 3;
        return id === 'home' ? 0 : position.top - extraHeight;
      })(),
      max: (function () {
        const extraHeight = $window.height() / 3;
        if (id === 'works') return $(document).height();
        return position.top + $this.height() - extraHeight;
      })(),
      onEnter: function onEnter(element) {
        const current = $(element).data('menu');
        // console.log($(element).data('menu'));
        $('.menu-item').removeClass('current');
        $('#' + current).addClass('current');
      },
    });
  });

  // addScrollSpy()
  // $window.resize(function () {
  //   destroyScrollSpy()
  //   addScrollSpy()
  // })

  // 按下 menu link 後滑動到相對應的位置
  $('.menu-nav-link').click(function (e) {
    e.preventDefault();
    console.log(e.target);
    $('html,body').animate(
      {
        scrollTop: $(e.target.hash).offset().top,
      },
      500
    );
  });

  // 設定滑動到要出現動畫的元素
  $('.time-item, .skills-item, .project').each(function () {
    const $this = $(this);
    const offset = $this.offset();
    const extraHeight = $window.height() * 0.8;

    if ($window.scrollTop() < offset.top - extraHeight) {
      $this.addClass('hide');
    }

    $this.scrollspy({
      min: offset.top - extraHeight,
      max: offset.top + $this.height() - extraHeight,
      onEnter(el) {
        $el = $(el);
        $el.removeClass('hide');
      },
    });
  });
});
