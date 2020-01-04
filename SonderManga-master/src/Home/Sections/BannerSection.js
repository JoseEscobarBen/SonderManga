import React, { Component } from 'react';
import '../Styles/BannerSection.css';
import BannerCart from '../../GeneralComponents/Components/BannerCart';

class BannerSection extends Component {
  render() {
    //console.log(this.props.newsData)

    var images = this.props.newsData.map((act)=>{
      return act.imagen;
    });

    var tittles = this.props.newsData.map((act)=>{
      return act.titulo;
    });

    var externalUrl = this.props.newsData.map((act)=>{
      return act.url;
    });

    var date = this.props.newsData.map((act)=>{
      return act.fecha;
    });

    return (
        <section className="bannerMangaSection">
            <BannerCart image={images[0]}
                        tittle={tittles[0]}
                        externalUrl={externalUrl[0]}
                        date={date[0]}/>
            <BannerCart image={images[1]} 
                        tittle={tittles[1]}
                        externalUrl={externalUrl[1]}
                        date={date[1]}/>
            <BannerCart image={images[2]} 
                        tittle={tittles[2]}
                        externalUrl={externalUrl[2]}
                        date={date[2]}/>
        </section>
    );
  }
}

export default BannerSection;
