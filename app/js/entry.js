const angular = require('angular');
const youflixApp = angular.module('youflixApp', []);
const baseUrl = 'http://localhost:5555';

let handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

youflixApp.controller('CategoriesController', ['$http', function($http) {
  this.categories = [];

  // this.getCategory = () => {
  //   $http.get(baseUrl + '/api/categories/:category', this.newCategory)
  //     .then((res) => {
  //       this.categories = res.data;
  //     }, handleError.bind(this));
  // };

  this.createCategory = () => {
    $http.post(baseUrl + '/api/categories', this.newCategory)
      .then((res) => {
        this.categories.push(res.data);
        this.newCategory = null;
      }, handleError.bind(this));
  };

  this.editCategory = (category) => {
    category.editing = true;
    this.original = angular.copy(category);
  };

  this.cancelCategory = (category) => {
    category.editing = false;
    for (let key in this.original) {
      if (this.original.hasOwnProperty(key)) {
        category[key] = this.original[key];
      }
    }
  };

  this.updateCategory = (category) => {
    $http.put(baseUrl + '/api/categories', category._id)
      .then(() => {
        category.editing = false;
      }, handleError.bind(this));
  };

  this.removeCategory = (category) => {
    $http.delete(baseUrl + '/api/categories', category._id)
      .then(() => {
        this.categories.splice(this.categories.indexOf(category), 1);
      }, handleError.bind(this));
  };
}]);
