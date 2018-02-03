/* global store, api, index */
'use strict';

const bookList = (function(){
  function generateItemElementCon(item) {

    let version = 1;
    let starItemVar = starItem(item,version);

    return `<li class = "li-mark"><div class ="container1">
      <div class ="container2">
      <span class ="title">${item.title}</span>
      ${starItemVar}
      <span class = "delete-button"><button class ="dltBtn" type="button">Delete Mark</button></span>
      </div>
  </div></li> `;

  }
  function generateItemElementExp(item){
    let verison = 2;
    let starItemVar = starItem(item, version);
    return `<div class ="expand-container1">
      <div class ="expand-container2">
      <span class ="title-expand">Book Title</span>
      <a class ="link-expand" href="">Link To Page</a>
      ${starItemVar}
      <span class = "add-bookmark-expand"><button type="button">Add Bookmark</button></span>
      <span class="description-heading">Description</span>
      <span class="description-expand">description</span>
      </div>
  </div>`;

  }
  function starItem(item, version){
    let starItem = '';
    if(version === 1)
      {
      if (item.rating === 1) {
        starItem  = '<span class="fa fa-star star checked"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span>';
      }
      else if (item.rating === 2){
        starItem  = '<span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span>';
      }
      else if (item.rating === 3)
      {
        starItem  = '<span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span>';
      }
      else if (item.rating === 4){
        starItem  = '<span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star"></span>';
      }
      else if (item.rating === 5) {
        starItem  = '<span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star checked"></span>';
      }
      else{
        starItem = '<span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span>';
      }
    }
    else if (version === 2)
      {
      if (item.rating === 1) {
        starItem  = '<span class="fa fa-star star-expand checked"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span>';
      }
      else if (item.rating === 2){
        starItem  = '<span class="fa fa-star star-expand checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span>';
      }
      else if (item.rating === 3)
      {
        starItem  = '<span class="fa fa-star star-expand checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span>';
      }
      else if (item.rating === 4){
        starItem  = '<span class="fa fa-star star-expand checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star"></span>';
      }
      else if(item.rating === 5) {
        starItem  = '<span class="fa fa-star star-expand checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star checked"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star checked"></span>';
      }
      else {
        starItem = '<span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span> <span class="fa fa-star star"></span>';
      }

    }
    return starItem;
  }
   
  function generateBookItemString(bookList){
    const items = bookList.map((item) => generateItemElementCon(item));
    console.log(items);
    return items.join(' ');
  }
  function render(){
    console.log('render ran');
    let items = store.items;
    const BookListItemsString = generateBookItemString(items);

    $('.ul-mark').append(BookListItemsString);
  }
  function handleNewItemSubmit(){
    $('.add-button').click(function(event){
      event.preventDefault();
      console.log('newItemSubmit ran!');
      const newItemTitle = $('.title-sub').val();
      const newItemURL = $('.link-sub').val();
      const newRating = $('.star-sub').val();
      const newDescription = $('.desc-sub').val();
      const curItem = item.create(newItemTitle,newItemURL,newDescription,newRating);
      console.log(curItem);
      $('description-sub').val('');
      $('.star-sub').val('');
      $('.link-sub').val('');
      $('.title-sub').val('');
      api.createItem(curItem, (newItem)=>
      {
        store.addItem(newItem);
        render();
      });
    });
  }

    function handleExpandItem(){
      $('.expandBtn').click(function(event){
        event.preventDefault();
        console.log('expand cicked');

      });

    }

    function handleDeleteItem(){
      $('ul').on('click','li',(event)=>{
        event.preventDefault();
       console.log('Delete Button clicked');

      });
    }

    function bindEventListeners(){
      handleNewItemSubmit();
      handleExpandItem();
      handleDeleteItem();
    }




  return {
    bindEventListeners,
    generateItemElementCon,
    generateItemElementExp,
    starItem,
    render

  };
}());