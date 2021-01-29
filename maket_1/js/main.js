document.addEventListener("DOMContentLoaded", () => {
  const mainTypesContent = document.querySelectorAll(".type"),
    mainContainer = document.querySelector("main"),
    mainMenu = document.querySelector(".main__menu"),
    mainMenuItem = document.querySelectorAll(".main__menu-item"),
    typesItemContent = document.querySelectorAll(".types-item"),
    productsList = document.querySelectorAll(".products"),
    mainMask = document.querySelector(".main__mask"),
    backBtn = document.querySelector(".back"),
    backTitle = document.querySelector(".back span"),
    btnMenu = document.querySelector(".btn__menu"),
    menuList = document.querySelector(".menu__list"),
    topItems = document.querySelectorAll(".top-item"),
    topSubitems = document.querySelectorAll(".li-item"),
    maskTitles = document.querySelectorAll(".mask-title");

  let step = 0;
  let type = 0;

  const show = (elem) => {
    if (elem === backBtn) {
      elem.style.display = "flex";
      elem.classList.add("fade");
    } else {
      elem.classList.add("show", "fade");
      elem.classList.remove("hide");
    }
  };

  const hide = (elem) => {
    elem.classList.add("hide");
    elem.classList.remove("show", "fade");
  };

  const changeItems = (items, f) => {
    items.forEach((item) => {
      f(item);
    });
  };

  const closeList = () => {
    changeItems(productsList, hide);
    changeItems(mainTypesContent, hide);
  };

  const rotateFirst = () => {
    btnMenu.classList.remove("rotate-second");
    btnMenu.classList.add("rotate-first");
  };

  const rotateSecond = () => {
    btnMenu.classList.add("rotate-second");
    btnMenu.classList.remove("rotate-first");
  };

  const openMenu = () => {
    show(mainMask);
    rotateFirst();
    mainMask.style.height = mainContainer.scrollHeight + "px";
    menuList.classList.remove("hide", "menu__list-close");
    menuList.classList.add("menu__list-open");
  };

  const closeMenu = () => {
    topItems.forEach((item) => {
      hide(item.nextElementSibling);
    });
    hide(mainMask);
    rotateSecond();
    menuList.classList.remove("menu__list-open");
    menuList.classList.add("menu__list-close");
  };

  closeList();

  mainMenuItem.forEach((item, index) => {
    item.addEventListener("click", () => {
      changeItems(typesItemContent, show);
      show(mainTypesContent[index]);
      hide(mainMenu);
      show(backBtn);
      type = index;
      step++;
      backTitle.textContent = maskTitles[type].textContent;
      window.scrollTo(0, 0);
    });
  });

  typesItemContent.forEach((item) => {
    item.addEventListener("click", () => {
      changeItems(typesItemContent, hide);
      show(item.nextElementSibling);
      backTitle.textContent =
        item.children[0].children[0].children[1].textContent;
      step++;
      window.scrollTo(0, 0);
    });
  });

  mainMask.addEventListener("click", () => {
    closeMenu();
    if (btnMenu.classList.contains("rotate-first")) {
      rotateSecond();
      topItems.forEach((item) => {
        hide(item.nextElementSibling);
      });
    }
    hide(mainMask);
  });

  backBtn.addEventListener("click", () => {
    if (step === 1) {
      hide(backBtn);
      backBtn.style.display = "none";
      closeList();
      show(mainMenu);
      changeItems(typesItemContent, hide);
      changeItems(mainMenuItem, show);
      step--;
    } else if (step === 2) {
      changeItems(productsList, hide);
      show(mainTypesContent[type]);
      changeItems(typesItemContent, show);
      step--;
      backTitle.textContent = maskTitles[type].textContent;
    }
  });

  btnMenu.addEventListener("click", () => {
    if (menuList.classList.contains("menu__list-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  topItems.forEach((item) => {
    item.addEventListener("click", () => {
      show(item.nextElementSibling);
    });
  });

  topSubitems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const parent = item.parentElement.getAttribute("class");
      changeItems(mainMenuItem, hide);
      closeMenu();
      closeList();
      show(mainTypesContent[parent - 1]);
      show(productsList[index]);
      changeItems(typesItemContent, hide);
      show(backBtn);
      step = 2;
      type = parent - 1;
      btnMenu.classList.add("rotate-second");
      backTitle.textContent = item.textContent;
    });
  });

  window.addEventListener(
    `resize`,
    () => {
      mainMask.style.height = mainContainer.scrollHeight + "px";
    },
    false
  );
});
