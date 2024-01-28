export default class AddressModel {
    name: string;
    email: string;
    phone: string;
    address: string;
    day: string;
    time: string;

    constructor({
        name = '',
        email = '',
        phone = '',
        address = '',
        day = '',
        time = ''
    } : {
        name?: string,
        email?: string,
        phone?: string,
        address?: string,
        day?: string,
        time?: string
    }) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.day = day;
        this.time = time;
    }

    static fromJson(json: any) : AddressModel{
        return new AddressModel({
            name: json.name,
            email: json.email,
            phone: json.phone,
            address: json.address,
            day: json.day,
            time: json.time
        })
    }
}