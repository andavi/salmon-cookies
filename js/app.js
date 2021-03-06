'use strict';

// store class
class Store {
  constructor(location, min, max, avgCookies) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.avgCookies = avgCookies;
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

  static generateTimeStrings(start, hours) {
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
      li.textContent = Store.timeStrings[i] + n + ' cookies';
      ul.appendChild(li);
    });

    div.appendChild(h3);
    div.appendChild(ul);
    Store.dataDiv.appendChild(div);
  }
}


// create stores
var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

Store.stores = [firstAndPike, seaTac, seattleCenter, capitolHill, alki];

// generate cookies per hour arrays and totals
Store.stores.forEach(store => store.generateCookiesPerHour());

// generate time strings array
Store.timeStrings = Store.generateTimeStrings(6, 15);

// get data div
Store.dataDiv = document.getElementById('data');

// generate unordered list html and append
// Store.stores.forEach(store => store.renderUL());


// ================================================================
// TABLE
// ================================================================

// generate totals array
Store.generateTotals = stores => {
  var totals = [];
  for (let i = 0; i < Store.timeStrings.length; i++) {
    totals[i] = stores.reduce((a, store) => {
      return a + store.cookiesPerHour[i];
    }, 0);
  }
  return totals;
};
Store.totals = Store.generateTotals(Store.stores);


// genereate table html and append
Store.renderTable = function() {
  Store.table = document.createElement('table');

  // top row - times
  var trTimes = document.createElement('tr');
  trTimes.appendChild(document.createElement('th'));
  Store.timeStrings.forEach(timeStr => {
    var th = document.createElement('th');
    th.textContent = timeStr;
    trTimes.appendChild(th);
  });
  Store.table.appendChild(trTimes);

  // middle rows - cookies per hour
  Store.stores.forEach(store => Store.appendRow(store.location, store.cookiesPerHour));

  // bottom row - totals
  Store.appendRow('Totals', Store.totals);

  // final append
  Store.dataDiv.appendChild(Store.table);
};

// create row with array and append to table
Store.appendRow = function(name, arr) {
  var tr = document.createElement('tr');
  var th = document.createElement('th');
  th.textContent = name;
  tr.appendChild(th);
  arr.forEach(n => {
    var td = document.createElement('td');
    td.textContent = n;
    tr.appendChild(td);
  });
  Store.table.appendChild(tr);
};

// invoke
Store.renderTable();


// ================================================================
// FORM
// ================================================================

Store.submitHandler = function(event) {
  event.preventDefault();
  event.stopPropagation();

  // collect and convert inputs
  var location = event.target.location.value;
  var min = Number(event.target.min.value);
  var max = Number(event.target.max.value);
  var avg = Number(event.target.avg.value);

  // ensure location is not used already
  if (!Store.stores.map(store => store.location).includes(location)) {

    // create store and calculate new totals
    var newStore = new Store(location, min, max, avg);
    newStore.generateCookiesPerHour();
    Store.stores.push(newStore);
    Store.totals = Store.generateTotals(Store.stores);

    // remove last table row
    Store.table.lastChild.remove();

    // append store and new totals
    Store.appendRow(newStore.location, newStore.cookiesPerHour);
    Store.appendRow('Totals', Store.totals);
  }
};

Store.form = document.getElementById('add-store');

Store.form.addEventListener('submit', Store.submitHandler);
