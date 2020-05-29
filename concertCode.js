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

var lastFMBaseURL =
  "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=";

var lastFMapiKey = "&api_key=eb88403b0132e57c63d39d0a9c5f028f&format=json";

$("#run-search").on("click", function (event) {
  event.preventDefault();

  var zipCode = $("#search-term").val();

  var queryURL = queryBaseURL + zipCode + "&apikey=" + apiKey;
  console.log(queryURL);
  addConcertInfo(zipCode);
});

function addConcertInfo() {
  $("#concert-").empty();

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
      var list = response._embedded || "No event";

      var eventCount = list.events.length;
      console.log("Event count: " + eventCount);

      for (var i = 0; i <= eventCount; i++) {
        var $concertList = $("<ul>");
        $concertList.addClass("concert-group");

        $("#concert-section").append($concertList);

        var $concertListItem = $("<li class='list-group-item'>");

        console.log("i: " + i);
        console.log(
          "response._embedded.events[i]: " + response._embedded.events[i]
        );
        var cName = response._embedded.events[i].name;
        var cDate = response._embedded.events[i].dates.start.localDate;
        var cVenue = response._embedded.events[i]._embedded.venues[0].name;
        var cURL = response._embedded.events[i].url;
        var cGenre = response._embedded.events[i].classifications[0].genre.name;
        var cPic = response._embedded.events[i].images[2].url;

        $concertListItem.append(
          "<img class='imgClass' src='" + cPic + "'>" + "</img></br>"
        );
        $concertListItem.append(
          "<h4><i class='fa fa-music'></i> Artist: " + cName + "</h4>"
        );
        $concertListItem.append(
          "<h4><i class='fa fa-calendar'></i> Date: " + cDate + "</h4>"
        );
        $concertListItem.append(
          "<h4><i class='fa fa-city'></i> Venue: " + cVenue + "</h4>"
        );
        $concertListItem.append(
          "<a href='" + cURL + "'><i class='fa fa-link'></i> " + cURL + "</a>"
        );
        $concertListItem.append(
          "<h4><i class='fa fa-compact-disc'></i> Genre: " + cGenre + "</h4>"
        );

        $concertList.append($concertListItem);

        // $(".concert-img").attr("src", cPic);
        // $(".concert-name").append("Artist: " + cName);
        // $(".concert-date").append("Date: " + cDate);
        // $(".concert-venue").append("Venue: " + cVenue);
        // $(".concert-url").attr("href", cURL);
        // $(".concert-url").append("URL: " + cURL);
        // $(".concert-genre").append("Genre: " + cGenre);

        // $("#concert-section").append($(".concert-c"));
      } //end of for loop

      var lastFMURL = lastFMBaseURL + cName + lastFMapiKey;

      //start of second api call
      $.ajax({
        type: "GET",
        url: lastFMURL,
        async: true,
        dataType: "json",
        success: function (response) {
          console.log("last fm: " + response);
          console.log("last fm song: " + response.toptracks.track[0].name);
          var cTopSong = response.toptracks.track[0].name;

          $(".concert-top-song").append("Top Song: " + cTopSong);

          //var cTopSong = response;
        },
      });

      // Parse the response.
      // Do other things.
    },
    error: function (xhr, status, err) {
      // This time, we do not end up here!
    },
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
