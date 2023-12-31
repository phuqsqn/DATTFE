import { Fragment } from "react";
import "./App.css";
// import Car from "./comp/Car";
import Counter from "./comp/Counter";
import Bai2 from "./comp/bai2.js";
import TodoApp from "./comp/todo/todo";
import Todo from "./comp/todo2";
import { createStore } from "redux";
import { Provider } from "react-redux";
import CounterApp from "./comp/counter/counteapp";
import { allReducers } from "./comp/counter/reducer/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateData from "./comp/Admin/accountAPI/creatData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeCategory from "./comp/Admin/categoryAPI/Home-delete";
import HomeAccount from "./comp/Admin/accountAPI/home-delete";
import CreateCT from "./comp/Admin/categoryAPI/CreatDataCT";
import LoginCT from "./comp/Admin/auth/login";
import httpService from "./comp/service/http.service";
import Register2 from "./comp/Admin/auth/register";
import Admin from "./comp/Admin/admin";
import { ToastContainer } from "react-toastify";
import User from "./comp/User";
import HomeProduct from "./comp/Admin/productAPI/get-product";
import Abc from "./comp/Admin/productAPI/creat-product";

const store = createStore(allReducers);
// Change -> update
// type : stateless, statefull
// Class Component <=> Functional

function App() {
  const [isReload, setIsReload] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);
  const creatData = async (data) => {
    const response = await httpService.post("/api/accounts", { body: data });
  };
  const createCT = async (data) => {
    const response = await httpService.post("/api/categories", { body: data });
  };

  const updateData = async (data) => {
    const response = await httpService.patch(`/api/accounts/${itemEdit._id}`, {
      body: data,
    });
  };
  const updateCT = async (data) => {
    const response = await axios.patch(
      `http://localhost:5000/api/accounts/${itemEdit._id}`,
      data
    );
  };

  const handleCreatCT = (data) => {
    if (itemEdit) {
      updateCT(data);
    } else {
      createCT(data);
    }

    setIsReload(!isReload);
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
  return (
    <>
      {/* <Car name="Moto" id='100' /> */}
      {/* <Counter /> */}
      {/* <Bai2 />
      <Todo/> */}
      {/* <TodoApp/> */}
      {/* <CounterApp /> */}
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Abc />} />
            <Route path="/HomeProduct" element={<HomeProduct />} />
            <Route path="/HomeCategories" element={<HomeCategory />} />
            <Route path="/Register" element={<Register2 />} />
            <Route path="/HomeAccount" element={<HomeAccount />} />
            <Route path="/login" element={<LoginCT />} />
            <Route path="/Admin" element={<Admin />}>
              <Route path="/Admin/accounts" index element={<HomeAccount />} />
              <Route path="/Admin/product" index element={<HomeProduct />} />
              <Route
                path="/Admin/categories"
                index
                element={<HomeCategory />}
              />
            </Route>
            <Route
              path="/CreatAccounts"
              element={<CreateData onSubmit={handleCreat} data={itemEdit} />}
            />
            <Route
              path="/CreatCategories"
              element={<CreateCT onSubmit={handleCreatCT} data={itemEdit} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
