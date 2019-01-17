
let latitude = 41.9148;
let longitude = 87.6251;
// let weatherTime = 1540148070;

//Dark Sky Api Format
//Needs to be lat , long , Unix time (this includes both date and time in its value)
//Dark Sky Api Format
//Needs to be lat , long , Unix time (this includes both date and time in its value)


// BELOW IS MY ATTEMPT USING FETCH METHOD TO DO API CALL
// // process.env.DARKSKYAPIKEY

// let url = "https://api.darksky.net/forecast/";
// let lati = latitude;
// let longi = longitude;

// let darkSkyApiCall = url + apiKey + "/" + lati + "," + longi;

// console.log(darkSkyApiCall);

// //Run the Weather Api

// let options = {
//   method: "GET",
//   mode: "cors"
// };

// let req = new fetch.Request(darkSkyApiCall, options);

// fetch(req)
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Dark Sky not working");
//     }
//   })
//   .then(j => {
//     console.log("JSON data provided");
//   })
//   .catch(err => {
//     console.log("ERROR: ", err.message);
//   });


// Weather Call doing AJAX method I know wasnt able to work


let apiKey = process.env.DARKSKYAPIKEY;

let url = "https://api.darksky.net/forecast/";
let lati = latitude;
let longi = longitude;

let darkSkyApiCall = url + apiKey + "/" + lati + "," + longi;



$.ajax({
  type: "GET",
  url: darkSkyApiCall
}).then(function(response) {
  //log the queryURL

  console.log(darkSkyApiCall);
  //variables to pass onto the tournament dashboard
  let temp = response.currently.temperature + "°F";

  let precipProbability = response.currently.precipProbability * 100 + "%";
  //log to see if the parameters are working
  console.log(temp);
  console.log(precipProbability);
});

//need to find a way to feed this into the css file so that we can submit without the api key. Also need to find how to put api key into a .env
let mapurl =
  "https://maps.googleapis.com/maps/api/staticmap?center=North+Avenue+Beach,Chicago,IL&zoom=13&size=400x200&maptype=roadmap%20&markers=color:blue%7Clabel:S%7C41.9148113,-87.6251085&key=";
let mapapi = process.env.GOOGLEMAPSAPIKEY;

let entiremapurl = mapurl + mapapi;
console.log(entiremapurl);

