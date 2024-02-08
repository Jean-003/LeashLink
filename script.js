// Make map a global variable because it doesn't like it if it isn't
var map;

// Function to initialize the map after the HTML is loaded
function initMap() {
    // Check if geolocation is supported in the browser
    if (navigator.geolocation) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // User's location coordinates
                var userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                console.log('User location:', userLocation);

                // Center the map at the user's location
                map = new google.maps.Map(document.getElementById('map'), {
                    center: userLocation,
                    zoom: 12
                });

                // Create a marker for the user's location
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: 'Your Location',
                    icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png'
                });

                // Use geocoding to get the city name based on the user's location
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: userLocation }, function (results, status) {
                    if (status === 'OK' && results[0]) {
                        var cityName = results[0].address_components[2].long_name;
                        console.log('City Name: ' + cityName);
                    } else {
                        console.error('Unable to geocode location');
                    }
                });

                // Search for Dog parks around user's location within 10 miles
                var request = {
                    location: userLocation,
                    radius: 16093.4,
                    keyword: 'Dog Park'
                };

                // Use Google Maps API PlacesService to search for nearby places
                var placesService = new google.maps.places.PlacesService(map);
                placesService.nearbySearch(request, function (results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        // Loop through to create multiple markers
                        for (var i = 0; i < results.length; i++) {
                            createMarker(results[i].name, results[i].geometry.location);
                        }
                    } else {
                        console.error('Error fetching nearby places:', status);
                    }
                });
            },
            function (error) {
                console.error('Error getting user location:', error.message);
            }
        );
    }
}

// Function to create a marker for a given place
function createMarker(name, location) {
    // Create a marker for the places
    var marker = new google.maps.Marker({
        map: map,
        position: location,
        title: name
    });

    // Create an info window for the marker to show more details
    var infowindow = new google.maps.InfoWindow();


    // Add a click listener to the marker to show the info window
    marker.addListener('click', function () {
        // Set the content of the infowindow
        infowindow.setContent('<div><strong>' + name + '</strong></div>');

        // Open the infowindow on the map
        infowindow.open(map, marker);
        console.log("info window? what is that", infowindow)
      
    });
} 

// // second API Info 
function fetchData() {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=family&dmaId=324&apikey=idVREd0toy5AGDXaGZhf07ksmoaUk7kx"

    console.log(queryURL); //log the url

    fetch(queryURL)
        .then(response => response.json()) //access and use data 
        .then(data => {
            console.log("This is the data:", data); //log the data 
            var eventData = data._embedded.events;   //revised to access event name and events property from data correctly. (test)
            console.log("This is the events data i want to return in the modal", eventData); // log the names and information

            eventData.forEach(
                event => {
                    var listItem = document.createElement("li") // create a 
                    // list item element of results
                
                    listItem.textContent = event.name// set content of list item to event name
                    // modalBody.appendChild(listItem)
                    document.getElementById("eventList").appendChild(listItem); // append list item to get event list.
                //  
                    var eventLocation = {
                        lat: Number.parseFloat(event._embedded.venues[0].location.latitude),
                        lng: Number.parseFloat(event._embedded.venues[0].location.longitude),
                    }; // calling on the event names to create markers for the locations and using Number.parseFloat to turn string into decimal numbers for long and lat to be called. 
                    createMarker(event.name, eventLocation)
                }
            );
            displayEventData(eventData); // This is to display the events data above next
            return data; // return the data 
        })

        .catch(error => { //find any errors
            console.error(error);

        })
        .catch(error => {
            console.error(error); // Handle any errors
        });
}

function displayEventData(eventData) {
var modalBody = document.querySelector (".modal-body");
console.log("This is the modal body?", modalBody);

if (modalBody) {
    modalBody.innerHTML="";
    eventData.forEach (event => {
        var listItem = document.createElement("div");
        listItem.textContent= event.name;
        modalBody.appendChild(listItem);
    });
}
else {
    console.error ("modal where are you? idk (=◉ᆽ◉=)")
}};
// Search button event listener - revised to execute on form submit not search button click.

document.addEventListener("DOMContentLoaded", function () {
    var formSearch = document.getElementById("formSubmit")
    // var searchButton = document.getElementById("searchButton") revised to carry out function on form submit, this is to improve the UI for users interacting with the page;
    if (formSearch) {
        formSearch.addEventListener("submit", function (event) {
            event.preventDefault()
            console.log("form submitted????");

            // When the "Search" button form is submitted, execute the fetchData function
            fetchData();
        });
    }
}); // Removed "function()" outside of event listener to prevent information from being called on page load and to only execute when form is submitted.