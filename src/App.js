import './App.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import Earthquakes from './Earthquakes';
import api from './api';

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get('/getGeoJsonData');
      if (response.data.code === 200) {
        setApiData(response.data.data);
      } else {
        setError(new Error('Failed to fetch data'));
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchLatestEarthquakeData = async () => {
    try {
      setLoading(true);
      const response = await api.post('/refetchEarthquakeData');
      if (response.status === 200) {
        fetchData();
        setLoading(false);
      } else {
        setError(new Error('Failed to fetch latest data'));
      }
    } catch (err) {
      setError(err);
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className='header'>
        <div className='title'> Earthquake Visualisation </div>
        <button 
          className='refreshBtn' 
          onClick={fetchLatestEarthquakeData}
        >
          {loading ? <img className='loader' src="/assets/loading.svg" /> : "Refetch Data"}
        </button>
      </div>
      <Earthquakes earthquakesData={apiData}  />
    </>
  );
};

export default App;
