document.addEventListener("DOMContentLoaded", () => {
    const actualBtn = document.getElementById("actual-btn");
    const fileInput = document.getElementById("actual-btn");
    const emailInput = document.getElementById("email");
    const formGroupEmail = document.querySelector(".form-group.email");
    const fileChosen = document.getElementById("file-chosen");
    const sumbitBtn = document.querySelector(".submit_btn");
    const resultMess = document.querySelector(".result");
    const formSection = document.querySelector("section.form");
    const detailsText = document.querySelector(".details-text");
    const detailsInfo = document.querySelector(".details__block");
    const loader = document.querySelector(".lds-ring");
    const tbody = document.getElementById("tbody");
    const form = document.forms.discover;

    const images = [];

    const diseasesRu = {
        Abscess: "Абсцесс",
        Acne: "Акне",
        Epidermalcyst: "Эпидермальная киста",
        Folliculitis: "Фолликулит",
        Furuncle: "Фурункул",
        Herpessimplex: "Простой герпес",
        Herpeszoster: "Опоясывающий герпес",
        Inflammedcyst: "Воспаленная киста",
        Insectbite: "Укус насекомого",
        Xeroticeczema: "Ксеротическая экзема",
        Skintag: "Бородавка",
        "Nonspecific(normal)": "Неспецифическая (нормальная)",
        Hemangioma: "Гемангиома",
        Angiokeratoma: "Ангиокератома",
        CherryHemangioma: "Вишневая гемангиома",
        Dilatedpore: "Расширенные поры",
        Dysplasticnevus: "Диспластический невус",
        Keratosispilaris: "Фолликулярный кератоз",
        Melanocyticnevus: "Меланоцитарный невус",
    };

    const wikiLinks = {
        Abscess: "https://ru.wikipedia.org/wiki/Абсцесс",
        Acne: "https://ru.wikipedia.org/wiki/Акне",
        Epidermalcyst:
            "https://amclinic.ru/med-spravochnik/epidermalnaya_kista",
        Folliculitis: "https://ru.wikipedia.org/wiki/Атерома_кожи",
        Furuncle: "https://ru.wikipedia.org/wiki/Фурункул",
        Herpessimplex: "https://ru.wikipedia.org/wiki/Простой_герпес",
        Herpeszoster: "https://ru.wikipedia.org/wiki/Опоясывающий_лишай",
        Inflammedcyst: `https://www.msdmanuals.com/ru/профессиональный/дерматологическая-патология/доброкачественные-опухоли,-новообразования-кожи-и-сосудистые-поражения/кожные-кисты`,
        Insectbite: "https://ru.wikipedia.org/wiki/Ужаления_и_укусы_насекомых",
        Xeroticeczema:
            "https://www.netinbag.com/ru/health/what-is-xerotic-eczema.html",
        Skintag: "https://ru.wikipedia.org/wiki/Бородавка",
        Hemangioma: "https://ru.wikipedia.org/wiki/Гемангиома",
        Angiokeratoma: "https://ru.wikipedia.org/wiki/Ангиокератома",
        CherryHemangioma: "https://www.healthfrom.com/ru/disease/h-2086.html",
        Dilatedpore: "http://womanwiki.ru/w/Расширенные_поры",
        Dysplasticnevus: "https://ru.wikipedia.org/wiki/Родинка",
        Keratosispilaris: "https://ru.wikipedia.org/wiki/Волосяной_лишай",
        Melanocyticnevus:
            "https://mesedclinic.ru/dermatologiya/nevus/melanotsitarnyy-nevus/",
    };

    const validateFileUpload = (files) => {
        for (let i = 0; i < files.length; i++) {
            const name = files[i].name;

            if (
                name.indexOf("png") !== -1 ||
                name.indexOf("jpeg") !== -1 ||
                name.indexOf("jpg") !== -1 ||
                name.indexOf("webp") !== -1
            ) {
                return true;
            }
        }

        return false;
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const show = (el) => {
        el.classList.remove("hide");
        el.classList.add("show");
    };

    const hide = (el) => {
        el.classList.remove("show");
        el.classList.add("hide");
    };

    const nameVerification = (name, ruName, wikiLink) => {
        if (ruName && wikiLink) {
            return `<a href=${wikiLinks[name]} target="_blank">${diseasesRu[name]}</a>`;
        } else if (ruName && !wikiLink) {
            return `${diseasesRu[name]}`;
        } else {
            return `${name}`;
        }
    };

    const showDiseases = (diseases) => {
        diseases.sort((a, b) => +b.value - +a.value);

        diseases.forEach((item, i) => {
            let name = item.name;

            if (i === 0 || i === 1) {
                name = item.name.replace(/[\s\S]/g, "*");
            }

            const validName = nameVerification(
                name,
                diseasesRu[name],
                wikiLinks[name]
            );

            tbody.innerHTML += `
                    <tr>
                        <td>${validName}</td>
                        <td>${item.value}</td>
                    </tr>
                `;
        });
    };

    actualBtn.addEventListener("change", function () {
        const isValid = validateFileUpload(this.files);

        if (isValid) {
            for (let i = 0; i < this.files.length; i++) {
                if (images.length === 5) {
                    break;
                }
                images.push(this.files[i]);
            }

            fileChosen.innerHTML = `<p class="files">${images.length}/5</p>`;
        } else {
            fileChosen.innerHTML = `<p class="warning">Загрузите изображения!</p>`;
        }
    });

    sumbitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const diseases = [];

        const validFiles = validateFileUpload(fileInput.files);
        const validEmail = validateEmail(emailInput.value);

        if (!validEmail) {
            return formGroupEmail.classList.add("invalid");
        } else {
            formGroupEmail.classList.remove("invalid");
        }

        if (!validFiles) {
            return (fileChosen.innerHTML =
                "<p class='warning'>Загрузите изображения!</p>");
        }

        if (images.length < 3 || images.length > 5) {
            return (fileChosen.innerHTML =
                "<p class='warning'>Загрузите от 3 до 5 файлов!</p>");
        }

        const formData = new FormData(form);
        formData.delete("files");

        for (let i = 0; i < images.length; i++) {
            formData.append("files", images[i]);
        }

        hide(form);
        show(loader);

        //----------------------------------------------Делаем запрос

        setTimeout(() => {
            const response = {
                diseases: {
                    Abscess: "0.123",
                    Acne: "0.1234",
                    Epidermalcyst: "0.121",
                    Folliculitis: "0.1423",
                    Furuncle: "0.2423",
                    Herpessimplex: "0.3423",
                    Herpeszoster: "0.14323",
                    Inflammedcyst: "0.5423",
                    Insectbite: "0.11423",
                    "Nonspecific(normal)": "0.27"
                },
            };
            hide(formSection);
            show(resultMess);

            for (let key in response.diseases) {
                diseases.push({
                    name: key,
                    value: response.diseases[key],
                });
            }

            showDiseases(diseases);
        }, 2000);

        // $.ajax({
        //     url: "find",
        //     type: "POST",
        //     cache: false,
        //     processData: false,
        //     contentType: false,
        //     enctype: "multipart/form-data",
        //     data: formData,
        //     success: function (response) {
        //         hide(formSection);
        //         show(resultMess);

        //         for (let key in response.diseases) {
        //             diseases.push({
        //                 name: key,
        //                 value: response.diseases[key],
        //             });
        //         }

        //         showDiseases(diseases);
        //     },
        // });
    });

    detailsText.addEventListener("click", () => {
        detailsInfo.classList.toggle("show");
    });
});
