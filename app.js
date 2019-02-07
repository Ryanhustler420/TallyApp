var budgetController = (function () {
  var x = 23;

  var add = function (a) {
    return x + a;
  };

  return {
    publicTest: function (b) {
      return (add (b));
    },
  };
}) ();

var UIController = (function () {
  // write code here...
}) ();

var controller = (function (budgetCtrl, UICtrl) {
  // write code here...
  var z = budgetCtrl.publicTest (23);

  return {
    getData: () => {
      console.log (z);
    },
  };
}) (budgetController, UIController);
