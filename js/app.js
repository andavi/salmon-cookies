'use strict';

// store constructor
class Store {
  constructor(location, min, max, avgCookies) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.avgCookies = avgCookies;
    this.customersPerHour = () => Math.random() * (this.max - this.min) + this.min;
  }
}

// stores
var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

var stores = [firstAndPike, seaTac, seattleCenter, capitolHill, alki];


// generate cookies/hour arrays and totals
var generateCookiesPerHour = store => {
  var cookiesPerHour = [];
  for (let i = 0; i < 15; i++) {
    cookiesPerHour.push(Math.round(store.customersPerHour() * store.avgCookies));
  }
  cookiesPerHour.push(cookiesPerHour.reduce((a, b) => a + b));
  return cookiesPerHour;
};

stores.forEach(store => store.cookiesPerHour = generateCookiesPerHour(store));


// generate time strings array
var generateTimes = () => {
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
Store.prototype.times = generateTimes();


// generate html and append
var data = document.getElementById('data');

stores.forEach(store => {
  var div = document.createElement('div');
  var h3 = document.createElement('h3');
  h3.textContent = store.location;

  var ul = document.createElement('ul');
  store.cookiesPerHour.forEach((n, i) => {
    var li = document.createElement('li');
    li.textContent = store.times[i] + n + ' cookies';
    ul.appendChild(li);
  });

  div.appendChild(h3);
  div.appendChild(ul);
  data.appendChild(div);
});
