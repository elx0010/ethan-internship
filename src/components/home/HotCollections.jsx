import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"
import SimpleSlider from "../UI/Carousel";


const HotCollections = () => {
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      setCollections(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <SimpleSlider collections = {collections} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
