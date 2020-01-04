import React, { Component } from 'react';

import '../Styles/BannerCart.css';

class BannerCart extends Component{
    render(){
        return(
            <a href={this.props.externalUrl} className="bannerCartContainerGrid">
                <img src={this.props.image} alt="Loading..."/>
                <div className="shadowBox"/>
                <div className="date">{this.props.date}</div>
                <div className="bannerCartTittle"><h3>{this.props.tittle}</h3></div>
            </a>
        );
    }
}

export default BannerCart;