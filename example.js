// 1. Connect to the domain anonymously.
Convergence.connectAnonymously(DOMAIN_URL)
  .then(initApp)
  .catch((error) => {
    console.log("Could not connect: " + error);
  });

// 2. Initializes the application after connecting by opening a model.
function initApp(domain) {
  const modelService = domain.models();
  modelService.openAutoCreate({
    collection: "example",
    id: "getting-started",
    data: { text: "Hello World" }
  })
  .then(initModel)
  .catch((error) => {
    console.log("Could not open model: " + error);
  });
}

// 3. Initializes the model once the model is open.
function initModel(model) {
  const stringModel = model.elementAt("text");
  const textArea = document.getElementById("textarea");

  // Sets the value of the text area and performs a two-way-binding.
  ConvergenceInputElementBinder.bindTextInput(textArea, stringModel);
}
