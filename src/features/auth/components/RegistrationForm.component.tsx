import {FC, FormEvent, useEffect} from 'react';
import {Box, Grid, TextField, InputLabel, Typography, Button, Divider, CircularProgress} from "@mui/material";
import {Link, useNavigate} from 'react-router-dom'
import useInput from "../../../hooks/input/models/inputState.interface";
import {validateNameLength, validatePasswordLength} from "../../../shared/utils/validation/length";
import {validateEmail} from "../../../shared/utils/validation/email";
import {NewUser} from "../models/NewUser";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux/redux";
import {register, reset} from "../authSlice";

const boxStyles = {border: 1, padding: 2, borderColor: '#cccccc', width: '350px', marginTop: 2}
const inputLabelStyles = {fontWeight: 500, marginTop: 1, color: "#000000"}

const RegistrationFormComponent: FC = () => {
    const {
        text: name,
        shouldDisplayError: nameHasError,
        textChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        clearInputHandler: nameClearHandler
    } = useInput(validateNameLength);

    const {
        text: email,
        shouldDisplayError: emailHasError,
        textChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        clearInputHandler: emailClearHandler
    } = useInput(validateEmail)

    const {
        text: password,
        shouldDisplayError: passwordHasError,
        textChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        clearInputHandler: passwordClearHandler
    } = useInput(validatePasswordLength)

    const {
        text: passwordConfirm,
        shouldDisplayError: passwordConfirmHasError,
        textChangeHandler: passwordConfirmChangeHandler,
        inputBlurHandler: passwordConfirmBlurHandler,
        clearInputHandler: passwordConfirmClearHandler
    } = useInput(validatePasswordLength)

    const clearFormHandler = () => {
        nameClearHandler();
        emailClearHandler();
        passwordClearHandler();
        passwordConfirmClearHandler();
    }

    const dispatch = useAppDispatch();
    const {isLoading, isSuccess} = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess) {
            dispatch(reset())
            clearFormHandler();
            navigate('/signin');
        }
    },[isSuccess, dispatch])
    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== passwordConfirm) return;
        if (nameHasError || emailHasError || passwordHasError || passwordConfirmHasError) return;
        if (name.length === 0 || email.length === 0 || password.length === 0 || passwordConfirm.length === 0) return;

        const newUser: NewUser = {
            name, email, password
        }

        dispatch(register(newUser));
    }

    if(isLoading) return <CircularProgress sx={{marginTop: '64px', color: 'primary'}}/>

    // @ts-ignore
    return (<Box sx={boxStyles}>
        <form onSubmit={onSubmitHandler}>
            <Grid container direction='column' justifyContent='flex-start'>
                <Typography variant='h4' component='h1'>Create account</Typography>

                <InputLabel sx={inputLabelStyles} htmlFor='name'>Your Name</InputLabel>
                <TextField
                    value={name}
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    error={nameHasError}
                    helperText={nameHasError ? 'Enter Your Name' : ''}
                    type='text'
                    name='name'
                    id='name'
                    variant='outlined'
                    size='small'/>

                <InputLabel sx={inputLabelStyles} htmlFor='email'>Email</InputLabel>
                <TextField
                    value={email}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    error={emailHasError}
                    helperText={emailHasError ? 'Enter Correct Email' : ''}
                    type='text'
                    name='email'
                    id='email'
                    variant='outlined'
                    size='small'/>

                <InputLabel sx={inputLabelStyles} htmlFor='name'>Password</InputLabel>
                <TextField
                    value={password}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    error={passwordHasError || password !== passwordConfirm}
                    helperText={passwordHasError || password !== passwordConfirm ? 'Password is to short!' : ''}
                    type='password'
                    name='password'
                    id='password'
                    variant='outlined'
                    size='small'
                    placeholder='Minimum 6 characters required.'/>

                <InputLabel sx={inputLabelStyles} htmlFor='confirmPassword'>Re-enter Password</InputLabel>
                <TextField
                    value={passwordConfirm}
                    onChange={passwordConfirmChangeHandler}
                    onBlur={passwordConfirmBlurHandler}
                    error={passwordConfirmHasError || password !== passwordConfirm}
                    helperText={passwordConfirmHasError || password !== passwordConfirm ? 'Password is to short!' : ''}
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    variant='outlined'
                    size='small'/>

                <Button variant='contained' style={{
                    marginTop: '16px',
                    height: '31px',
                    backgroundColor: '#f0c14b',
                    color: 'black',
                    borderColor: '#a88734 #9c7e31 #846a29',
                    textTransform: 'none'
                }} type='submit'>Register</Button>
            </Grid>
        </form>
        <div style={{marginTop: '30p'}}>
            <small>By creating account, you agree to Amazon's</small>
        </div>
        <div>
            <small>
                <a href="#" style={{textDecoration: 'none'}}>{' '}Conditions of use</a> {' '}
                <a href="#" style={{textDecoration: 'none'}}>Privacy Policy</a>
            </small>
        </div>

        <Divider sx={{marginTop: '36px', marginBottom: '36px'}}/>

        <div>
            <small>
                Already have am account? {' '}
                <Link to='/signin'
                      style={{
                          textDecoration: 'none',
                          color: '#0000ee',
                      }}>Sign In</Link>
            </small>
        </div>

        <div>
            <small>
                Buying for work?
                <a href="#" style={{textDecoration: 'none'}}>{' '}Create a free Business Account</a>
            </small>
        </div>
    </Box>)
}

export default RegistrationFormComponent