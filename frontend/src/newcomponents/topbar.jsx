import './topbar.css';
import { CiSearch } from "react-icons/ci";

function Topbar(){
    return (
    <div className= "topbar-container">
        <header className= "topbar-header">
            <img src="/playpal-logo.svg"  className="logo" alt="PlayPal Logo"/>
            <div className="searchbar">
                <input className="search" placeholder="SEARCH"></input>
                <CiSearch />
            </div>
            <div className="profile-header">
                <h3>Enzo Arkin Panugayan</h3>
                <div className="profile-img"></div>
            </div>
        </header>
    </div>
    );
}

export default Topbar;