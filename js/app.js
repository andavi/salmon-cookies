'use strict';

// store class
class Store {
  constructor(location, min, max, avgCookies) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.avgCookies = avgCookies;
    this.data = document.getElementById('data');
  }

  get customersPerHour() {
    return Math.random() * (this.max - this.min) + this.min;
  }

  generateCookiesPerHour() {
    this.cookiesPerHour = [];
    for (let i = 0; i < 15; i++) {
      this.cookiesPerHour.push(Math.round(this.customersPerHour * this.avgCookies));
    }
    this.cookiesPerHour.push(this.cookiesPerHour.reduce((a, b) => a + b));
  }

  get timeStrings() {
    var timeStrings = [];
    for (let i = 6; i < 12; i++) {
      timeStrings.push(i + 'am: ');
    }
    timeStrings.push('12pm: ');
    for (let i = 1; i < 9; i++) {
      timeStrings.push(i + 'pm: ');
    }
    timeStrings.push('Total: ');
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
    this.data.appendChild(div);
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
stores.forEach(store => store.generateCookiesPerHour());


// generate html and append
stores.forEach(store => store.renderUL());
