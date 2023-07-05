import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import './App.css'

// Custom icon configuration for the earthquake markers
const customIcon = new Icon({
    iconUrl: '/assets/marker-icon.svg', 
    iconSize: [40, 40],
    shadowSize: [41, 41] 
});

// Function to format Date
const formatDate = (dateTime) => {
    var date = new Date(dateTime); 

    var options = { 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    };

    return date.toLocaleDateString('en-US', options);

}

// Marker component that renders the earthquake markers and fit the map to show all markers
const Markers = ({ earthquakes }) => {
    const map = useMap();
    

    useEffect(() => {
        const group = L.featureGroup();

        earthquakes.forEach(earthquake => {
            if(earthquake.geometry && earthquake.geometry.coordinates){
                L.marker(earthquake.geometry.coordinates).addTo(group);
            }
        });

        // getBounds calculates the bounding box of the featureGroup (group of markers)
        const bounds = group.getBounds();

        // if the bounds are valid, adjust the viewport to fit the bounds
        if (bounds.isValid()) { 
            map.fitBounds(bounds);
        }
    }, [earthquakes, map]);

    // Mapping each earthquake to a Marker
    return earthquakes.map((earthquake) => {
        // Formatting the earthquake date
        const formattedDate = formatDate(earthquake.properties.DateTime);
        return (
            <Marker
                icon={customIcon} // Custom icon for the marker
                key={earthquake.properties._id}
                position={earthquake.geometry.coordinates} 
            >
                <Popup>
                    <div>
                        <strong>Region:</strong> {earthquake.properties.region}
                        <br />
                        <strong>Magnitude:</strong> {earthquake.properties.magnitude}
                        <br />
                        <strong>Date & Time:</strong> {formattedDate}
                    </div>
                </Popup>
            </Marker>
        );
    });
};

const Earthquakes = ({ earthquakesData }) => {
    return (
        <MapContainer 
            className='mapContainer' 
            center={[0, 0]} 
            zoom={3} 
            scrollWheelZoom={true} 
            style={{ height: "calc(100vh - 150px)" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution="&copy; OpenStreetMap contributors"
            />
            <Markers earthquakes={earthquakesData} />
        </MapContainer>
    );
}

export default Earthquakes;
