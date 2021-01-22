document.addEventListener("DOMContentLoaded", () => {
    const addhBtn = document.querySelector("button.add"),
        emailField = document.querySelector(".form-group.email"),
        passwordField = document.querySelector(".form-group.password"),
        panelForm = document.querySelector(".panel__form"),
        allBtn = document.querySelector("input.all"),
        accountBtns = document.querySelectorAll(".switcher-check");

    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRe = /^[a-z0-9]+$/;

    const validateEmail = (email) => {
        const emailIsValid = emailRe.test(String(email).toLowerCase());

        if (!emailIsValid) {
            emailField.classList.add("invalid-field");
        } else {
            emailField.classList.remove("invalid-field");
        }

        return emailIsValid;
    };

    const validatePassword = (password) => {
        const passwordIsValid = passwordRe.test(String(password).toLowerCase());

        if (!passwordIsValid || password.length < 4) {
            passwordField.classList.add("invalid-field");
        } else {
            passwordField.classList.remove("invalid-field");
        }

        return passwordIsValid;
    };

    addhBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const formData = new FormData(panelForm);

        const emailIsValid = validateEmail(formData.get("email"));
        const passwordIsValid = validatePassword(formData.get("password"));

        if (emailIsValid && passwordIsValid) {
            //.............Other
        }
    });

    allBtn.addEventListener("change", (e) => {
        accountBtns.forEach((btn) => {
            btn.checked = e.target.checked;
        });
    });
});
