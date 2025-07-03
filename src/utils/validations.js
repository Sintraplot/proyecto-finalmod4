export function dataValidations({name, email, password, repeatPassword}) {

    if(name !== undefined) {
        if(name.length < 2 || !name) {
        alert("Name must have 2 characters or more.");
        // showToast
        return false;
        }
    };

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(email !== undefined) {
        if(!regexEmail.test(email)) {
        alert("Email must contain only letters, numbers, '.' '_' '%' '+' or '-' before '@', then a '.' and an extension of at least 2 letters.");
        // showToast
        return false;
        }
    };

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    if(password !== undefined) {
        if(!regexPassword.text(password)) {
        alert("Password must contain 8 min characters and 15 max characters, at least one uppercase, one lowercase, one digit and one special character.");
        //showToast
        return false;
        }
    };

    if(repeatPassword !== password) {
        alert("Repeat password must be the same as password")
        //showToast
        return false;
    };

    return true;
};
