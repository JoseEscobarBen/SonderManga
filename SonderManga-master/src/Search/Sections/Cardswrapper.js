import React, { Component } from 'react';

import SearchCart from '../../GeneralComponents/Components/SearchCart';
import '../Styles/Cardswrapper.css';

/*import imgLoli from '../Images/ImageLoli.png';*/
class Cardsgrapper extends Component {

  render() {
    var urlMangas = this.props.upgrade.map((act, i) => {
        return act.ultimo_capitulo.substring(
        act.ultimo_capitulo.indexOf('/',25)+1, act.ultimo_capitulo.lastIndexOf('/'));
    });

    var images =  this.props.upgrade.map((act) => {
        return act.imagen;
    });

    var names =  this.props.upgrade.map((act) => {
        return act.nombre;
    });

    var epis= this.props.upgrade.map((name) =>{
        return name.numero_capitulo;
    });

    var nameUrl = this.props.upgrade.map((act) => {
        return act.lista_capitulos_url.substring(act.lista_capitulos_url.lastIndexOf('/')+1, 
        act.lista_capitulos_url.lastIndexOf('.html'));
    });

    var idnumbe= urlMangas.map((name) =>{
        return name.substring(name.indexOf('/')+1);
    });

    var lastUpdate =  this.props.upgrade.map((act) => {
        return act.emicion;
    });

    var cutFotCatergoryView =  this.props.upgrade.map((act) => {
        return act.categoria;
    });

    var chaptersText = "";
    if(this.props.emisor === "search"){
        chaptersText = "Resultados";
        if(this.props.upgrade.length===0){
            chaptersText = "Sin resultados";
        }
        
    }

    
    //console.log(nameUrl)
    return (
        <section className="last-episodes">
            <h2>{chaptersText}</h2> 
            {/*  <img src={imgLoli} className="loliNoEncuentra"/> */}
            <div className="episode-list-search">
                {this.props.upgrade.map((act, i) => 
                    <SearchCart key={i}
                    image={images[i]} 
                    tittle={names[i]} 
                    episode={epis[i]}
                    namechp={nameUrl[i]}
                    idnum={idnumbe[i]}
                    emision ={lastUpdate[i]}
                    cutFor={cutFotCatergoryView[i]}/>)
                }
            </div>
        </section>
    );
  }
}

export default Cardsgrapper;
