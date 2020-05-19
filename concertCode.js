// $.ajax({
//   type: "GET",
//   url:
//     "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=kXRwRNyapQ2ygIBMLGoyhnqOD27mZOk7",
//   async: true,
//   dataType: "json",
//   success: function (json) {
//     console.log(json);
//     // Parse the response.
//     // Do other things.
//   },
//   error: function (xhr, status, err) {
//     // This time, we do not end up here!
//   },
// });

//https://app.ticketmaster.com/discovery/v2/events.json?postalCode=77057&apikey=kXRwRNyapQ2ygIBMLGoyhnqOD27mZOk7

// var queryURL =
//   "https://app.ticketmaster.com/discovery/v2/events.json?postalCode=" +
//   zipCode +
//   "&apikey=" +
//   apiKey;

var apiKey = "kXRwRNyapQ2ygIBMLGoyhnqOD27mZOk7";

var queryBaseURL =
  "https://app.ticketmaster.com/discovery/v2/events.json?postalCode=";

$("#run-search").on("click", function (event) {
  event.preventDefault();

  var zipCode = $("#search-term").val();

  var queryURL = queryBaseURL + zipCode + "&apikey=" + apiKey;
  console.log(queryURL);
  addConcertInfo(zipCode);
});

function addConcertInfo() {
  var zipCode = $("#search-term").val();

  var queryURL = queryBaseURL + zipCode + "&apikey=" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var cName = response._embedded.events;
    console.log("concert name: " + response);
  });
}

// function buildQueryURL() {
//   var zipCode = $("#search-term").val();
//   var apiKey = "kXRwRNyapQ2ygIBMLGoyhnqOD27mZOk7";

//   var queryURL =
//     "https://app.ticketmaster.com/discovery/v2/events.json?postalCode=" +
//     zipCode +
//     "&apikey=" +
//     apiKey;

//   console.log(zipCode);
// }
