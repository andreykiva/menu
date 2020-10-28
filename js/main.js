document.addEventListener("DOMContentLoaded", () => {
  const mainTypesContent = document.querySelectorAll(".type"),
    mainMenu = document.querySelector(".main__menu"),
    mainMenuItem = document.querySelectorAll(".main__menu-item"),
    typesItemContent = document.querySelectorAll(".types-item"),
    productsList = document.querySelectorAll(".products"),
    products = document.querySelectorAll(".product"),
    mainMask = document.querySelector(".main__mask"),
    backBtn = document.querySelector(".back"),
    btnMenu = document.querySelector(".btn__menu"),
    menuList = document.querySelector(".menu__list"),
    topItems = document.querySelectorAll(".top-item"),
    topSubitems = document.querySelectorAll(".menu__list ul li");

  let step = 0;
  let type = 0;

  const show = (elem) => {
    elem.classList.add("show");
    elem.classList.remove("hide");
  };

  const hide = (elem) => {
    elem.classList.add("hide");
    elem.classList.remove("show");
  };

  const closeModal = () => {
    hide(mainMask);
    document.body.style.overflow = "";
    if (document.querySelector(".modal")) {
      document.querySelector(".modal").remove();
      step--;
    }
  };

  const openModal = (product) => {
    const child = product.children[0],
      descr = "",
      modal = document.createElement("div");

    modal.classList.add("modal");
    modal.style.top =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight +
      document.documentElement.clientHeight / 4 +
      "px";
    modal.innerHTML = `
          <div class="modal__title">${child.children[1].textContent.replace(
            /^\s*(.*)\s*$/,
            "$1"
          )}
            <span data-close>×</span>
          </div>
          <div class="modal__img">
            <img src=${child.children[2].getAttribute(
              "src"
            )} alt=${child.children[2].getAttribute("alt")}>
          </div>
          <div class="modal__price">100₴</div>
          <div class="modal__descr">${descr}</div>
  `;

    document.querySelector(".container").append(modal);
    document.body.style.overflow = "hidden";
    show(mainMask);
    mainMask.style.height = document.documentElement.clientHeight + "px";
    step++;

    modalClose = document.querySelector("[data-close]");
    modalClose.addEventListener("click", closeModal);
  };

  const closeList = () => {
    productsList.forEach((products) => {
      hide(products);
    });

    mainTypesContent.forEach((type) => {
      hide(type);
    });
  };

  closeList();

  mainMenuItem.forEach((item, index) => {
    item.addEventListener("click", () => {
      typesItemContent.forEach((type) => {
        show(type);
      });
      show(mainTypesContent[index]);
      hide(mainMenu);
      show(backBtn);
      type = index;
      step++;
    });
  });

  typesItemContent.forEach((item) => {
    item.addEventListener("click", () => {
      typesItemContent.forEach((i) => {
        hide(i);
      });
      show(item.nextElementSibling);
      step++;
    });
  });

  products.forEach((product) => {
    product.addEventListener("click", () => {
      openModal(product);
    });
  });

  mainMask.addEventListener("click", () => {
    closeModal();
    hide(menuList);
  });

  backBtn.addEventListener("click", () => {
    if (step === 1) {
      hide(backBtn);
      closeList();
      show(mainMenu);
      typesItemContent.forEach((item) => {
        hide(item);
      });
      mainMenuItem.forEach((item) => {
        show(item);
      });
      step--;
    } else if (step === 2) {
      productsList.forEach((products) => {
        hide(products);
      });
      show(mainTypesContent[type]);
      typesItemContent.forEach((item) => {
        show(item);
      });
      step--;
    } else if (step === 3) {
      closeModal();
    }
  });

  btnMenu.addEventListener("click", () => {
    if (menuList.classList.contains("show")) {
      topItems.forEach((item) => {
        hide(item.nextElementSibling);
      });
      hide(menuList);
      hide(mainMask);
    } else {
      show(menuList);
      show(mainMask);
    }
  });

  topItems.forEach((item) => {
    item.addEventListener("click", () => {
      show(item.nextElementSibling);
    });
  });

  topSubitems.forEach((item, index) => {
    item.addEventListener("click", () => {
      topItems.forEach((item) => {
        hide(item.nextElementSibling);
      });
      mainMenuItem.forEach((i) => {
        hide(i);
      });
      hide(menuList);
      hide(mainMask);
      closeList();
      closeModal();
      const parent = item.parentElement.getAttribute("class");
      show(mainTypesContent[parent - 1]);
      show(productsList[index]);
      typesItemContent.forEach((i) => {
        hide(i);
      });
      show(backBtn);
      step = 2;
      type = parent - 1;
      console.log(type);
    });
  });
});
