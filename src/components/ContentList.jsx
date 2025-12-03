import { useState, useMemo } from 'react';
import './ContentList.css';

const ContentList = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'rating', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });
  }, [data, searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="content-list-container">
      <div className="content-list-header">
        <h2 className="content-list-title">Complete Content Library</h2>
        <input
          type="text"
          placeholder="Search by title, genre, or country..."
          className="content-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="table-wrapper">
        <table className="content-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')} className="sortable">
                Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('type')} className="sortable">
                Type {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('genre')} className="sortable">
                Genre {sortConfig.key === 'genre' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('year')} className="sortable">
                Year {sortConfig.key === 'year' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('rating')} className="sortable">
                Rating {sortConfig.key === 'rating' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Duration</th>
              <th onClick={() => handleSort('country')} className="sortable">
                Country {sortConfig.key === 'country' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-results">No content found matching your search.</td>
              </tr>
            ) : (
              filteredAndSortedData.map((item) => (
                <tr key={item.id}>
                  <td className="title-cell-bold">{item.title}</td>
                  <td>
                    <span className={`type-badge ${item.type.toLowerCase().replace(' ', '-')}`}>
                      {item.type}
                    </span>
                  </td>
                  <td>{item.genre}</td>
                  <td>{item.year}</td>
                  <td className="rating-cell">
                    <span className="rating-value">{item.rating}</span>
                    <span className="rating-stars">⭐</span>
                  </td>
                  <td>{item.duration}</td>
                  <td>{item.country}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="content-list-footer">
        Showing {filteredAndSortedData.length} of {data.length} titles
      </div>
    </div>
  );
};

export default ContentList;

