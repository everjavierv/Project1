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

  // $.ajax({
  //   url: queryURL,
  //   method: "GET",
  // }).then(function (response) {
  //   var cName = response._embedded.events;
  //   console.log("response :" + response);
  //   console.log("concert name: " + response);
  // });

  $.ajax({
    type: "GET",
    url: queryURL,
    async: true,
    dataType: "json",
    success: function (response) {
      //console.log(response._embedded.events);

      //name, date, venue, url, genre, music sample
      var cName = response._embedded.events[0].name;
      var cDate = response._embedded.events[0].dates.start.localDate;
      var cVenue = response._embedded.events[0]._embedded.venues[0].name;
      var cURL = response._embedded.events[0].url;
      var cGenre = response._embedded.events[0].classifications[0].genre.name;
      var cPic = response._embedded.events[0].images[2].url;

      $(".concert-img").attr("src", cPic);
      $(".concert-name").append("Artist: " + cName);
      $(".concert-date").append("Date: " + cDate);
      $(".concert-venue").append("Venue: " + cVenue);
      $(".concert-url").attr("href", cURL);
      $(".concert-url").append("URL: " + cURL);

      $(".concert-genre").append("Genre: " + cGenre);

      // Parse the response.
      // Do other things.
    },
    error: function (xhr, status, err) {
      // This time, we do not end up here!
    },
  });

  // var lastFMURL =
  //   "http://www.last.fm/api/auth/?api_key=eb88403b0132e57c63d39d0a9c5f028f";

  // //start of second api call
  // $.ajax({
  //   type: "GET",
  //   url: lastFMURL,
  //   async: true,
  //   dataType: "json",
  //   success: function (response) {},
  // });
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
