import React, { Component } from 'react';

import '../Styles/MangaCartGender.css';

import {NavLink} from "react-router-dom";

class MangaCartGender extends Component {

  render() {
    var cutter = this.props.lastChapter;
    var forCut= this.props.name;
    if(this.props.lastChapter){
      cutter = this.props.lastChapter.substring(this.props.lastChapter.indexOf(forCut)+forCut.length);
    }
    return (
        <div className="cardMangaGenerContainer">
          <NavLink to={"/chapters/"+this.props.name+"/"+this.props.id}>
            <img src={this.props.image} alt="loading..."/>
          </NavLink>
            <div className="tittle">
                <h3>{this.props.name}</h3>
            </div>
            <div className="newChapter">
                <p>{cutter}</p>
            </div>
            <div className="chapters">
                <NavLink to={"/chapters/"+this.props.name}><p>Capitulos</p></NavLink>
            </div>
            <div className="views">
                <p>{this.props.view}</p>
            </div>
        </div>  
    );
  }
}


export default MangaCartGender;
