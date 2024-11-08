const { v4: uuidv4 } = require('uuid');

let tickets = {};

// Utility function to generate a random line
const generateLine = () => [
  Math.floor(Math.random() * 3),
  Math.floor(Math.random() * 3),
  Math.floor(Math.random() * 3),
];

// Function to calculate line result
const calculateResult = (line) => {
  const [a, b, c] = line;
  const sum = a + b + c;
  if (sum === 2) return 10;
  if (a === b && b === c) return 5;
  if (a !== b && a !== c) return 1;
  return 0;
};

// Create a ticket
const createTicket = (req, res) => {
  const { n } = req.body;
  const ticketId = uuidv4();
  const lines = Array.from({ length: n }, generateLine);
  tickets[ticketId] = { lines, checked: false };
  res.status(201).json({ ticketId, lines });
};

// Get all tickets
const getTickets = (req, res) => {
  res.json(Object.keys(tickets).map(id => ({ id, checked: tickets[id].checked })));
};

// Get specific ticket
const getTicket = (req, res) => {
  const ticket = tickets[req.params.id];
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  res.json(ticket);
};

// Amend a ticket
const amendTicket = (req, res) => {
  const ticket = tickets[req.params.id];
  const { n } = req.body;
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  if (ticket.checked) return res.status(400).json({ error: 'Ticket cannot be amended' });

  const newLines = Array.from({ length: n }, generateLine);
  ticket.lines.push(...newLines);
  res.json({ ticketId: req.params.id, newLines });
};

// Check status of a ticket
const checkStatus = (req, res) => {
  const ticket = tickets[req.params.id];
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

  if (!ticket.checked) {
    // Calculate results and lock the ticket
    ticket.results = ticket.lines.map(line => ({ line, result: calculateResult(line) }));
    ticket.results.sort((a, b) => b.result - a.result);
    ticket.checked = true;
  }
  res.json(ticket.results);
};

module.exports = { createTicket, getTickets, getTicket, amendTicket, checkStatus };
