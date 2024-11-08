const ticketService = require('../services/ticketService');

test('create ticket and validate lines', () => {
    const ticket = ticketService.createTicket(3);
    expect(ticket.lines).toHaveLength(3);
});

test('check status of a ticket', () => {
    const ticket = ticketService.createTicket(3);
    const status = ticketService.checkTicketStatus(ticket.id);
    expect(status.results).toHaveLength(3);
    expect(ticketService.getTicketById(ticket.id).checked).toBe(true);
});

test('cannot amend a checked ticket', () => {
    const ticket = ticketService.createTicket(2);
    ticketService.checkTicketStatus(ticket.id);
    const amended = ticketService.amendTicket(ticket.id, 1);
    expect(amended).toBe(null);
});
