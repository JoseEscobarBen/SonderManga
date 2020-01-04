import React, { Component } from 'react';
import '../Styles/DataMangaSection.css';

class DataMangaSection extends Component{
    render(){
        var alternatives;
        if(this.props.genresManga){
            var genres = this.props.genresManga.map((act,i)=>{
                if(i=== this.props.genresManga.length-1)
                    return (act+".")
                return (act+", ")
            });
            if(this.props.genresManga.length===0){
                genres = 'Información no añadida';
            }
        }

        

        if(this.props.alternatives){
            alternatives = this.props.alternatives.replace(/;/g, ", ")+"."
            
        }
        //console.log (this.props.alternatives)

        return(
            <section className="descriptionAnimeChapterSection">
                <div className="titleContainer">
                    <h1>{this.props.nameManga}</h1>
                </div>
                <div className="photoContainer">
                    <img src={this.props.imgMangaTop} alt="Loading"/>
                </div>                
                <div className="dataContainer">
                    <p className="subtittle alternative">Alternative</p>
                    <p className="subtittle autor">Autor</p>
                    <p className="subtittle gener">Genero</p>
                    <p className="subtittle status">Status</p>
                    <p className="description dataAlternative">{alternatives}</p>
                    <p className="description dataAutor">{this.props.author}</p>
                    <p className="description dataGener">{genres}</p> 
                    <p className="description dataStatus">{this.props.mangaStatus}</p>
                </div>
            </section>
        );
    }
}

export default DataMangaSection;