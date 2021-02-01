import { ICartItem } from "../models/Cart";

export default function calculateCartTotal(items: ICartItem[])
    : { cartTotal: string, stripeTotal: number } {
    const total = items.reduce((acc, item) => acc += item.quantity * item.product.price, 0);
    // remove rounding errors
    const cartTotal = ((total * 100) / 100).toFixed(2);
    const stripeTotal = Number((total * 100).toFixed(2));
    return { cartTotal, stripeTotal };
}