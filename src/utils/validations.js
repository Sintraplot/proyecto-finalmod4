import { showToast } from "../utils/toastify.js";

export function dataValidations({ name, email, password, repeatPassword }) {
  if (name !== undefined) {
    if (name.length < 2 || !name) {
      showToast("Name must have 2 characters or more.", "warning");
      return false;
    }
  }

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email !== undefined) {
    if (!regexEmail.test(email)) {
      showToast(
        "Email must contain only letters, numbers, '.' '_' '%' '+' or '-' before '@', then a '.' and an extension of at least 2 letters.",
        "warning"
      );
      return false;
    }
  }

  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  if (password !== undefined) {
    if (!regexPassword.test(password)) {
      showToast(
        "Password must contain 8 min characters and 15 max characters, at least one uppercase, one lowercase, one digit and one special character.",
        "warning"
      );
      return false;
    }

    if (!repeatPassword) {
      showToast("Repeat password is required", "warning");
      return false;
    }

    if (repeatPassword !== password) {
      showToast("Repeat password must be the same as password", "warning");
      return false;
    }
  }

  return true;
}

//Validaciones Login
export function loginValidations(loginEmail, loginPassword) {
  if (!loginEmail) {
    showToast("login error: email is requeried", "error");
    return false;
  }

  if (!loginPassword) {
    showToast("login error: password is requeried", "error");
    return false;
  }

  return true;
}
