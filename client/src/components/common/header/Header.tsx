import './Header.scss';

const Header: React.FC = () => {

  return (
    
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <a href="#" className="header__link">
            CallTrackerApp
          </a>
        </div>
      </div>
    </header>
    
  )
}

export default Header;