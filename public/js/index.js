$(function() {
  var cats = ["Food", "Entertainment", "Housing", "Transportation"];
  var vals = ["$700", "$300", "$1000", "$500"];
  var inputNum = 5;

  $("#new-row").hide();
  $(".cat-val").hide();

  //click function for create account button to add extra field for Income
  $("#new-acc-btn").click(function(event) {
    event.preventDefault();

    //creating new container div and giving it the "form-group" class
    var newForm = $("<div>");
    newForm.addClass("form-group");

    //creating new lable element and adding the "for" attribute and "Income" heading
    var incLabel = $("<label>");
    incLabel.attr("for", "Income");
    incLabel.text("Income");

    //creating new input element and adding attributes
    var incInput = $("<input>");
    incInput.attr({
      class: "form-control",
      type: "income",
      id: "user-inc",
      placeholder: "$10000000"
    });

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
    //changing login button color to yellow w/ bootstrap class and adding bootstrap btn class for style
    $("#login").addClass("btn btn-warning");
  });

  //new form row input fields
  $(document).on("click", "#new-row", function(event) {
    event.preventDefault();
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
});
