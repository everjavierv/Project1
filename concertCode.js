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
  $(".conInfo").empty();
  $(".conImg").empty();

  var zipCode = $("#search-term").val();

  var queryURL = queryBaseURL + zipCode + "&apikey=" + apiKey;

  $.ajax({
    type: "GET",
    url: queryURL,
    async: true,
    dataType: "json",
    success: function (response) {
      //console.log(response._embedded.events);

      //name, date, venue, url, genre, music sample
      var list = response._embedded || "No event";

      const eventCount = list.events.length;
      //console.log("Event count: " + eventCount);
      //console.log("response: " + response);

      for (var i = 0; i < eventCount; i++) {
        var $concertList = $("<ul>");
        $concertList.addClass("concert-group");

        $concertImg = $("<ul>"); //new

        $(".conImg").append($concertImg); //new
        $(".conInfo").append($concertList);

        var $concertListItem = $("<li class='list-group-item cListIt'>");
        var $concertImgItem = $("<li class='list-group-item cImgIt'>");

        //console.log("i: " + i);
        // console.log(
        //   "response._embedded.events[i]: " + response._embedded.events[i]
        // );

        var cName = response._embedded.events[i].name;
        // const concertNames = [];
        // concertNames.push(cName);
        var cDate = response._embedded.events[i].dates.start.localDate;
        var cVenue = response._embedded.events[i]._embedded.venues[0].name;
        var cURL = response._embedded.events[i].url;
        var cGenre = response._embedded.events[i].classifications[0].genre.name;
        var cPic = response._embedded.events[i].images[2].url;

        $concertImgItem.append(
          "<img class='imgClass' src='" + cPic + "'>" + "</img></br>"
        );
        $concertImgItem.append(
          "<h5 class ='cInfo' ><i class='fa fa-music'></i> Artist: " +
            cName +
            "</h5>"
        );
        $concertListItem.append(
          "<h4 class ='cInfo' ><i class='fa fa-calendar'></i> Date: " +
            cDate +
            "</h4>"
        );
        $concertListItem.append(
          "<h4 class ='cInfo' ><i class='fa fa-city'></i> Venue: " +
            cVenue +
            "</h4>"
        );
        $concertListItem.append(
          "<a class ='cInfo' href='" +
            cURL +
            "'><i class='fa fa-link'></i> URL: " +
            cURL +
            "</a>"
        );
        $concertListItem.append(
          "<h4 class ='cInfo' ><i class='fa fa-compact-disc'></i> Genre: " +
            cGenre +
            "</h4>"
        );

        $concertImg.append($concertImgItem);
        $concertList.append($concertListItem);

        var lastFMURL = lastFMBaseURL + cName.trim() + lastFMapiKey;

        // $.ajax({
        //   type: "GET",
        //   url: lastFMURL,
        //   async: true,
        //   dataType: "json",
        // }).then(function (response) {
        //console.log("last fm: " + response);
        //console.log("last fm song: " + response.toptracks.track[0].name);

        // $(".conInfo").append($concertList);

        // var cSong = response.toptracks.track[0].name;

        // $(".cListIt").append(
        //   "<h4 class ='cSong' ><i class='fa fa-microphone'></i> Top Song: " +
        //     cSong +
        //     "</h4>"
        // );

        //$concertList.append($concertListItem);
        //});
      } //end of for loop
    },
  });
}
