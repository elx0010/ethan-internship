import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HotCollectionsCarousel.css'
import Skeleton from './Skeleton'

const HotCollectionsCarousel = ({ collections, loading }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 1000,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 770,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {loading ? (  
        new Array(4).fill(0).map((_, index) => (
          <div className="px-1" key={index}>
              <Skeleton width="100%" height="300px" borderRadius="10px" />
          </div>
        ))
      ) : (
        collections.map((item) => (
          <div className="px-1" key={item.id}>
            <div className="nft_coll">
              <div className="nft_wrap">
                <Link to={`/item-details/${item.nftId}`} state={{ item }}>
                  <img src={item.nftImage} className="lazy img-fluid" alt="" />
                </Link>
              </div>
              <div className="nft_coll_pp">
                <Link to={`/author/${item.authorId}`}>
                  <img className="lazy pp-coll" src={item.authorImage} alt="" />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to="/explore">
                  <h4>{item.title}</h4>
                </Link>
                <span>ERC-{item.code}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </Slider>
  );
}

export default HotCollectionsCarousel

