const ticketService = require('../services/ticketService');

// Create a new ticket
exports.createTicket = (req, res) => {
    const { lines } = req.body;
    const ticket = ticketService.createTicket(lines);
    res.status(201).json(ticket);
};

// Get all tickets
exports.getAllTickets = (req, res) => {
    const tickets = ticketService.getAllTickets();
    if (!tickets) return res.status(404).json({ message: 'Tickets not found' });
    res.json(tickets);
};

// Get a specific ticket by ID
exports.getTicketById = (req, res) => {
    const { id } = req.params;
    const ticket = ticketService.getTicketById(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
};

// Amend ticket lines
exports.amendTicket = (req, res) => {
    const { id } = req.params;
    const { lines } = req.body;
    const ticket = ticketService.amendTicket(id, lines);
    if (!ticket) return res.status(400).json({ message: 'Ticket cannot be amended' });
    res.json(ticket);
};

// Check the status of a ticket
exports.checkTicketStatus = (req, res) => {
    const { id } = req.params;
    const data = ticketService.checkTicketStatus(id);
    if (!data) return res.status(404).json({ error: 'Ticket not found' });
    if (data == "checked") return res.status(400).json({ message: 'Ticket already checked' });
    res.json(data);
};
