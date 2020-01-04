import React, { Component } from 'react';

import DataMangaSection from './Sections/DataMangaSection.js';
import ChaptersSection from './Sections/ChaptersSection';
import GenerSection from '../GeneralComponents/Components/GenerSection';
import ScrollToTopOnMount from '../GeneralComponents/Components/ScrollToTopOnMount.js';
import ChargePage from '../GeneralComponents/Components/ChargePage.js';
import './Mangachapter.css';

import {withRouter} from 'react-router-dom';


class Mangachapter extends Component {

  _isMounted = false;
  statusAct = false;

  constructor(props){
    super(props)
    
    this.state = {
        specificdata:[],
        chapterMangaName: this.props.match.params.chapterMangaName
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    var APIDatosChapter ="http://165.227.214.139:8087/manga/"+this.state.chapterMangaName+".html";
    //console.log(APIDatosChapter);
    fetch(APIDatosChapter)
        .then(response => response.json())
        .then(dato => { if(this._isMounted){ this.setState({ specificdata: dato.datos_manga }) } });

    this.statusAct = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps){
    if (this.props.location.pathname !== prevProps.location.pathname){
      this.setState({specificdata: []});
      var pathContainer = String(this.props.location.pathname)
      var newName = pathContainer.substring(pathContainer.lastIndexOf('/')+1);
      var APIDatosChapter ="http://165.227.214.139:8087/manga/"+newName+".html";
      //console.log(APIDatosChapter);
      fetch(APIDatosChapter)
        .then(response => response.json())
        .then(dato => { if(this._isMounted){ this.setState({ specificdata: dato.datos_manga }) } });
    }
  }

  render(){
    const { specificdata } = this.state;
    var status = true;
    //console.log(specificdata)
    if(specificdata[1]){
      //console.log(specificdata)
      //console.log(specificdata[1].length)
      if(specificdata[1].length===0){
        status = false;
      }
      var nameManga = specificdata.map((act, i) => { 

        return act.nombre;
      }); 

      var mangaData = specificdata[1].map((act, i) => { 

        return act.respuesta;
      });
      var author = mangaData[0];
      var mangaStatus = mangaData[2];

      /*DESCRIPTION & ALTERNATIVES*/
      var forAlternatDescrip = specificdata[2].map((act, i) => { 
        return act.descripcion;
      });
      var alternatives = "Información no añadida";

      var description= "Información no añadida";

      if(forAlternatDescrip[0]){
        if(forAlternatDescrip[0].lastIndexOf('Resumen')!==-1){
          description= forAlternatDescrip[0].substring(9);
          if(forAlternatDescrip[1])
            alternatives = forAlternatDescrip[1].substring(15);
        }else if(forAlternatDescrip[0].lastIndexOf('Alternativa')!==-1){
          alternatives = forAlternatDescrip[0].substring(15);
          if(forAlternatDescrip[1])
            description= forAlternatDescrip[1].substring(9);
        }
      }

      
      /*END DESCRIPTION & ALTERNATIVES*/

      /*IMG MANGA */
      let imageMangaTop = specificdata.map((act, i) => { 
        return act.imagen;
      });
      var imgMangaTop = imageMangaTop[0];

      var genresMangaTop = specificdata[3].map((act, i) => { 
        return act.generos;
      });
      /*END IMG MANGA */

      /*CHAPTERS MANGA */
      if(specificdata[4]){
        var chaptersManga = specificdata[4].map((act, i) => { 

          return act;
        }); 
      } 
    }

    if(status){
      if(this.statusAct){
        return(
          <div>
            <ScrollToTopOnMount/>
            <div className="mangaChapterContainer">
              <div className="generSection">
                <GenerSection  genresData={this.props.genresData}/>
              </div>
              <div className="dataMangaSection">
                <DataMangaSection imgMangaTop={imgMangaTop} 
                                  nameManga={nameManga}
                                  genresManga={genresMangaTop}
                                  author={author}
                                  mangaStatus={mangaStatus}
                                  alternatives={alternatives}/>  
              </div>
              <div className="descriptionMangaSection">
                <h2>Summary</h2>
                <p>{description}</p>
              </div>
              <div className="backgroundDataMangaSection"/>
              <div className="chaptersMangaSection">
                <ChaptersSection chaptersManga={chaptersManga} />
              </div>
            </div>
          </div>
        );
      }else{
        return <ChargePage/>
      }
    }else{
      return(
        <div className="PETER ENBELLECE ESTA PORQUERIA 404">
          No Se Encontraron Resultados
        </div>
      );
    }
  }
}

export default withRouter(Mangachapter);
