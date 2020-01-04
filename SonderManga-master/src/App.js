import React, { Component } from 'react';

import Mangachapter from './MangaChapter/Mangachapter';
import Homepage from './Home/Homepage';
import NavBar from './GeneralComponents/Components/NavBar';
import Visor from './MangaView/Visor';
import Search from './Search/Search';
import Genders from './Genders/Genders';
import ScrollToTopOnMount from './GeneralComponents/Components/ScrollToTopOnMount';
import './App.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";


const APIActual = 'http://165.227.214.139:8087/actual';
const APITop ='http://165.227.214.139:8087/popular';
const APINotices ='http://165.227.214.139:8087/noticias';
const APIGenres ='http://165.227.214.139:8087/generos';

class App extends Component {
  statusAct = false;
  constructor(props){
    super(props)
    this.state = {
        actual:[],
        tops:[],
        news:[],
        mangaGenres:[]
      };
  }
  
  async componentDidMount() {
    //console.log(APIActual);
      fetch(APIActual)
          .then(response => response.json())
          .then(data => this.setState({ actual: data.actual }));
      fetch(APITop)
          .then(response => response.json())
          .then(data => this.setState({ tops: data.popular }));
      await fetch(APINotices)
          .then(response => response.json())
          .then(data => this.setState({ news: data.noticias}));
      fetch(APIGenres)
          .then(response => response.json())
          .then(data => this.setState({ mangaGenres: data.generos}));
    this.statusAct = true;
  }

  componentDidUpdate(){
    let navBarWrapper = document.getElementById('navBarWrapper');
    if(navBarWrapper){

      let aux = 0;
      
      window.addEventListener('scroll',function(){
      
        if(window.scrollY>aux){
              navBarWrapper.classList.add('ocultar');
        }
         else{
              navBarWrapper.classList.remove('ocultar'); 
         }
         aux = window.scrollY;
      });
    }
  }

  render(){
    const { actual } = this.state;
    const { tops } = this.state;
    const { news } = this.state;
    const { mangaGenres } = this.state;
    //console.log(actual)
    //console.log(tops)
    //console.log(notices)
    //console.log(mangaGenres)
    if(this.statusAct){
      return(
        <BrowserRouter>
        <div className="gridPage">
          <ScrollToTopOnMount/>
          <div className="navBarGrid">
            <NavBar className="navBarGrid"/>
          </div>
          <div className="bodyGrid">
          <Switch>
            <Route path="/" render={()=><Homepage homedata={actual} homedataLastFour={tops} newsData={news} genresData={mangaGenres} emisor={"actual"}/>} exact />
            <Route path="/tops" render={()=><Homepage homedata={tops} homedataLastFour={actual} newsData={news} genresData={mangaGenres} emisor="tops"/>}/>
            <Route path="/search" render={()=><Search genresData={mangaGenres}/> }/> 
            <Route path="/genre" render={()=><Genders homedata={mangaGenres} genresData={mangaGenres}/>}/>
            { <Route path={"/chapters/:mangaName/:mangaId"} render={()=><Visor/>} />}
            { <Route path={"/chapters/:chapterMangaName"} render={()=><Mangachapter homedata={actual} genresData={mangaGenres} emisor={"sugerencias"}/>} /> }
            { <Route path={"/searching/:textSearch"} render={()=><Search genresData={mangaGenres}/>}/> }
            { <Route path={"/genres/:genreName"} render={()=><Genders homedata={mangaGenres} genresData={mangaGenres}/>} />}
          </Switch>
          </div>
          <div className="footerGrid"></div>
        </div>
        </BrowserRouter>
      );
    }else{
      return null;
    }

  }
}


export default App;
