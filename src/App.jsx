import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { fetchNetflixContent } from './services/api';
import { netflixData as sampleData } from './data/netflixData';
import './App.css';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [contentData, setContentData] = useState(sampleData);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingAPI, setIsUsingAPI] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const apiData = await fetchNetflixContent();
      
      if (apiData && apiData.length > 0) {
        setContentData(apiData);
        setIsUsingAPI(true);
        console.log('✅ Using real-time data from TMDB API');
      } else {
        setContentData(sampleData);
        setIsUsingAPI(false);
        console.log('📊 Using sample data. Add API key to use real-time data.');
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <Header />
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading comprehensive Netflix catalog...</p>
        <p className="loading-note">Fetching all available titles (this may take 30-60 seconds)</p>
      </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      {isUsingAPI && (
        <div className="api-badge">
          🔴 Live Data from TMDB API
        </div>
      )}
      <Dashboard 
        selectedGenre={selectedGenre} 
        setSelectedGenre={setSelectedGenre}
        contentData={contentData}
      />
    </div>
  );
}

export default App;

