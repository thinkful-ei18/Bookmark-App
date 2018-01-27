/* global cuid */

// eslint-disable-next-line no-unused-vars

'use strict';

const item = (function () {
  const validateBook = function (title, link, description) {
    if (!title || !link || !description) {
      throw new TypeError('All fields of book must be filled');
    }
  };
  const create = function(title, link, description, rating){
    return {
      id: cuid(),
      title,
      link,
      description,
      rating
    };
  };

  return {
    validateBook,
    create
  };
}());
