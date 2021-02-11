$(function () {
  const $window = $(window);
  const $menuBtn = $('.menu-btn');
  const $menuGroup = $('.menu, .menu-nav, .menu-item');
  const $spyingAreas = $('#home, #about, #experience, #skills, #works');
  const $animatingAreas = $('.time-item, .skills-item, .project');
  let showMenu = false;

  // 加上選單按鈕與 X 切換效果
  $menuBtn.click(function () {
    if (!showMenu) {
      $menuBtn.addClass('close');
      $menuGroup.addClass('show');
      showMenu = true;
    } else {
      $menuBtn.removeClass('close');
      $menuGroup.removeClass('show');
      showMenu = false;
    }
  });

  // scrollSpy - 偵測捲軸位置，這裡有兩個功能需要用到 scrollSpy
  // 一個是自動切換目前畫面上的區域所相對應的選單選項
  // 一個是設定滑動到要出現動畫的元素
  function addScrollSpy(target, extraHeight, isSpyingAreas) {
    target.each(function () {
      const $this = $(this);
      const offset = $this.offset();
      const id = $this.attr('id');

      const min = id === 'home' ? 0 : offset.top - extraHeight;
      const max =
        id === 'works'
          ? $(document).height()
          : offset.top + $this.height() - extraHeight;

      // 如果對象是 spyingAreas
      if (isSpyingAreas) {
        // 計算剛載入頁面時要 highlight 的 menu item
        const $targetMenuItem = $('#' + $this.data('menu'));
        $targetMenuItem.removeClass('current');
        if ($window.scrollTop() >= min && $window.scrollTop() <= max) {
          $targetMenuItem.addClass('current');
        }
      } else {
        // 當卷軸位置小於 min，才隱藏要動畫的對象
        $this.removeClass('hide');
        if ($window.scrollTop() < min) {
          $this.addClass('hide');
        }
      }

      $this.scrollspy({
        min: min,
        max: max,
        onEnter: function (element) {
          if (isSpyingAreas) {
            // 偵測是否接觸到邊界，當進入該區域就切換 current 位置
            const current = $(element).data('menu');
            $('.menu-item').removeClass('current');
            $('#' + current).addClass('current');
          } else {
            // 進入就移除 hide 開始動畫
            $(element).removeClass('hide');
          }
        },
      });
    });
  }

  function destroyScrollSpy() {
    $window.scrollspy({}, 'destroy');
  }

  //
  addScrollSpy($spyingAreas, $window.height() / 3, true);
  addScrollSpy($animatingAreas, $window.height() * 0.8, false);

  $window.resize(function () {
    destroyScrollSpy();
    addScrollSpy($spyingAreas, $window.height() / 3, true);
    addScrollSpy($animatingAreas, $window.height() * 0.8, false);
  });

  // 按下 menu link 後滑動到相對應的位置
  $('.menu-nav-link').click(function (e) {
    e.preventDefault();
    // console.log(e.target);
    $('html,body').animate(
      {
        scrollTop: $(e.target.hash).offset().top,
      },
      500
    );
  });
});
