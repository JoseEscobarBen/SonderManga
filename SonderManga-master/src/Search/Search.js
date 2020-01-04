import React, { Component } from 'react';

import Cardsgrapper from './Sections/Cardswrapper';
import GenerSection from '../GeneralComponents/Components/GenerSection';
import ScrollToTopOnMount from '../GeneralComponents/Components/ScrollToTopOnMount';

import './Search.css';

import {withRouter} from 'react-router-dom';

class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
        searchText: this.props.match.params.textSearch,
        searchData: [],
        isSearch : false 
    };
    this.keyPressed = this.keyPressed.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.textSearch){
      var APISearch ="http://165.227.214.139:8087/buscar/"+this.state.searchText+"?page=1"; 
      //console.log(APISearch);
      fetch(APISearch)
          .then(response => response.json())
          .then(dato => this.setState({ searchData : dato.resultados,
                                          isSearch:true}));
    }
    let inputContainer = document.getElementById('inputContainer');
    if(inputContainer){

      let auxiliar = 0;
      
        window.addEventListener('scroll',function(){
        if(window.scrollY>auxiliar){
              inputContainer.classList.add('ocultarInput');
        }
          else{
              inputContainer.classList.remove('ocultarInput');
          }
          auxiliar = window.scrollY;
      });
    }
  }
  componentDidUpdate(prevProps) {
      if(this.props.location.pathname !== prevProps.location.pathname){
          fetch("http://165.227.214.139:8087/buscar/"+this.state.searchText)
          .then(response => response.json())
          .then(data => this.setState({ searchData: data.resultados,
                                         isSearch:true}));
      }
  }

  keyPressed(e){
    if(e.keyCode === 13){
      var textValue = document.getElementById('inp').value;
      if(textValue.length!==0){
        this.setState({searchText: textValue});
        this.props.history.replace("/searching/"+textValue);
      }
    } 
  }

  render() {
    var probe =false;
    if(this.state.searchData[0]){
      probe = true
    }
    return (
        <div className="searchPageContainer">
        <ScrollToTopOnMount/>
          <div className="generSection">
            <GenerSection genresData={this.props.genresData}/>
          </div>
          <div className="inputContainer" id="inputContainer">
              <input type="text" id="inp" placeholder="Search..."
                      onKeyDown={(event)=>this.keyPressed(event)}/>
          </div>
          <div className="bodyContainer">
            { this.state.isSearch && probe ? (<Cardsgrapper upgrade={this.state.searchData[0]} emisor={"search"}/>) : null}
        </div>
        </div>
    );
  }
}

export default withRouter(Search);
