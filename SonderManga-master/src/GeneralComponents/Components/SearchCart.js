import React, { Component } from 'react';

import '../Styles/SearchCart.css';

import {NavLink} from "react-router-dom";

class SearchCart extends Component {

  render() {
    var verificate="#";
    var verificateLastChapter = "#";

    verificate="/chapters/"+this.props.namechp;
    verificateLastChapter="/chapters/"+this.props.namechp+"/"+this.props.idnum;

    var views = this.props.cutFor.substring(this.props.cutFor.lastIndexOf('\nVisto:')+8);

    var minorcut = this.props.cutFor.substring(1,this.props.cutFor.lastIndexOf('\nVisto:')).replace(/\n/g,'; ');

    return (
        <div className="cardMangaDescriptionContainer">
          <NavLink to={verificate}>
            <img src={this.props.image} alt="loading..."/>
          </NavLink>
          <NavLink to={verificate}>
            <div className="shadowImgCardSearch"/>
          </NavLink>
          <NavLink to={verificate} className="tittle">
          {/* <div className="tittle"> */}
              <h3>{this.props.tittle}</h3>
          {/* </div> */}
          </NavLink>
          
          <div className="dataContainer">
            <p className="subtittle gender">Géneros</p>
            <p className="subtittle emision">Emisión</p>
            <p className="subtittle view">Vistas</p>
            <p className="subtittle lastChapter">Último capítulo</p>
            <p className="description dataGender">{minorcut}</p>
            <p className="description dataEmision">{this.props.emision}</p>
            <p className="description dataViews">{views}</p>
            <NavLink to={verificateLastChapter} className="description dataLastChapter">{this.props.episode}</NavLink>
          </div>
        </div>  
    );
  }
}

export default SearchCart;