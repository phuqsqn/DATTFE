import React, { useEffect, useState } from "react";
import axios from "axios";
import "./account.css";
import { Link, NavLink } from "react-router-dom";
import httpService from "../../service/http.service";
import { useNavigate } from "react-router-dom";

const HomeAccount = () => {
  const navagite = useNavigate();
  const [data, setData] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);

  const getListData = async () => {
    const response = await httpService.get("/api/accounts", {});
    setData(response.data);
  };

  const deleteData = async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/accounts/${id}`
    );
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
          <label htmlFor="">ID</label>
          <label htmlFor="">USERNAME</label>
          <label htmlFor="">FULLNAME</label>
          <label htmlFor="">DOB</label>
          <label htmlFor="">PHONE NUMBER</label>
          <label htmlFor="">SETTINGS</label>
        </div>
        {data && data.length > 0 && (
          <div>
            {data.map((item) => (
              <div className="tablemenu">
                <div className="itemAc1">
                  <h4>{item.id}</h4>
                </div>
                <div className="itemAc2">
                  <h4>{item.username}</h4>
                </div>
                <div className="itemAc3">
                  <h4>{item.fullname}</h4>
                </div>
                <div className="itemAc4">
                  <h4>{item.dob}</h4>
                </div>
                <div className="itemAc5">
                  <h4>{item.phone}</h4>
                </div>
                <div className="itemAc6">
                <button
                  onClick={() => {
                    handledeleteData(item._id);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setItemEdit(item);
                    navagite(`/CreatAccounts?id=${item._id}`);
                  }}
                >
                  edit
                </button>
                </div>

              </div>
            ))}
          </div>
        )}
        <div>
          <Link to="/CreatAccounts">Creat Account</Link>
        </div>
      </div>
    </>
  );
};
export default HomeAccount;
