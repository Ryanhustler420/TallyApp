// BUDGET CONTROLLER
var budgetController = (function () {
  // write code here...

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };
  return {
    addItem: function (type, desc, val) {
      var newItem;
      // Create a new Id
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new Item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense (ID, desc, val);
      } else if (type === 'inc') {
        newItem = new Income (ID, desc, val);
      }

      //   Push ite into our data structure
      data.allItems[type].push (newItem);
      return newItem;
    },

    testing: function () {
      console.log (data);
    },
  };
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
    var newItem;

    // 1. Get the field input data
    const {type, description, value} = UICtrl.getInput ();

    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem (type, description, value);

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
