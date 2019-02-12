// BUDGET CONTROLLER
var budgetController = (function () {
  // write code here...

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calculatePercentages = function (totalIncome) {
    if (totalIncome > 0)
      this.percentage = Math.round (this.value / totalIncome * 100);
    else this.percentage = -1;
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach (cur => {
      sum += cur.value;
    });
    data.totals[type] = sum;
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
    budget: 0,
    percentage: -1,
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
    deleteItem: function (type, id) {
      var ids = data.allItems[type].map (cost => {
        return cost.id;
      });

      index = ids.indexOf (id);

      if (index !== -1) {
        data.allItems[type].splice (index, 1);
      }
    },
    calculateBudget: function () {
      // calculate total income and expenses
      calculateTotal ('exp');
      calculateTotal ('inc');

      // calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the % of income that we spent
      if (data.totals.inc > 0)
        data.percentage = Math.round (data.totals.exp / data.totals.inc * 100);
      else data.percentage = -1;
    },
    getBudget: function () {
      return {
        budget: data.budget,
        percentage: data.percentage,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
    calculatePercentages: function () {
      /**
       * a = 20
       * b = 10
       * c = 40
       * 
       * income = 100
       * 
       * a = 20/100 = 20%
       * b = 10/100 = 10%
       * c = 40/100 = 40%
       */

      data.allItems.exp.forEach (cur => {
        cur.calculatePercentages (data.totals.inc);
      });

      /**
       * {
       *  value : 20;
       *  percentage = -1
       * }
       *                    ( 20   / currentTotalInc * 100)
       *  this.percentage = (value / totalExp * 100)
       */
    },

    getPercentage: function () {
      var allPercentage = data.allItems.exp.map (cur => {
        return cur.getPercentage ();
      });

      return allPercentage;
      // [10%, 23%, 56%]
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
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container', // for event bubling
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
        html = `<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace (`%id%`, obj.id);
      newHtml = newHtml.replace (`%description%`, obj.description);
      newHtml = newHtml.replace (`%value%`, obj.value);
      //
      // Insert the HTML into the DOM
      document
        .querySelector (element)
        .insertAdjacentHTML (`beforeend`, newHtml);
    },
    deleteListItem: function (selectorId) {
      var el = document.getElementById (selectorId);
      el.parentNode.removeChild (el);
    },
    clearfields: function () {
      var fields, fieldsArray;
      fields = document.querySelectorAll (
        `${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`
      );
      // console.log (fields);
      fieldsArray = Array.prototype.slice.call (fields);

      fieldsArray.forEach ((element, i, array) => {
        element.value = '';
      });

      fieldsArray[0].focus ();
    },
    displayBudget: function (obj) {
      document.querySelector (DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector (DOMstrings.incomeLabel).textContent =
        obj.totalInc;
      document.querySelector (DOMstrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector (DOMstrings.percentageLabel).textContent =
          obj.percentage + '%';
      } else {
        document.querySelector (DOMstrings.percentageLabel).textContent = '---';
      }
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
    document
      .querySelector (DOM.container)
      .addEventListener ('click', ctrlDeleteItem);
  };

  var updateBudget = function () {
    var budget;

    // 1. Calculate the budget
    budgetCtrl.calculateBudget ();

    // 2. return the budget
    budget = budgetCtrl.getBudget ();

    // 3. Display the budget on the UI
    // console.log (budget);
    UICtrl.displayBudget (budget);
  };

  updatePercentages = function () {
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages ();
    // 2. Read percentages from the budget controller
    var percentages = budgetCtrl.getPercentage ();
    // 3. Update the UI with new percentage
    console.log (percentages);
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

      // 6. Calculate and update percentages
      updatePercentages ();
    }
  };

  var ctrlDeleteItem = function (event) {
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      // inc-0, inc-2
      splitID = itemID.split ('-');
      type = splitID[0];
      ID = +splitID[1];

      // 1. delete the item from the dara structure
      budgetCtrl.deleteItem (type, ID);

      // 2. Delete the item from the UI
      UICtrl.deleteListItem (itemID); // inc-1... || exp-2...

      // 3. Update and show the new budget
      updateBudget ();

      // 4. Calculate and update percentages
      updatePercentages ();
    }
  };

  return {
    init: function () {
      console.log ('Application has started');
      UICtrl.displayBudget ({
        budget: 0,
        percentage: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListener ();
    },
  };
}) (budgetController, UIController);

controller.init ();
