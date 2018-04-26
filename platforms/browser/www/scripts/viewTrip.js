firebaseInit();

//Button functionality
document.getElementById("homeBtn").addEventListener("click", homeBtn);
document.getElementById("addPointBtn").addEventListener("click", addPoint);

function homeBtn() {
  document.getElementById("homeBtn").style.backgroundColor = "#fff78a";
  window.location.href = "home.html";
}

//global vars
var url = window.location.href;
var tripName = url.substr(url.indexOf("?name=") + 6).replace(/%20/g, " ");
var map;


//takes user input and generates a point based on geolocation
//adds point to database
function addPoint() {
  var pointName = document.getElementById("pointName").value;
  var pointDesc = document.getElementById("pointDesc").value;

  navigator.geolocation.getCurrentPosition(function (position) {

    //the point must be an object containing 1 parameter
    //key is equal to point name, value is equal to object containing point info
    //must be nested in order to have point name as key
    var point = {};

    point[pointName] = {
      desc: pointDesc,
      lat: position.coords.latitude,
      long: position.coords.longitude
    };

    var uid = firebase.auth().currentUser.uid;

    var ref = firebase.database().ref("Group 20/Team Data/" + uid + "/trips/" + tripName);
    ref.once("value").catch(function (error) {
      generateError(error.message);
    }).then(function (data) {
      if (!data.exists()) {
        generateError("Database Error");
        return;
      }

      if (data.val() === "empty") {
        ref.set(point).catch(function (error) {
          generateError(error.message);
        }).then(function (data) {

          addNewMarker(point);

        });
      } else {
        ref.child(pointName).set(point[pointName]).catch(function (error) {
          generateError(error.message);
        }).then(function (data) {

          addNewMarker(point);

        });
      }
    });

  },
    function () {
      generateError("Geolocation Error");
    },
    { enableHighAccuracy: true });


}

//Generate Error Message
function generateError(message) {
  document.getElementById("errorMessage").textContent = message;
}

//Retrives all trip points from database
//data passed to generateMarkers
function getPoints() {

  var uid = firebase.auth().currentUser.uid;

  var ref = firebase.database().ref("Group 20/Team Data/" + uid + "/trips/" + tripName);
  ref.once("value", function (data) {
    if (!data.exists()) {
      generateError("Database Error")
      return;
    }

    if (data.val() === "empty") {
      return;
    }

    generateMarkers(data.val());
  });
}

//generates markers on map corresponding to points
function generateMarkers(points) {

  //loop through each point and generate a marker
  for (prop in points) {
    if (points.hasOwnProperty(prop)) {

      //custom marker
      var image = {
        url: 'https://i.imgur.com/5Fnrnu5.png',
        scaledSize: new google.maps.Size(25, 40), // scaled size
        origin: new google.maps.Point(0, 0), // image origin
        anchor: new google.maps.Point(12.5, 40) // anchor point
      };
      var marker = new google.maps.Marker({
        position: {
          lat: points[prop].lat,
          lng: points[prop].long
        },
        map: map,
        icon: image,
        title: prop,
        animation: google.maps.Animation.DROP,
        desc: points[prop].desc
      });

      marker.addListener("click", function () {
        displayPointData(this);
      });
    }
  }
}

//When new point is added, generate marker on map
function addNewMarker(point) {

  //point is object containing single key set to the point name
  //key to this value is set to object containing point data
  var pointName = Object.keys(point)[0];
  var desc = point[pointName].desc;
  var lat = point[pointName].lat;
  var long = point[pointName].long;
  var image = {
    url: 'https://i.imgur.com/5Fnrnu5.png',
    scaledSize: new google.maps.Size(25, 40), // scaled size
    origin: new google.maps.Point(0, 0), // image origin
    anchor: new google.maps.Point(12.5, 40) // anchor point
  };

  var marker = new google.maps.Marker({
    position: {
      lat: lat,
      lng: long
    },
    map: map,
    icon: image,
    title: pointName,
    animation: google.maps.Animation.DROP,
    desc: desc
  });

  marker.addListener("click", function () {
    
    displayPointData(this);

  });
}

//sent to google map api as callback
//initializes map
function initMap() {

  //get users current location, used as center point for map
  navigator.geolocation.getCurrentPosition(function (pos) {
    var mapCanvas = document.getElementById("mapContainer");

    var mapOptions = {
      center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
      zoom: 14,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1a3646"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#64779e"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#215da9"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#334e87"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#166eb5"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#1b4d89"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#304a7d"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b4b4b4"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#0c395f"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffef13"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#fff897"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#aea200"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b8b8b8"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#133764"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3a4762"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#8bc4f1"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#4e6d70"
            }
          ]
        }
      ]
    };

    map = new google.maps.Map(mapCanvas, mapOptions);

    //google maps will sometimes initlaize before firebase, we must use settimeout to make sure that firebase is initialized before using it.
    setTimeout(function () {
      getPoints();
    }, 1000);
  }, function () {
    generateError("Geolocation Error");
  }, { enableHighAccuracy: true });

}

function displayPointData(point) {

  document.getElementById("pointNameInfo").textContent = point.title;
  document.getElementById("pointDescInfo").textContent = point.desc;

}