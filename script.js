
function fetchData() {
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=idVREd0toy5AGDXaGZhf07ksmoaUk7kx"

  
  console.log(queryURL); //log the url


  fetch(queryURL) 
    .then(response => response.json()) //access and use data 
    .then(data => {  
      console.log(data); //log the data 
      var eventName = data.name;   //access event name property from data(test)
      console.log(eventName) // log the name 
      data.events.forEach(
        event => {
          console.log(event.name);
        }
      );
      return data; // return the data 
    })

    .catch(error => { //handle any errors
      console.error(error);
    })

    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("fetchButton").addEventListener("click", fetchData);
    });
    
} fetchData ();