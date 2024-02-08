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


// Function to fetch event data and display it in the modal
function fetchData() {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=family&dmaId=324&apikey=idVREd0toy5AGDXaGZhf07ksmoaUk7kx";


    console.log(queryURL); // Log the URL

    fetch(queryURL)
        .then(response => response.json()) // Access and use data 
        .then(data => {

            console.log("This is the data:", data); // Log the data 
            var eventData = data._embedded.events; // Access event name and events property from data
            console.log("This is the events data:", eventData); // Log the names and information

            eventData.forEach(event => {
                var listItem = document.createElement("li"); // Create a list item element for results
                listItem.textContent = event.name; // Set content of list item to event name
                document.getElementById("eventList").appendChild(listItem); // Append list item to event list
                var eventLocation = {
                    lat: Number.parseFloat(event._embedded.venues[0].location.latitude),
                    lng: Number.parseFloat(event._embedded.venues[0].location.longitude)
                }; // Retrieve event names to create markers for the locations
                createMarker(event.name, eventLocation);
            });
            displayEventData(eventData); // Display the events data
            return data; // Return the data
        })
        .catch(error => { // Handle any errors

            console.error(error);
        });
}


// Function to display event data in the modal body
function displayEventData(eventData) {
    var modalBody = document.querySelector(".modal-body");
    console.log("This is the modal body:", modalBody);

    if (modalBody) {
        modalBody.innerHTML = "";
        eventData.forEach(event => {
            var listItem = document.createElement("div");
            listItem.textContent = event.name;
            modalBody.appendChild(listItem);
        });
    } else {
        console.error("Modal not found!");
    }
}

// Event listener for form submission
document.addEventListener("DOMContentLoaded", function () {

    var formSearch = document.getElementById("formSubmit");
    if (formSearch) {
        formSearch.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("Form submitted");
            fetchData(); // Fetch data when the form is submitted

        });
    } else {
        console.error("Form not found!");
    }

});
