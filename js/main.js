document.addEventListener("DOMContentLoaded", () => {
    const actualBtn = document.getElementById("actual-btn");
    const fileChosen = document.getElementById("file-chosen");
    const inputFile = document.getElementById("actual-btn");
    const sumbitBtn = document.querySelector(".submit_btn");
    const resultMess = document.querySelector(".result");
    const formSection = document.querySelector("section.form");
    const detailsText = document.querySelector(".details-text");
    const detailsInfo = document.querySelector(".details__block");
    const form = document.forms.discover;

    actualBtn.addEventListener("change", function () {
        fileChosen.innerHTML = "";

        if (this.files.length < 3 || this.files.length > 5) {
            fileChosen.innerHTML =
                "<p class='warning'>Загрузите от 3 до 5 файлов!</p>";
            this.files.length = 0;
        } else {
            for (let i = 0; i < this.files.length; i++) {
                const name = this.files[i].name;

                if (
                    name.indexOf("png") !== -1 ||
                    name.indexOf("jpeg") !== -1 ||
                    name.indexOf("jpg") !== -1 ||
                    name.indexOf("webp") !== -1
                ) {
                    fileChosen.innerHTML = `<p class="files">${this.files.length}/5</p>`;
                    break;
                } else {
                    fileChosen.innerHTML = `<p class="warning">Загрузите изображения!</p>`;
                }
            }

            // const extension = fileUploadPath.substring(
            //     fileUploadPath.lastIndexOf(".") + 1
            // ).toLowerCase();

            // if (
            //     extension == "png" ||
            //     extension == "jpeg" ||
            //     extension == "jpg" ||
            //     extension == "webp"
            // ) {
            // } else {
            //     fileChosen.innerHTML = `<p class="warning">Загрузите изображения!</p>`;
            // }
        }
    });

    sumbitBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // console.log(data);

        resultMess.style.display = "block";
        formSection.style.display = "none";

        // fetch("/api/find", {
        //     method: "POST",
        //     body: data,
        // })
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((error) => console.error(error));
    });

    detailsText.addEventListener("click", () => {
        detailsInfo.classList.toggle("show");
    });
});
