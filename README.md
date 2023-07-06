# earthquake-visualization
This project aims to efficiently store, retrieve, and visualize earthquake data using an API. It allows users to access and analyze earthquake information on a map for better understanding and analysis.
# Objective
The objective of this project is to develop a system that can fetch earthquake data from an API, transform the data, store it either in  a database, provide an API service to fetch the stored data and visualize the data on a map using a suitable visualization library.

## Requirements

- Fetch earthquake data from the API provided: `https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json`
- Extract required fields (e.g., latitude, longitude, magnitude, location, DateTime, region) from the JSON data
- Store the data in a database (with a suitable data model)
- Develop an API service to fetch the stored earthquake data in GeoJSON format
- Use a visualization library like Leaflet.js to display the earthquake data on a map

## Getting Started
To get started with the project, follow these steps:

1. Clone the repository:

git clone https://github.com/Ssravani272/earthquake-visualization.git

2. Install the necessary dependencies:

# Install dependencies for the backend /API service
Run this command in the backend folder to install dependencies.
  -npm install

create a .env file in the backend folder 
Create two variables DATABASE_URL and PORT_NUMBER in the .env file.
Give your database connection URL to DATABASE_URL and your connection port number to PORT_NUMBER.

#Run the backend server by 
- node app.js

# Install frontend dependencies
Run this command in the app folder to install frontend  dependencies.
 -npm install

 Now create a .env file in the app folder 
Create a variable named REACT_APP_API_URL and give your backend localhost URL to this variable.

#Run the frontend app by
- npm start

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
