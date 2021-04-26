document.addEventListener("DOMContentLoaded", () => {
    /*
     * variables
     */
    const $pets = document.querySelector(".js_pets"),
        $catsBtn = document.querySelector(".js_cats_btn"),
        $dogsBtn = document.querySelector(".js_dogs_btn"),
        $breedsMenu = document.querySelector(".js_breeds_menu"),
        $breeds = document.querySelector(".js_breeds"),
        $petSettings = document.querySelector(".js_pet_settings"),
        $petImg = document.querySelector(".js_pet_img"),
        $petName = document.querySelector(".js_pet_name"),
        $petDescr = document.querySelector(".js_pet_descr"),
        $moreInfoModal = document.querySelector(".js_more_info_modal"),
        $overlay = document.querySelector(".js_overlay"),
        $closeModalBtn = document.querySelector(".js_close_modal_btn"),
        $moreBtn = document.querySelector(".js_more_btn");

    let pets = 0; //0 - cats, 1 - dogs;

    /*
     * supporting functions
     * */
    const show = (el) => {
        el.classList.remove("hide");
        el.classList.add("show");
    };

    const hide = (el) => {
        el.classList.remove("show");
        el.classList.add("hide");
    };

    /*
     * main functions
     * */

    const displayPetSettings = (id) => {
        let pet;

        if (!pets) {
            pet = cats.find((cat) => cat.id === +id);
        } else {
            pet = dogs.find((dog) => dog.id === +id);
        }

        $petImg.src = "./images/" + pet.mainImg;
        $petName.textContent = pet.name;
        $petDescr.textContent = pet.descr;

        hide($breeds);
        show($petSettings);
    };

    const initBreedsItems = () => {
        const $items = document.querySelectorAll(".js_item");

        $items.forEach((item) => {
            item.addEventListener("click", () => {
                displayPetSettings(item.dataset.id);
            });
        });
    };

    const appendBreeds = (array) => {
        $breedsMenu.innerHTML = "";

        for (let i = 0; i < array.length; i++) {
            const { id, name, img } = array[i];

            $breedsMenu.insertAdjacentHTML(
                "beforeend",
                `
                <div data-id="${id}" class="breeds-menu__item js_item" onclick="displayPetSettings(${id})">
                    <div class="back"></div>
                    <img src="./images/${img}" alt="pet">
                    <span class="name">${name}</span>
                </div>
                `
            );
        }

        initBreedsItems();
    };
    /*
     * handlers
     * */

    (() => {
        $catsBtn.addEventListener("click", () => {
            hide($pets);
            appendBreeds(cats);
            show($breeds);
            pets = 0;
        });
        $dogsBtn.addEventListener("click", () => {
            hide($pets);
            appendBreeds(dogs);
            show($breeds);
            pets = 1;
        });
        $moreInfoModal.addEventListener("click", (e) => {
            if (e.target.classList.contains("more-info-modal")) {
                hide($overlay);
                hide($moreInfoModal);
            }
        });
        $moreBtn.addEventListener("click", (e) => {
            e.preventDefault();
            show($overlay);
            show($moreInfoModal);
        });
        $closeModalBtn.addEventListener("click", () => {
            hide($overlay);
            hide($moreInfoModal);
        });
    })();

    /*
     * functions dummy calls
     * */
    appendBreeds(cats);
});
