const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Customer = require('../models/customer');
const Book = require('../models/book');
const { emitOrderPlaced } = require('../services/socketService');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, include: [Book] }]
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { customerId, items } = req.body;
    const order = await Order.create({ customerId, status: 'pending', totalAmount: 0 }, { transaction });

    let totalAmount = 0;
    for (const item of items) {
      const book = await Book.findById(item.bookId);
      const orderItem = await OrderItem.create({
        orderId: order.id,
        bookId: item.bookId,
        quantity: item.quantity,
        price: book.price * item.quantity
      }, { transaction });
      totalAmount += orderItem.price;
    }

    order.totalAmount = totalAmount;
    await order.save({ transaction });
    await transaction.commit();

    emitOrderPlaced(order);

    res.status(201).json(order);
  } catch (error) {
    await    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

exports.getOrdersByCustomerId = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { customerId: req.params.customerId },
      include: [{ model: OrderItem, include: [Book] }],
    });
    if (!orders) return res.status(404).json({ message: 'Orders not found' });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

