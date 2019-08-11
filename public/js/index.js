$(function() {
  var cats = ["Food", "Entertainment", "Housing", "Transportation"];
  var vals = ["$700", "$300", "$1000", "$500"];

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
      placeholder: "10000000"
    });
    //div for budget categories
    var catDiv = $("<div>");
    catDiv.attr("class", "form-group");
    catDiv.addClass("form-row col-6 col-sm-6 col-md-6 col-lg-6");
    catDiv.css({
      display: "inline-block",
      width: "50%"
    });
    //heading for categories div
    var catHead = $("<h6>");
    catHead.text("Budget Categories");

    catDiv.prepend(catHead);

    //div for budget values
    var valDiv = $("<div>");
    valDiv.attr("class", "form-group");
    valDiv.addClass("form-row col-6 col-sm-6 col-md-6 col-lg-6");
    valDiv.css({
      display: "inline-block",
      width: "50%"
    });

    //heading for values div
    var valHead = $("<h6>");
    valHead.text("Funds Allocated");

    valDiv.prepend(valHead);

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
      catDiv.append(catInc);
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
      valDiv.append(catVal);
    }
    //prepending new label and input to the newForm div
    newForm.prepend(incInput);
    newForm.prepend(incLabel);

    //appending newForm and budget divs cat/val to the wider container div
    $(".input-con").append(newForm);
    $(".input-con").append(catDiv);
    $(".input-con").append(valDiv);
    $(".underline").text("Account Creation");

    //hiding create account button
    $("#new-acc-btn").hide();
    //changing text of login button to "Submit"
    $("#login").text("Submit");
    //changing login button color to yellow w/ bootstrap class
    $("#login").attr("class", "btn-warning");
    //adding bootstrap btn class for style
    $("#login").addClass("btn");
  });
});
