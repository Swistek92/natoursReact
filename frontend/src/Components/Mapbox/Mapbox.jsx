import React, { useState } from 'react';
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from 'react-map-gl';
const Mapbox = ({ tour }) => {
  const locations = Object.values(tour.locations);
  const [showPopup, setShowPopup] = useState(true);
  const [lng, setLng] = useState(locations[0].coordinates[0]);
  const [lat, setLat] = useState(locations[0].coordinates[1]);

  return (
    <>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{
          width: '100%',
          height: '60vh',
          borderRadius: '15px',
          border: '2px solid pink',
        }}
        initialViewState={{
          zoom: 6,
          longitude: lng,
          latitude: lat,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {locations.map((e, i) => {
          return (
            <div key={e.coordinates[0]}>
              <Popup
                longitude={e.coordinates[0]}
                latitude={e.coordinates[1]}
                anchor="bottom"
              >
                {`day ${i + 1} `}
              </Popup>
              <Marker
                longitude={e.coordinates[0]}
                latitude={e.coordinates[1]}
              />
            </div>
          );
        })}
        <NavigationControl position="bottom-left" />
        <FullscreenControl />

        <GeolocateControl />
      </Map>
    </>
  );
};

export default Mapbox;
