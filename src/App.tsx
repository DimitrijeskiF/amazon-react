import {ThemeProvider} from "@mui/material";
import {theme} from "./shared/utils/theme";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/Home.page";
import RegisterPage from "./pages/Register.page";
import SigninPage from "./pages/Signin.page";
import PrivateRoute from "./features/auth/components/PrivateRoute";
import CartPage from "./pages/Cart.page";

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Router>
            <Routes>
                <Route path='/' element={<PrivateRoute page={<HomePage />} />} />
                <Route path='/cart' element={<PrivateRoute page={<CartPage />} />} />

                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/signin' element={<SigninPage/>}/>
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
