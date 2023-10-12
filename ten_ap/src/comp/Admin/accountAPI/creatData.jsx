import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useLocation } from "react-router";
import httpService from "../../service/http.service";
import { useNavigate } from "react-router";
// function useQuery() {
//   const { search } = useLocation();
//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

const CreateData = (props) => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = (data) => {
    props.onSubmit(data);
    navigate('/HomeAccount')
  };

  return (
    <>
      <div className="phudz">
        <h1 className="danhhieu">
          Xin Chào ADMIN <br />
          Vui Lòng Thêm Sản Phẩm Cần Thiết{" "}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ color: "rgb(255, 0, 170)" }}>CREAT ACCOUNT</h1>
          <label>Username:</label>
          <br />
          <input
            type="text"
            defaultValue={props.data?.username}
            {...register("username", {
              required: true,
            })}
          />
          {errors.username && <span>Username không được để trống</span>}

          <br />
          <label>Password:</label>
          <br />
          <input
            type="text"
            defaultValue={props.data?.password}
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && <span>Password không được để trống</span>}

          <br />
          <label>Fullname:</label>
          <br />
          <input
            type="text"
            defaultValue={props.data?.fullname}
            {...register("fullname", {
              required: true,
            })}
          />
          {errors.password && <span>Fullname không được để trống</span>}

          <br />
          <label>Dob:</label>
          <br />
          <input
            type="text"
            defaultValue={props.data?.dob}
            {...register("dob", {
              required: true,
            })}
          />
          {errors.password && <span>Dob không được để trống</span>}

          <br />
          <label>Phone:</label>
          <br />
          <input
            type="text"
            defaultValue={props.data?.phone}
            {...register("phone", {
              required: true,
            })}
          />
          {errors.password && <span>Phone không được để trống</span>}

          <br />
          <button className="creatOK" type="submit">
            Creat
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateData;
