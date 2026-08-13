import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import NewItemsCarousel from "../UI/NewItemsCarousel";

const NewItems = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    useEffect(() => {
      async function fetchData() {
        const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
        setItems(data)
        setLoading(false)
      }
      fetchData()
    }, [])


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <NewItemsCarousel items={items} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default NewItems;
