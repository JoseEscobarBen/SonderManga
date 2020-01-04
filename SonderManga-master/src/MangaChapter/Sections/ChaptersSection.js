import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

import '../Styles/ChaptersSection.css';

class ChaptersSection extends Component{
    render(){

        var chapters=<li><a href="#0">Chapters</a></li>;
        if(this.props.chaptersManga){
            //console.log(this.props.chaptersManga);

            //ESTO ES IGUAL QUE MANGACHAPTERS.JS INICIO END
            var idnumViewChaptersManga = this.props.chaptersManga.map((act, i) => { 
                
                return act.link_numero_capitulo.substring(
                act.link_numero_capitulo.lastIndexOf('/')+1, act.link_numero_capitulo.lastIndexOf('.'));
            });
            //console.log(idnumViewChaptersManga);

            var namechViewChaptersManga = this.props.chaptersManga.map((act, i) => { 
                let last = act.link_numero_capitulo.substring(0,act.link_numero_capitulo.lastIndexOf('/'));
                
                return last.substring(last.lastIndexOf('/')+1);
            });
            //console.log(namechViewChaptersManga);
            var emisionDate = this.props.chaptersManga.map((act)=>{
                return act.emicion_capitulo;
            });
            chapters = this.props.chaptersManga.map((act,i)=>{

                return (<li key={i}><NavLink to={"/chapters/"+namechViewChaptersManga[i]+"/"+idnumViewChaptersManga[i]}>
                                        <div>{act.numero_capitulo} </div>
                                        <div className="chapterDate">{emisionDate[i]}</div></NavLink></li>)
            });
        }

        return(
            <section className="chapterContainerSection">            
                <h2>Capítulos</h2>
                <ul>
                    {chapters}
                </ul>
            </section>
        );
    }
}

export default ChaptersSection;

