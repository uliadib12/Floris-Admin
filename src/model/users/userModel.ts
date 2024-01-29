export default class UserModel {
    id: number
    email: string
    createdAt: string
    banned: boolean

    constructor({
        id = 0,
        email = '',
        createdAt = '',
        banned = false
    } : {
        id?: number,
        email?: string,
        createdAt?: string,
        banned?: boolean
    }) {
        this.id = id;
        this.email = email;
        this.createdAt = createdAt;
        this.banned = banned;
    }

    static fromJson(json: any) : UserModel
    {
        return new UserModel({
            id: json.id,
            email: json.email,
            createdAt: json.createdAt,
            banned: json.banned
        });
    }
}