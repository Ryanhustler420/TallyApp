// BUDGET CONTROLLER
var budgetController = (function () {
  // write code here...
}) ();

// UI CONTROLLER
var UIController = (function () {
  // write code here...
}) ();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  // write code here...

  var ctrlAddItem = function () {
    // TODO LIST
    // 1. Get the field input data
    // 2. Add the item to the budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI    
  };

  document.querySelector ('.add__btn').addEventListener ('click', ctrlAddItem);

  document.addEventListener ('keypress', function (e) {
    if (e.key === 'Enter' && e.keyCode === 13) {
      ctrlAddItem ();
    }
  });
}) (budgetController, UIController);
