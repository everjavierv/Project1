$(document).ready(function (){
    $("button").on('click', function(event) {
        event.preventDefault();
        var zipCode = $('#search-term').val().trim();
        var key = "1pAUalDXwZAR1GRjKtYUT0hBxya4Ngg3";
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?postalCode="+zipCode+"&apikey="+ key;
        $.ajax({
            url: queryURL,
            method: "GET"
          })
        .then(function(response) {
            var name;
            var list = response._embedded || "No event";
            if (list === "No event") {
                $('#concert-section').html('No event');
            }
            console.log(list);
            var eventCount = list.events.length;
            if (eventCount !== undefined) {
                $('#concert-section').html('');
                for (i=0;i<=eventCount;i++) {
                    name = response._embedded.events[i].name;
                    var j =i+1;
                    console.log(name);
                    $('#concert-section').append(j+'. '+"Event's name: "+name);
                    $('#concert-section').append('<hr>');
                    console.log(typeof eventCount);
                }
                
            }

            
        })
    })
})