import { Validators } from "@angular/forms";
import { mobileRegex, emailRegex } from "./constants";

export const emailValidators = [
    Validators.required,
    Validators.pattern(emailRegex)
]

export const mobileValidators = [
    Validators.required,
    Validators.pattern(mobileRegex)
]