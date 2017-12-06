

    // Validar formulário de login
    let emailInput = document.querySelector("#inputEmail");
    let pwInput    = document.querySelector("#inputPassword");

    emailInput.addEventListener("invalid", function () {
        this.setCustomValidity("Preencha com um email válido!");
    }, false);
    pwInput.addEventListener("invalid", function () {
        this.setCustomValidity("Preencha uma senha!");
    }, false);