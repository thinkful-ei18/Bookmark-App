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
    console.log('create ran');
    return {
      id: cuid(),
      title: title,
      url: link,
      desc: description,
      rating : rating
    };
  };

  return {
    validateBook,
    create
  };
}());
