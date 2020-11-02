document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav__item"),
    tabsContent = document.querySelectorAll(".main__content"),
    tabsParent = document.querySelector(".nav");

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

  const scrollRight = (tab) => {
    return (
      tabsParent.scrollLeft +
      tab.getBoundingClientRect().x -
      tabsParent.clientWidth / 2 +
      tab.clientWidth / 2 -
      tabsParent.offsetLeft
    );
  };

  const scrollLeft = (tab) => {
    return (
      tabsParent.scrollLeft -
      (tabsParent.clientWidth / 2 -
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
      let val = Math.easeInOutQuad(
        currentTime,
        start,
        change,
        duration
      );
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("nav__item")) {
      tabs.forEach((tab, i) => {
        if (target === tab) {
          hideTabContent();
          showTabContent(i);

          if (tab.getBoundingClientRect().x > tabsParent.clientWidth / 2) {
            scrollTo(tabsParent, scrollRight(tab), 50);
          } else {
            scrollTo(tabsParent, scrollLeft(tab), 50);
          }
        }
      });
    }
  });
});
