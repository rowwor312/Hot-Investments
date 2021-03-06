$(function() {
  var cats = ["Food", "Entertainment", "Housing", "Transportation"];
  var vals = ["$700", "$300", "$1000", "$500"];
  var inputNum = 4;
  var userName = $("#user_name");
  var pw = $("#password");
  var login = $("#login-form");
  var income = $("#user-inc");
  var newLog = false;
  var catBudObj = 
    {
      category: "",
      catBudget: ""
    };
    console.log(catBudObj)

  $("#new-row").hide();
  $(".cat-val").hide();

  //click function for create account button to add extra field for Income
  $("#new-acc-btn").click(function(event) {
    event.preventDefault();

    newLog = true;
    $("#login-form").attr("action", "/signup");

    //creating new container div and giving it the "form-group" class
    var newForm = $("<div>");
    newForm.addClass("form-group");

    //creating new lable element and adding the "for" attribute and "Income" heading
    var incLabel = $("<label>");
    incLabel.attr("for", "Total-Budget");
    incLabel.text("Income");

    //creating new input element and adding attributes
    var incInput = $("<input>");
    incInput.attr({
      class: "form-control",
      type: "tot-bud",
      id: "user-inc",
      placeholder: "$10000000"
    });

    income = $("#user-inc");
    //loop generating category inputs
    for (i = 0; i < 4; i++) {
      var catInc = $("<input>");
      catInc.attr({
        class: "form-control",
        type: "budget-category",
        id: "bud-cat-" + i,
        placeholder: cats[i]
      });
      catInc.css("margin-bottom", "20px");
      $("#cat-div").append(catInc);
      // budgetCat.push(catInc.attr("id"));
    }

    //loop generating value inputs
    for (i = 0; i < 4; i++) {
      var catVal = $("<input>");
      catVal.attr({
        class: "form-control",
        type: "budget-value",
        id: "bud-val-" + i,
        placeholder: vals[i]
      });
      catVal.css("margin-bottom", "20px");
      $("#val-div").append(catVal);
      // budgetVal.push(catVal.attr("id"));
    }
    //prepending new label and input to the newForm div
    newForm.prepend(incInput);
    newForm.prepend(incLabel);

    //adding newForm to the wider container div
    newForm.insertAfter($(".pw"));
    $(".underline").text("Account Creation");

    //hiding create account button
    $("#new-acc-btn").hide();
    $("#new-row").show();
    $(".cat-val").show();
    //changing text of login button to "Submit"
    $("#login").text("Submit");
    $("#login").attr("type","submit");
    //changing login button color to yellow w/ bootstrap class and adding bootstrap btn class for style
    $("#login").addClass("btn btn-warning");
    $("#login").attr("id", "new-user")
  });

  //new form row input fields
  $(document).on("click", "#new-row", function(event) {
    event.preventDefault();
    income = $("#user-inc");
    var catInc = $("<input>");
    catInc.attr({
      class: "form-control",
      type: "budget-category",
      id: "bud-cat-" + inputNum,
      placeholder: "Shoes"
    });
    catInc.css("margin-bottom", "20px");
    $("#cat-div").append(catInc);

    var catVal = $("<input>");
    catVal.attr({
      class: "form-control",
      type: "budget-value",
      id: "bud-val-" + inputNum,
      placeholder: "$400"
    });
    catVal.css("margin-bottom", "20px");
    $("#val-div").append(catVal);

    inputNum++;
  });

  //form submission
  $(login).on("submit", function formSubmit(event) {
    event.preventDefault();

    //checks for empty login fields and disallows.
    if (!userName.val().trim() || !pw.val().trim()) {
      alert("Please enter your username and password.")
      return;
    }

    //object for returning user
    var newLogin = {
      username: userName.val().trim(),
      password: pw.val().trim()
    };

    //object for new user
    var newUser = {
      username: userName.val().trim(),
      password: pw.val().trim()
    };
    
    //loop that grabs inputs from generated form elements and addes it to object
    
    console.log(catBudObj);
    if (newLog) {
      $.post("/signup", newUser);
      
      for (let i = 0; i<inputNum; i++) {
        let category = $("#bud-cat-" + i).val().trim();
        let budget = $("#bud-val-" +i).val().trim();
        catBudObj.catBudget = budget;
        catBudObj.category = category;
      } 

      for (let i = 0; i<inputNum; i++) {
        catBudObj.catBudget[i];
        catBudObj.category[i];
        $.post("/api/category", catBudObj);
      };

    } else {
      $.post("/login", newLogin);
    };
  });
});
