import React, { Component } from 'react';

import Cardsgrapper from './Sections/Cardswrapper';
import BannerSection from './Sections/BannerSection';
import TopMangaCarts from './Sections/TopMangaCarts';
import GenerSection from '../GeneralComponents/Components/GenerSection';
import ScrollToTopOnMount from '../GeneralComponents/Components/ScrollToTopOnMount';

import './Homepage.css';

class Homepage extends Component {

  render() {

    return (
        <div className="homePageContainer">
          <ScrollToTopOnMount/>
          <div className="geners">
            <GenerSection genresData={this.props.genresData}/>
          </div>
          <div className="banner">
          <BannerSection newsData={this.props.newsData}/>
          </div>
          <div className="backgroundTop"/>
          <div className="top">
            <TopMangaCarts upgrade={this.props.homedataLastFour} emisor={this.props.emisor}/>
          </div>
          <div className="body">
            <Cardsgrapper upgrade={this.props.homedata} emisor={this.props.emisor}/>
          </div>
          <div className="news"/>
        </div>
    );
  }
}

export default Homepage;
