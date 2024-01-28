export default class ProductModel {
    name: string;
    variant: string;
    quantity: number;
    additionalInfo: string;
    price: number;

    constructor({
        name = '',
        variant = '',
        quantity = 0,
        additionalInfo = '',
        price = 0
    } : {
        name?: string,
        variant?: string,
        quantity?: number,
        additionalInfo?: string,
        price?: number
    }) {
        this.name = name;
        this.variant = variant;
        this.quantity = quantity;
        this.additionalInfo = additionalInfo;
        this.price = price;
    }
}