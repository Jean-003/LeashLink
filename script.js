 // function ticketMaster() {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=idVREd0toy5AGDXaGZhf07ksmoaUk7kx"
    //  "https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=idVREd0toy5AGDXaGZhf07ksmoaUk7kx";

    

    // var apiKey = "idVREd0toy5AGDXaGZhf07ksmoaUk7kx"
    // var keySecret = "n2kW26Zszi44O68v"

  document.addEventListener ("DOMContentLoaded", function () {
    document.getElementById("fetchButton").addEventListener("click",fetchData);
    });

  function fetchData() {
    fetch(queryURL)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    //parse the data or do something else 
    return response.json();
  })

  .catch(error => {//handle any errors
  });
}
function fetchData() {
  console.log(queryURL) //log the url
  fetch(queryURL)
  .then(response =>response.json())
.then(data => {  //access and use data 
  console.log(data); //log the data 
  var eventName = data.name;   //access event name property from data(test)
  console.log(eventName) // log the name 


data.events.forEach(
  event => {
    console.log (event.name);
  } // display the names in console
);

  return data; // return the data 
})

.catch(error => {//handle any errors
  console.error(error);
});
}

//test git push

// function fetchData() {
//   console.log(queryURL); // Logging the URL

//   // Created a script element to set the jsonp url and a callback parameter
//   var script = document.createElement('script');

//   // using the callback function that will handle the JSONP response
//   window.handleResponse = function(data) {
//     console.log(data); // logging the data

//     var eventName = data.name; // Access the event name property from data
//     console.log(eventName); // Log the name

//     // Display the names in the console
//     data.events.forEach(function(event) {
//       console.log(event.name);
//     });

//     // Clean up by removing the script element
//     document.body.removeChild(script);
//   };

//   // Set the source of the script element to the JSONP URL
//   script.src = queryURL + '&callback=handleResponse';

//   // Append the script element to the document body
//   document.body.appendChild(script);
// }