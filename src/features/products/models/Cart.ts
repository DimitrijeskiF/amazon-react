import {ProductDocument} from "./Product";

export interface CartItem extends ProductDocument {
    qty: number;
}

export type Cart = CartItem[];

