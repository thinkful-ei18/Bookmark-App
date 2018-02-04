/* global store, api, index */
'use strict';

const bookList = (function(){
  function generateItemElementCon(item) {

    let version = 1;
    let starItemVar = starItem(item,version);

    return `<li class = "li-mark" data-item-id="${item.id}"><div class ="container1">
      <div class ="container2">
      <span class ="title">${item.title}</span>
      ${starItemVar}
      <span class = "delete-button"><button class ="dltBtn" type="button">Delete Mark</button></span>
      <span class = "expand-button"><button class ="expBtn" type="button">Expand</button></span>
      </div>
  </div></li> `;

  }
  function generateItemElementExp(item){
    let version = 2;
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
    console.log(bookList);
    return items.join(' ');
  }
  // function generateBookItemStringExp(bookList, id){
    
  //   if (item.id === id){
  //   const item = bookList.map(item) => generateItemElementExp(item));
  //   }
  // }
  function render(){
    console.log('render ran');
    let items = store.items;
    const BookListItemsString = generateBookItemString(items);

    $('.ul-mark').html(BookListItemsString);
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
      $('description-sub').val('Description');
      $('.link-sub').val('Link To Page');
      $('.title-sub').val('Title');
      api.createItem(curItem, (newItem)=>
      {
        store.addItem(newItem);
        render();
      });
    });
  }

    function handleExpandItem(){
      $('ul').on('click','li .expBtn' ,function(event){
        event.preventDefault();
        console.log('expand clicked');
        const id = $(event.currentTarget).closest('.li-mark').data('item-id');

        api.getItems((item)=>{
          const result = item.filter(item => item.id === id); 
          const expandedVersion= generateItemElementExp(result);
          $(event.currentTarget).closest('.li-mark').html(expandedVersion);



        });

        

      });

    }

    function handleDeleteItem(){
      $('ul').on('click','li .dltBtn',(event)=>{
        event.preventDefault();
       const id = $(event.currentTarget).closest('.li-mark').data('item-id');
       console.log(id);
       api.deleteItem(id, ()=>{
        store.findAndDelete(id);
        render(); 
       });

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