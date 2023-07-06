# earthquake-visualization
This project aims to efficiently store, retrieve, and visualize earthquake data using an API. It allows users to access and analyze earthquake information on a map for better understanding and analysis.
# Objective
The objective of this project is to develop a system that can fetch earthquake data from an API, transform the data, store it either in  a database, provide an API service to fetch the stored data and visualize the data on a map using a suitable visualization library.

## Requirements

- Fetch earthquake data from the API provided: `https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json`
- Extract required fields (e.g., latitude, longitude, magnitude, location, DateTime, region) from the JSON data
- Store the data in either a file (GeoJSON format) or a database (with a suitable data model)
- Develop an API service to fetch the stored earthquake data in GeoJSON format
- Use a visualization library like Leaflet.js or Mapbox GLJS to display the earthquake data on a map

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

git clone https://github.com/Ssravani272/earthquake-visualization.git

2. Install the necessary dependencies:

# Install dependencies for the backend/API service
npm install

# Install frontend dependencies
npm install

#Configure the project:

 database storage:
  - Configure the database connection and create the necessary tables/collections.

#Fetch and transform the earthquake data:

- Implement the logic to fetch the earthquake data from the API.
- Transform the JSON data to extract the required fields and create a structured representation of the earthquake events.

#Store the data:

 database storage:
  - Store the transformed data in the configured database.

#Develop the API service:

- Create an API endpoint that retrieves the earthquake data from the storage (file or database) and returns the response in GeoJSON format.

#Visualization:
- Use a suitable visualization library (e.g., Leaflet.js, Mapbox GLJS) to render the earthquake data on a map.
- Plot the earthquake events on the map using their latitude and longitude coordinates.
- Add interactive features to display additional information when a marker is clicked.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
