const { v4: uuidv4 } = require('uuid');

let tickets = {}; // In-memory storage

// Generate a line with 3 random numbers between 0 and 2
const generateLine = () => Array.from({ length: 3 }, () => Math.floor(Math.random() * 3));

// Calculate the result for a single line
const calculateLineResult = ([a, b, c]) => {
    if (a + b + c === 2) return 10;
    if (a === b && b === c) return 5;
    if (a !== b && a !== c) return 1;
    return 0;
};

// Create a ticket with `n` lines
exports.createTicket = (n) => {
    const lines = Array.from({ length: n }, generateLine);
    const ticketId = uuidv4();
    tickets[ticketId] = { lines, checked: false };
    return { id: ticketId, lines };
};

// Get all tickets
exports.getAllTickets = () => {
    const ticketIds = Object.keys(tickets);
    if (ticketIds.length === 0) return null;
    return ticketIds.map((id) => ({ id, ...tickets[id] }));
};

// Get a ticket by ID
exports.getTicketById = (id) => {
    return tickets[id] || null;
};

// Amend lines to an existing ticket if it hasn't been checked
exports.amendTicket = (id, n) => {
    if (!tickets[id] || tickets[id].checked) return null;
    
    // case 1 we can update the whole ticket lines
    tickets[id].lines = Array.from({ length: n }, generateLine);

    // case 2 we can add new lines to the existing ticket lines
    // const newLines = Array.from({ length: n }, generateLine);
    // tickets[id].lines.push(...newLines);
    
    return { id, ...tickets[id] };
};

// Check and return the status of a ticket, marking it as checked
exports.checkTicketStatus = (id) => {
    const ticket = tickets[id];
    if (!ticket) return null;
    else if(ticket.checked) return "checked";
    // const results = ticket.lines.map(calculateLineResult);
    ticket.results = ticket.lines.map(line => ({ line, result: calculateLineResult(line) }));
    ticket.results.sort((a, b) => b.result - a.result);
    ticket.checked = true;
    return ticket.results;
};
