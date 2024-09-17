import createHttpError from 'http-errors';

const notFoundMiddleware = (req, res, next) => {
  next(createHttpError(404, 'Route not found'));
};

export default notFoundMiddleware;
