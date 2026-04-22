
const ERROR_MESSAGES = {
  invalidPasswordLength: "The password must have at least 8 characters.",
  missingSpecialChar: "The password must contain at least one special character.",
  missingNumber: "The password must contain at least one number.",
  missingUppercaseLetter: "The password must contain at least one uppercase letter.",
  missingLowercaseLetter: "The password must contain at least one lowercase letter.",
  passwordMismatch: "The passwords do not match.",
};

const VALIDATION_CRITERIA = [
  { regEx: /.{8,}/, errorMessage: ERROR_MESSAGES.invalidPasswordLength },
  { regEx: /[^a-zA-Z0-9]/, errorMessage: ERROR_MESSAGES.missingSpecialChar },
  { regEx: /\d/, errorMessage: ERROR_MESSAGES.missingNumber },
  { regEx: /[A-Z]/, errorMessage: ERROR_MESSAGES.missingUppercaseLetter },
  { regEx: /[a-z]/, errorMessage: ERROR_MESSAGES.missingLowercaseLetter }]

const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

export function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0)
  );
}

export function validatePassword(password) {
  if (!PW_REGEX.test(password)) {
    const errors = [];
    VALIDATION_CRITERIA.forEach(criteria => { if (!criteria.regEx.test(password)) { errors.push(criteria.errorMessage) } })
    throw new Error(errors.join(" "));
  }
}

export function repeatPasswordCheck(password, repeatedPassword) {
  if (password !== repeatedPassword) {
    throw new Error(
      ERROR_MESSAGES.passwordMismatch
    );
  }
}
