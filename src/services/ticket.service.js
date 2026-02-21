import TicketRepository from "../repositories/ticket.repository.js";

export default class TicketService {

    constructor() {
        this.repository = new TicketRepository();
    }

    createTicket(ticket) {
        return this.repository.create(ticket);
    }
}