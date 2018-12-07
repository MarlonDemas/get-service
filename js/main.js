
var pos = [-30.5595, 18.9375]
var mapZoom = 4

var CLIENT_ID = 'd3553957-8179-4c28-a778-205e67bab90d';
var CLIENT_SECRET = 'JA3nQ8daa2vxHvt/AXGyyliuYFFvfsdJ0fy/9xlOmvw=';
var payload = {
  'client_id': CLIENT_ID,
  'client_secret': CLIENT_SECRET,
  'grant_type': 'client_credentials',
  'scope': 'transportapi:all'
};

var request = new XMLHttpRequest();
request.open('POST', 'https://identity.whereismytransport.com/connect/token', true);

request.addEventListener('load', function () {

  var response = JSON.parse(this.responseText);
  var token = response.access_token;
  window.token = token;
},);

request.setRequestHeader('Accept', 'application/json');
var formData = new FormData();

for (var key in payload) {
  formData.append(key, payload[key]);
}

request.send(formData);

// window.onload = function() {

//   var defaultBounds = new google.maps.LatLngBounds(
//     new google.maps.LatLng(-33.8902, 151.1759),
//     new google.maps.LatLng(-33.8474, 151.2631));

//   var input = document.getElementById('autoCompleteField');
//   var options = {
//     bounds: defaultBounds
//   };
  
//   autocomplete = new google.maps.places.Autocomplete(input, options);
  
//   var input = document.getElementById('autoCompleteField');
  
//   var searchBox = new google.maps.places.SearchBox(input, {
//     bounds: defaultBounds
//   });

// }

// window.onload = function() {

// }



function getLocation() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPosition); {

        };

    } else {

        x.innerHTML = "Geolocation is not supported by this browser.";
    
    }

}

function showPosition(position) {

  pos = [position.coords.latitude, position.coords.longitude]
  mapZoom = 14

  map = new google.maps.Map(document.getElementById('mapholder'), {
    center: {
      lat: pos[0],
      lng: pos[1]
    },
    zoom: mapZoom
  });

  var newPos = {
    lat: pos[0],
    lng: pos[1]
  }
  
  var marker = new google.maps.Marker({
    position: newPos,
    map: map,
  });

  document.getElementById("startPoint").setAttribute("placeholder", position.coords.latitude+", "+position.coords.longitude);

  var token = window.token;

  var request = new XMLHttpRequest();
  request.addEventListener('load', function () {
  var response = JSON.parse(this.responseText);
  console.log('Response', response);
  });
  
  request.open('GET', 'https://platform.whereismytransport.com/api/lines?point='+position.coords.latitude+','+position.coords.longitude+'&limit=3', true);
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer ' + token);
  request.send();

  var body = {
  geometry: {
      type: 'Multipoint',
      coordinates: [[position.coords.longitude, position.coords.latitude], [18.484708, -33.988788]]
  }
  };
  
  var request = new XMLHttpRequest();

  request.addEventListener('load', function () {
  var response = JSON.parse(this.responseText);
  console.log('Response', response.itineraries);
  });

  request.open('POST', 'https://platform.whereismytransport.com/api/journeys', true);
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer ' + token);
  request.send(JSON.stringify(body));

}

// Kenilworth Centre



posKcRaw = [-33.988788, 18.484708]
var posKc = {
  lat: posKcRaw[0],
  lng: posKcRaw[1]
}

window.onload = function() {

  map = new google.maps.Map(document.getElementById('mapholder'), {
    center: {
      lat: pos[0],
      lng: pos[1]
    },
    zoom: mapZoom
  });

  map2 = new google.maps.Map(document.getElementById('mapholder2'), {
  center: {
    lat: posKcRaw[0],
    lng: posKcRaw[1]
  },
  zoom: 16
});

var marker2 = new google.maps.Marker({
  position: posKc,
  map: map2,
});
}

// Parallax

var parallax = document.getElementById("parallax");
var parallax2 = document.getElementById("parallax2");
var parallax3 = document.getElementById("parallax3");

window.addEventListener("scroll", function(){

  var ypos = window.pageYOffset;

    console.log(ypos*0.7);
    parallax.style.backgroundPositionY = (ypos * 0.5) - 200 + "px";
    parallax2.style.backgroundPositionY = (ypos * 0.5) + 200 + "px";
    parallax3.style.backgroundPositionY = (ypos * 0.5) + 400 + "px";

});
