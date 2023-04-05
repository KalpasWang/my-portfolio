$(function () {
  const $menuBtn = $('.menu-btn');
  const $menuGroup = $('.menu, .menu-nav, .menu-item');

  /* 加上選單按鈕與 X 切換效果 */
  $menuBtn.click(function () {
    $menuBtn.toggleClass('close');
    $menuGroup.toggleClass('show');
  });

  // 用 GSAP 與 GSAP ScrollTrigger 套件做捲軸動畫
  gsap.registerPlugin(ScrollTrigger);

  /* scrollSpy 效果與 scrollTo 效果 */
  $('#home, #about, #experience, #skills, #works, #contact').each((i, el) => {
    const menuItem = '#' + $(el).data('menu');

    // 選單連結點擊後的滑動效果
    $(menuItem)
      .children()
      .click((e) => {
        e.preventDefault();
        $('html,body').animate(
          {
            scrollTop: $(el).offset().top,
          },
          500
        );
      });

    // scrollSpy
    ScrollTrigger.create({
      trigger: el,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: () => $(menuItem).toggleClass('current'),
    });
  });

  /* 關於我文字圖片浮現特效 */
  const t1 = gsap.timeline({
    defaults: {
      opacity: 0,
      duration: 0.3,
      ease: 'power1.inOut',
    },
    scrollTrigger: {
      trigger: '.about-info',
      start: 'center bottom',
    },
  });

  t1.from('#bio-image', { y: 100 })
    .from('#bio1', { x: 100 }, '-=0.1')
    .from('#bio2', { x: 100 }, '-=0.2')
    .from('#bio3', { x: 100 }, '-=0.2');

  /* 時間軸特效 */
  gsap.from('.timeline', {
    opacity: 0,
    duration: 0.25,
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%',
    },
  });

  gsap.utils.toArray('.time-item').forEach((item) => {
    gsap.from(item, {
      y: 10,
      opacity: 0,
      ease: 'power1.inOut',
      duration: 0.25,
      scrollTrigger: {
        trigger: item,
        start: 'bottom bottom',
      },
    });
  });

  /* 技能卡片特效 */
  const t2 = gsap.timeline();
  const boxes = gsap.utils.toArray('.skills-item');
  t2.set(boxes, { opacity: 0 });

  const observer = new IntersectionObserver(
    function (entries, self) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimation(t2, entry.target);
          self.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 }
  );

  boxes.forEach((box) => {
    observer.observe(box);
  });

  /* 專案卡片特效 */
  const t3 = gsap.timeline();
  const projects = gsap.utils.toArray('li.project');
  t3.set(projects, { opacity: 0 });

  const observer2 = new IntersectionObserver(
    function (entries, self) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimation(t3, entry.target);
          self.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  projects.forEach((project) => {
    observer2.observe(project);
  });

  /* 表單 label 浮動特效 */
  $('#contact input, #contact textarea').on('input', function () {
    if ($(this).val().length > 0) {
      $(this).siblings('label').addClass('labelup');
    } else {
      $(this).siblings('label').removeClass('labelup');
    }
  });
});

function setAnimation(timeline, target) {
  let overlap = '-=0.15';

  if (!timeline.isActive()) {
    overlap = '+=0';
  }

  timeline.set(target, { y: 80 }, overlap).to(
    target,
    {
      opacity: 1,
      duration: 0.3,
      y: 0,
    },
    overlap
  );
}
