import React, { Component } from 'react';

import '../Styles/GenerButton.css';

import {NavLink,withRouter} from 'react-router-dom';

class GenerButton extends Component {
    handleOption(props){
        var myOption = document.getElementById( "moreSelectBox" );
        var newValueForGenre = myOption.options[ myOption.selectedIndex ].value;
        props.history.push("/genres/"+newValueForGenre);
    }

    render(){
        var nameCutt = this.props.genreName.substring(0, this.props.genreName.lastIndexOf('.html'));
        var verificate = "/genres/"+this.props.genreName;
        if(this.props.genreName==="More.html"){
            verificate="/genre";
        }
        var linkOrSelect = (
            <NavLink to={verificate}>{nameCutt}</NavLink>
        );
        var w = window.innerWidth;
        var selectBoxMore;

        if(this.props.genresData){
            if(w<=768){
                linkOrSelect = <a href="#0">{nameCutt}</a>;
                var genreUrls = this.props.genresData.map((act)=>{
                    return act.url_genero;
                });

                var forNames = this.props.genresData.map((act, i)=>{
                    return <option key={i} value={genreUrls[i]}>{act.nombre}</option>
                });

                var genreNames = forNames.slice(29);

                selectBoxMore = (
                    <select id="moreSelectBox" onChange={()=>this.handleOption(this.props)}>
                        {genreNames}
                    </select>
                  );
            }
        }
        
        return(
            <div className="generContainerButton">
                {linkOrSelect}
                {selectBoxMore}
            </div>
        );
    }
}

export default withRouter(GenerButton);