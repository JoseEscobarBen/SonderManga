import React, { Component } from 'react';

import GenerButton from './GenerButton';
import '../Styles/GenerSection.css';

class GenerSection extends Component {
    render(){
        return(
            <div className="generContainer">
                <GenerButton genreName={"Acción.html"}/>
                <GenerButton genreName={"Comedia.html"}/>
                <GenerButton genreName={"fantasía.html"}/>
                <GenerButton genreName={"Drama.html"}/>
                <GenerButton genreName={"Escolar.html"}/>
                <GenerButton genreName={"horror.html"}/>
                <GenerButton genreName={"Romance.html"}/>
                <GenerButton genreName={"Misterio.html"}/>
                <div className="buttonMore"><GenerButton genreName={"More.html"} genresData={this.props.genresData}/></div>
            </div>
        );
    }
}

export default GenerSection;