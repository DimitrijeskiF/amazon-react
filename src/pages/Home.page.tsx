import HeaderComponent from "../features/products/components/Header.component";
import {useAppSelector} from "../hooks/redux/redux";
import {useDispatch} from "react-redux";
import ProductComponent from "../features/products/components/Product.component";
import {useEffect} from "react";
import {getProducts} from "../features/products/productSlice";
import {AppDispatch} from "../store";

const HomePage = () => {
    const {cart, products} = useAppSelector((state) => state.product);
    const dispatch = useDispatch<AppDispatch>();
    useEffect( () => {
        dispatch(getProducts());
    }, []);


    return (
        <div>
            <HeaderComponent/>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '48px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '48px'
            }}>
                {products.length > 0 && products.map((product) =>
                    <ProductComponent product={product} key={product._id}/>)}
            </div>
        </div>
    )
}

export default HomePage;