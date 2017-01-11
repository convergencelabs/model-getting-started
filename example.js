// Connect to the domain, as the domain user.
Convergence.connectAnonymously(DOMAIN_URL)
  .then(initApp)
  .catch(function (error) {
    console.log("Could not connect: " + error);
  });

/**
 * Initializes the application after connecting by opening a model.
 * @param {ConvergenceDomain} domain The connected domain.
 */
function initApp(domain) {
  var modelService = domain.models();
  modelService.open("example", "getting-started", function () {
    // This method gets called if the model doesn't exist to set the initial data.
    return {text: "Hello World"};
  })
  .then(initModel)
  .catch(function (error) {
    console.log("Could not open model: " + error);
  });
}

/**
 * Initializes the model once the model is open.
 * @param {RealTimeModel} model The connected domain.
 */
function initModel(model) {
  var stringModel = model.elementAt("text");
  var textArea = document.getElementById("textarea");

  // Sets the value of the text area and performs a two-way-binding.
  ConvergenceInputElementBinder.bindTextInput(textArea, stringModel);
}
