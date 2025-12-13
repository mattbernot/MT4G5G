/* eslint-disable no-undef */
/**
 * image on map
 */

// config map
let config = {
  minZoom: 1,
  maxZoom: 18,
};

const zoom = 15;
const lat = 46.1512;
const lng = 14.9955;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);



fetch('https://nominatim.openstreetmap.org/search?country=si&polygon_geojson=1&format=json')
  .then(res => res.json())
  .then(data => {
    const sloveniaCoords = data[0].geojson.coordinates;

    const invertedPolygon = {
      type: 'Polygon',
      coordinates: [
        [[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]],
        ...sloveniaCoords
      ]
    };

    L.geoJSON(invertedPolygon, {
      style: {
        fillColor: '#383838ff',
        fillOpacity: 0.9,
        color: 'transparent'
      },
      interactive: false
    }).addTo(map);
  });


/*

const legend = L.control({ position: "bottomleft" });

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "description");
  L.DomEvent.disableClickPropagation(div);
  const text = "Move the mouse";
  div.insertAdjacentHTML("beforeend", text);
  return div;
};

legend.addTo(map);

// follow mouse
// ------------------------------
const followMouse = document.createElement("div");
followMouse.className = "follow-mouse";
document.body.appendChild(followMouse);

const mapCointainer = document.querySelector("#map");

mapCointainer.addEventListener("mousemove", function (e) {
  const { offsetWidth: mapWidth, offsetHeight: mapHeight } = e.target;
  const { offsetWidth: cordWidth, offsetHeight: cordHeight } = followMouse;

  // get co-ordinates
  let { xp, yp } = getCoords(e);

  // convert point x,y to latlng
  const point = L.point(xp, yp);
  const coordinates = map.containerPointToLatLng(point);

  // add coordinates to the div
  followMouse.textContent = coordinates;

  // set the position of the div
  xp = xp + 20 + cordWidth > mapWidth ? xp - cordWidth - 10 : xp + 10;
  yp = yp + 20 + cordHeight > mapHeight ? yp - cordHeight - 10 : yp + 10;

  // followMouse.style.transform = `translate(${xp}px, ${-yp}px)`;
  followMouse.style.left = `${xp}px`;
  followMouse.style.top = `${yp}px`;
});

function getCoords(e) {
  let mouseX = e.clientX;
  let mouseY = e.clientY;

  return {
    xp: parseInt(mouseX),
    yp: parseInt(mouseY),
  };
}

*/

