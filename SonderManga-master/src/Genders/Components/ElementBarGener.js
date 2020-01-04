import React, { Component } from 'react';

import '../Styles/ElementBarGener.css';

import {NavLink} from 'react-router-dom';

class ElementBarGener extends Component{
    render(){
        return( 
            // <div className="contentElementGener"> 
                <NavLink className="contentElementGener" to={"/genres/"+this.props.genreUrl} >
                    <p>{"►"+this.props.genreName} </p>
                </NavLink>
            // {/* </div> */}
        );
    }
}

export default ElementBarGener;