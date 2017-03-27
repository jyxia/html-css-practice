function calender(container) {
  var today = new Date();
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  var header = setTitle(today);
  var table = createDOM('table');
  var weekTr = createWeek(today);
  var days = createDays(today);

  table.appendChild(weekTr);
  table.appendChild(days);

  header.setAttribute('id', 'calender-header');
  container.appendChild(header);
  container.appendChild(table);

  function setTitle(current) {
    var header = createDOM('header');
    var titleSpan = createDOM('span');
    var title = createDOM('h3');
    title.innerHTML = months[current.getMonth()] + ' ' + current.getFullYear();
    titleSpan.className = 'calendar-title';
    titleSpan.appendChild(title);

    var leftBtn = createDOM('button');
    leftBtn.innerHTML = '<';
    leftBtn.addEventListener('click', function(current) {
      prev(today);
    }, false);

    var rightBtn = createDOM('button');
    rightBtn.innerHTML = '>';
    rightBtn.addEventListener('click', function(current) {
      next(today);
    }, false);

    header.appendChild(leftBtn);
    header.appendChild(titleSpan);
    header.appendChild(rightBtn);

    return header;
  }

  function setTable(current) {
    var table = createDOM('table');
    var weekTr = createWeek(current);
    var days = createDays(current);

    table.appendChild(weekTr);
    table.appendChild(days);
    return table;
  }

  function createWeek() {
    var tr = createDOM('tr');
    week.forEach(function(day) {
      var th = createDOM('th');
      th.innerHTML = day;
      tr.appendChild(th);
    });

    return tr;
  }

  function createDays(current) {
    var firstDate = new Date(current.getFullYear(), current.getMonth(), 1);
    var lastDate = new Date(current.getFullYear(), current.getMonth() + 1, 0);
    var firstDay = firstDate.getDay();
    var lastDay = lastDate.getDate();
    var frag = document.createDocumentFragment();
    var i, tr, td;

    for (i = 0; i < 35; i++) {
      if (i % 7 === 0) {
        tr = createDOM('tr');
      }
      td = createDOM('td');
      td.setAttribute('data-attr', i);
      if (i >= firstDay && i < lastDay + firstDay) {
        td.innerHTML = i - firstDay + 1;
      }
      tr.appendChild(td);
      if (i % 7 === 0) {
        frag.appendChild(tr);
      }
    }

    return frag;
  }

  function updateTitle(year, month) {
    var title = document.querySelector('.calendar-title h3');
    title.innerHTML = months[month] + ' ' + year;
  }

  function updateDays(firstDate, lastDate) {
    var firstDay = firstDate.getDay();
    var lastDay = lastDate.getDate();
    var days = document.querySelectorAll('td');

    days.forEach(function(td, index) {
      var dataAttr = td.getAttribute('data-attr');
      if (parseInt(dataAttr) < firstDay || parseInt(dataAttr) > lastDay - 1 + firstDay) {
        td.innerHTML = '';
      } else {
        td.innerHTML = parseInt(dataAttr) - firstDay + 1 ;
      }
    });

  };

  // prev month listener
  function prev(current) {
    var currMonth = current.getMonth();
    var currYear = current.getFullYear();

    var prevYear = currMonth > 0 ? currYear : currYear - 1;
    var prevMonth = currMonth > 0 ? currMonth - 1 : 11;
    updateTitle(prevYear, prevMonth);

    var firstDate = new Date(prevYear, prevMonth, 1);
    var lastDate = new Date(prevYear, currMonth, 0);
    // temp set today to be prev month's first day
    today = firstDate;

    updateDays(firstDate, lastDate);
  }

  function next(current) {
    var currMonth = current.getMonth();
    var currYear = current.getFullYear();

    var nextYear = currMonth < 11 ? currYear : currYear + 1;
    var nextMonth = currMonth < 11 ? currMonth + 1: 1;
    updateTitle(nextYear, nextMonth);

    var firstDate = new Date(nextYear, nextMonth, 1);
    var lastDate = new Date(nextYear, currMonth, 0);
    // temp set today to be prev month's first day
    today = firstDate;

    updateDays(firstDate, lastDate);
  }



  function createDOM(selector) {
    return document.createElement(selector);
  }
}
