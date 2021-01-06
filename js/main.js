document.addEventListener("DOMContentLoaded", () => {
    const actualBtn = document.getElementById("actual-btn");

    const fileChosen = document.getElementById("file-chosen");

    actualBtn.addEventListener("change", function () {
        fileChosen.innerHTML = "";

        if (this.files.length < 3 || this.files.length > 5) {
            fileChosen.innerHTML = "Загрузите от 3 до 5 файлов!";
            this.files.length = 0;
        } else {
            for (let i = 0; i < this.files.length; i++) {

              if (this.files[i].size )
                fileChosen.innerHTML += `<p>${this.files[i].name}</p><br>`;
            }


        }
    });
});
