
require('dotenv').config();
const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const { schedulePromotionalEmails } = require('./services/emailService');
const bodyParser = require('body-parser');
const { sequelize, mongoConnection } = require('./config/database');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { initializeSocket } = require('./services/socketService');
const logger = require('./utils/logger');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/admin', adminRoutes);

app.use(bodyParser.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

const server = app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    await mongoConnection;
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

initializeSocket(server);
