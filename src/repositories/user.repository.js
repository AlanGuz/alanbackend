import UserDAO from "../dao/user.dao.js";

export default class UserRepository {

    constructor() {
        this.dao = new UserDAO();
    }

    getByEmail(email) {
        return this.dao.getByEmail(email);
    }

    getById(id) {
        return this.dao.getById(id);
    }

    create(user) {
        return this.dao.create(user);
    }

    updatePassword(id, password) {
        return this.dao.updatePassword(id, password);
    }
}