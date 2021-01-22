document.addEventListener("DOMContentLoaded", () => {
    const authBtn = document.querySelector(".auth-btn"),
        usernameField = document.querySelector(".form-group.username"),
        passwordField = document.querySelector(".form-group.password"),
        authForm = document.querySelector(".auth__form");

    const usernameRe = /^[a-zA-Z]+$/;
    const passwordRe = /^[a-z0-9]+$/;

    const validateUsername = (username) => {
        const usernameIsValid = usernameRe.test(String(username).toLowerCase());

        if (!usernameIsValid) {
            usernameField.classList.add("invalid-field");
        } else {
            usernameField.classList.remove("invalid-field");
        }

        return usernameIsValid;
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

        const usernameIsValid = validateUsername(formData.get("username"));
        const passwordIsValid = validatePassword(formData.get("password"));

        if (usernameIsValid && passwordIsValid) {
            history.pushState({}, "", "./pages/control-panel.html");
            location.reload()

            //.............Other
        }
    });
});
