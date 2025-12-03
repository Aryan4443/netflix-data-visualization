import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="netflix-red">NETFLIX</span> Content Analytics Dashboard
        </h1>
        <p className="header-subtitle">
          Interactive data visualization of Netflix content library
        </p>
      </div>
    </header>
  );
};

export default Header;

