import {INPUT_ACTION_BLUR, INPUT_ACTION_CHANGE, INPUT_ACTION_CLEAR, InputActionType} from "./inputAction";
import {Action} from "../../../shared/model/action.interface";
import {ChangeEvent, useReducer} from "react";
import {initialInputState} from "../use-input";
import {ValidatorFn} from "../../../shared/utils/validation/models/ValidatorFn";

export interface InputState {
    text: string;
    hasBeenTouched: boolean;

}

const inputReducer = (state: InputState, action: Action<InputActionType>) => {
    const {type, value = ""} = action;
    switch (type) {
        case INPUT_ACTION_CHANGE:
            return {text: value, hasBeenTouched: state.hasBeenTouched}
        case INPUT_ACTION_BLUR:
            return {text: state.text, hasBeenTouched: true}
        case INPUT_ACTION_CLEAR:
            return {text: '', hasBeenTouched: false}
        default:
            return {...state}
    }
}

const useInput = (validationFn?: ValidatorFn) => {
    const [{text, hasBeenTouched}, dispatch] = useReducer(inputReducer, initialInputState);

    let shouldDisplayError;
    if(validationFn) {
        const isValid = validationFn(text);
        shouldDisplayError = !isValid && hasBeenTouched;
    }
    const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: INPUT_ACTION_CHANGE, value: e.target.value})
    }

    const inputBlurHandler = () => {
        dispatch({type: INPUT_ACTION_BLUR})
    }

    const clearInputHandler = () => {
        dispatch({type: INPUT_ACTION_CLEAR})
    }

    return {
        text,
        shouldDisplayError,
        textChangeHandler,
        inputBlurHandler,
        clearInputHandler
    }
}

export default useInput