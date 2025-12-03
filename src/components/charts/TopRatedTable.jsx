import './TopRatedTable.css';

const TopRatedTable = ({ data }) => {
  return (
    <div className="table-container">
      <table className="rated-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Title</th>
            <th>Type</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="rank-cell">#{index + 1}</td>
              <td className="title-cell">{item.title}</td>
              <td>{item.type}</td>
              <td>{item.genre}</td>
              <td className="rating-cell">
                <span className="rating-value">{item.rating}</span>
                <span className="rating-stars">⭐</span>
              </td>
              <td>{item.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopRatedTable;

