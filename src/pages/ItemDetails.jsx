import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { useLocation, Link, useParams } from "react-router-dom";
import Skeleton from '../components/UI/Skeleton'

const ItemDetails = () => {
  const location = useLocation()
  const { id } = useParams()
  const [loading, setLoading] = useState(!location.state?.item)
  const itemFromNav = location.state?.item
  const authorImageFromNav = location.state?.authorImage

  useEffect(() => {
    window.scrollTo(0, 0);
    if (itemFromNav) {
      setLoading(false)
    }
  }, [itemFromNav]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width="100%" height="46px" />
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <Skeleton width="100%" height="100%" />
                        </div>
                        <div className="item_info_like">
                          <Skeleton width="100%" height="100%" />
                        </div>
                      </div>
                      <Skeleton width="100%" height="78px" />
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                                <Skeleton width="50px" height="50px" borderRadius="50%" />
                            </div>
                            <div className="author_list_info">
                              <Skeleton width="100px" height="20px" />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                             <Skeleton width="50px" height="50px" borderRadius="50%" />
                            </div>
                            <div className="author_list_info">
                              <Skeleton width="100px" height="20px" />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <Skeleton width="100px" height="30px" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={itemFromNav?.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{itemFromNav?.title} #194</h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          100
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemFromNav?.likes}
                        </div>
                      </div>
                      <p>
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                        illo inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo.
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemFromNav?.authorId}`}>
                                <img className="lazy" src={itemFromNav?.authorImage || authorImageFromNav} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemFromNav?.authorId}`}>{itemFromNav?.authorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemFromNav?.authorId}`}>
                                <img className="lazy" src={itemFromNav?.authorImage || authorImageFromNav} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>

                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemFromNav?.authorId}`}>{itemFromNav?.authorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{itemFromNav?.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
