/* global item, api, index */

// eslint-disable-next-line no-unused-vars

'use strict';

const store = (function () {
    const addItem = function (item) {
        this.items.push(item);
    };
    function findByRating(rating) {
        return this.items.find(item => item.rating === rating);
    };

    const findById = function (id) {
        return this.items.find(item => item.id === id);
    };

    function findAndDelete(id) {
        this.items = this.items.filter(item => item.id !== id);
    };

    return {
        items: [],

        addItem,
        findById,
        addItem,
        findAndDelete,
    }
}());