require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Data = require("./Data");
const axios = require("axios");

const app = express();

const allowedOrigins = [
    "https://earthquake-visualization-1raf.vercel.app",
    "http://localhost:3000"
];

app.use(
    cors({
        origin: allowedOrigins,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected to database");

        app.post("/refetchEarthquakeData", async (req, res) => {
            try {
                const resp = await axios.get(
                    "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json"
                );
                if (resp.status === 200) {
                    const apiData = resp.data.Infogempa.gempa;
            
                    // Prepare new data for saving
                    const dataPromises = apiData.map(async (x) => {
                        const filter = { DateTime: x.DateTime, Region: x.Wilayah };
                        const coordinates = x.Coordinates.split(',');
                        const update = { 
                            DateTime: x.DateTime, 
                            Region: x.Wilayah, 
                            Magnitude: x.Magnitude, 
                            Latitude: coordinates[0], 
                            Longtitude: coordinates[1]
                        };

                        // Update the data if it exists already, else create a new document
                        return Data.findOneAndUpdate(filter, update, { new: true, upsert: true });
                    });

                    // Save or update all new data
                    await Promise.all(dataPromises);

                    res.status(200).json({ message: "Data updated in DB" });
                } else {
                    res
                        .status(resp.status)
                        .json({ err: resp.statusText, message: "Error from API" });
                }
            } catch (err) {
                res.status(500).json({ err: err, message: "Unexpected Error" });
            }
        });

        app.get('/getGeoJsonData', async (req, res) => {
            try {
                const fetchedData = await Data.find({});
                if (fetchedData && fetchedData.length > 0) {
                    const geoJson = fetchedData.map(x => ({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [parseFloat(x.Latitude), parseFloat(x.Longtitude)] 
                        },
                        properties: {
                            id: x._id,
                            DateTime: x.DateTime,
                            region: x.Region,
                            magnitude: x.Magnitude,
                        }
                    }));
                    res.json({ code: 200, data: geoJson, msg: 'fetched data to frontend' });
                } else {
                    res.json({ code: 400, msg: "data not found from db" });
                }
            } catch (err) {
                console.log('err', err);
                res.status(500).json({ err: err.toString(), message: "Unexpected Error" });
            }
        });
        app.listen(process.env.PORT_NUMBER, () => console.log(`Server running on ${process.env.PORT_NUMBER}`));
    })
    .catch((err) => {
        console.log(err);
    });
