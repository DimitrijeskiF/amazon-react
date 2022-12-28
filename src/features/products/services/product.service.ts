import axios from "axios";
import {ProductDocument} from "../models/Product";

const getProducts = async () => {
    return await axios.get<ProductDocument[]>(`http://localhost:3001/api/product`);
};

const productService = {
    getProducts
}

export default productService