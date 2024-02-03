 // function ticketMaster() {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=idVREd0toy5AGDXaGZhf07ksmoaUk7kx";
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

    // Create CODE HERE to Log the queryURL
function fetchData() {
  console.log(queryURL) //log the url
  fetch(queryURL)
  .then(response =>response.json())
.then(data => {  //access and use data 
  console.log(data); //log the data 
  var eventName = data.name;   //access event name property from data(test)
  console.log(eventName) // log the name 

// display the names in console
data.events.forEach(
  event => {
    console.log (event.name);
  }
);

  return data; // return the data 
})

.catch(error => {//handle any errors
  console.error(error);
});
}

//test git push
