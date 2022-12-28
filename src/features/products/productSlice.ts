import {ProductDocument} from "./models/Product";
import {Cart} from "./models/Cart";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import productService from "./services/product.service";

export {};


interface AsyncState {
    isLoading: boolean,
    isSuccess: boolean;
    isError: boolean;
}

interface ProductState extends AsyncState {
    products: ProductDocument[];
    cart: Cart;
}

const initialState: ProductState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    products: [],
    cart: []
}

const modifyQtyByOne = (cart: Cart, selectedProduct: ProductDocument, modifierType: 'INCREMENT' | 'DECREMENT') => {
    const previousCart = [...cart];
    const productInCart = previousCart.find(product => product._id === selectedProduct._id);
    let newCart = [];
    if (!productInCart) {
        previousCart.push({...selectedProduct, qty: 1});
        newCart = previousCart;
    } else {
        const filteredCart = previousCart.filter(product => product._id !== productInCart._id);
        const modification = modifierType === 'INCREMENT' ? 1 : -1;
        productInCart.qty = productInCart.qty + modification;
        productInCart.qty === 0 ? newCart = [...filteredCart] : newCart = [...filteredCart, productInCart]
    }

    return newCart;
}

export const getProducts = createAsyncThunk('product', async () => {
    try {
        const data = await productService.getProducts()
        console.log(data);
        return data;
    } catch (error) {
        console.log('ERROR', error)
    }
});


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        incrementProduct: (state, action: PayloadAction<ProductDocument>) => {
            const modifiedCart = modifyQtyByOne(state.cart, action.payload, 'INCREMENT');
            state.cart = modifiedCart;
        },
        decrementProduct: (state, action: PayloadAction<ProductDocument>) => {
            const modifiedCart = modifyQtyByOne(state.cart, action.payload, 'DECREMENT');
            state.cart = modifiedCart;
        },
        resetCart: (state) => {
            state.cart = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload?.data || []
            })
            .addCase(getProducts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.products = [];
            })
    }
});

export const {incrementProduct, decrementProduct, resetCart} = productSlice.actions;

export default productSlice.reducer;

