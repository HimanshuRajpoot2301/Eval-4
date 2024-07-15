const { Order, OrderItem } = require('../models/order');
const { createObjectCsvWriter } = require('csv-writer');

exports.exportOrdersToCSV = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [OrderItem],
    });

    const csvWriter = createObjectCsvWriter({
      path: 'orders.csv',
      header: [
        { id: 'id', title: 'Order ID' },
        { id: 'customerId', title: 'Customer ID' },
        { id: 'total', title: 'Total Amount' },
        // Add more fields as required
      ],
    });

    await csvWriter.writeRecords(orders);
    res.download('orders.csv');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.streamLogs = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const tail = require('child_process').spawn('tail', ['-f', 'combined.log']);

  tail.stdout.on('data', (data) => {
    res.write(data.toString());
  });

  req.on('close', () => {
    tail.kill();
  });
};
