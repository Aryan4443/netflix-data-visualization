import { useState, useMemo } from 'react';
import { getGenreDistribution, getYearlyContent, getTypeDistribution, getTopRated, getCountryDistribution, getRatingDistribution } from '../data/netflixData';
import GenreChart from './charts/GenreChart';
import YearlyTrendChart from './charts/YearlyTrendChart';
import TypeChart from './charts/TypeChart';
import TopRatedTable from './charts/TopRatedTable';
import CountryChart from './charts/CountryChart';
import RatingChart from './charts/RatingChart';
import FilterPanel from './FilterPanel';
import ContentList from './ContentList';
import './Dashboard.css';

const Dashboard = ({ selectedGenre, setSelectedGenre, contentData }) => {
  // Filter data based on selected genre
  const filteredData = useMemo(() => {
    if (selectedGenre === 'All') return contentData;
    return contentData.filter(item => item.genre === selectedGenre);
  }, [selectedGenre, contentData]);

  // Get unique genres for filter
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(contentData.map(item => item.genre))];
    return ['All', ...uniqueGenres.sort()];
  }, [contentData]);

  // Process filtered data for charts with titles
  const genreData = useMemo(() => {
    const genreMap = {};
    filteredData.forEach(item => {
      if (!genreMap[item.genre]) {
        genreMap[item.genre] = { count: 0, titles: [] };
      }
      genreMap[item.genre].count++;
      genreMap[item.genre].titles.push(item.title);
    });
    return Object.entries(genreMap).map(([name, data]) => ({ 
      name, 
      value: data.count,
      titles: data.titles 
    }));
  }, [filteredData]);

  const yearlyData = useMemo(() => {
    const yearMap = {};
    filteredData.forEach(item => {
      if (!yearMap[item.year]) {
        yearMap[item.year] = { count: 0, titles: [] };
      }
      yearMap[item.year].count++;
      yearMap[item.year].titles.push(item.title);
    });
    return Object.entries(yearMap)
      .map(([year, data]) => ({ 
        year: parseInt(year), 
        count: data.count,
        titles: data.titles 
      }))
      .sort((a, b) => a.year - b.year);
  }, [filteredData]);

  const topRatedData = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);
  }, [filteredData]);

  const countryData = useMemo(() => {
    const countryMap = {};
    filteredData.forEach(item => {
      if (!countryMap[item.country]) {
        countryMap[item.country] = { count: 0, titles: [] };
      }
      countryMap[item.country].count++;
      countryMap[item.country].titles.push(item.title);
    });
    return Object.entries(countryMap)
      .map(([name, data]) => ({ name, value: data.count, titles: data.titles }))
      .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <FilterPanel 
          genres={genres} 
          selectedGenre={selectedGenre} 
          setSelectedGenre={setSelectedGenre}
          totalContent={filteredData.length}
        />
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Content</h3>
            <p className="stat-number">{filteredData.length}</p>
          </div>
          <div className="stat-card">
            <h3>Average Rating</h3>
            <p className="stat-number">
              {(filteredData.reduce((sum, item) => sum + item.rating, 0) / filteredData.length).toFixed(1)}
            </p>
          </div>
          <div className="stat-card">
            <h3>Content Types</h3>
            <p className="stat-number">
              {new Set(filteredData.map(item => item.type)).size}
            </p>
          </div>
          <div className="stat-card">
            <h3>Countries</h3>
            <p className="stat-number">
              {new Set(filteredData.map(item => item.country)).size}
            </p>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h2 className="chart-title">Content by Genre</h2>
            <GenreChart data={genreData} />
          </div>

          <div className="chart-card">
            <h2 className="chart-title">Content Release Trends</h2>
            <YearlyTrendChart data={yearlyData} />
          </div>

          <div className="chart-card">
            <h2 className="chart-title">Content Type Distribution</h2>
            <TypeChart data={getTypeDistribution()} />
          </div>

          <div className="chart-card">
            <h2 className="chart-title">Top Rated Content</h2>
            <TopRatedTable data={topRatedData} />
          </div>

          <div className="chart-card">
            <h2 className="chart-title">Content by Country</h2>
            <CountryChart data={countryData} />
          </div>

          <div className="chart-card">
            <h2 className="chart-title">Rating Distribution</h2>
            <RatingChart data={getRatingDistribution()} />
          </div>
        </div>

        <div className="content-list-section">
          <ContentList data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

