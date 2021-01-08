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

    // actualBtn.addEventListener("change", function () {
    //     if (this.files.length < 3 || this.files.length > 5) {
    //         fileChosen.innerHTML =
    //             "<p class='warning'>Загрузите от 3 до 5 файлов!</p>";
    //         this.files.length = 0;
    //     } else {
    //         const isValid = validateFileUpload(this.files);

    //         if (isValid) {
    //             for (let i = 0; i < this.files.length; i++) {
    //                 images.push(this.files[i]);
    //             }
    //             fileChosen.innerHTML = `<p class="files">${images.length}/5</p>`;
    //         } else {
    //             fileChosen.innerHTML = `<p class="warning">Загрузите изображения!</p>`;
    //         }
    //     }
    // });

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

        //----------------------------------------------Делаем запрос
        hide(form);
        show(loader);

        const res = {
            diseases: {
                Abscess: "131",
                Acne: "1233",
                Epidermalcyst: "0.127",
                Folliculitis: "0.121",
                Furuncle: "0.122",
                Herpessimplex: "0.123",
                Herpeszoster: "0.124",
                Inflammedcyst: "0.125",
                Insectbite: "0.126",
                Xeroticeczema: "77777",
            },
        };

        const diseases = [];

        for (let key in res.diseases) {
            diseases.push({
                name: key,
                value: res.diseases[key],
            });
        }

        diseases.sort((a, b) => +b.value - +a.value);

        setTimeout(() => {
            hide(formSection);
            show(resultMess);

            diseases.forEach((item, i) => {
                if (i === 0 || i === 1) {
                    diseasesRu[item.name] = diseasesRu[item.name].replace(
                        /[\s\S]/g,
                        "*"
                    );
                }

                tbody.innerHTML += `
                    <tr>
                        <td>${diseasesRu[item.name]}</td>
                        <td>${item.value}</td>
                    </tr>
                `;
            });
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

        //     },
        // });
    });

    detailsText.addEventListener("click", () => {
        detailsInfo.classList.toggle("show");
    });
});
