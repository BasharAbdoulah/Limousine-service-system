import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectCar } from "../redux/showModelSlice";

function FeeltItem({ car }) {
  const dispatch = useDispatch();
  return (
    <div className="row justify-content-center">
      <div className=" car-item">
        <div className="hover-layout center">
          <div className="layout center">
            <div className="circle center">
              <Link
                className="f-center"
                onClick={() => dispatch(selectCar(car))}
                to={"/carPreview"}
              >
                <i class="bi bi-arrow-right-circle"></i>
              </Link>
            </div>
          </div>
        </div>
        <a className="" href="#">
          <img
            className="img"
            src={car?.carImg}
            alt="Generic placeholder image"
          />
          <h3>{car.carNameEn}</h3>
        </a>
      </div>
    </div>
  );
}

export default FeeltItem;
