/* eslint-disable no-undef */
/**
 * image on map
 */

// config map
let config = {
  minZoom: 9,
  maxZoom: 18,
};


const DEFAULT_USER_BW = 28000; 

let operatorCoverageLayers = new Map();   
let operatorCoverageByBW = new Map();     

// BW filter state
let selectedBWStop = null;


let operatorMarkersByBW = new Map();



let operatorData = new Map();


let enabledOperators = new Set();   



// ===== LINKS (A <-> B) =====
const linksLayer = L.layerGroup();   // holds all polylines
let linksControl = null;             // Leaflet layers control (optional)




const zoom = 9;
const lat = 46.1512;
const lng = 14.9955;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);




// ca voergae
let coverageEnabled = true;

function setCoverageEnabled(enabled) {
  coverageEnabled = enabled;

  operatorCoverageLayers.forEach((lg) => {
    if (enabled) lg.addTo(map);
    else lg.remove();
  });

  // if turning back on, redrawam BW
  if (enabled) {
    const bw = activeBWStop ?? BW_STOPS[0];
    applyBWFilterToCoverage(bw);
  }
}














//za towejre
let towersEnabled = true; // ✅ new

function setCoverageEnabled(enabled) {
  coverageEnabled = enabled;

  operatorCoverageLayers.forEach((lg) => {
    if (enabled) lg.addTo(map);
    else lg.remove();
  });

  if (enabled) {
    const bw = activeBWStop ?? BW_STOPS[0];
    applyBWFilterToCoverage(bw);
  }
}

function setTowersEnabled(enabled) {
  towersEnabled = enabled;

  operatorLayers.forEach((lg) => {
    if (enabled) lg.addTo(map);
    else lg.remove();
  });

  // when turning towers back on, re-apply BW so only correct points show
  if (enabled) {
    const bw = activeBWStop ?? BW_STOPS[0];
    applyBWFilterToClusters(bw);
  }
}






















// A layer group where drawn items will be stored za shranjevanje.
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Add draw controls
map.addControl(new L.Control.Draw({
  position: "topleft",
  draw: {
    polyline: true,
    polygon: true,
    rectangle: true,
    circle: true,
    marker: true
  },
  edit: {
    featureGroup: drawnItems,
    remove: true
  }
}));

// When something is drawn, add it to the map
map.on(L.Draw.Event.CREATED, function (event) {
  let layer = event.layer;
  let feature = (layer.feature = layer.feature || {});
  let type = event.layerType;

  feature.type = feature.type || "Feature";
  let props = (feature.properties = feature.properties || {});

  props.type = type;

  if (type === "circle") {
    props.radius = layer.getRadius();
  }

  drawnItems.addLayer(layer);
});















































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
  <svg fill="originalColor" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 223.7 325.54"><defs><style>.cls-1{fill:#fff;}</style></defs><title>tower</title><path d="M376.09,567.76h27.73c3,0,6,0,9,0s4.92,1.29,5,4.37c.06,3.3-2,4.59-5.11,4.62H201.53c-.62,0-1.25,0-1.87,0-3.7-.09-5.71-1.67-5.55-4.58.2-3.56,2.58-4.44,5.71-4.43,10.62,0,21.25,0,31.88,0H236c3.11-14.64,6.18-29,9.24-43.41Q263.78,437.16,282.4,350c.71-3.32.34-5.57-2-8.25A33.58,33.58,0,0,1,276.2,303a34,34,0,0,1,63.25,10.51c1.88,11-.92,20.88-8.56,29.12a5.8,5.8,0,0,0-1.68,5.9q17.55,81.86,34.94,163.74l11.49,53.85C375.74,566.54,375.89,567,376.09,567.76Zm-9.89-.11c.75-5.3-2.18-7.56-6.2-9.61-17.12-8.71-34.13-17.64-51.13-26.61a5.44,5.44,0,0,0-5.83,0c-17.2,9.1-34.4,18.23-51.81,26.94-4.24,2.11-5.78,4.85-5.66,9.27ZM264.12,498c13.52,7,26.37,13.68,39.13,20.46a5.1,5.1,0,0,0,5.47,0c11.67-6.22,23.43-12.27,35.16-18.39,1.15-.6,2.25-1.29,3.74-2.15-13.69-9.14-26.86-18-40.1-26.68a3.27,3.27,0,0,0-2.92-.11C291.27,479.85,278,488.72,264.12,498Zm27.33-147.52c-2.47,11.58-4.88,22.64-7.1,33.73-.18.86.75,2.28,1.56,3,5.88,4.83,11.9,9.49,17.77,14.33,1.63,1.34,2.76,1.47,4.47.06,5.86-4.85,11.94-9.44,17.74-14.37a5.57,5.57,0,0,0,1.41-4.36c-.67-4.55-1.78-9-2.76-13.54-1.33-6.16-2.69-12.3-4.12-18.83C310.68,354.55,301.33,354.48,291.45,350.45ZM275.58,439c9.86,6.57,19.27,12.9,28.76,19.09a3.64,3.64,0,0,0,3.25,0c9.5-6.19,18.9-12.52,28.73-19.08l-30.38-24.28ZM306,294.53a25,25,0,1,0,25,25A24.83,24.83,0,0,0,306,294.53Zm-9.75,230.34-37.74-19.65c-3.17,14.92-6.19,29.16-9.39,44.24Zm57.21-19.68-37.72,19.69,47.12,24.58ZM341,446.77l-26.94,17.91,35.81,23.85C346.81,474.13,344,460.74,341,446.77ZM262.05,488.5l35.78-23.82-26.91-17.87C268,460.7,265.13,474.06,262.05,488.5Zm68-93L313.17,409,337,428C334.59,416.68,332.38,406.36,330.06,395.48Zm-48.25.31c-2.27,10.61-4.47,20.91-6.88,32.19l23.78-19c-5.26-4.22-10.11-8.12-15-12C283.28,396.62,282.73,396.36,281.81,395.79Z" transform="translate(-194.1 -251.23)"/><path d="M406.41,319.67c-.28,20.78-6.07,39.83-17.91,57-.63.91-1.25,2.3-2.11,2.52-1.76.44-4.08.9-5.4.09-1.11-.67-1.46-3.13-1.5-4.81,0-1.05,1.11-2.16,1.81-3.18a91.24,91.24,0,0,0-5.73-110.94c-.4-.48-.83-.93-1.19-1.44-1.57-2.21-1.79-4.49.34-6.38,2.3-2.06,4.62-1.49,6.56.68a97.9,97.9,0,0,1,16.81,26.43A102.27,102.27,0,0,1,406.41,319.67Z" transform="translate(-194.1 -251.23)"/><path d="M239.35,255.48a40.28,40.28,0,0,1-2.9,4.7q-22.24,26.47-21.84,61a88.82,88.82,0,0,0,15.51,49.29c.56.83,1.14,1.64,1.68,2.48,1.57,2.45,1.59,4.87-.94,6.56s-4.77.86-6.48-1.52a94.73,94.73,0,0,1-15.49-33q-12.22-50.6,20.9-90.85c1.66-2,3.53-3.91,6.33-2.32C237.36,252.56,238.15,254.08,239.35,255.48Z" transform="translate(-194.1 -251.23)"/><path d="M385.51,319.22c-.21,16.84-4.77,32-14.31,45.6-.94,1.33-2.48,2.84-3.92,3s-3.78-.88-4.24-2a7.7,7.7,0,0,1,.46-5.45c3.24-7.24,7.8-14.06,10-21.58,6.83-23.43,1.95-44.87-13.05-64.06-.46-.59-1-1.14-1.45-1.71-1.85-2.25-2.15-4.66.11-6.65s4.62-1.48,6.6.69c.92,1,1.78,2.09,2.62,3.17A79.4,79.4,0,0,1,385.51,319.22Z" transform="translate(-194.1 -251.23)"/><path d="M226.42,319.08A79.5,79.5,0,0,1,244.59,269c.71-.88,1.36-2.22,2.25-2.43,1.86-.44,4.21-1,5.73-.19,2.28,1.16,2.28,3.67.94,5.88a21.68,21.68,0,0,1-1.87,2.33,70.33,70.33,0,0,0-4.31,84c.28.42.57.83.84,1.25,2.15,3.35,2,5.92-.46,7.53s-4.76.78-7.11-2.62C231.15,351.11,226.58,335.94,226.42,319.08Z" transform="translate(-194.1 -251.23)"/><path d="M270.65,283.22a50.26,50.26,0,0,1-2.61,4.33c-14.58,18.89-15.64,40.24-2.86,60.11,1.67,2.61,2.34,5.07-.4,7.26-2.26,1.8-4.94.85-7.15-2.32-14.88-21.36-13.42-51.45,3.65-70.82a7.93,7.93,0,0,1,5.66-2.22C268.18,279.62,269.34,281.84,270.65,283.22Z" transform="translate(-194.1 -251.23)"/><path d="M364.54,319.27a58.36,58.36,0,0,1-10.27,33.43c-1.77,2.63-3.86,4-6.88,2.39-2.51-1.33-2.64-4.2-.55-7.48,12.6-19.8,11.55-41.42-2.7-59.89-1.19-1.54-2.08-4.21-1.61-6,1-3.55,5.13-3.54,8-.28C359.26,291.26,364.55,305.56,364.54,319.27Z" transform="translate(-194.1 -251.23)"/><path d="M322.74,319.38a16.78,16.78,0,1,1-33.55.27,16.78,16.78,0,0,1,33.55-.27Zm-24.51,0a7.74,7.74,0,1,0,15.48.13,7.74,7.74,0,0,0-15.48-.13Z" transform="translate(-194.1 -251.23)"/><path class="cls-1" d="M298.23,319.36a7.74,7.74,0,0,1,15.48.13,7.74,7.74,0,1,1-15.48-.13Z" transform="translate(-194.1 -251.23)"/></svg>
  
`;


/* Glej komentar:

    Lat_a, long_a spravš podatke v lat, lng,
      druga je lat_b, long_b, ki jo bova povezala
    
    Text: glej template za text


*/











// ----------------------------
// Color helper (REQUIRED for coverage)
// ----------------------------
function hexToRgba(hex, alpha = 1) {
  // fallback if invalid input
  if (typeof hex !== "string") return `rgba(0, 150, 255, ${alpha})`;

  let h = hex.trim().replace("#", "");

  // support rgb/rgba already
  if (hex.startsWith("rgb(") || hex.startsWith("rgba(")) return hex;

  // support short hex (#abc)
  if (h.length === 3) {
    h = h.split("").map(c => c + c).join("");
  }

  // must be 6 hex chars
  if (!/^[0-9a-fA-F]{6}$/.test(h)) {
    return `rgba(0, 150, 255, ${alpha})`; // fallback blue-ish
  }

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}



function colorFromString(str) {
  // deterministic hash -> color
  let hash = 0;
  const s = String(str ?? "");
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash |= 0;
  }

  // make positive
  hash = Math.abs(hash);

  // pick RGB bytes from hash
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = (hash & 0x0000ff);

  // ensure it isn't too dark
  const rr = Math.max(60, r);
  const gg = Math.max(60, g);
  const bb = Math.max(60, b);

  return (
    "#" +
    rr.toString(16).padStart(2, "0") +
    gg.toString(16).padStart(2, "0") +
    bb.toString(16).padStart(2, "0")
  );
}















// ----------------------------
// COVERAGE helper functions (based on your NDJSON fields)
// ----------------------------
function toNum(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
}

function normDeg0_360(deg) {
  // normalize degrees to [0, 360)
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

function haversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = d => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function beamwidthDeg(r, side /* "a"|"b" */) {
  // Your data: ant1_bw_a / ant1_bw_b are degrees but very small (1.00–2.70)
  const raw = toNum(side === "b" ? r?.ant1_bw_b : r?.ant1_bw_a);

  // If missing, choose a visible default
if (raw === null) {
  return 20 + Math.random() * (200 - 20);
}

  // Make it visible on the map:
  // - multiply small BW so you can actually see it
  // - clamp to a reasonable min/max
  const scaled = raw * 10;          // 1.5° -> 15° (visible)
  const minDeg = 8;                 // don’t go too thin
  const maxDeg = 70;                // don’t fill the whole map

  return Math.min(maxDeg, Math.max(minDeg, scaled));
}

function azimuthDeg(r, side /* "a"|"b" */) {
  // Your data: ant1_azimut_a / ant1_azimut_b are strings like "333.00"
  const raw = toNum(side === "b" ? r?.ant1_azimut_b : r?.ant1_azimut_a);
  if (raw === null) return null;
  return normDeg0_360(raw);
}

function linkRadiusMeters(r) {
  // Best radius = distance A <-> B
  const hasA = typeof r?.lat_a === "number" && typeof r?.long_a === "number";
  const hasB = typeof r?.lat_b === "number" && typeof r?.long_b === "number";

  if (hasA && hasB) {
    const d = haversineMeters(r.lat_a, r.long_a, r.lat_b, r.long_b);
    if (!Number.isFinite(d) || d <= 0) return null;
    return d * 1.05; // small overshoot
  }

  // If B missing, fallback to a "random base" style rule using bw_khz:
  // (you asked it's okay to use a random/base if needed)
  const bw = Number(r?.bw_khz);
  if (!Number.isFinite(bw)) return 3000; // 3km default fallback
  // crude fallback: bigger BW -> slightly bigger radius
  return Math.min(25000, Math.max(2000, bw / 5)); // clamp 2km..25km
}

function makeCoverageSector(r, side /* "a"|"b" */, colorHex) {
  const lat = side === "b" ? r.lat_b : r.lat_a;
  const lng = side === "b" ? r.long_b : r.long_a;
  if (typeof lat !== "number" || typeof lng !== "number") return null;

  const az = azimuthDeg(r, side);
  if (az === null) return null;

  const bw = beamwidthDeg(r, side);
  const radius = linkRadiusMeters(r);
  if (radius === null) return null;

  // sectorLatLngs() is already in your script and returns [center, ...arc..., center]
  const latlngs = sectorLatLngs(lat, lng, radius, az, bw, 28);

return L.polygon(latlngs, {
  color: colorHex,
  weight: 1,
  opacity: 0.35,

  fillColor: colorHex,
  fillOpacity: 0.18,

  interactive: false
});
}

































// ================================
// BW SLIDER (snapping + filtering)
// ================================

// Your 15 points (duplicates allowed)
const BW_POINTS = [
  500,
  28000, 28000,
  55000, 55000,
  56000, 56000, 56000, 56000, 56000,
  110000,
  112000, 112000,
  250000,
  500000
];

// Unique sorted stops (duplicates removed)
const BW_STOPS = Array.from(new Set(BW_POINTS)).sort((a, b) => a - b);

// Build stop positions on a log scale mapped into 0..1000
function buildStopPositions(stops) {
  const logMin = Math.log10(stops[0]);
  const logMax = Math.log10(stops[stops.length - 1]);
  return stops.map(v => {
    const t = (Math.log10(v) - logMin) / (logMax - logMin);
    return Math.round(t * 1000);
  });
}

const BW_STOP_POS = buildStopPositions(BW_STOPS);

// Snap a slider value (0..1000) to nearest stop index/value/pos
function snapToBWStop(sliderVal) {
  let bestIdx = 0;
  let bestDist = Infinity;

  for (let i = 0; i < BW_STOP_POS.length; i++) {
    const d = Math.abs(BW_STOP_POS[i] - sliderVal);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }

  return { idx: bestIdx, value: BW_STOPS[bestIdx], pos: BW_STOP_POS[bestIdx] };
}

// Map any bw value to the nearest stop (used for "closest value" behavior)
function nearestBWStopValue(bw) {
  if (typeof bw !== "number") return null;

  let best = BW_STOPS[0];
  let bestDist = Infinity;

  for (const s of BW_STOPS) {
    const d = Math.abs(s - bw);
    if (d < bestDist) {
      bestDist = d;
      best = s;
    }
  }

  return best;
}

function filterByBWStop(selectedStop) {
  activeBWStop = selectedStop;

  if (typeof operatorLayers !== "undefined" && operatorLayers?.size > 0) {
    operatorLayers.forEach(layerGroup => {
      layerGroup.eachLayer(layer => {
        // markerji imajo _bw, coverage (krogi/polygoni) nimajo -> ignoriraj ali dodaj logiko kasneje
        if (layer instanceof L.Marker) {
          const mStop = nearestBWStopValue(Number(layer._bw));
          const show = (mStop === selectedStop);

          layer.setOpacity(show ? 1 : 0);

          // če želiš še bolj “hard hide”, lahko:
          // const el = layer.getElement();
          // if (el) el.style.display = show ? "" : "none";
        }
      });
    });
    return;
  }

  console.warn("No operatorLayers found. Filtering skipped.");
}

let activeBWStop = BW_STOPS[0];





















const COLORS = ['red', 'blue', 'green', 'purple', 'orange', 'teal', 'pink'];

function getFirstWord(str) {
  return str.split('')[0] || str;
}

function stringToColor(str) {
  const firstWord = getFirstWord(str);
  let hash = 0;
  for (let i = 0; i < firstWord.length; i++) {
    hash = firstWord.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}




function normalizeOperator(name) {
  const s = (name || "").toLowerCase();

  if (s.includes("a1")) return "A1";
  if (s.includes("telemach")) return "Telemach";
  if (s.includes("telekom")) return "Telekom Slovenije";
  if (s.includes("t-2") || s.includes("t2")) return "T-2";

  // fallback: keep the original, but trimmed
  return (name || "Unknown").trim();
}














// ZA PRIJAZ 

function metersToLatLngOffset(lat, metersNorth, metersEast) {
  const dLat = metersNorth / 111320;
  const dLng = metersEast / (111320 * Math.cos((lat * Math.PI) / 180));
  return [dLat, dLng];
}

function sectorLatLngs(centerLat, centerLng, radiusMeters, azimuthDeg, beamwidthDeg, steps = 24) {
  const start = azimuthDeg - beamwidthDeg / 2;
  const end = azimuthDeg + beamwidthDeg / 2;

  const pts = [[centerLat, centerLng]]; // start at center

  for (let i = 0; i <= steps; i++) {
    const a = (start + (i / steps) * (end - start)) * (Math.PI / 180);

    // In map coords: north = cos, east = sin
    const north = Math.cos(a) * radiusMeters;
    const east = Math.sin(a) * radiusMeters;

    const [dLat, dLng] = metersToLatLngOffset(centerLat, north, east);
    pts.push([centerLat + dLat, centerLng + dLng]);
  }

  pts.push([centerLat, centerLng]); // close
  return pts;
}

function safeNumber(x, fallback = null) {
  const n = Number(x);
  return Number.isFinite(n) ? n : fallback;
}











//coverage loaD
async function loadAndUseCoverage() {
  try {
    const response = await fetch("/api/hush/_search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        size: 5000,
        query: { match_all: {} }
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`ES error ${response.status}: ${text}`);
    }

    const jsonData = await response.json();
    const records = (jsonData.hits?.hits || []).map(h => h._source);

    // Reset ONLY coverage (don’t touch clusters)
    operatorCoverageLayers.forEach(lg => lg.remove());
    operatorCoverageLayers.clear();
    operatorCoverageByBW.clear();

    for (const r of records) {
      // need at least A coords for sector center + B coords for radius
      if (typeof r?.lat_a !== "number" || typeof r?.long_a !== "number") continue;
      if (typeof r?.lat_b !== "number" || typeof r?.long_b !== "number") continue;

      const operator = normalizeOperator(r.ow_name);
      let color = operatorColors.get(operator);
if (!color || typeof color !== "string" || !color.startsWith("#")) {
  color = colorFromString(operator);
  operatorColors.set(operator, color);
}


      if (!operatorCoverageLayers.has(operator)) {
        const lg = L.layerGroup().addTo(map);
        operatorCoverageLayers.set(operator, lg);
      }
      if (!operatorCoverageByBW.has(operator)) {
        operatorCoverageByBW.set(operator, new Map());
      }

      const bw = Number(r.bw_khz);
      const stop = nearestBWStopValue(bw);
      if (stop == null) continue;

      const byStop = operatorCoverageByBW.get(operator);
      if (!byStop.has(stop)) byStop.set(stop, []);

      const polyA = makeCoverageSector(r, "a", color);
      if (polyA) byStop.get(stop).push(polyA);

      const polyB = makeCoverageSector(r, "b", color);
      if (polyB) byStop.get(stop).push(polyB);
    }


    // after the for-loop ends (right before applyBWFilterToCoverage)
    console.log("Coverage operators:", operatorCoverageByBW.size);
 console.log("Example coverage buckets:", Array.from(operatorCoverageByBW.entries())[0]);




    // show first stop initially
    applyBWFilterToCoverage(BW_STOPS[0]);
    


  } catch (err) {
    console.error("Error loading COVERAGE data from Elasticsearch:", err);
    

  }
}


















//lajerji

function rebuildLinksLayer(records) {
  linksLayer.clearLayers();

  for (const r of records) {
    if (typeof r?.lat_a !== "number" || typeof r?.long_a !== "number") continue;
    if (typeof r?.lat_b !== "number" || typeof r?.long_b !== "number") continue;

    const operator = normalizeOperator(r.ow_name);
    const color = operatorColors.get(operator) || colorFromString(operator);
    operatorColors.set(operator, color);

    const line = [
      [r.lat_a, r.long_a],
      [r.lat_b, r.long_b],
    ];

    const polyline = L.polyline(line, {
      color,
      opacity: 0.6,
      weight: 2,
    });

    linksLayer.addLayer(polyline);
  }

  // Add to map once (or keep only in layer control)
  // linksLayer.addTo(map);
}




























// za barve

let operatorLayers = new Map();   // operator -> L.LayerGroup
let operatorColors = new Map();   // operator -> color
let operatorControlInstance = null;

function normalizeOperator(name) {
  const s = (name || "").toLowerCase();

  if (s.includes("a1")) return "A1";
  if (s.includes("telemach")) return "Telemach";
  if (s.includes("telekom")) return "Telekom Slovenije";
  if (s.includes("t-2") || s.includes("t2")) return "T-2";

  return (name || "Unknown").trim();
}

// stable color from string
function colorFromString(str) {
  const base = (str || "Unknown");
  let hash = 0;
  for (let i = 0; i < base.length; i++) hash = base.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}







// BW filter za clusterje

function applyBWFilterToClusters(stopValue) {
  selectedBWStop = stopValue;

  operatorLayers.forEach((clusterGroup, operator) => {
    clusterGroup.clearLayers();

    const byStop = operatorMarkersByBW.get(operator);
    const list = byStop?.get(stopValue) || [];

    if (list.length) clusterGroup.addLayers(list);
  });
}




function applyBWFilterToCoverage(stopValue) {
  operatorCoverageLayers.forEach((layerGroup, operator) => {
    layerGroup.clearLayers();

    const byStop = operatorCoverageByBW.get(operator);
    const polys = byStop?.get(stopValue) || [];

    polys.forEach(p => layerGroup.addLayer(p));
  });
}







function placedCoordinates(coordinates){
  console.log("Lat:", coordinates.lat);
  console.log("Lng:", coordinates.lng);
}











let points = [];

async function loadAndUseData() {
  try {
    const response = await fetch("/api/hush/_search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        size: 5000,
        query: { match_all: {} }
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`ES error ${response.status}: ${text}`);
    }

    const jsonData = await response.json();
    const records = (jsonData.hits?.hits || []).map(h => h._source);
    rebuildLinksLayer(records);

// add layer control toggle once
if (!linksControl) {
  const overlayMaps = { "Povezave": linksLayer };
  linksControl = L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);
}

    console.log("ES total records:", records.length);

    // Reset old layers + caches
    operatorLayers.forEach(lg => lg.remove());
    operatorLayers.clear();
    operatorColors.clear();
    operatorMarkersByBW.clear(); 

    points = records
      .filter(r => typeof r?.lat_a === "number" && typeof r?.long_a === "number")
      .map(r => ({
        lat: r.lat_a,
        lng: r.long_a,
        owner: r.ow_name ?? "Unknown",
        raw: r
      }));

    console.log("Points with coords:", points.length);
    if (points.length === 0) return;

    // Build markers grouped by operator AND by BW stop (bucketed)
    for (const p of points) {
      const r = p.raw;

      const operator = normalizeOperator(r.ow_name);
      const color = operatorColors.get(operator) || colorFromString(operator);
      operatorColors.set(operator, color);

      //  CLUSTER za skupine
      if (!operatorLayers.has(operator)) {
        const cluster = L.markerClusterGroup({
          disableClusteringAtZoom: 13,
          maxClusterRadius: 60,
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: true
        });

        cluster.addTo(map); // visible by default
        operatorLayers.set(operator, cluster);
      }

      const icon = L.divIcon({
        className: "marker",
        html: svgIcon.replace('fill="originalColor"', `fill="${color}"`),
        iconSize: [30, 30],
        iconAnchor: [12, 24],
        popupAnchor: [7, -16],
      });

      const text = `<h3>${r.mw_name ?? "-"}</h3>
        <b>Imetnik:</b> ${r.ow_name ?? "-"}<br>
        <b>BW/KHz:</b> ${r.bw_khz ?? "-"}<br>
        <b>Postaja A:</b> ${r.station_name_a ?? "-"} (${r.station_id_a ?? "-"})<br>
        <b>Pol A:</b> ${r.ant1_polar_a ?? "-"} | <b>Az:</b> ${r.ant1_azimut_a ?? "-"} | <b>Tilt:</b> ${r.ant1_tilt_a ?? "-"}<br>
        <b>Frekv A:</b> ${r.tx_frequency_a ?? "-"}<br>
        <hr/>
        <b>Postaja B:</b> ${r.station_name_b ?? "-"} (${r.station_id_b ?? "-"})<br>
        <b>Pol B:</b> ${r.ant1_polar_b ?? "-"} | <b>Az:</b> ${r.ant1_azimut_b ?? "-"} | <b>Tilt:</b> ${r.ant1_tilt_b ?? "-"}<br>
        <b>Frekv B:</b> ${r.tx_frequency_b ?? "-"}<br>`;

      const marker = L.marker([p.lat, p.lng], { icon });


      marker._bw = Number(r.bw_khz);
      const stop = nearestBWStopValue(marker._bw);
      marker._bwStop = stop;

      const popup = L.popup({
        pane: "fixed",
        className: "popup-fixed test",
        autoPan: false,
      }).setContent(text);

      marker.bindPopup(popup).on("click", fitBoundsPadding);

 
      if (!operatorMarkersByBW.has(operator)) operatorMarkersByBW.set(operator, new Map());
      const byStop = operatorMarkersByBW.get(operator);
      if (!byStop.has(stop)) byStop.set(stop, []);
      byStop.get(stop).push(marker);

    }

    applyBWFilterToClusters(selectedBWStop);
    applyBWFilterToClusters(BW_STOPS[0]);

    // Build the checkbox UI
    buildComboControl();

  } catch (err) {
    console.error("Error loading data from Elasticsearch:", err);
  }
}

loadAndUseData();
loadAndUseCoverage();

//console.log(points);








//SLIDER IN CHECKER


let comboControl = null;

function buildComboControl() {
  // če že obstaja, ga odstrani
  if (comboControl) {
    map.removeControl(comboControl);
    comboControl = null;
  }

  const operators = Array.from(operatorLayers.keys()).sort((a, b) => a.localeCompare(b));

  comboControl = L.Control.extend({
    options: { position: "bottomright" },

    onAdd: function () {
      const container = L.DomUtil.create("div", "bw-ops-control leaflet-control");
      L.DomEvent.disableClickPropagation(container);

      const opsHtml = operators.map(op => {
        const color = operatorColors.get(op) || "#000";
        return `
          <label class="op">
            <input type="checkbox" data-op="${op}" checked />
            <span class="swatch" style="background:${color}"></span>
            <span>${op}</span>
          </label>
        `;
      }).join("");

      container.innerHTML = `
        <label>BW (kHz)</label>
        <input
          id="bwSlider"
          type="range"
          min="0"
          max="1000"
          step="1"
          value="${BW_STOP_POS[0]}"
        />
        <div class="bw-ops-value">
          Selected: <span id="bwSliderValue">${BW_STOPS[0]}</span>
        </div>

        <!-- ✅ Coverage toggle -->
        <div class="cov-row" style="margin:8px 0 6px; display:flex; align-items:center; gap:8px;">
          <input id="covToggle" type="checkbox" ${coverageEnabled ? "checked" : ""} />
          <label for="covToggle" style="margin:0; font-size:12px; font-weight:600;">
            Show coverage
          </label>
        </div>

        <div class="ops-title">Operators</div>
        <div class="btnrow">
          <button type="button" id="opAll">All</button>
          <button type="button" id="opNone">None</button>
        </div>
        <div class="ops-list">
          ${opsHtml}
        </div>
      `;

      setTimeout(() => {
        const bwSlider = container.querySelector("#bwSlider");
        const bwSliderValue = container.querySelector("#bwSliderValue");
        const covToggle = container.querySelector("#covToggle");

        // ✅ initial filter for both clusters + coverage
        activeBWStop = BW_STOPS[0];
        applyBWFilterToClusters(activeBWStop);
        if (coverageEnabled) applyBWFilterToCoverage(activeBWStop);

        // ✅ coverage toggle wiring
        covToggle.addEventListener("change", () => {
          setCoverageEnabled(covToggle.checked);
        });

        // slider
        bwSlider.addEventListener("input", (e) => {
          const raw = Number(e.target.value);
          const snapped = snapToBWStop(raw);

          bwSlider.value = snapped.pos;
          bwSliderValue.textContent = snapped.value;

          activeBWStop = snapped.value;
          applyBWFilterToClusters(activeBWStop);
          if (coverageEnabled) applyBWFilterToCoverage(activeBWStop);
        });

        // operator toggles
        const allBtn = container.querySelector("#opAll");
        const noneBtn = container.querySelector("#opNone");
        const checkboxes = Array.from(container.querySelectorAll('input[type="checkbox"][data-op]'));

        const setOpVisible = (op, visible) => {
          const cluster = operatorLayers.get(op);
          if (cluster) {
            if (visible) cluster.addTo(map);
            else cluster.remove();
          }

          const cov = operatorCoverageLayers.get(op);
          if (cov) {
            // ✅ respect coverageEnabled
            if (visible && coverageEnabled) cov.addTo(map);
            else cov.remove();
          }
        };

        allBtn.addEventListener("click", () => {
          checkboxes.forEach(cb => {
            cb.checked = true;
            setOpVisible(cb.dataset.op, true);
          });

          // re-apply current BW
          applyBWFilterToClusters(activeBWStop);
          if (coverageEnabled) applyBWFilterToCoverage(activeBWStop);
        });

        noneBtn.addEventListener("click", () => {
          checkboxes.forEach(cb => {
            cb.checked = false;
            setOpVisible(cb.dataset.op, false);
          });
        });

        checkboxes.forEach(cb => {
          cb.addEventListener("change", () => {
            setOpVisible(cb.dataset.op, cb.checked);

            // re-apply current BW
            applyBWFilterToClusters(activeBWStop);
            if (coverageEnabled) applyBWFilterToCoverage(activeBWStop);
          });
        });

      }, 0);

      return container;
    }
  });

  map.addControl(new comboControl());
}














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
/*
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
  */




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
    //marker.addTo(map).bindPopup(display_name);

    // set marker to coordinates
    map.setView([cord[1], cord[0]], 18);

    // add class to marker
    L.DomUtil.addClass(marker._icon, "leaflet-marker-locate");
  },

  // the method presents no results
  noResults: ({ currentValue, template }) =>
    template(`<li>No results found: "${currentValue}"</li>`),
});




// loadaj TOWERJE
function loadSavedTowers() {
  const towers = JSON.parse(localStorage.getItem("placedTowers") || "[]");
  towers.forEach(t => {
    L.marker([t.lat, t.lng]).addTo(map).bindPopup(`Saved tower<br>${t.lat.toFixed(6)}, ${t.lng.toFixed(6)}`);
  });
}
loadSavedTowers();












// da applay az afilereja in colors


function applyFilters() {
  if (!selectedBWStop) return;

  for (const [op, data] of operatorData) {
    const opEnabled = enabledOperators.has(op);

    // rebuild cluster and coverage fast
    data.cluster.clearLayers();
    data.coverage.clearLayers();

    if (!opEnabled) continue;

    for (const item of data.items) {
      const mStop = nearestBWStopValue(Number(item.bw));
      if (mStop !== selectedBWStop) continue;

      data.cluster.addLayer(item.marker);

      // add coverage shapes too
      if (item.covA) data.coverage.addLayer(item.covA);
      if (item.covB) data.coverage.addLayer(item.covB);
    }
  }
}













// adding the province name to the visible div
function addTextToDiv(text) {
  const markerPlace = document.querySelector(".marker-position");
  markerPlace.textContent = text;
}

// showing the name of the province
function getName(feature, layer) {
  if (feature.properties && feature.properties.name) {
    
  }
}

// adding geojson by fetch
fetch("si.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let layer = new L.GeoJSON(data, {
      // A Function that will be called once for each
      // created Feature, after it has been created and styled
      onEachFeature: function (feature, layer) {
        layer.on("mouseover", function (e) {
          getName(feature, layer);
          addTextToDiv(feature.properties.name);

        });
       
        
        layer.on("click", function () {
          // adding the province name to the visible div
          addTextToDiv(feature.properties.name);
        });
      },
    }).addTo(map);

    layer.setStyle({
          fillColor: "#000000",
          weight: 1,
          color: "#000000ff",
          opacity: 0.2,
          fillOpacity: 0,
        });

  });



  const overlayMaps = {
  "Povezave": lines,
};


L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);