import {validateNameLength, validatePasswordLength} from "./length";

describe('Field length Validation', () => {
    describe('Name length validation', () => {
        let name = '';
        test('Name input should not be valid if it is empty', () => {
            expect(validateNameLength(name)).toEqual(false);
        })

        test('Name input should not be valid if it contains one character', () => {
            name = 'a'
            expect(validateNameLength(name)).toEqual(false);
        })

        test('Name input should valid if it contains at least two characters', () => {
            name = 'test'
            expect(validateNameLength(name)).toEqual(true);
        })
    })

    describe('Password length validation', () => {
        let password = '';
        test('Password input should not be valid if it is empty', () => {
            expect(validatePasswordLength(password)).toEqual(false);
        })

        test('Password input should not be valid if it contains less then 6 characters', () => {
            password = '1234'
            expect(validatePasswordLength(password)).toEqual(false);
        })

        test('Password input should valid if it contains at least 6 characters', () => {
            password = 'validPassword@123'
            expect(validatePasswordLength(password)).toEqual(true);
        })

        test('Password input should valid if it contains at no more than 20 characters', () => {
            password = '123456789123456789123'
            expect(validatePasswordLength(password)).toEqual(false);
        })
    })
})