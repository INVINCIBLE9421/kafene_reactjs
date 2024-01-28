import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Header.css"

const Header = () => {
    const location=useLocation();
    const currentPath = location?.pathname || '';
    return (
        <div className="header">
            <div className='left-side'>
                <div className='logo'>
                    <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo"/>
                    <p className='brand'>Kafene</p>
                </div>
                <nav>
                    <Link className={`link ${currentPath === '/orders' ? 'disabled' : ''}`} to='/orders'>Orders</Link>
                    <Link className={`link ${currentPath === '/products' ? 'disabled' : ''}`} to='/products'>Products</Link>
                    <Link className={`link ${currentPath === '/users' ? 'disabled' : ''}`} to='/users'>Users</Link>
                </nav>
            </div>
            <Link className='link' id='logout' to="/">Logout</Link>
        </div>
    )
}

export default Header
