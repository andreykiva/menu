document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav__item"),
    tabsContent = document.querySelectorAll(".page"),
    tabsParent = document.querySelector(".nav"),
    productMenuContent = document.querySelectorAll(".item__content"),
    productItems = document.querySelectorAll(".product__item"),
    menuItems = document.querySelectorAll(".menu__item"),
    backArrows = document.querySelectorAll(".back_arrow"),
    pageMenu = document.querySelectorAll(".menu");

  let page = 0;
  const classNames = ["cultery", "soda", "home", "hookah", "pipe"];

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });

    tabs.forEach((tab) => {
      tab.parentNode.classList.remove("nav__item-active", "fade-menu");
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");
    tabs[i].parentNode.classList.add("nav__item-active");
    tabs[i].parentNode.classList.add(classNames[i], "fade-menu");
  };

  const showContent = (elem) => {
    elem.classList.remove("hide");
    elem.classList.add("show", "fade");
  };

  const hideContent = (elem) => {
    elem.classList.remove("show", "fade");
    elem.classList.add("hide");
  };

  showTabContent(2);

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("nav__item")) {
      tabs.forEach((tab, i) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(i);
          window.scrollTo(0, 0);
          productItems.forEach((item) => {
            item.classList.remove("product__item-active");
          });
          productMenuContent.forEach((menu) => {
            hideContent(menu);
          });
          showContent(pageMenu[page]);
        }
      });
    }
  });

  productItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("product__item-active");
    });
  });

  menuItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      pageMenu.forEach((menu, index) => {
        if (menu === item.parentNode) {
          page = index;
        }
      });
      hideContent(item.parentNode);
      showContent(productMenuContent[i]);
      window.scrollTo(0, 0);
    });
  });

  backArrows.forEach((arrow, i) => {
    arrow.addEventListener("click", () => {
      hideContent(productMenuContent[i]);
      showContent(pageMenu[page]);
      window.scrollTo(0, 0);
      productItems.forEach((item) => {
        item.classList.remove("product__item-active");
      });
    });
  });
});
