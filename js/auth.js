document.addEventListener("DOMContentLoaded", () => {
    const authBtn = document.querySelector(".auth-btn"),
        emailField = document.querySelector(".form-group.email"),
        passwordField = document.querySelector(".form-group.password"),
        authForm = document.querySelector(".auth__form");

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

    authBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const formData = new FormData(authForm);

        const emailIsValid = validateEmail(formData.get("email"));
        const passwordIsValid = validatePassword(formData.get("password"));

        if (emailIsValid && passwordIsValid) {
            history.pushState({}, "", "./pages/control-panel.html");
            location.reload()

            //.............Other
        }
    });
});
