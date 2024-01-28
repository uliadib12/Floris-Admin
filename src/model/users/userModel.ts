export default class UserModel {
    id: number
    email: string
    createdDate: string
    banned: boolean

    constructor({
        id = 0,
        email = '',
        createdDate = '',
        banned = false
    } : {
        id?: number,
        email?: string,
        createdDate?: string,
        banned?: boolean
    }) {
        this.id = id;
        this.email = email;
        this.createdDate = createdDate;
        this.banned = banned;
    }

    static fromJson(json: any) : UserModel
    {
        return new UserModel({
            id: json.id,
            email: json.email,
            createdDate: json.createdDate,
            banned: json.banned
        });
    }
}