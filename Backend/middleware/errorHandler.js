const errorHandler = (err, req, res, next) => {
  console.error(err, "err di handler");

  let statusCode = 500;

  let message = "Internal Server Error";

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = "Email Address already exist";
      break;
    case "SequelizeValidationError":
      statusCode = 400;
      message = err.errors[0].message;
      break;
    case "AmountRequired":
      statusCode = 400;
      message = "Amount Required";
      break;
    case "OrderIdRequired":
      statusCode = 400;
      message = "Order Id Required";
      break;
    case "TransactionIdRequired":
      statusCode = 400;
      message = "Transaction Id Required";
      break;
    case "QuantityMinimum":
      statusCode = 400;
      message = "Fruit Quantity Minimum is 100 g";
      break;
    case "InvalidEmailOrPassword":
      statusCode = 401;
      message = "Email/Password are Invalid";
      break;
    case "InvalidToken":
      statusCode = 401;
      message = "Invalid Token!";
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      message = "Invalid Token!";
      break;
    case "Unauthorized":
      statusCode = 403;
      message = "Unauthorized Error!";
      break;
    case "ErrorNotFound":
      statusCode = 404;
      message = "Error Not Found";
      break;
    case "TransactionNotFound":
      statusCode = 404;
      message = "Transaction Not Found";
      break;
    default:
      statusCode = 500;
      message = "Internal Server Error";
  }

  return res.status(statusCode).json({ message });
};

module.exports = errorHandler;
