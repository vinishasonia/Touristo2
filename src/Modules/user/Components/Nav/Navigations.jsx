import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { styled, Typography } from "@mui/material";
import '../../Css/header.css';
import { Icon } from "@iconify/react/dist/iconify.js";
import { AuthContext } from "../../../GlobalContext";

const Navigation = () => {
  const { token,setToken } = useContext(AuthContext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Define styles for the Logo
  const Logo = styled("div")({
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  });
  const handleLogout = () => {
    setToken(false)
    localStorage.removeItem('userToken');
  }
  return (
    <header className="header">
      <Logo alt="Logo" sx={{ borderRadius: "20px" }}>
        <Icon icon={"carbon:flight-international"} width="45" height="45" color="#6b1a18" />
        <Typography variant="h6" sx={{ marginLeft: "10px",fontWeight:600 }}>
          Touristo
        </Typography>
      </Logo>

      {/* Navigation Links */}
      <div className={`nav-container ${isMobileMenuOpen ? "nav-open" : ""}`}>
        <nav className="nav">
          <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/packages" className="nav-link" onClick={toggleMobileMenu}>View Packages</Link>
          <Link to="/gallery" className="nav-link" onClick={toggleMobileMenu}>Gallery</Link>
          <Link to="/bookingstatus" className="nav-link" onClick={toggleMobileMenu}>Booking Status</Link>
          <Link to="/Contact" className="nav-link" onClick={toggleMobileMenu}>Contact</Link>
          <Link to="/about" className="nav-link" onClick={toggleMobileMenu}>About Us</Link>

          {token ?
            <Link  className="nav-link" onClick={handleLogout}>Logout</Link>
            :
            <Link to="/login" className="nav-link" onClick={toggleMobileMenu}>Log In</Link>
          }

        </nav>
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
    </header>
  );
};

export default Navigation;
