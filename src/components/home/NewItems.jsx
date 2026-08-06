import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import NewItemsCarousel from "../UI/NewItemsCarousel";

const NewItems = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [timeLeft, setTimeLeft] = useState({})

    useEffect(() => {
      async function fetchData() {
        const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
        setItems(data)
        setLoading(false)
      }
      fetchData()
    }, [])
    
    useEffect(() => {
      const interval = setInterval(() => {
        const updated = {}
          items.forEach(item => {
            if (item.expiryDate === null) return
            const secLeft = Math.floor((item.expiryDate - Date.now()) / 1000)
            const s = secLeft % 60
            const m = Math.floor(secLeft / 60 % 60)
            const h = Math.floor(secLeft / 3600)
            updated[item.id] = `${h}h ${m}m ${s}s`
            if (h && m && s <= 0) return
          })
          setTimeLeft(updated)
      }, 1000)
      return () => clearInterval(interval)
    }, [items])



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
          <NewItemsCarousel items={items} loading={loading} timeLeft={timeLeft} />
        </div>
      </div>
    </section>
  );
};

export default NewItems;
