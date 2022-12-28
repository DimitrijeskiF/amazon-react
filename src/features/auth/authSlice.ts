import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {DisplayUser} from "./models/displayUser";
import {Jwt} from "./models/jwt";
import {NewUser} from "./models/NewUser";
import authService from "./services/auth.service";
import {RootState} from "../../store";
import {LoginUser} from "./models/loginUser";

const storedUser: string | null = localStorage.getItem('user');
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem('jwt');
const jwt: Jwt | null = !!storedJwt ? JSON.parse(storedJwt) : null;


interface AsyncState {
    isLoading: boolean,
    isSuccess: boolean;
    isError: boolean;
}

interface AuthState extends AsyncState {
    user?: DisplayUser | null;
    jwt?: Jwt;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: user,
    jwt: jwt,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isAuthenticated: false
}

export const register = createAsyncThunk(
    '/auth/register',
    async (newUser: NewUser, thunkAPI) => {
        try {
            return await authService.registerUser(newUser);
        } catch (e) {
            return thunkAPI.rejectWithValue('Unable to register!')
        }
    }
);

export const login = createAsyncThunk(
    '/auth/login',
    async (loginUser: LoginUser, thunkAPI) => {
        try {
            const data = await authService.login(loginUser);
            console.log(data);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Unable to login!')
        }
    }
)

export const verifyJwt = createAsyncThunk(
    '/auth/verify-jwt',
    async (jwt: string, thunkAPI) => {
        try {
            return await authService.verifyJwt(jwt);
        } catch (e) {
            return thunkAPI.rejectWithValue('Unable to verify!')
        }
    }
)

export const logout = createAsyncThunk(
    '/auth/logout',
    async () => {
        await authService.logout();
    }
)
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.jwt = action.payload.jwt;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logout.pending, (state) => {
                state.user = null;
                state.jwt = null;
                state.isAuthenticated = false;
            })
            .addCase(verifyJwt.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyJwt.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isAuthenticated = action.payload;
            })
            .addCase(verifyJwt.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isAuthenticated = false;
            })
    }
})

export const {reset} = authSlice.actions;

export const selectedUser = (state: RootState) => {
    return state.auth
}
export default authSlice.reducer;

