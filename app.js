require('dotenv').config();
const express = require('express');
const swaggerDocs = require('./swaggerDocs'); 
const swaggerUi = require('swagger-ui-express');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.json({ message: "The server is healthy" });
});

app.use('/api', ticketRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
