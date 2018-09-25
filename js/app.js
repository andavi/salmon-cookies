'use strict';

// store constructor
class Store {
  constructor(location, min, max, avgCookies) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.avgCookies = avgCookies;
  }

  customersPerHour() {
    return Math.random() * (this.max - this.min) + this.min;
  }
}


// create stores
var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

var stores = [firstAndPike, seaTac, seattleCenter, capitolHill, alki];


// generate cookies/hour arrays and totals
Store.prototype.generateCookiesPerHour = function() {
  this.cookiesPerHour = [];
  for (let i = 0; i < 15; i++) {
    this.cookiesPerHour.push(Math.round(this.customersPerHour() * this.avgCookies));
  }
  this.cookiesPerHour.push(this.cookiesPerHour.reduce((a, b) => a + b));
};

stores.forEach(store => store.generateCookiesPerHour());


// generate time strings array
Store.prototype.generateTimes = () => {
  var times = [];
  for (let i = 6; i < 12; i++) {
    times.push(i + 'am: ');
  }
  times.push('12pm: ');
  for (let i = 1; i < 9; i++) {
    times.push(i + 'pm: ');
  }
  times.push('Total: ');
  return times;
};

Store.prototype.times = Store.prototype.generateTimes();


// generate unordered list html and append
Store.prototype.data = document.getElementById('data');

Store.prototype.renderUL = function() {
  var div = document.createElement('div');
  var h3 = document.createElement('h3');
  h3.textContent = this.location;

  var ul = document.createElement('ul');
  this.cookiesPerHour.forEach((n, i) => {
    var li = document.createElement('li');
    li.textContent = this.times[i] + n + ' cookies';
    ul.appendChild(li);
  });

  div.appendChild(h3);
  div.appendChild(ul);
  this.data.appendChild(div);
};

stores.forEach(store => store.renderUL());
