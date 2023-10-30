

let map;
let service;
let infowindow;

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 15,
      });
      infowindow = new google.maps.InfoWindow();
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
      });
    });
  } else {
    // Browser doesn't support Geolocation
    window.alert("Geolocation is not supported by this browser.");
  }
  //this shows the location of stores close to the user location
  const script = document.createElement("script");
  // This example uses a local copy of the GeoJSON stored at google.com/maps/api/geocode/json.
  script.src =
    "https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJVSZzVR8FdkgRTyQkxxLQmVU&key=AIzaSyCtBPYMqlBJKHDOSjwGdjw7BcKgB1BQWlA&solution_channel=GMP_guides_productlocator_v1_a";
  document.getElementsByTagName("head")[0].appendChild(script);
}
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const start = document.getElementById("origin-input").value;
  const end = document.getElementById("destination-input").value;
}// markers are created here
function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
  const script = document.createElement("script");

}
window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;
window.initAutocomplete = initAutocomplete;