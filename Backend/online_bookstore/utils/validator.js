
const { check, validationResult } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'createCustomer': {
      return [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Valid email is required'),
        check('phone').notEmpty().withMessage('Phone is required'),
      ];
    }
    case 'createOrder': {
      return [
        check('customerId').notEmpty().withMessage('Customer ID is required'),
        check('items').isArray().withMessage('Items should be an array'),
      ];
    }
  }
};

exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
