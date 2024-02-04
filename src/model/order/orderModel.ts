import UserModel from "../users/userModel";
import AddressModel from "./addressModel";
import type ProductModel from "./productModel";

export default class OrderModel {
    id: number;
    user: UserModel | undefined;
    address: AddressModel;
    products: ProductModel[];
    payment: { name: string };
    price: number;
    orderDate: string;
    orderStatus: string;
    nextStep: { 
        type: { 
            name: string, 
            color: string
        },
        name: string
    }[] | undefined;

    constructor(
        {
            id = 0,
            address = new AddressModel({}),
            products = [],
            payment = { name: '' },
            price = 0,
            orderDate = '',
            orderStatus = '',
            nextStep = undefined
        } : {
            id?: number,
            user?: UserModel,
            address?: AddressModel,
            products?: ProductModel[],
            payment?: { name: string },
            price?: number,
            orderDate?: string,
            orderStatus?: string,
            nextStep?: { 
                type: { 
                    name: string, 
                    color: string
                },
                name: string
            }[]
        }
    ) {
        this.id = id;

        this.address = address;
        this.products = products;
        this.payment = payment;
        this.price = price;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
        this.nextStep = nextStep;
    }
}