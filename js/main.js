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
    const form = document.forms.discover;

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
        el.classList.add("show")
    }

    const hide = (el) => {
        el.classList.remove("show");
        el.classList.add("hide")
    }

    actualBtn.addEventListener("change", function () {
        if (this.files.length < 3 || this.files.length > 5) {
            fileChosen.innerHTML =
                "<p class='warning'>Загрузите от 3 до 5 файлов!</p>";
            this.files.length = 0;
        } else {
            const isValid = validateFileUpload(this.files);

            if (isValid) {
                fileChosen.innerHTML = `<p class="files">${this.files.length}/5 ✔</p>`;
            } else {
                fileChosen.innerHTML = `<p class="warning">Загрузите изображения!</p>`;
            }
        }
    });

    sumbitBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const validFiles = validateFileUpload(fileInput.files);
        const validEmail = validateEmail(emailInput.value);

        for (let i = 0; i < fileInput.files.length; i++) {
            console.log(fileInput.files[i]);
        }

        if (!validEmail) {
            return formGroupEmail.classList.add("invalid");
        } else {
            formGroupEmail.classList.remove("invalid");
        }

        if (!validFiles) {
            return (fileChosen.innerHTML =
                "<p class='warning'>Загрузите от 3 до 5 файлов!</p>");
        }

        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        hide(formSection)
        show(resultMess);

        fetch("/api/find", {
            method: "POST",
            body: data,
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.error(error));
    });

    detailsText.addEventListener("click", () => {
        detailsInfo.classList.toggle("show");
    });
});
