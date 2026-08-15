import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import Skeleton from '../components/UI/Skeleton'

const Author = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState({})
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
      setItem(data)
      setLoading(false)
      setFollowers(data.followers)
    }
    fetchData()
  }, [id])

  const followerButton = () => {
    if (following) {
      setFollowers((followers) => followers - 1)
      setFollowing(false)
    } else {
      setFollowers((followers) => followers + 1)
      setFollowing(true)
    }
  }

  return (

    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>


        {loading ? (
          <>
            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton width="150px" height="150px" borderRadius="50%"/>

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton width="200px" height="30px"/>
                               <span className="profile_username"><Skeleton width="100px" height="20px"/></span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width="200px" height="20px"/>
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <Skeleton width="150px" height="40px"/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                      {[...Array(8)].map((_, index) => (
                        <Skeleton key={index} width="260px" height="430px" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : ( 
          <>
            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={item?.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {item?.authorName}
                              <span className="profile_username">@{item?.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {item?.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">{followers} followers</div>
                          <Link to="#" className="btn-main"
                          onClick={followerButton}
                          >
                            {following ? 
                            <>Unfollow</> 
                            : 
                            <>Follow</>}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems nfts={item.nftCollection} loading={loading} authorImage={item.authorImage} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Author;
