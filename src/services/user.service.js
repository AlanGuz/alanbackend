import UserRepository from "../repositories/user.repository.js";

export default class UserService {

    constructor() {
        this.repository = new UserRepository();
    }

    async register(user) {
        return await this.repository.create(user);
    }

    async getUserByEmail(email) {
        return await this.repository.getByEmail(email);
    }

    async getUserById(id) {
        return await this.repository.getById(id);
    }

    async changePassword(id, password) {
        return await this.repository.updatePassword(id, password);
    }
}