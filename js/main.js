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

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("nav__item")) {
      tabs.forEach((tab, i) => {
        if (target === tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
});
