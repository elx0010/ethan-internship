import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from './Skeleton'
import './NewItemsCarousel.css'
import useCountdown from './Timer'

const NewItemsCarousel = ({ items, loading }) => {
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

  const timeLeft = useCountdown(items)
  
  return (
    <Slider {...settings}>
      {loading ? (  
        new Array(4).fill(0).map((_, index) => (
          <div className="px-1" key={index}>
            <div className="nft_coll">
              <Skeleton width="100%" height="300px" borderRadius="10px" />
            </div>
          </div>
        ))
      ) : (
        items.map((item) => (
         <div className="px-2" key={item.id}>
            <div className="nft__item">
                <div className="author_list_pp">
                <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                </Link>
                </div>
                {timeLeft[item.id] && <div className="de_countdown">{timeLeft[item.id]}</div>}

                <div className="nft__item_wrap">
                <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                        </a>
                    </div>
                    </div>
                </div>

                <Link to={`/item-details/${item.nftId}`}>
                    <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                    />
                </Link>
                </div>
                <div className="nft__item_info">
                <Link to="/item-details">
                    <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                </div>
                </div>
            </div>
        </div>
        ))
      )}
    </Slider>
  );
}

export default NewItemsCarousel

