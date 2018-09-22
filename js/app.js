'use strict';

// stores
var firstAndPike = {
  min: 23,
  max: 65,
  avgCookies: 6.3,
  customersPerHour: function() {
    return Math.random() * (this.max - this.min) + this.min;
  }
};
var seaTac = {
  min: 3,
  max: 24,
  avgCookies: 1.2,
  customersPerHour: function() {
    return Math.random() * (this.max - this.min) + this.min;
  }
};
var seattleCenter = {
  min: 11,
  max: 38,
  avgCookies: 3.7,
  customersPerHour: function() {
    return Math.random() * (this.max - this.min) + this.min;
  }
};
var capitolHill = {
  min: 20,
  max: 38,
  avgCookies: 2.3,
  customersPerHour: function() {
    return Math.random() * (this.max - this.min) + this.min;
  }
};
var alki = {
  min: 2,
  max: 16,
  avgCookies: 4.6,
  customersPerHour: function() {
    return Math.random() * (this.max - this.min) + this.min;
  }
};

var stores = [firstAndPike, seaTac, seattleCenter, capitolHill, alki];

// generate cookies per hour arrays and totals
var generateCookiesPerHour = store => {
  var cookiesPerHour = [];
  for (var i = 0; i < 15; i++) {
    cookiesPerHour.push(Math.floor(store.customersPerHour()));
  }
  cookiesPerHour.push(cookiesPerHour.reduce((a, b) => a + b));
  return cookiesPerHour;
};

stores.forEach(store => store.cookiesPerHour = generateCookiesPerHour(store));

console.log(firstAndPike);
