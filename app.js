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
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector (DOMstrings.inputType).value, // will be either 'inc' || 'exp'
        description: document.querySelector (DOMstrings.inputDescription).value,
        value: parseFloat (
          document.querySelector (DOMstrings.inputValue).value
        ),
      };
    },
    addListItem: function (obj, type) {
      var html, newHtml, element;
      // Create STML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace (`%id%`, obj.id);
      newHtml = newHtml.replace (`%description%`, obj.description);
      newHtml = newHtml.replace (`%value%`, obj.value);

      // Insert the HTML into the DOM
      document
        .querySelector (element)
        .insertAdjacentHTML (`beforeend`, newHtml);
    },
    clearfields: function () {
      var fields, fieldsArray;
      fields = document.querySelectorAll (
        `${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`
      );
      console.log (fields);
      fieldsArray = Array.prototype.slice.call (fields);

      fieldsArray.forEach ((element, i, array) => {
        element.value = '';
      });

      fieldsArray[0].focus ();
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

  var updateBudget = function () {
    // 1. Calculate the budget
    // 2. return the budget
    // 3. Display the budget on the UI
  };

  var ctrlAddItem = function () {
    // TODO LIST
    var newItem;

    // 1. Get the field input data
    const {type, description, value} = UICtrl.getInput ();

    if (type && description && value && !isNaN (value) && value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem (type, description, value);

      // 3. Add the item to the UI
      UICtrl.addListItem (newItem, type);

      // 4. Clear the fields
      UICtrl.clearfields ();

      // 5. Calculate And Update Budget
      updateBudget ();
    }
  };

  return {
    init: function () {
      console.log ('Application has started');
      setupEventListener ();
    },
  };
}) (budgetController, UIController);

controller.init ();
