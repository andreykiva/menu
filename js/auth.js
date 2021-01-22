document.addEventListener("DOMContentLoaded", () => {
    const authBtn = document.querySelector(".auth-btn"),
        loginField = document.querySelector(".form-group.login"),
        passwordField = document.querySelector(".form-group.password"),
        authForm = document.querySelector(".auth__form");

    const loginRe = /^[a-zA-Zа-яА-Я]+$/;
    const passwordRe = /^[a-z0-9]+$/;

    const validateLogin = (login) => {
        const loginIsValid = loginRe.test(String(login).toLowerCase());

        if (!loginIsValid) {
            loginField.classList.add("invalid-field");
        } else {
            loginField.classList.remove("invalid-field");
        }

        return loginIsValid;
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

        const loginIsValid = validateLogin(formData.get("login"));
        const passwordIsValid = validatePassword(formData.get("password"));

        if (loginIsValid && passwordIsValid) {
            history.pushState({}, "", "./pages/control-panel.html");
            location.reload()

            //.............Other
        }
    });
});
