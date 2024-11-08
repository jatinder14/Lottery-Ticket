const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
require('../swaggerDocs');

router.post('/ticket', ticketController.createTicket);
router.get('/tickets', ticketController.getAllTickets);
router.get('/ticket/:id', ticketController.getTicketById);
router.put('/ticket/:id', ticketController.amendTicket);
router.put('/ticket/status/:id', ticketController.checkTicketStatus);

module.exports = router;
