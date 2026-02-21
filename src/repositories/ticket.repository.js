import TicketDAO from "../dao/ticket.dao.js";

export default class TicketRepository {

    constructor() {
        this.dao = new TicketDAO();
    }

    create(ticket) {
        return this.dao.create(ticket);
    }
}