/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = random - token;

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  scrollZoom: false,
  // center: [-118.113491, 34.111745],
  // zoom: 4,
});

const bound = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create Maker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add Marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add PopUp
  new mapboxgl.popup()
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extends map bounds to include current location
  bound.extends(loc.coordinates);
});

map.fitBounds(bound, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
