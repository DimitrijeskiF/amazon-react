import {FC, FormEvent, useEffect} from 'react';
import {Box, Grid, TextField, InputLabel, Typography, Button, Divider, CircularProgress} from "@mui/material";
import {Link, useNavigate} from 'react-router-dom'
import useInput from "../../../hooks/input/models/inputState.interface";
import {validateEmail} from "../../../shared/utils/validation/email";
import {validatePasswordLength} from "../../../shared/utils/validation/length";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux/redux";
import {login, reset} from "../authSlice";
import {LoginUser} from "../models/loginUser";

const boxStyles = {border: 1, padding: 2, borderColor: '#cccccc', width: '350px', marginTop: 2}
const inputLabelStyles = {fontWeight: 500, marginTop: 1, color: "#000000"}

const SignInFormComponent: FC = () => {

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


    const clearFormHandler = () => {
        emailClearHandler();
        passwordClearHandler();
    }

    const dispatch = useAppDispatch();

    const { isLoading, isSuccess, isAuthenticated } = useAppSelector(
        (state) => state.auth
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            clearFormHandler();
        }
    }, [isSuccess, dispatch]);

    useEffect(() => {
        if (!isAuthenticated) return;
        navigate('/');
    }, [isAuthenticated]);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailHasError || passwordHasError) return;

        if (email.length === 0 || password.length === 0) return;

        const loginUser: LoginUser = { email, password };

        dispatch(login(loginUser));
    };

    if (isLoading)
        return <CircularProgress sx={{ marginTop: '64px' }} color='primary' />;

    return (
        <>
            <Box sx={boxStyles}>
                <form onSubmit={onSubmitHandler}>
                    <Grid container direction='column' justifyContent='flex-start'>
                        <Typography variant='h4' component='h1'>Sign In</Typography>

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
                            error={passwordHasError}
                            type='password'
                            name='password'
                            id='password'
                            variant='outlined' size='small'
                            placeholder='Minimum 6 characters required.'/>

                        <Button
                            disabled={!validatePasswordLength(password) || !validateEmail(email)}
                            variant='contained'
                            style={{
                            marginTop: '16px',
                            height: '31px',
                            backgroundColor: '#f0c14b',
                            color: 'black',
                            borderColor: '#a88734 #9c7e31 #846a29',
                            textTransform: 'none'
                        }} type='submit'>Sign In</Button>
                    </Grid>
                </form>
                <div style={{marginTop: '30p'}}>
                    <small>By continuing, you agree to Amazon's</small>
                </div>
                <div>
                    <small>
                        <a href="#" style={{textDecoration: 'none'}}>{' '}Conditions of use</a> {' '}
                        <a href="#" style={{textDecoration: 'none'}}>Privacy Policy</a>
                    </small>
                </div>
            </Box>
            <div style={{marginTop: '16px'}}>
                <Divider>
                    <small style={{color: '#767676'}}>New to Amazon?</small>
                </Divider>

                <Link to='/register' style={{
                    textDecoration: 'none',
                    color: '#0000ee'
                }}>
                    <Button
                        variant='contained'
                        style={{
                        width: '100%',
                        marginTop: '12px',
                        height: '31px',
                        backgroundColor: '#f1f1f1',
                        color: 'black',
                        textTransform: 'none'
                    }} type='submit'>Register</Button>
                </Link>
            </div>
        </>)
}

export default SignInFormComponent