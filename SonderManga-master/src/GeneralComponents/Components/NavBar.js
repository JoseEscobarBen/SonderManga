import React, { Component } from 'react';
import '../Styles/NavBar.css';

import {NavLink,withRouter} from 'react-router-dom';

class NavBar extends Component{
     funcionClick(){ 
        let navbar = document.getElementById('navBar');
        
        navbar.classList.toggle('showMe');
       /*intercala la clase, si tiene la clase showme la va a quitar y si no la tiene la ativa*/
      }

    render(){   

        return(
            <header>
                <div className="navBarWrapper" id="navBarWrapper">
                    <nav>
                        <div className="logoWrapper">
                        <NavLink to="/" className="logo">SonderManga</NavLink>
                        </div>
                        <div onClick={this.funcionClick} className="menuIconWrapper" id="iconWrapper">
                        <span className="line" id="line1"></span>
                        <span className="line" id="line2"></span>
                        <span className="line" id="line3"></span>
                        </div>
                        <ul className="navLink" id="navBar">
                        <li className="link"><NavLink to="/" onClick={this.funcionClick}>Home</NavLink></li>
                        <li className="link" ><NavLink to="/search" onClick={this.funcionClick}>Busqueda</NavLink></li>
                        <li className="link" ><NavLink to="/genre" onClick={this.funcionClick}>Géneros</NavLink></li>
                        <li className="link"><NavLink to="/tops" onClick={this.funcionClick}>Top</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default withRouter(NavBar);