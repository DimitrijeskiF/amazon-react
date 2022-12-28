export interface Product {
    name: string;
    price: number;
    desc?:string;
}

export interface ProductDocument extends Product {
    _id: string;
    __v: number;
}