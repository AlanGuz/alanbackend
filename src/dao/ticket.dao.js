import TicketModel from "../models/ticket.model.js";

export default class TicketDAO {

    async create(ticket) {
        return await TicketModel.create(ticket);
    }

}