/* global store, api, index, bookList */
'use strict';

$(document).ready(function() {
    bookList.bindEventListeners();
    bookList.render();
  
    api.getItems((items) => {
      items.forEach((item) => store.addItem(item));
      bookList.render();
    });
  });