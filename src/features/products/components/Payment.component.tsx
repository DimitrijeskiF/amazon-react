import {loadStripe} from "@stripe/stripe-js";
import {Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux/redux";
import {FormEvent, useEffect, useState} from "react";
import {resetCart} from "../productSlice";
import axios from "axios";

const PaymentComponent = () => {
    const {cart} = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setpaymentStatus] = useState('');

    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (totalQty === 0) return
        if (paymentStatus !== 'succeeded') return;

        dispatch(resetCart());
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (totalQty === 0) return;
        if (!stripe || !elements) return;

        const cardEl = elements.getElement(CardElement);
        setIsProcessing(true);
        try {
            const response = await axios.post('http://localhost:3001/api/stripe', {
                cart
            })

            const {client_secret: clientSecret} = response.data;
            const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardEl!
                }
            })

            if (!paymentIntent) {
                console.log('1')
                setpaymentStatus('Payment failed');
            } else  {
                setpaymentStatus(paymentIntent.status);
            }
        } catch (e) {
            console.error(e);
            setpaymentStatus('Payment failed');
        }

        setIsProcessing(false);
    }

    return <div style={{font: '20px'}}>
        <form onSubmit={handleSubmit} id='payment-id'>
            <label htmlFor="card-element">Place Order</label>
            <CardElement id='card-element'/>
            {!isProcessing && (
                <button style={{
                    marginTop: '16px',
                    height: '31px',
                    backgroundColor: '#f0c14b',
                    color: 'black',
                    display: 'flex',
                    fontWeight: 600,
                    fontSize: '20px',
                    padding: '24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '100%'
                }}>Pay</button>)}

            {isProcessing && <div> Processing... </div>}
            {!isProcessing && paymentStatus && <div>Status: {paymentStatus}</div>}

        </form>
    </div>
}


const PaymentGetWay = () => {
    const stripePromise = loadStripe('pk_test_51MJIF3EAeCruQpsY1Mav7pEbHJ23Reo28tp0pTqjeWuyRsbzpewDpLE0Eaho0k8A0ZnwBBinLaU24Elim3DWpJTY000jV8FrzB');

    return (
        <Elements stripe={stripePromise}>
            <PaymentComponent/>
        </Elements>
    )
}

export default PaymentGetWay;
