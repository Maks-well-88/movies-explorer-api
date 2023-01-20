const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const NOT_FOUND_MESSAGE = 'The requested object was not found';
const NOT_FOUND_PAGE = 'This page does not exist';
const SERVER_ERROR_MESSAGE = 'Oops! Something went wrong...';
const AUTH_MESSAGE = 'Authorization required';
const ALREADY_EXISTS_MESSAGE = 'User with specified email already exists';
const NO_ACCESS_MESSAGE = 'Wrong email or password';

module.exports = {
  OK,
  NOT_FOUND,
  NOT_FOUND_MESSAGE,
  NOT_FOUND_PAGE,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
  UNAUTHORIZED,
  AUTH_MESSAGE,
  CREATED,
  CONFLICT,
  BAD_REQUEST,
  ALREADY_EXISTS_MESSAGE,
  NO_ACCESS_MESSAGE,
};
