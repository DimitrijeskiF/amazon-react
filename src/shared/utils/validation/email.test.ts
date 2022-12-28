import {validateEmail} from "./email";

describe('Email Validation', () => {
    let email = '';
    test('Empty input should not be valid', () => {
        expect(validateEmail(email)).toEqual(false);
    })

    test('it should have an @ symbol', () => {
        email = 'test@example.com'
        expect(email.includes('@')).toEqual(true);
    })

    test('it should have an . symbol', () => {
        email = 'test@example.com'
        expect(email.includes('.')).toEqual(true);
    })

    test('Email input should pass the validation', () => {
        expect(validateEmail(email)).toEqual(true);
    })
})