export class UserResponse {
    constructor(public count?: number,
                public results?: User[]) {

    }
}

export class User {
    constructor(public id?: string,
                public name?: string) {

    }
}

export class UserFilter {
    constructor(public page?: number,
                public per_page?: number,
                public name?: string) {

    }
}


