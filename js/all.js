(function () {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');
  const menuNav = document.querySelector('.menu-nav');
  const menuItems = document.getElementsByClassName('menu-item');
  const menuGroup = [menu].concat([menuNav], Array.from(menuItems));
  let showMenu = false;
  // const $spyingAreas = $('#home, #about, #experience, #skills, #works');
  // const $animatingAreas = $('.timeline, .skills-item, .project');

  // 加上選單按鈕與 X 切換效果
  menuBtn.addEventListener('click', () => {
    if (!showMenu) {
      menuBtn.classList.add('close');
      menuGroup.forEach((el) => {
        el.classList.add('show');
      });
      showMenu = true;
    } else {
      menuBtn.classList.remove('close');
      menuGroup.forEach((el) => {
        el.classList.remove('show');
      });
      showMenu = false;
    }
  });

  // 用 GSAP 與 GSAP ScrollTrigger 套件做捲軸動畫
  gsap.registerPlugin(ScrollTrigger);
  // GSDevTools.create();

  gsap.from('.timeline', {
    y: 50,
    opacity: 0,
    ease: 'power1.inOut',
    duration: 0.25,
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 70%',
    },
  });

  gsap.utils.toArray('.time-item').forEach((item) => {
    gsap.from(item, {
      y: 50,
      opacity: 0,
      ease: 'power1.inOut',
      duration: 0.25,
      scrollTrigger: {
        trigger: item,
        start: 'top 70%',
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
    { threshold: 0.8 }
  );

  projects.forEach((project) => {
    observer2.observe(project);
  });
})();

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
