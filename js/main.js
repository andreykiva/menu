document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav__item"),
    nav = document.querySelectorAll(".nav"),
    tabsContent = document.querySelectorAll(".products__list"),
    tabsParent = document.querySelectorAll(".nav__content"),
    menuItems = document.querySelectorAll(".menu__item"),
    pages = document.querySelectorAll(".categories__page"),
    menu = document.querySelector(".home__content"),
    menuBtn = document.querySelector(".menu__btn"),
    headerTitle = document.querySelector(".header__title");

  const tabsActive = [0, 9, 18, 19];
  const titles = ["Кухня", "Бар", "Кальян", "IQOS"];

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");
    tabs[i].classList.add("active");
  };

  const showPage = (i) => {
    menu.classList.remove("show", "fade");
    menu.classList.add("hide");
    pages[i].classList.remove("hide");
    pages[i].classList.add("show", "fade");
  };

  const hidePages = () => {
    pages.forEach((page) => {
      page.classList.remove("show", "fade");
      page.classList.add("hide");
    });

    menu.classList.remove("hide");
    menu.classList.add("show", "fade");
  };

  const scrollRight = (tab, i) => {
    return (
      tabsParent[i].scrollLeft +
      tab.getBoundingClientRect().x -
      tabsParent[i].clientWidth / 2 +
      tab.clientWidth / 2 -
      tabsParent[i].offsetLeft
    );
  };

  const scrollLeft = (tab, i) => {
    return (
      tabsParent[i].scrollLeft -
      (nav[i].clientWidth / 2 -
        tab.getBoundingClientRect().x -
        tab.clientWidth +
        tab.clientWidth / 2)
    );
  };

  hideTabContent();
  showTabContent();

  Math.easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const scrollTo = (element, to, duration) => {
    let start = element.scrollLeft,
      change = to - start,
      currentTime = 0,
      increment = 1;

    let animateScroll = function () {
      currentTime += increment;
      let val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  tabsParent.forEach((tabsParentItem, index) => {
    tabsParentItem.addEventListener("click", (e) => {
      const target = e.target;

      if (target && target.classList.contains("nav__item")) {
        tabs.forEach((tab, i) => {
          if (target === tab) {
            hideTabContent();
            showTabContent(i);

            if (tab.getBoundingClientRect().x > nav[index].clientWidth / 2) {
              scrollTo(tabsParentItem, scrollRight(tab, index), 50);
            } else {
              scrollTo(tabsParentItem, scrollLeft(tab, index), 50);
            }

            document.querySelectorAll(".slick-track").forEach((item) => {
              item.style.transform = "translate3d(15px, 0px, 0px)";
            });

            
          }
        });
      }
    });
  });

  menuItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      hidePages();
      showPage(i);
      document.querySelectorAll(".slick-track").forEach((item) => {
        item.style.transform = "translate3d(15px, 0px, 0px)";
      });
      showTabContent(tabsActive[i]);
      tabsParent[i].scrollLeft = 0;
      headerTitle.textContent = titles[i];
      if (i === 2 || i === 3) {
        document.querySelectorAll(".slick-track").forEach((item) => {
          item.style.transform = "translate3d(0px, 0px, 0px)";
        });
      }
    });
  });

  hidePages();

  menuBtn.addEventListener("click", () => {
    hidePages();
    hideTabContent();
    headerTitle.textContent = "Меню";
  });
});

$(".products__list").slick({
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
  dots: false,
  arrows: false,
});
