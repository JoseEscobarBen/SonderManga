import React, { Component } from 'react';

import MangaCartGender from '../Components/MangaCartGender';
import '../Styles/CardsGenderwrapper.css';

class CardsGenderwrapper extends Component {

  render() {
    //console.log(this.props.upgrade)
    if(this.props.textGenre){
      var genreCards;
      var images;
      var names;
      var lastChapters;
      var views;
      var forIds;
      var ids;
      var forText = this.props.textGenre.substring(0,this.props.textGenre.lastIndexOf('.html'))
      var textG= decodeURIComponent(forText).replace("&", "").replace("acute;","").replace("+"," ");
      //console.log(textG)
      if(this.props.upgrade){
        images = this.props.upgrade.map((act)=>{
          return act.imagen
        });
        names = this.props.upgrade.map((act)=>{
          return act.nombre
        });
        lastChapters = this.props.upgrade.map((act)=>{
          return act.numero_capitulo
        });
        views = this.props.upgrade.map((act)=>{
          return act.vistos
        });
        forIds= this.props.upgrade.map((act)=>{
          return act.url_ultimo_capitulo.substring(0,act.url_ultimo_capitulo.lastIndexOf('/'))
        });
        ids = forIds.map((act)=>{
          return act.substring(act.lastIndexOf('/')+1)
        });
        genreCards = this.props.upgrade.map((act,i)=>{
          return <MangaCartGender key={i} image={images[i]} name={names[i]} lastChapter={lastChapters[i]} view={views[i]} id={ids[i]}/>
        });
        
      }
    }
    //console.log(images)
    return (
        <section className="last-episodes">
            <h2>{textG}</h2>
            <div className="episode-list">
                {genreCards} 
            </div>
        </section>
    );
  }
}

export default CardsGenderwrapper;
