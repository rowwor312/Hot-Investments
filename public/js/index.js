$(function() {
  //click function for create account button to add extra field for Income
  $("#new-acc-btn").click(function(event) {
    event.preventDefault();

    //creating new container div and giving it the "form-group" class
    var newForm = $("<div>");
    newForm.addClass("form-group");

    //creating new lable element and adding the "for" attribute and "Income" heading
    var newLabel = $("<label>");
    newLabel.attr("for", "Income");
    newLabel.text("Income");

    //creating new input element and adding attributes
    var newInput = $("<input>");
    newInput.attr({
      class: "form-control",
      type: "income",
      id: "user_income",
      placeholder: "10000000"
    });

    //prepending new label and input to the newForm div
    newForm.prepend(newInput);
    newForm.prepend(newLabel);

    //appending newForm div to the wider container div
    $(".input-con").append(newForm);
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
