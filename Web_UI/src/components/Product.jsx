import React, { useEffect, useState } from "react";

const Product = (props) => {
  const [products, setProducts] = useState([]);
  var items = [];
  var counts = {};
  const fetchUserData = () => {
    fetch("http://127.0.0.1:8000/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.predictions.forEach((item) => {
          items.push(item.class);
        });
        items.forEach((x) => {
          counts[x] = (counts[x] || 0) + 1;
        });
        setProducts(counts);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {Object.keys(products).map((val) => (
        <div className="container">
          <h2 className="sub-title">{val}</h2>
          <div className="grid-container">
            {Array.from({ length: props.box }, (_, row) => (
              <div
                key={row}
                className={
                  products[val] < row + 1 ? "grid-item-avail" : "grid-item"
                }
              >
                {row + 1}
              </div>
            ))}
          </div>
          <p>
            Total no of {val}: <h2>{products[val]}</h2>
          </p>
        </div>
      ))}
    </>
  );
};

export default Product;
