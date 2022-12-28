import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from "@mui/material";
import {ProductDocument} from "../models/Product";
import {FC} from "react";
import {useDispatch} from "react-redux";
import {decrementProduct, incrementProduct} from "../productSlice";
import {useAppSelector} from "../../../hooks/redux/redux";

interface ProductComponentProps {
    product: ProductDocument
}

const ProductComponent: FC<ProductComponentProps> = ({product}) => {

    const dispatch = useDispatch();
    const { cart } = useAppSelector(state => state.product);
    let qty = 0;
    const cartItem = cart.find((item) => item._id === product._id);

    if(cartItem) {
        qty = cartItem.qty;
    }


    return (
        <Card sx={{width: 300, minWidth: 300}}>
            <CardMedia component='img' height='140' image='https://via.placeholder.com/300.png/09f/fff'
                       alt='img'></CardMedia>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    $ {product.price}
                </Typography>
                {product.desc && <Typography variant='body2' color='text.secondary'>
                    {product.desc}
                </Typography>}
            </CardContent>

            <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={() => {
                    dispatch(decrementProduct(product))
                }} disabled={qty === 0} size='large'>
                    -
                </Button>
                <span>{qty}</span>
                <Button onClick={() => {
                    dispatch(incrementProduct(product))
                }} size='large'>
                    +
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductComponent