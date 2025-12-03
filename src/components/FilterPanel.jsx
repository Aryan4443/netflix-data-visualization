import './FilterPanel.css';

const FilterPanel = ({ genres, selectedGenre, setSelectedGenre, totalContent }) => {
  return (
    <div className="filter-panel">
      <div className="filter-content">
        <div className="filter-label">
          <span>Filter by Genre:</span>
          <span className="filter-count">{totalContent} items</span>
        </div>
        <div className="filter-buttons">
          {genres.map(genre => (
            <button
              key={genre}
              className={`filter-btn ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

