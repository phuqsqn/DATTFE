import React, { useEffect, useState } from "react";
import axios from "axios";
import './category.css'

import { Link, NavLink } from "react-router-dom";


const HomeCategory = () => {
    const [data, setData] = useState(null);
    const [isReload, setIsReload] = useState(false);
    const [itemEdit, setItemEdit] = useState(null);
    const getListData = async () => { 
      const response = await axios.get("http://localhost:5000/api/categories");
      setData(response.data);
    };
  
    const deleteData = async (id) => {
      const response = await axios.delete(
        `http://localhost:5000/api/categories/${id}`
      );
    };
  
    const creatData = async (data) => {
      const response = await axios.post(
        "http://localhost:5000/api/accounts",
        data
      );
    };
  
    const updateData = async (data) => {
      const response = await axios.patch(
        `http://localhost:5000/api/accounts/${itemEdit._id}`,
        data
      );
    };
  
    const handleCreat = (data) => {
      if (itemEdit) {
        updateData(data);
        setItemEdit(null);
      } else {
        creatData(data);
      }
  
      setIsReload(!isReload);
    };
  
    const handledeleteData = (id) => {
      deleteData(id);
      setIsReload(!isReload);
    };
  
    useEffect(() => {
      getListData();
    }, [isReload]);
  
    console.log(data);
  return (
    <>
      <div className="sumtable">
        <div className="menucreat">
          <label className="cate" htmlFor="">NAME</label>
          <label className="cate"  htmlFor="">IMAGE</label>
        </div>
        {data && data.length > 0 && (
          <div className="HelloCate">
            {data.map((item) => (
              <div className="tableCategory">
                <table>
                  <tr>
                    <td>
                      <h4 className="abc" onClick={() => setItemEdit(item)}>{item.name}</h4>
                    </td>
                    <td>
                      <img className="categoryimg" src={item.img} alt=""
                       
                      />
                    </td>
                    <td>
                      <button onClick={() => handledeleteData(item._id)}>
                        Delete
                      </button>
                      <button>edit</button>
                    </td>
                  </tr>
                </table>
              </div>
            ))}
          </div>
        )}
      
      </div>
      <div>
          <Link to="/CreatCategories">Creat Category</Link>
        </div>
    </>
  );
};
export default HomeCategory;
