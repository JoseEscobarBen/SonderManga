import React, { Component } from 'react';
import CardsGenderwrapper from './Sections/CardsGenderwrapper';
import GenerSection from '../GeneralComponents/Components/GenerSection';
import ElementBarGener from './Components/ElementBarGener';
import ImagePhone from './Images/SonderMessagePhone.svg';
import ImagePC from './Images/SonderMessagePC.svg';

import './Genders.css';

import {withRouter} from 'react-router-dom';


class Genders extends Component {

  _isMounted = false;

  constructor(props){
    super(props)
    this.state = {
        genreData:[],
        limite:0,
        marcador:0,
        nameGenre: this.props.match.params.genreName,
        statusGenre: false
    };
    /*this.handleChangeBar = this.handleChangeBar.bind(this);*/
  }
  componentDidMount() {
    this._isMounted = true;
    /*PRIMERA PETICION AL API */
    var APIGenre ="http://165.227.214.139:8087/generodata?clave="+this.state.nameGenre+"&pagina=1"; 
    //console.log(APIGenre);
    fetch(APIGenre)
        .then(response => response.json())
        .then(dato =>{if(this.state.nameGenre && this._isMounted){ this.setState({ genreData : dato.resultados[0],
                                        limite : dato.resultados[1][1],
                                        marcador : dato.resultados[1][0],
                                        statusGenre : true})
                                      }
                                      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {//VERIFICA QUE EL PATH HAYA CAMBIADO
        window.scrollTo(0, 0);
        /*OBTIENE EL PARAMETRO "mangaId" DEL NUEVO PATH*/
        let newgenre = this.props.location.pathname.substring(
            this.props.location.pathname.lastIndexOf('/')+1
        );
        /*REINICIA LOS VALORES DE LOS ESTADOS(CUESTION ESTETICA => MUESTRA LOS VALORES PREDETERMINADOS EN LUGAR DE CAMBIARLOS ABRUTAMENTE) */
        this.setState({ genreData: [] });
        this.setState({ limite: 0 });
        this.setState({ marcador: 0 });
        //this.setState({ statusGenre: false});
        /*NUEVA PETICION AL API*/
        var APIGenre2 ="http://165.227.214.139:8087/generodata?clave="+newgenre+"&pagina=1"; 
        //console.log(APIGenre);
        fetch(APIGenre2)
        .then(response => response.json())
        .then(dato => { if(this._isMounted){ this.setState({ genreData: dato.resultados[0],
                                        limite : dato.resultados[1][1],
                                        marcador : dato.resultados[1][0],
                                        statusGenre : true}) } } );
    }
    if(this.state.marcador!==prevState.marcador){/*VERIFICA QUE EL ESTADO DEL MARCADOR HAYA CAMBIADO ES DECIR SE DISPARA
        LUEGO DE "componentDidMount" Y LUEGO DE LA CONDICIONAL INMEDIATAMENTE ANTERIOR A ESTA*/
        /*console.log(prevState.marcador)
        console.log(this.state.marcador)*/

        if(+prevState.marcador + +"1"<this.state.limite){/*VERIFICA QUE EL MARCADOR SEA MENOR AL LIMITE, LE SUMAMOS UNO
            YA QUE EN "componentDidMount" Y LA CONDICIONAL INMEDIATAMENTE ANTERIOR YA SE HAN HECHO LAS PETICIONES CON
            MARCADOR=1*/
            /*PETICION AL API */
            var APINextGenre = "http://165.227.214.139:8087/generodata?clave="+this.state.nameGenre+"&pagina="+(+this.state.marcador + +"1"); 
            //console.log(APINextGenre);
            fetch(APINextGenre)
                .then(response => response.json())
                .then(dato =>{ if(this._isMounted){ this.setState({ genreData: this.state.genreData.concat(dato.resultados[0]),
                                                marcador : +this.state.marcador + +"1"}) } } ); 
        }
        
    }
  }

  render() {
    const {genreData} = this.state;
    var existParam = false;
    if(this.props.match.params.genreName){
      existParam = true
    }
    //console.log(this.props.homedata)

    /*GENRE BAR */
    var textGenre = this.props.match.params.genreName;
    var forName = this.props.homedata.map((act)=>{
      return act.nombre;
    });
    var forUrl = this.props.homedata.map((act)=>{
      return act.url_genero;
    });

    var forBar = this.props.homedata.map((act, i)=>{
      return <ElementBarGener key={i} genreUrl={forUrl[i]} genreName={forName[i]}/>
    });
    var genresForBar = forBar.slice(29);
    /*END GENRE BAR */

    const alternativeView = (
      <div className="alternativeForSearch">
        <img className="imagePhone" src={ImagePhone} alt="loading..."/>
        <img className="imagePC" src={ImagePC} alt="loading..."/>
      </div>
    );

    return (
      <div className="gendersContainer">
        <div className="genderSection"><GenerSection genresData={this.props.genresData}/></div>
        <div className="generDescriptionSection"> 
        { existParam? (<CardsGenderwrapper upgrade={genreData} textGenre={textGenre}/>) : alternativeView}
        </div>
        <div className="backgroundGenders"/>
        <div className="blockGenders">{genresForBar}</div>
      </div>
    );
  }
}

export default withRouter(Genders);
