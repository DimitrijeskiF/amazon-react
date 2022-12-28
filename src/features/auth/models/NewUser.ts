import {RegistrationFormField} from "./RegistrationFormField.interface";

export type NewUser = Omit<RegistrationFormField, 'confirmPassword'>
