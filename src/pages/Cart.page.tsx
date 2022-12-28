import HeaderComponent from "../features/products/components/Header.component";
import React from "react";
import ProductComponent from "../features/products/components/Product.component";
import {useAppSelector} from "../hooks/redux/redux";
import PaymentGetWay from "../features/products/components/Payment.component";

const CartPage = () => {
    const {cart, products} = useAppSelector((state) => state.product);
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
       <div>
           <HeaderComponent></HeaderComponent>
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

           <div style={{width:'80%', margin:'auto'}}>
               <hr style={{marginTop: '16px'}}/>
               <div style={{display: 'flex', justifyContent:'flex-end', fontSize:'20px'}}>
                   <span style={{marginRight: '16px'}}>Subtotal ({totalQty})</span>
                   <span style={{marginBottom: '48px', fontWeight: 500}}>${totalPrice.toFixed(2)}</span>
               </div>

               {totalQty > 0 && <PaymentGetWay/>}
           </div>
       </div>
    )
}

export default  CartPage