import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './event-map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlZmFuYnV0bGVyIiwiYSI6ImNtMzdmcncwMjBmamIyanNlODYyNDkwY3EifQ.1CrUKQTuJH1TKJsw3yrf-w';

function EventMap ({events, radius, location}) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    
    console.log(`location = ${location.longitude}, ${location.latitude}`);

    if (!location || !location.latitude || !location.longitude) {
      console.error("location data error");
      return;
    }

    //initialise map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [parseFloat(location.longitude), parseFloat(location.latitude)],
      zoom: 8,
      projection: { name: 'mercator' },
    });


   // add a marker for each event
    events.forEach((event) => {
      const longitude = parseFloat(event._embedded.venues[0].location.longitude);
      const latitude = parseFloat(event._embedded.venues[0].location.latitude);
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(`<h3>${event.name}</h3><p>${event._embedded.venues[0].name}</p>`)
        )
        .addTo(map);
    });

  //  // add circle to show the search radius
  //   map.on('load', () => {
  //     map.addSource('radius-circle', {
  //       paint: {
  //         'circle-radius': radius * 100,
  //         'circle-color': 'rgba(0, 123, 255, 0.5)',
  //         'circle-stroke-width': 2,
  //         'circle-stroke-color': 'rgba(0, 123, 255, 0.5)'
  //       }
  //     })
  //   })
  //     map.on('load', () => {
  //       map.addSource('radius-circle', {
  //         type: 'geojson',
  //         data: {
  //           type: 'Feature',
  //           geometry: {
  //             type: 'point',
  //             coordinates: [location.longitude, location.latitude],
  //             paint: {
  //               "circle-radius": radius * 100, 
  //               "circle-color": "rgba(0, 123, 255, 0.3)",
  //               "circle-stroke-width": 2,
  //               "circle-stroke-color": "rgba(0, 123, 255, 0.5)",
  //             },
  //           }
  //         }
  //       })
  //     })

    //cleanup on unmount
    return () => map.remove();
  }, [events, radius, location]);

  return <div ref={mapContainerRef} className='map-container'></div>

}

export default EventMap;