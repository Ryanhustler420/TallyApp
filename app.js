// BUDGET CONTROLLER
var budgetController = (function () {
  // write code here...
}) ();

// UI CONTROLLER
var UIController = (function () {
  // write code here...

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector (DOMstrings.inputType).value, // will be either 'inc' || 'exp'
        description: document.querySelector (DOMstrings.inputDescription).value,
        value: document.querySelector (DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
}) ();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  // write code here...

  var setupEventListener = function () {
    var DOM = UICtrl.getDOMstrings ();
    document
      .querySelector (DOM.inputBtn)
      .addEventListener ('click', ctrlAddItem);

    document.addEventListener ('keypress', function (e) {
      if (e.key === 'Enter' && e.keyCode === 13) {
        ctrlAddItem ();
      }
    });
  };

  var ctrlAddItem = function () {
    // TODO LIST
    // 1. Get the field input data
    var input = UICtrl.getInput ();

    // 2. Add the item to the budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };

  return {
    init: function () {
      console.log ('Application has started');
      setupEventListener ();
    },
  };
}) (budgetController, UIController);

controller.init ();
