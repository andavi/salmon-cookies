'use strict';

// stores
var firstAndPike = {
  location: '1st and Pike',
  min: 23,
  max: 65,
  avgCookies: 6.3,
  customersPerHour: function() {
    return Math.random() * (this.max - this.min) + this.min;
  }
};
var seaTac = {
  location: 'SeaTac Airport',
  min: 3,
  max: 24,
  avgCookies: 1.2,
  customersPerHour: function() {
    return Math.random() * (this.max - this.min) + this.min;
  }
};
var seattleCenter = {
  location: 'Seattle Center',
  min: 11,
  max: 38,
  avgCookies: 3.7,
  customersPerHour: function() {
    return Math.random() * (this.max - this.min) + this.min;
  }
};
var capitolHill = {
  location: 'Capitol Hill',
  min: 20,
  max: 38,
  avgCookies: 2.3,
  customersPerHour: function() {
    return Math.random() * (this.max - this.min) + this.min;
  }
};
var alki = {
  location: 'Alki',
  min: 2,
  max: 16,
  avgCookies: 4.6,
  customersPerHour: function() {
    return Math.random() * (this.max - this.min) + this.min;
  }
};

var stores = [firstAndPike, seaTac, seattleCenter, capitolHill, alki];


// generate cookies/hour arrays and totals
var generateCookiesPerHour = store => {
  var cookiesPerHour = [];
  for (let i = 0; i < 15; i++) {
    cookiesPerHour.push(Math.round(store.customersPerHour()));
  }
  cookiesPerHour.push(cookiesPerHour.reduce((a, b) => a + b));
  return cookiesPerHour;
};

stores.forEach(store => store.cookiesPerHour = generateCookiesPerHour(store));


// generate time strings array
var times = [];
for (let i = 6; i < 12; i++) {
  times.push(i + 'am: ');
}
times.push('12pm: ');
for (let i = 1; i < 9; i++) {
  times.push(i + 'pm: ');
}
times.push('Total: ');


// generate html and append
var data = document.getElementById('data');

stores.forEach(store => {
  var div = document.createElement('div');
  var h3 = document.createElement('h3');
  h3.textContent = store.location;

  var ul = document.createElement('ul');
  store.cookiesPerHour.forEach((n, i) => {
    var li = document.createElement('li');
    li.textContent = times[i] + n + ' cookies';
    ul.appendChild(li);
  });

  div.appendChild(h3);
  div.appendChild(ul);
  data.appendChild(div);
});
