import { useNavigate } from 'react-router-dom';
import './_searchBar.css';
import { CiSearch } from "react-icons/ci";

function SearchBar({userFullName}) {
  const navigate = useNavigate();

    const goToHome = (e) => {
        navigate('/home');
    };

    const goToProfile = (e) => {
        navigate('/profile');
    };

  return (
    <div className= "topbar-container">
        <header className= "topbar-header">
            <img src="/playpal-logo.svg"  className="logo" alt="PlayPal Logo" onClick={goToHome}/>
            <div className="searchbar">
                <input className="search" placeholder="SEARCH"></input>
                <CiSearch />
            </div>
            <div className="profile-header" onClick={goToProfile}>
                <h3>{userFullName || 'Unknown User'}</h3>
                <div className="profile-img"></div>
            </div>
        </header>
    </div>
  );
}

export default SearchBar;