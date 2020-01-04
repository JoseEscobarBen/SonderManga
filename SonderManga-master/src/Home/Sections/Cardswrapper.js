import React, { Component } from 'react';

import MangaCart from '../../GeneralComponents/Components/MangaCart';
import '../Styles/Cardswrapper.css';

class Cardsgrapper extends Component {

  render() {
    //console.log(this.props.upgrade)
    var urlMangas = this.props.upgrade.map((act, i) => {
        return act.ultimo_capitulo.substring(
        act.ultimo_capitulo.indexOf('/',25)+1, act.ultimo_capitulo.lastIndexOf('/'));
    });  

    var namechapt= this.props.upgrade.map((act) =>{
        return act.lista_capitulos_url.substring(act.lista_capitulos_url.lastIndexOf('/')+1, act.lista_capitulos_url.lastIndexOf('.html'));
    });
    
    var idnumbe= urlMangas.map((name) =>{
        return name.substring(name.indexOf('/')+1);
    });

    var epis= this.props.upgrade.map((name) =>{
        return name.numero_capitulo;
    });

    var lastUpdate =  this.props.upgrade.map((act) => {
        return act.emicion;
    });
    var viewers =  this.props.upgrade.map((act) => {
        return act.vistas;
    }); 

    var images =  this.props.upgrade.map((act) => {
        return act.imagen;
    });

    var names =  this.props.upgrade.map((act) => {
        return act.nombre;
    });

    var chapterList =  this.props.upgrade.map((act) => {
        return act.lista_capitulos_url;
    }); 
    
    var chaptersText = "Últimos Capítulos";

    if(this.props.emisor==="tops"){
        chaptersText = "Top Mangas";
        viewers =  this.props.upgrade.map((act) => {
            return act.vistos;
        });
    }
     
    return (
        <section className="last-episodes">
            <h2>{chaptersText}</h2>
            <div className="episode-list">
                {this.props.upgrade.map((act, i) => 
                    <MangaCart key={i}
                        image={images[i]} 
                        tittle={names[i]} 
                        episode={epis[i]}
                        namechp={namechapt[i]}
                        idnum={idnumbe[i]}
                        chapterlist={chapterList[i]}
                        emision ={lastUpdate[i]}
                        vistas = {viewers[i]}
                        emisor={this.props.emisor}/>)
                }
            </div>
        </section>
    );
  }
}

export default Cardsgrapper;
