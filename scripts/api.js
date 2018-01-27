/* global store, api, index, bookList */
'use strict';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/[Mo-Bookmark]';
const api = (function(){

  function getItems(callback){
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
    console.log('get items ran');
}
  function createItem(itemData, callback){
  	const newItem = JSON.stringify({itemData});
  	$.ajax({
    url: `${BASE_URL}/bookmarks`,
    method: 'POST',
    contentType: 'application/json',
    data: newItem,
    success: callback
  });
}
  return {
		createItem,
		getItems

	};
}());