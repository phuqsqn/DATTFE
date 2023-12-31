import React, { useState} from "react";
import httpService from "../../service/http.service";
import storageService from "../../service/storage.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './auth.css'
import { Link, NavLink } from "react-router-dom";

const LoginCT = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navagite = useNavigate();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    httpService
      .post("/api/auth/login", {
        body: { username, password },
      })
      .then((data) => {
        // Store data login
        storageService.set("access_token", data?.data?.jwt);
        storageService.set("role", data?.data?.role);
        toast("Đăng Nhập Thành Công")

        // Sau khi login navigate ...
        if (data.data.role === "admin") {
          // navigate tới trang admin
          navagite("/Admin");
        } else {
          // navigate tới trang user
          navagite("/");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
    <div className="SumAuth">
      <form
        onSubmit={handleOnSubmit}
        className="login__form"
        // style={{ margin: "auto", textAlign: "center" }}
      > 
      <img className="authImg" src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png" alt="" />
        <h3>Sign In</h3>
        <div className="form__item">
          <label>Username :</label> <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            
          />
        </div>

        <div className="form__item">
          <label>Password :</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            
          />
        </div>

        <div className="form__item">
          <button
          className="authbutton"
            type="submit"
           
          >
            SIGN IN
          </button>
        </div>
        <div className="linkRegis">
        Do not have an account?<Link className="phu123" to={"/Register"}> Sign Up</Link>
        </div>
      </form>
      </div>
    </>
  );
};

export default LoginCT;
