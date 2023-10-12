import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import "./product.css";

const HomeProduct = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(null);
  const [dataProduct, setProduct] = useState([]);

  useEffect(() => {
    httpService
      .get("/api/categories", {})
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (category !== null) {
      httpService
        .get(`/api/products/${category}`)
        .then((data) => setProduct(data.data));
    }
    console.log(category);
  }, [category]);
  return (
    <>
      <div>
        <div className="menuproduct">
          <label htmlFor="">NAME</label>
          <label htmlFor="">IMG</label>
          <label htmlFor="">PRICE</label>
          <label htmlFor="">description</label>
          <label className="items" htmlFor="">
            {" "}
            <select className="Selecter" onChange={(e) => setCategory(e.target.value)}>
              {data.map((item) => (
                <option key={item.id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="">
          {dataProduct &&
            dataProduct.length > 0 &&
            dataProduct.map((item) => (
              <div className="Sum_product" key={item.id}>
                <div className="product_item">
                  <h4>{item.name}</h4>
                </div>
                <div className="product_item">
                  <h4>{item.img}</h4>
                </div>
                <div className="product_item">
                  <h4>{item.price}</h4>
                </div>
                <div className="product_item">
                  <h4>{item.description}</h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default HomeProduct;
