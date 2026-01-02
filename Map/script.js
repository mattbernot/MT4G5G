/* eslint-disable no-undef */
/**
 * image on map
 */

// config map
let config = {
  minZoom: 9,
  maxZoom: 18,
};

const zoom = 9;
const lat = 46.1512;
const lng = 14.9955;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var pane = map.createPane("fixed", document.getElementById("map"));

// ------------------------------------------------

/*
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path d="M25 7.335c-2.23-2.069-5.217-3.335-8.5-3.335s-6.27 1.265-8.5 3.335v0c2.46 2.283 4 5.544 4 9.165s-1.54 6.882-4 9.165c2.23 2.069 5.217 3.335 8.5 3.335s6.27-1.265 8.5-3.335c-2.46-2.283-4-5.544-4-9.165s1.54-6.882 4-9.165v0 0zM25.706 8.044c2.045 2.226 3.294 5.195 3.294 8.456s-1.249 6.23-3.294 8.456c-2.279-2.101-3.706-5.112-3.706-8.456s1.427-6.355 3.706-8.456v0 0zM7.294 8.044c-2.045 2.226-3.294 5.195-3.294 8.456s1.249 6.23 3.294 8.456c2.279-2.101 3.706-5.112 3.706-8.456s-1.427-6.355-3.706-8.456v0z"></path>
  </svg>
*/

// template svg icon
const svgIcon = `
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 223.7 325.54"><defs><style>.cls-1{fill:#fff;}</style></defs><title>tower</title><path d="M376.09,567.76h27.73c3,0,6,0,9,0s4.92,1.29,5,4.37c.06,3.3-2,4.59-5.11,4.62H201.53c-.62,0-1.25,0-1.87,0-3.7-.09-5.71-1.67-5.55-4.58.2-3.56,2.58-4.44,5.71-4.43,10.62,0,21.25,0,31.88,0H236c3.11-14.64,6.18-29,9.24-43.41Q263.78,437.16,282.4,350c.71-3.32.34-5.57-2-8.25A33.58,33.58,0,0,1,276.2,303a34,34,0,0,1,63.25,10.51c1.88,11-.92,20.88-8.56,29.12a5.8,5.8,0,0,0-1.68,5.9q17.55,81.86,34.94,163.74l11.49,53.85C375.74,566.54,375.89,567,376.09,567.76Zm-9.89-.11c.75-5.3-2.18-7.56-6.2-9.61-17.12-8.71-34.13-17.64-51.13-26.61a5.44,5.44,0,0,0-5.83,0c-17.2,9.1-34.4,18.23-51.81,26.94-4.24,2.11-5.78,4.85-5.66,9.27ZM264.12,498c13.52,7,26.37,13.68,39.13,20.46a5.1,5.1,0,0,0,5.47,0c11.67-6.22,23.43-12.27,35.16-18.39,1.15-.6,2.25-1.29,3.74-2.15-13.69-9.14-26.86-18-40.1-26.68a3.27,3.27,0,0,0-2.92-.11C291.27,479.85,278,488.72,264.12,498Zm27.33-147.52c-2.47,11.58-4.88,22.64-7.1,33.73-.18.86.75,2.28,1.56,3,5.88,4.83,11.9,9.49,17.77,14.33,1.63,1.34,2.76,1.47,4.47.06,5.86-4.85,11.94-9.44,17.74-14.37a5.57,5.57,0,0,0,1.41-4.36c-.67-4.55-1.78-9-2.76-13.54-1.33-6.16-2.69-12.3-4.12-18.83C310.68,354.55,301.33,354.48,291.45,350.45ZM275.58,439c9.86,6.57,19.27,12.9,28.76,19.09a3.64,3.64,0,0,0,3.25,0c9.5-6.19,18.9-12.52,28.73-19.08l-30.38-24.28ZM306,294.53a25,25,0,1,0,25,25A24.83,24.83,0,0,0,306,294.53Zm-9.75,230.34-37.74-19.65c-3.17,14.92-6.19,29.16-9.39,44.24Zm57.21-19.68-37.72,19.69,47.12,24.58ZM341,446.77l-26.94,17.91,35.81,23.85C346.81,474.13,344,460.74,341,446.77ZM262.05,488.5l35.78-23.82-26.91-17.87C268,460.7,265.13,474.06,262.05,488.5Zm68-93L313.17,409,337,428C334.59,416.68,332.38,406.36,330.06,395.48Zm-48.25.31c-2.27,10.61-4.47,20.91-6.88,32.19l23.78-19c-5.26-4.22-10.11-8.12-15-12C283.28,396.62,282.73,396.36,281.81,395.79Z" transform="translate(-194.1 -251.23)"/><path d="M406.41,319.67c-.28,20.78-6.07,39.83-17.91,57-.63.91-1.25,2.3-2.11,2.52-1.76.44-4.08.9-5.4.09-1.11-.67-1.46-3.13-1.5-4.81,0-1.05,1.11-2.16,1.81-3.18a91.24,91.24,0,0,0-5.73-110.94c-.4-.48-.83-.93-1.19-1.44-1.57-2.21-1.79-4.49.34-6.38,2.3-2.06,4.62-1.49,6.56.68a97.9,97.9,0,0,1,16.81,26.43A102.27,102.27,0,0,1,406.41,319.67Z" transform="translate(-194.1 -251.23)"/><path d="M239.35,255.48a40.28,40.28,0,0,1-2.9,4.7q-22.24,26.47-21.84,61a88.82,88.82,0,0,0,15.51,49.29c.56.83,1.14,1.64,1.68,2.48,1.57,2.45,1.59,4.87-.94,6.56s-4.77.86-6.48-1.52a94.73,94.73,0,0,1-15.49-33q-12.22-50.6,20.9-90.85c1.66-2,3.53-3.91,6.33-2.32C237.36,252.56,238.15,254.08,239.35,255.48Z" transform="translate(-194.1 -251.23)"/><path d="M385.51,319.22c-.21,16.84-4.77,32-14.31,45.6-.94,1.33-2.48,2.84-3.92,3s-3.78-.88-4.24-2a7.7,7.7,0,0,1,.46-5.45c3.24-7.24,7.8-14.06,10-21.58,6.83-23.43,1.95-44.87-13.05-64.06-.46-.59-1-1.14-1.45-1.71-1.85-2.25-2.15-4.66.11-6.65s4.62-1.48,6.6.69c.92,1,1.78,2.09,2.62,3.17A79.4,79.4,0,0,1,385.51,319.22Z" transform="translate(-194.1 -251.23)"/><path d="M226.42,319.08A79.5,79.5,0,0,1,244.59,269c.71-.88,1.36-2.22,2.25-2.43,1.86-.44,4.21-1,5.73-.19,2.28,1.16,2.28,3.67.94,5.88a21.68,21.68,0,0,1-1.87,2.33,70.33,70.33,0,0,0-4.31,84c.28.42.57.83.84,1.25,2.15,3.35,2,5.92-.46,7.53s-4.76.78-7.11-2.62C231.15,351.11,226.58,335.94,226.42,319.08Z" transform="translate(-194.1 -251.23)"/><path d="M270.65,283.22a50.26,50.26,0,0,1-2.61,4.33c-14.58,18.89-15.64,40.24-2.86,60.11,1.67,2.61,2.34,5.07-.4,7.26-2.26,1.8-4.94.85-7.15-2.32-14.88-21.36-13.42-51.45,3.65-70.82a7.93,7.93,0,0,1,5.66-2.22C268.18,279.62,269.34,281.84,270.65,283.22Z" transform="translate(-194.1 -251.23)"/><path d="M364.54,319.27a58.36,58.36,0,0,1-10.27,33.43c-1.77,2.63-3.86,4-6.88,2.39-2.51-1.33-2.64-4.2-.55-7.48,12.6-19.8,11.55-41.42-2.7-59.89-1.19-1.54-2.08-4.21-1.61-6,1-3.55,5.13-3.54,8-.28C359.26,291.26,364.55,305.56,364.54,319.27Z" transform="translate(-194.1 -251.23)"/><path d="M322.74,319.38a16.78,16.78,0,1,1-33.55.27,16.78,16.78,0,0,1,33.55-.27Zm-24.51,0a7.74,7.74,0,1,0,15.48.13,7.74,7.74,0,0,0-15.48-.13Z" transform="translate(-194.1 -251.23)"/><path class="cls-1" d="M298.23,319.36a7.74,7.74,0,0,1,15.48.13,7.74,7.74,0,1,1-15.48-.13Z" transform="translate(-194.1 -251.23)"/></svg>
  
`;

// create new div icon width svg
const newIcon = L.divIcon({
  className: "marker",
  html: svgIcon,
  iconSize: [30, 30],
  iconAnchor: [12, 24],
  popupAnchor: [7, -16],
});


/* Glej komentar:

    Lat_a, long_a spravš podatke v lat, lng,
      druga je lat_b, long_b, ki jo bova povezala
    
    Text: glej template za text


*/

const points = [
  {
    lat: 45.589750, //lat_a  | lat_b
    lng: 14.714290, //long_a | long_b
    // template za text
    text: `<h3> mw_name </h3>                                   <br>
          <b>Imetnik:</b> ow_name                               <br> 
          <b>Širina rf kanala BW/KHz:</b> bw_khz                <br> 
          <b>Ime postaje A:</b> station_name_a                  <br>
          <b>ID postaje A:</b> station_id_a                     <br>
          <b>Polarizacija A:</b> ant1_polar_a                   <br> 
          <b>Azimut snopa A [deg]:</b> ant1_azimut_a            <br>
          <b>Elevacijski kot A [deg]:</b> ant1_tilt_a           <br>
          <b>Centralna frekvenca A [F/MHz]:</b> tx_frequency_a  <br>

          <b>Ime postaje B:</b> station_name_b                  <br>
          <b>ID postaje B:</b> station_id_b                     <br>
          <b>Polarizacija B:</b> ant1_polar_b                   <br> 
          <b>Azimut snopa B [deg]:</b> ant1_azimut_b            <br>
          <b>Elevacijski kot B [deg]:</b> ant1_tilt_b           <br>
          <b>Centralna frekvenca B [F/MHz]:</b> tx_frequency_b  <br>
          `,
  },

  {
    lat: 46.152000,
    lng: 15.229200,
    // primer za Laško tower z recid: 10025057
    text: `<h3> RTV-00078 </h3>                        <br>
          <b>Imetnik:</b> RTV SLOVENIJA                <br> 
          <b>Širina rf kanala BW/KHz:</b> 28000        <br> 
          <b>Ime postaje A:</b> Laško I                <br>
          <b>ID postaje A:</b> LAS1                    <br>
          <b>Polarizacija A:</b> H                     <br> 
          <b>Azimut snopa A [deg]:</b> 155.00          <br>
          <b>Elevacijski kot A [deg]:</b> -1.00        <br>
          <b>Centralna frekvenca A [F/MHz]:</b> 12793  <br>

          <b>Ime postaje B:</b> Laško II               <br>
          <b>ID postaje B:</b> LAS2                    <br>
          <b>Polarizacija B:</b> H                     <br> 
          <b>Azimut snopa B [deg]:</b> 335.00          <br>
          <b>Elevacijski kot B [deg]:</b> 1.00         <br>
          <b>Centralna frekvenca B [F/MHz]:</b> 13059  <br>
          `,
  },
];

points.map(({ lat, lng, text }) => {
  // create marker and add to map
  const marker = L.marker([lat, lng], {
    icon: newIcon,
  }).addTo(map);

  // create popup, set contnet
  const popup = L.popup({
    pane: "fixed",
    className: "popup-fixed test",
    autoPan: false,
  }).setContent(text);

  marker.bindPopup(popup).on("click", fitBoundsPadding);
});

// remove all animation class when popupclose
map.on("popupclose", function (e) {
  removeAllAnimationClassFromMap();
});

// ------------------------------------------------

const mediaQueryList = window.matchMedia("(min-width: 700px)");

mediaQueryList.addEventListener("change", (event) => onMediaQueryChange(event));

onMediaQueryChange(mediaQueryList);

function onMediaQueryChange(event) {
  if (event.matches) {
    document.documentElement.style.setProperty("--min-width", "true");
  } else {
    document.documentElement.style.removeProperty("--min-width");
  }
}

function fitBoundsPadding(e) {
  removeAllAnimationClassFromMap();
  // get with info div
  const boxInfoWith = document.querySelector(
    ".leaflet-popup-content-wrapper"
  ).offsetWidth;

  // add class to marker
  e.target._icon.classList.add("animation");

  // create a feature group, optionally given an initial set of layers
  const featureGroup = L.featureGroup([e.target]).addTo(map);

  // check if attribute exist
  const getPropertyWidth =
    document.documentElement.style.getPropertyValue("--min-width");

  // sets a map view that contains the given geographical bounds
  // with the maximum zoom level possible
  map.fitBounds(featureGroup.getBounds(), {
    paddingTopLeft: [getPropertyWidth ? -boxInfoWith : 0, 10],
  });
}

function removeAllAnimationClassFromMap() {
  // get all animation class on map
  const animations = document.querySelectorAll(".animation");
  animations.forEach((animation) => {
    animation.classList.remove("animation");
  });

  // back to default position
  map.setView([lat, lng], zoom);
}




////      Connect towers        ////

const line = [
  [points[0].lat, points[0].lng],
  [points[1].lat, points[1].lng],
];

// add polyline to map
L.polyline(line, {
  color: "black",
  opacity: 0.7,
  weight: 2,
})
  .addTo(map);


////      Get Coordinates on click        ////


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




////      Random markers        ////


/*
function rnd(){
 var ranNum = (Math.random()*(0.4-0) + 0) * (Math.round(Math.random()) ? 1 : -1);
 return ranNum;
}

// old marker
const tower_5G = L.icon({
  iconUrl: "./tower.png",
  iconSize: [50, 58], // size of the icon
  //iconAnchor: [20, 58], // changed marker icon position
});


for (let i = 0; i < 10; i++) {
  const [lt, lg, popupText] = [lat+rnd(),lng+rnd(), `Stolp ${i}`]

  L.marker([lt, lg], {
  icon: tower_5G,
})
  .bindPopup(popupText)
  .addTo(map);

  //marker = new L.marker([lt, lg]).bindPopup(popupText).addTo(map);
}
*/


////      Nominatim Search        ////

// add "random" button
const buttonTemplate = `<div class="leaflet-search"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path></svg></div><div class="auto-search-wrapper max-height"><input type="text" id="marker" autocomplete="off"  aria-describedby="instruction" aria-label="Search ..." /><div id="instruction" class="hidden">When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.</div></div>`;

// create custom button
const customControl = L.Control.extend({
  // button position
  options: {
    position: "topleft",
    className: "leaflet-autocomplete",
  },

  // method
  onAdd: function () {
    return this._initialLayout();
  },

  _initialLayout: function () {
    // create button
    const container = L.DomUtil.create(
      "div",
      "leaflet-bar " + this.options.className
    );

    L.DomEvent.disableClickPropagation(container);

    container.innerHTML = buttonTemplate;

    return container;
  },
});

// adding new button to map controll
map.addControl(new customControl());

// --------------------------------------------------------------

// input element
const root = document.getElementById("marker");

function addClassToParent() {
  const searchBtn = document.querySelector(".leaflet-search");
  searchBtn.addEventListener("click", (e) => {
    // toggle class
    e.target
      .closest(".leaflet-autocomplete")
      .classList.toggle("active-autocomplete");

    // add placeholder
    root.placeholder = "Search ...";

    // focus on input
    root.focus();

    // use destroy method
    autocomplete.destroy();
  });
}

addClassToParent();

// function clear input
map.on("click", () => {
  document
    .querySelector(".leaflet-autocomplete")
    .classList.remove("active-autocomplete");

  clickOnClearButton();
});

// autocomplete section
// more config find in https://github.com/tomickigrzegorz/autocomplete
// --------------------------------------------------------------

const autocomplete = new Autocomplete("marker", {
  delay: 1000,
  selectFirst: true,
  howManyCharacters: 2,

  onSearch: function ({ currentValue }) {
    const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&q=${encodeURI(
      currentValue
    )}`;

    /**
     * Promise
     */
    return new Promise((resolve) => {
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          resolve(data.features);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  },

  onResults: ({ currentValue, matches, template }) => {
    const regex = new RegExp(currentValue, "i");
    // checking if we have results if we don't
    // take data from the noResults method
    return matches === 0
      ? template
      : matches
          .map((element) => {
            return `
              <li role="option">
                <p>${element.properties.display_name.replace(
                  regex,
                  (str) => `<b>${str}</b>`
                )}</p>
              </li> `;
          })
          .join("");
  },

  onSubmit: ({ object }) => {
    const { display_name } = object.properties;
    const cord = object.geometry.coordinates;
    // custom id for marker
    // const customId = Math.random();

    // remove last marker
    map.eachLayer(function (layer) {
      if (layer.options && layer.options.pane === "markerPane") {
        if (layer._icon.classList.contains("leaflet-marker-locate")) {
          map.removeLayer(layer);
        }
      }
    });

    // add marker
    const marker = L.marker([cord[1], cord[0]], {
      title: display_name,
    });

    // add marker to map
    marker.addTo(map).bindPopup(display_name);

    // set marker to coordinates
    map.setView([cord[1], cord[0]], 8);

    // add class to marker
    L.DomUtil.addClass(marker._icon, "leaflet-marker-locate");
  },

  // the method presents no results
  noResults: ({ currentValue, template }) =>
    template(`<li>No results found: "${currentValue}"</li>`),
});

