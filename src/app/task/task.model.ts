import {User} from "../user/user.model";

export class TaskResponse {
    constructor(public count?: number,
                public results?: Task[]) {

    }
}

export class Task {
    constructor(public id?: string,
                public description?: string,
                public user?: User,
                public is_open?: boolean) {

    }
}

export class TaskFilter {
    constructor(public page?: number,
                public per_page?: number,
                public user?: string) {

    }
}


