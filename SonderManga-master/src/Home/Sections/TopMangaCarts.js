import React, { Component } from 'react';

import TopCart from '../../GeneralComponents/Components/TopCart';

import '../Styles/TopMangaCarts.css';

class TopMangaCarts extends Component {
  render() {
    var textChange = "Best Manga";
    if(this.props.emisor==="tops"){
      textChange = "Last Updates";
    }
    return (
        <div className="topMangaCartsContainer">
        <h2>{textChange}</h2>
        <TopCart upgrade={this.props.upgrade} count={0} emisor={this.props.emisor}/>
        <TopCart upgrade={this.props.upgrade} count={1} emisor={this.props.emisor}/>
        <TopCart upgrade={this.props.upgrade} count={2} emisor={this.props.emisor}/>
        <TopCart upgrade={this.props.upgrade} count={3} emisor={this.props.emisor}/>
        </div>
    );
  }
}

export default TopMangaCarts;