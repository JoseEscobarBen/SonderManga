import React, { Component } from 'react';

import BackIcon from  './Images/Back.svg';
import NextIcon from './Images/Next.svg';
import Error404 from './Images/Error404.png';
import ScrollToTopOnMount from '../GeneralComponents/Components/ScrollToTopOnMount';
import ChargePage from '../GeneralComponents/Components/ChargePage';


import './Visor.css';
import {withRouter, NavLink} from 'react-router-dom';
class Visor extends Component {

    _isMounted = false;

    constructor(props){
        super(props)
        this.state = {
            view:[],
            limite:0,
            marcador:0,
            imgs:[],
            viewId: this.props.match.params.mangaId,
            viewName: this.props.match.params.mangaName,
            statusVisor: true,
            statusAct : false,
        };
        this.handleChangeBar = this.handleChangeBar.bind(this);
        this.handleArrowClick = this.handleArrowClick.bind(this);
        this.sleep = this.sleep.bind(this);
        this.demo = this.demo.bind(this);
    }
    
    componentDidMount() {
        /*PRIMERA PETICION AL API */
        var API2 ="http://165.227.214.139:8087/capitulos?nombre="+this.state.viewName+"&numero_id="+this.state.viewId+"&marcador=1"; 
        //console.log(API2);
        fetch(API2)
            .then(response => response.json())
            .then(dato => { if(dato.resultados[1].length && this._isMounted){this.setState({ view: dato.resultados,
                                            imgs: dato.resultados[1],
                                            limite : dato.resultados[0][0].limite,
                                            marcador : dato.resultados[0][0].marcador,
                                            statusAct: true}) 
                                }else if(this._isMounted){
                                    this.setState({statusVisor:false})
                                }
                            });
        this._isMounted = true;           
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentDidUpdate(prevProps, prevState) {
        let barContainer = document.getElementById('barContainer');
        if(barContainer){
            let aux = 0;
                    
            window.addEventListener('scroll',function(){
                if(window.scrollY>aux){
                    barContainer.classList.add('ocultarVisor');
                }
                else{
                    barContainer.classList.remove('ocultarVisor');
                }
                aux = window.scrollY;
            });
        }


        if(this.indekusu && this.state.statusAct){//VERIFICA SI THIS.INDEKUSU NO SEA UNDEFINED
            /*HACE QUE LA OPCION DEL SELECTOR "mySelect" COINCIDA CON EL NUMERO DEL CAPITULO QUE SE ESTA 
            VIENDO ACTUALMENTE Y TAMBIEN LO ACTUALIZA AL CAMBIAR CON EL VALOR DE "this.indekusu" OBTENIDO Y ACTUALIZADO EN RENDER*/
            document.getElementById("mySelect").selectedIndex = this.indekusu ;
        }
        if (this.props.location.pathname !== prevProps.location.pathname) {//VERIFICA QUE EL PATH HAYA CAMBIADO
            /*OBTIENE EL PARAMETRO "mangaId" DEL NUEVO PATH*/
            let newID = this.props.location.pathname.substring(
                this.props.location.pathname.lastIndexOf('/')+1
            );
            /*REINICIA LOS VALORES DE LOS ESTADOS(CUESTION ESTETICA => MUESTRA LOS VALORES PREDETERMINADOS EN LUGAR DE CAMBIARLOS ABRUTAMENTE) */
            this.setState({ view: [], limite: 0, marcador: 0,  imgs: [], viewId: newID,});

            //window.scrollTo(0, 0);
            //this.statusAct = false;
            /*NUEVA PETICION AL API*/
            var API3 ="http://165.227.214.139:8087/capitulos?nombre="+this.state.viewName+"&numero_id="+newID+"&marcador=1"; 
            //console.log(API3);
            let start = Date.now();
            await fetch(API3)
            .then(response => response.json())
            .then(dato =>{if(this._isMounted){  this.setState({ view: dato.resultados,
                                            imgs: dato.resultados[1],
                                            limite : dato.resultados[0][0].limite,
                                            marcador : dato.resultados[0][0].marcador}) } } );
            let end = Date.now();
            this.timeForFetch = end - start;
            if(this.state.imgs !==prevState.imgs){
                if(!this.state.statusAct){  
                    this.demo();
                }
                
            }
        }

        
        if(this.state.marcador!==prevState.marcador){/*VERIFICA QUE EL ESTADO DEL MARCADOR HAYA CAMBIADO ES DECIR SE DISPARA
            LUEGO DE "componentDidMount" Y LUEGO DE LA CONDICIONAL INMEDIATAMENTE ANTERIOR A ESTA*/
            if(+prevState.marcador + +"1"<this.state.limite){/*VERIFICA QUE EL MARCADOR SEA MENOR AL LIMITE, LE SUMAMOS UNO
                YA QUE EN "componentDidMount" Y LA CONDICIONAL INMEDIATAMENTE ANTERIOR YA SE HAN HECHO LAS PETICIONES CON
                MARCADOR=1*/
                /*PETICION AL API */
                var APINext ="http://165.227.214.139:8087/capitulos?nombre="+this.state.viewName+"&numero_id="+this.state.viewId+"&marcador="+(+this.state.marcador + +"1"); 
                //console.log(APINext);
                fetch(APINext)
                    .then(response => response.json())
                    .then(dato => {if(this._isMounted){ this.setState({ imgs: this.state.imgs.concat(dato.resultados[1]) ,
                                                    marcador : +this.state.marcador + +"1"}) } } ); 
            }
            
        }
      }

    handleChangeBar(){
        /*SE DISPARA LUEGO DE CAMBIAR DE OPCION EN "mySelect"*/
        var myOption = document.getElementById( "mySelect" );
        var newValueForID = myOption.options[ myOption.selectedIndex ].value;
        this.setState({statusAct: false}) ;
        /*REEMPLAZAMOS EL PARAMETRO "mangaId" LO QUE OCASIONA UN CAMBIO EN EL PATH (VEASE "componentDidUpdate") */
        this.props.history.push(newValueForID);
        
    }

    handleArrowClick(verific){
        if(verific!=="#")
        this.setState({statusAct: false}) ;
    }

    sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
      
    async demo() {
        if(this.timeForFetch>7){
            this.timeForFetch = this.timeForFetch/5;
        }else{
            this.timeForFetch = this.timeForFetch/2;
        }
        await this.sleep(this.timeForFetch+3000);
        
        this.setState({statusAct: true});
    }

  render() {
    const { view } = this.state;
    const { imgs } = this.state;
    //console.log(imgs)
    //console.log(view)
    var verificateBack="#";
    var verificateAfter="#";
    var verificateChapters="#";
    //var nameText = "";
    if(view[2]){
        var urlForCut= view[2][0].nombre_cap;
        var firstCut = urlForCut.substring(3,urlForCut.lastIndexOf('.html'));
        var realName = firstCut.substring(firstCut.indexOf('/')+1, firstCut.lastIndexOf('/'))
        verificateBack="/chapters/"+ realName;
        verificateAfter="/chapters/"+ realName;
    }
    /*INICIALIZA LOS PATH DE LOS NavLink DE FLECHAS (CUANDO YA NO HAY CAPITULO SIGUIENTE O ANTERIOR, TE DEVUELVE A LA SECCION DE CAPITULOS) */
    
    /*INICIALIZA LAS OPCIONES DE "mySelect"*/
    var otherOptions = <option>Loading...</option>;

    if(view[2]){//VERIFICA QUE VIEW[2] NO SEA UNDEFINED Y ASI PODER USAR FUNCIONES LIBREMENTE
        /*INICIALIZA EL INDICE DE CHAPTERS PARA EL CAMBIO DE PATH NavLink DE FLECHA CAPITULO ANTERIOR */
        var indexChapterBefore = -5;
        /* OBTIENE EL INDICE DEL CAPITULO ANTERIOR Y LO GUARDA*/
        for(let i=0; i<view[2].length;i++){
            if(view[2][i].key){
                indexChapterBefore= i+1;
            }
        }
        /*INICIALIZA EL INDICE DE CHAPTERS PARA EL CAMBIO DE PATH NavLink DE FLECHA CAPITULO SIGUIENTE */
        var indexChapterAfter = -5;
        /* OBTIENE EL INDICE DEL CAPITULO SIGUIENTE Y LO GUARDA*/
        for(let i=0; i<view[2].length;i++){
            if(view[2][i].key){
                indexChapterAfter= i-1;
            }
        }
        /*CORTA LOS URLS PARA PODER HACER LOS SIGUIENTES CORTES MAS FACILES Y SIMPLES*/
        var myurlSelector = view[2].map((act)=>{
            return act.nombre_cap.substring(3,act.nombre_cap.lastIndexOf('.html'));
        });
        /* OBTIENE LOS IDS EXTRAIDOS DE LAS URLS, NECESARIO PARA EL CAMBIO DE URL Y LOS GUARDA*/
        var otherIds = myurlSelector.map((act)=>{
            return act.substring(act.lastIndexOf('/')+1);
        });
        /* OBTIENE LOS NOMBRES EXTRAIDOS DE LAS URLS ( GENERALMENTE SON EL MISMO) Y LOS GUARDA */
        var otherNames = myurlSelector.map((act)=>{
            return act.substring(act.indexOf('/')+1,act.lastIndexOf('/'))
        });

        if(otherNames[indexChapterBefore]){//VERIFICA QUE EXISTA UN CAPITULO ANTERIOR
            /*CAMBIA EL VALOR INICIAL DEL PATH DE NavLink DE FLECHA CAPITULO ANTERIOR*/
            verificateBack ="/chapters/"+otherNames[indexChapterBefore]+'/'+otherIds[indexChapterBefore];
            verificateChapters = "/chapters/"+otherNames[indexChapterBefore];
            /*nameText = otherNames[indexChapterBefore];
            nameText= decodeURI (nameText);*/
        }else{
            verificateChapters = "/chapters/"+otherNames[0];
           /* nameText = otherNames[0];
            nameText= decodeURI (nameText);*/
        }
        if(otherNames[indexChapterAfter]){//VERIFICA QUE EXISTA UN CAPITULO SIGUIENTE
            /*CAMBIA EL VALOR INICIAL DEL PATH DE NavLink DE FLECHA CAPITULO SIGUIENTE*/
            verificateAfter ="/chapters/"+otherNames[indexChapterAfter]+'/'+otherIds[indexChapterAfter];
            verificateChapters = "/chapters/"+otherNames[indexChapterAfter];
            /*nameText = otherNames[indexChapterAfter];
            nameText= decodeURI (nameText);*/
        }else{
            verificateChapters = "/chapters/"+otherNames[0];
            /*nameText = otherNames[0];
            nameText= decodeURI (nameText);*/
        }
        //console.log(verificateChapters)
        
        /*OBTIENE LOS NOMBRES DE TODOS LOS CAPITULOS DEL MANGA */
        var otherChapterNames = view[2].map((act)=>{
            return act.url_cap;
        });
        /*RETORNA UN OBJETO CON TODAS LAS OPCIONES LISTAS PARA PONER EN EL SELECT "mySelect" */
        otherOptions= otherChapterNames.map((act,i)=>{
            var w = window.innerWidth;
            var forCuttOption = decodeURIComponent(this.props.match.params.mangaName)
            var textOption = act;
            if(w<640){
                textOption = act.replace(forCuttOption,"").substring(0,35)
            }
            //console.log(forCuttOption)
            return <option className="optionChapter" key={i} value={otherIds[i]}>
                        {textOption}
                    </option>
        });
        /*GUARDA EL INDICE DEL CAPITULO INCIAL, TAMBIEN PUEDE USAR indexChapterBeforer-1*/
        this.indekusu = indexChapterAfter+1;   
    }
    /*  INICIALIZA LAS IMAGENES MOSTRAS CON UN H2 MOSTRANDO "Loading..." SIMULANDO LA CARGA HACIENDOLO MEJOR A LA VISTA DEL USUARIO*/
    var mangsImgs = <h2 className="previewText">Loading...</h2>;

    if(imgs){//VERIFICA QUE "imgs" NO SEA UNDEFINED
        /*ACTUALIZA LA VARIABLE "mangsImgs" CON LAS IMAGENES DEL CAPITULO ACTUAL OBTENIDAS DEL API */
        mangsImgs = imgs.map((vie, i) => 
        <img className="viewMangaImages" key={i} src={vie.imagen} alt="loading..."></img>
        );
    }
    if(mangsImgs.length===0){/*AL ACTUALIZAR EL PATH, "mangsImgs" QUEDA VACIO (VEASE "this.setState({ imgs: [] })" EN "componentDidUpdate")*/
        mangsImgs = <div className="previewText">Loading...</div>;
    }
    if(this.state.statusVisor){
        if(this.state.statusAct){
            
            return (  
                <div className="viewPageContainer">
                    {<ScrollToTopOnMount/>}
                    <div className="barViewSection">
                        <div className="barContainer" id="barContainer"> 
                            <NavLink to={verificateBack} onClick = {()=>this.handleArrowClick(verificateBack)}>
                                <img src={BackIcon} className="backIcon" alt="Icon"/>
                            </NavLink>
                            <select className="selectChapter" id="mySelect" onChange={this.handleChangeBar} >
                                {otherOptions}
                            </select>
                            <NavLink to={verificateChapters} className="linkChapters">Ver más</NavLink>
                            <NavLink to={verificateAfter} onClick = {()=>this.handleArrowClick(verificateAfter)}>
                                <img src={NextIcon} className="nextIcon" alt="Icon"/>
                            </NavLink> 
                        </div>
                    </div>
                    <div className="mangaPages">
                        {mangsImgs}
                    </div>
                </div>
            );
        }else{
            return <ChargePage/>
        }
    }else{
        return (
            <div className="pageNotWork">
                <div className="tittleError"><p>Onii-chan regresa más tarde</p></div>
                <div className="shadowPageNotWork"/>
                <img src={Error404} alt="loading..."/>
            </div>
        );
    }

  }
}

export default withRouter(Visor);
