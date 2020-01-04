import React, { Component } from 'react';

import '../Styles/MangaCart.css';

import {NavLink} from "react-router-dom";

class MangaCart extends Component {

  render() {

    var verificate="#";
    var verificateMoreChapters = "#";
    var episodeSpan= <span className="epis">{this.props.episode}</span>;
    var nameUrl = this.props.namechp;
    //console.log(nameUrl)
    if(this.props.namechp.indexOf('%')!==-1){
      let a = this.props.namechp.indexOf('%');
      if(this.props.namechp.indexOf('%', a+1)!==-1){
        nameUrl= "mangas";
      }
    }

    verificate="/chapters/"+nameUrl+"/"+this.props.idnum;
    verificateMoreChapters = "/chapters/"+ this.props.namechp;

    if(this.props.emisor==="tops"){
      verificate="/chapters/"+this.props.namechp;
    }
    if(this.props.tittle){
      var tittleCut= this.props.tittle;
    }

    return (
        <div className="cardMangaContainer">
          <NavLink to={verificate}>
            <img src={this.props.image} alt="loading..."/>
          </NavLink>
          <NavLink to={verificate} className="tittleCardManga">
              <h3>{tittleCut}</h3>
          </NavLink>
          <div className="newChapter">
              <p>{episodeSpan}</p>
          </div>
          <div className="newDate">
              <p>{this.props.emision}</p>
          </div>
          <div className="chapters">
              <NavLink to={verificateMoreChapters}><p>+ capítulos</p></NavLink>
          </div>
          <div className="views">
              <p>{this.props.vistas}</p>
          </div>
        </div>  
    );
  }
}


export default MangaCart;
