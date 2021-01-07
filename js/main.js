document.addEventListener("DOMContentLoaded", () => {
    const actualBtn = document.getElementById("actual-btn");
    const fileChosen = document.getElementById("file-chosen");
    const sumbitBtn = document.querySelector(".submit_btn");
    const resultMess = document.querySelector(".result");
    const formSection = document.querySelector("section.form");
    const detailsText = document.querySelector(".details-text");
    const detailsInfo = document.querySelector(".details__block");
    const form = document.forms.discover;

    actualBtn.addEventListener("change", function () {
        fileChosen.innerHTML = "";

        if (this.files.length < 3 || this.files.length > 5) {
            fileChosen.innerHTML = "<p class='warning'>Загрузите от 3 до 5 файлов!</p>";
            this.files.length = 0;
        } else {
            for (let i = 0; i < this.files.length; i++) {
                if (this.files[i].size)
                    fileChosen.innerHTML += `<p class="files">${this.files[i].name}</p><br>`;
            }

            fileChosen.innerHTML = `<p class="files">${this.files.length}/5</p>`;
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
    })
});
