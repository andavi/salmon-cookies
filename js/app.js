'use strict';

// store class
class Store {
  constructor(location, min, max, avgCookies) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.avgCookies = avgCookies;
  }

  get dataDiv() {
    return document.getElementById('data');
  }

  get customersPerHour() {
    return Math.random() * (this.max - this.min + 1) + this.min;
  }

  generateCookiesPerHour() {
    this.cookiesPerHour = [];
    for (let i = 0; i < 15; i++) {
      this.cookiesPerHour.push(Math.round(this.customersPerHour * this.avgCookies));
    }
    this.cookiesPerHour.push(this.cookiesPerHour.reduce((a, b) => a + b));
  }

  generateTimeStrings(start, hours) {
    var timeStrings = [];
    for (let i = start; i < start + hours; i++) {
      const str = i % 24 < 12 ? 'am' : 'pm';
      timeStrings.push((i % 12 || '12') + ':00' + str);
    }
    timeStrings.push('Daily Location Total');
    return timeStrings;
  }

  renderUL() {
    var div = document.createElement('div');
    var h3 = document.createElement('h3');
    h3.textContent = this.location;

    var ul = document.createElement('ul');
    this.cookiesPerHour.forEach((n, i) => {
      var li = document.createElement('li');
      li.textContent = this.timeStrings[i] + n + ' cookies';
      ul.appendChild(li);
    });

    div.appendChild(h3);
    div.appendChild(ul);
    this.dataDiv.appendChild(div);
  }
}


// create stores
var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

var stores = [firstAndPike, seaTac, seattleCenter, capitolHill, alki];


// generate cookies per hour arrays and totals
stores.forEach(store => store.generateCookiesPerHour());

// generate time strings array
Store.prototype.timeStrings = Store.prototype.generateTimeStrings(6, 15);


// generate unordered list html and append
// stores.forEach(store => store.renderUL());


// ================================================================
// TABLE
// ================================================================

// generate totals array
var generateTotals = stores => {
  var totals = [];
  for (let i = 0; i < Store.prototype.timeStrings.length; i++) {
    totals[i] = stores.reduce((a, store) => {
      return a + store.cookiesPerHour[i];
    }, 0);
  }
  return totals;
};
var totals = generateTotals(stores);


// genereate table html and append
Store.prototype.renderTable = function() {
  Store.prototype.table = document.createElement('table');

  // top row - times
  var trTimes = document.createElement('tr');
  trTimes.appendChild(document.createElement('th'));
  Store.prototype.timeStrings.forEach(timeStr => {
    var th = document.createElement('th');
    th.textContent = timeStr;
    trTimes.appendChild(th);
  });
  this.table.appendChild(trTimes);

  // middle rows - cookies per hour
  stores.forEach(store => this.appendRow(store.location, store.cookiesPerHour));

  // bottom row - totals
  this.appendRow('Totals', totals);

  // final append
  Store.prototype.dataDiv.appendChild(this.table);
};

// create row with array and append to table
Store.prototype.appendRow = function(name, arr) {
  var tr = document.createElement('tr');
  var th = document.createElement('th');
  th.textContent = name;
  tr.appendChild(th);
  arr.forEach(n => {
    var td = document.createElement('td');
    td.textContent = n;
    tr.appendChild(td);
  });
  this.table.appendChild(tr);
};

// invoke
Store.prototype.renderTable();


// ================================================================
// FORM
// ================================================================

Store.prototype.submitHandler = function(event) {
  event.preventDefault();
  event.stopPropagation();

  // collect inputs
  var location = event.target.location.value;
  var min = parseInt(event.target.min.value);
  var max = parseInt(event.target.max.value);
  var avg = parseFloat(event.target.avg.value);

  // create store and calculate new totals
  var newStore = new Store(location, min, max, avg);
  newStore.generateCookiesPerHour();
  stores.push(newStore);
  totals = generateTotals(stores);

  // remove last table row
  newStore.table.lastChild.remove();

  // append store and new totals
  newStore.appendRow(newStore.location, newStore.cookiesPerHour);
  newStore .appendRow('Totals', totals);
};

var form = document.getElementById('add-store');

form.addEventListener('submit', Store.prototype.submitHandler);
