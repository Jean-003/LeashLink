function initMap() {
    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
  
          console.log('User location:', userLocation);
  
          // Map centered on the user's location
          var map = new google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 12
          });
  
          // Marker for the user's location
          new google.maps.Marker({
            position: userLocation,
            map: map,
            title: 'Your Location',
            icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png'
          });
  
          // Geocode the latitude and longitude to get the city name
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: userLocation }, function (results, status) {
            if (status === 'OK' && results[0]) {
              var cityName = results[0].address_components[2].long_name; 
              console.log('City Name: ' + cityName);
            } else {
              console.error('Unable to geocode location');
            }
          });
          
        },
        function (error) {
          console.error('Error getting user location:', error.message);
        }
      );
    }
  }
  