import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectCar } from "../redux/showModelSlice";

function FeeltItem({ car }) {
  const dispatch = useDispatch();

  return (
    <div className="row justify-content-center">
      <div className=" car-item">
        <div className="car-container">
          <div className="layout center">
            <div className="circle center">
              <Link
                className="f-center"
                onClick={() => dispatch(selectCar(car))}
                to={"/carPreview"}
              >
                <i className="bi bi-arrow-right-circle"></i>
              </Link>
            </div>
          </div>
          <img
            className="img"
            src={car?.carImg}
            alt="Generic placeholder image"
          />
          <h3>{car.carName}</h3>
        </div>
      </div>
    </div>
  );
}

export default FeeltItem;
