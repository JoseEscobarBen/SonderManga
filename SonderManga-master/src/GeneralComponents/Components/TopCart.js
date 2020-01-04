import React, { Component } from 'react';
import '../Styles/TopCart.css';
import {NavLink} from 'react-router-dom';

class TopCart extends Component{
    render(){
        //console.log(this.props.upgrade)
        /*var buttonText = "Capitulos";*/

        var urlMangas = this.props.upgrade.map((act, i) => {
            return act.ultimo_capitulo.substring(
            act.ultimo_capitulo.indexOf('/',25)+1, act.ultimo_capitulo.lastIndexOf('/'));
        });

        var idnumbe= urlMangas.map((name) =>{
            return name.substring(name.indexOf('/')+1);
        });

        var images= this.props.upgrade.map((act, i) => {
            return act.imagen;
        });

        var emision= this.props.upgrade.map((act, i) => {
            return act.emicion;
        });

        var name= this.props.upgrade.map((act, i) => {
            return act.nombre;
        });

        var verificate = "/chapters/"+name[this.props.count];

        if(this.props.emisor==="tops"){
            /*buttonText = "Ver";*/
            verificate = "/chapters/"+name[this.props.count]+"/"+idnumbe[this.props.count];
        } 
         
        
        return(
            <NavLink className="topCartContainer" to={verificate}>
                <img src={images[this.props.count]} alt="Loading..."/>
                <div className="tittleTopCart"><h3>{name[this.props.count]}</h3></div>
                <div className="date"><p>{emision[this.props.count]}</p></div>
                <div className="buttonChapter"><p>Capítulos</p></div>
            </NavLink>
        );
    }
}

export default TopCart;