// Connect to the domain, as the domain user.
Convergence.connectAnonymously(DOMAIN_URL)
  .then(initApp)
  .catch(function (error) {
    console.log("Could not connect: " + error);
  });

/**
 * Initializes the application after connecting by opening a model.
 *
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
 * Initializes model once the model is open.
 *
 * @param {RealTimeModel} model The connected domain.
 */
function initModel(model) {
  var stringModel = model.elementAt("text");
  var textArea = document.getElementById("textarea");
  bindTextArea(textArea, stringModel);

  // Set the initial value of the text area to the value in the model.
  textArea.value = stringModel.value();
}


/**
 * A utility method to bind a text area to the real time model.  This is
 * available as a separate utility, but is shown here for completeness.
 *
 * @param {HTMLTextAreaElement} textArea The text area element to bind too.
 * @param {RealTimeString} stringModel The real time element that holds the text.
 */
function bindTextArea(textArea, stringModel) {

  //
  // Listen to the text area and send outgoing events.
  //
  textArea.addEventListener("input", function () {
    var oldval = stringModel.value();
    var newval = textArea.value;

    var commonEnd = 0;
    var commonStart = 0;
    if (oldval === newval) {
      return;
    }

    while (oldval.charAt(commonStart) === newval.charAt(commonStart)) {
      commonStart++;
    }

    while (oldval.charAt(oldval.length - 1 - commonEnd) ===
    newval.charAt(newval.length - 1 - commonEnd) &&
    commonEnd + commonStart < oldval.length &&
    commonEnd + commonStart < newval.length) {
      commonEnd++;
    }

    // Characters were removed.
    if (oldval.length !== commonStart + commonEnd) {
      stringModel.remove(commonStart, oldval.length - commonStart - commonEnd);
    }

    // Characters were added
    if (newval.length !== commonStart + commonEnd) {
      stringModel.insert(commonStart, newval.slice(commonStart, (newval.length - commonEnd)));
    }
  }, false);

  //
  // Listen for when other users change the value and update the text area
  //
  stringModel.on("insert", function (event) {
    var oldVal = textArea.value;
    textArea.value = oldVal.substring(0, event.index) +
      event.value +
      oldVal.substring(event.index, oldVal.length);
  });

  stringModel.on("remove", function (event) {
    var oldVal = textArea.value;
    textArea.value = oldVal.substring(0, event.index) +
      oldVal.substring(event.index + event.value.length, oldVal.length);
  });
}
