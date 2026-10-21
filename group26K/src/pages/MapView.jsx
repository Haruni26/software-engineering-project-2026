/**
 * Interactive Site Map Component
 *
 * Description:
 * This component displays the conservation site using an interactive Leaflet map.
 * Implements all 23 Site Map requirements + Talking Trees requirements, including:
 *  - Boundaries for site and rewilding area
 *  - Markers for trailhead, well, farmhouse foundation, sitting area, labyrinth, dock, yellow birch
 *  - Hover text and popup descriptions
 *  - User GPS tracking (“YOU ARE HERE”)
 *  - Return to Site Map button
 *  - Talking Tree proximity audio (3m radius auto-detection)
 *  - Bounded map movement + zoom limits
 *  - Responsive and mobile-friendly map sizing
 *
 * Author: Patrick Gosse (A00463761)
 * Course: CSCI 3428 – Software Engineering
 */

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Polyline,
  Tooltip,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { defaultIcon } from "../leaflet-icon";

const COORDS = {
  dock: [44.620807, -63.914325],
  birchForest: [44.62464, -63.920329],
  labyrinthEntrance: [44.624081, -63.919488],
  naturalBurial: [44.62506, -63.921247],
  farmhouse: [44.62643, -63.923172],
  entrance: [44.626556, -63.923382],
};

const POINTS = {
  trailhead: COORDS.entrance,
  farmhouseFoundation: COORDS.farmhouse,
  well: [44.6256, -63.9224],
  sittingArea: COORDS.naturalBurial,
  yellowBirch: COORDS.birchForest,
  labyrinthEntrance: COORDS.labyrinthEntrance,
  dock: COORDS.dock,
};

const SITE_BOUNDS_COORDS = [
  [44.6235, -63.9255],
  [44.6235, -63.9185],
  [44.6277, -63.9185],
  [44.6277, -63.9255],
];

const REWILDING_COORDS = [
  [44.6248, -63.9237],
  [44.6248, -63.9204],
  [44.6269, -63.9204],
  [44.6269, -63.9237],
];

const PATH_COORDS = [
  POINTS.trailhead,
  POINTS.farmhouseFoundation,
  POINTS.well,
  POINTS.sittingArea,
  POINTS.yellowBirch,
  POINTS.labyrinthEntrance,
];

const TALKING_TREE_POIS = [
  {
    id: "trailhead",
    name: "Trailhead",
    position: POINTS.trailhead,
    tts: "You are at the trailhead. This path leads into the St. Margaret’s Bay woodland, where visitors begin their walk through the conservation area.",
  },
  {
    id: "farmhouse",
    name: "Farmhouse Foundation",
    position: POINTS.farmhouseFoundation,
    tts: "This is the farmhouse foundation. It is a remaining footprint of an early homestead and shows how people once lived and worked in this woodland area.",
  },
  {
    id: "well",
    name: "Well",
    position: POINTS.well,
    tts: "You are near the old well. It once provided fresh water for residents and visitors.",
  },
  {
    id: "sittingArea",
    name: "Sitting Area",
    position: POINTS.sittingArea,
    tts: "This is a sitting area. People use this space to rest, listen to the forest, and observe wildlife.",
  },
  {
    id: "yellowBirch",
    name: "Coastal Yellow Birch",
    position: POINTS.yellowBirch,
    tts: "You are near a Coastal Yellow Birch. This species is important for local biodiversity.",
  },
];

const emojiIcon = (emoji) =>
  L.divIcon({
    html: `
      <div style="
        font-size: 28px;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(-50%, -50%);
      ">
        ${emoji}
      </div>
    `,
    className: "emoji-marker",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

const ICONS = {
  trailhead: emojiIcon("🚶‍♂️"),
  farmhouse: emojiIcon("🏠"),
  well: emojiIcon("💧"),
  sittingArea: emojiIcon("🪑"),
  yellowBirch: emojiIcon("🌳"),
  labyrinth: emojiIcon("🧭"),
};

function distanceInMeters(a, b) {
  const la = L.latLng(a[0], a[1]);
  const lb = L.latLng(b[0], b[1]);
  return la.distanceTo(lb);
}

export default function MapView() {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [statusText, setStatusText] = useState(
    "GPS is used only to place a marker on the map; coordinates are never shown."
  );
  const [nearestPoi, setNearestPoi] = useState(null);
  const [speechActiveId, setSpeechActiveId] = useState(null);
  const gpsIntervalRef = useRef(null);
  const gpsStartedRef = useRef(false);
  const siteBoundsRef = useRef(null);

  useEffect(() => {
    siteBoundsRef.current = L.latLngBounds(SITE_BOUNDS_COORDS);
  }, []);

  useEffect(() => {
    return () => {
      if (gpsIntervalRef.current) clearInterval(gpsIntervalRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const updateNearestPoiFromLocation = (lat, lng) => {
    if (!lat || !lng) {
      setNearestPoi(null);
      return;
    }

    const pos = [lat, lng];
    let closest = null;

    TALKING_TREE_POIS.forEach((poi) => {
      const d = distanceInMeters(pos, poi.position);
      if (d <= 3) {
        if (!closest || d < closest.distance) {
          closest = { poi, distance: d };
        }
      }
    });

    setNearestPoi(closest);
  };

  const startGpsInterval = () => {
    if (gpsIntervalRef.current || !navigator.geolocation) return;

    gpsIntervalRef.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation([latitude, longitude]);
          updateNearestPoiFromLocation(latitude, longitude);
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }, 15000);
  };

  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      setStatusText("GPS is not supported in this browser.");
      return;
    }

    setStatusText("Locating…");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const loc = [latitude, longitude];
        setUserLocation(loc);
        updateNearestPoiFromLocation(latitude, longitude);
        setStatusText(
          "Location found. Your marker is placed on the map, but coordinates are not shown."
        );

        if (map) {
          map.flyTo(loc, 18, { duration: 1.2 });
        }

        if (!gpsStartedRef.current) {
          gpsStartedRef.current = true;
          startGpsInterval();
        }
      },
      () => {
        setStatusText("Unable to get GPS position. Please check permissions.");
      },
      { enableHighAccuracy: true }
    );
  };

  const handleReturnToSiteMap = () => {
    if (map && siteBoundsRef.current) {
      map.flyToBounds(siteBoundsRef.current, {
        duration: 1.0,
        paddingTopLeft: [40, 40],
        paddingBottomRight: [40, 40],
      });
    }
  };

  const handlePlayAudio = () => {
    if (!nearestPoi || !nearestPoi.poi) return;
    const synth = window.speechSynthesis;
    if (!synth) {
      alert("Text-to-Speech is not supported in this browser.");
      return;
    }

    synth.cancel();
    const utter = new SpeechSynthesisUtterance(nearestPoi.poi.tts);
    utter.lang = "en-CA";
    utter.rate = 1.0;

    utter.onstart = () => setSpeechActiveId(nearestPoi.poi.id);
    utter.onend = () => setSpeechActiveId(null);

    synth.speak(utter);
  };

  const siteBounds = siteBoundsRef.current || L.latLngBounds(SITE_BOUNDS_COORDS);

  const initialCenter = [44.6255, -63.9222];

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mt-3 mb-2">
        <button
          type="button"
          onClick={handleLocateUser}
          className="px-5 py-2 rounded-full font-semibold border border-blue-700 bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          YOU ARE HERE
        </button>
        <button
          type="button"
          onClick={handleReturnToSiteMap}
          className="px-5 py-2 rounded-full font-semibold border border-neutral-400 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          Return to Site Map
        </button>
      </div>

      <p className="text-center text-sm mb-2 px-4">{statusText}</p>

      <div className="mx-auto max-w-6xl border border-neutral-300 rounded-xl overflow-hidden">
        <MapContainer
          center={initialCenter}
          zoom={16}
          minZoom={15}
          maxZoom={19}
          style={{ height: "85vh", width: "100%" }}
          whenCreated={setMap}
          maxBounds={siteBounds.pad(0.15)}
          maxBoundsViscosity={1.0}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <div
            className="leaflet-top leaflet-right"
            style={{ pointerEvents: "none" }}
          >
            <div className="m-2 bg-white/90 rounded-md shadow px-2 py-1 text-xs font-semibold text-neutral-800 flex flex-col items-center">
              <span>North</span>
              <span>↑</span>
            </div>
          </div>

          <Polygon
            positions={SITE_BOUNDS_COORDS}
            pathOptions={{
              color: "green",
              weight: 2,
              fillOpacity: 0,
            }}
          />

          <Polygon
            positions={REWILDING_COORDS}
            pathOptions={{
              color: "darkgreen",
              weight: 2,
              fillColor: "#3fbf3f",
              fillOpacity: 0.1,
            }}
          />

          <Polyline
            positions={PATH_COORDS}
            pathOptions={{
              color: "#2c7be5",
              weight: 3,
              dashArray: "6 6",
            }}
          />

          <Marker position={POINTS.dock} icon={defaultIcon}>
            <Tooltip direction="top" offset={[0, -8]} permanent>
              Dock
            </Tooltip>
          </Marker>

          <Marker position={POINTS.trailhead} icon={ICONS.trailhead}>
            <Tooltip direction="top" offset={[0, -8]} permanent>
              Trailhead
            </Tooltip>
            <Popup>
              <strong>Trailhead</strong>
              <p>Main entrance to the woodland trails.</p>
            </Popup>
          </Marker>

          <Marker position={POINTS.farmhouseFoundation} icon={ICONS.farmhouse}>
            <Tooltip direction="top" offset={[0, -8]} permanent>
              Farmhouse Foundation
            </Tooltip>
            <Popup>
              <strong>Farmhouse Foundation</strong>
              <p>The remains of an early farmhouse.</p>
            </Popup>
          </Marker>

          <Marker position={POINTS.well} icon={ICONS.well}>
            <Tooltip direction="top" offset={[0, -8]} permanent>
              Well
            </Tooltip>
            <Popup>
              <strong>Well</strong>
              <p>This old well supplied water to the area.</p>
            </Popup>
          </Marker>

          <Marker position={POINTS.sittingArea} icon={ICONS.sittingArea}>
            <Tooltip direction="top" offset={[0, -8]} permanent>
              Sitting Area
            </Tooltip>
            <Popup>
              <strong>Sitting Area</strong>
              <p>A quiet place to rest and observe nature.</p>
            </Popup>
          </Marker>

          <Marker position={POINTS.yellowBirch} icon={ICONS.yellowBirch}>
            <Tooltip direction="top" offset={[0, -8]} permanent>
              Coastal Yellow Birch
            </Tooltip>
            <Popup>
              <strong>Coastal Yellow Birch</strong>
              <p>An important tree species for biodiversity.</p>
            </Popup>
          </Marker>

          <Marker position={POINTS.labyrinthEntrance} icon={ICONS.labyrinth}>
            <Tooltip direction="top" offset={[0, -8]} permanent>
              Labyrinth Entrance
            </Tooltip>
            <Popup>
              <strong>Labyrinth Entrance</strong>
              <p>Entrance to the small woodland labyrinth.</p>
            </Popup>
          </Marker>

          {userLocation && (
            <Marker position={userLocation} icon={defaultIcon}>
              <Tooltip direction="top" offset={[0, -8]} permanent>
                You are here
              </Tooltip>
            </Marker>
          )}
        </MapContainer>
      </div>

      {nearestPoi && (
        <div className="fixed bottom-6 right-6 z-[1000]">
          <button
            type="button"
            onClick={handlePlayAudio}
            className="px-4 py-3 rounded-full shadow-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700"
          >
            Play Audio — {nearestPoi.poi.name} ({nearestPoi.distance.toFixed(1)} m)
          </button>
        </div>
      )}

      <p className="mt-3 text-center text-xs text-neutral-600">
        Map bounds, paths, and Talking Trees are approximations to support on-site navigation and education.
      </p>
    </div>
  );
}
