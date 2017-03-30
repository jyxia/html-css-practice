(function() {
  var viewer = el('#input'),
    nums = el('.num'),
    ops = el('.ops'),
    currNum = '',
    oldNum = '',
    resultNum,
    operator;

  nums.forEach(function(num) {
    num.addEventListener('click', setNum, false);
  });

  ops.forEach(function(op) {
    op.addEventListener('click', operate, false);
  });

  function setNum() {
    if (resultNum) {
      currNum = this.getAttribute("data-num");
      resultNum = '';
    } else {
      if (currNum === '0') {
        currNum = this.getAttribute("data-num");
      } else {
        currNum += this.getAttribute("data-num");
      }
    }

    viewer.innerHTML = currNum;
  };

  function operate() {

  }

  function el(element) {
    if (element.charAt(0) === '#') {
      return document.querySelector(element);
    }

    return document.querySelectorAll(element);
  }

})();
