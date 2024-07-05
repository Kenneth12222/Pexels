import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'; 
import Logo from '../Assets/logo.png'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMenu}>
                        <img src={Logo} alt='Logo' />
                    </Link>
                    <div className={`menu-icon ${menuOpen ? 'active' : ''}`} onClick={handleMenu}>
                        <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>

                    <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMenu}>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/about' className='nav-links' onClick={closeMenu}>About</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/services' className='nav-links' onClick={closeMenu}>Services</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/contact' className='nav-links' onClick={closeMenu}>Contact</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/login' className='nav-links' onClick={closeMenu}>Login</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/signup' className='nav-links' onClick={closeMenu}>Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
