$(function() {
  console.log("ready!");

  $("#new-acc-btn").click(function(event) {
    event.preventDefault();

    var newForm = $("<div>");
    newForm.addClass("form-group");

    var newLabel = $("<label>");
    newLabel.attr("for", "Income");
    newLabel.text("Income");

    var newInput = $("<input>");
    newInput.attr({
      class: "form-control",
      type: "income",
      id: "user_income",
      placeholder: "10000000"
    });

    newForm.prepend(newInput);
    newForm.prepend(newLabel);

    $(".input-con").append(newForm);
    $(".underline").text("Account Creation");

    $("#new-acc-btn").hide();
    $("#login").text("Submit")
    $("#login").attr("class", "btn-warning");
    $("#login").addClass("btn");
  });
});
