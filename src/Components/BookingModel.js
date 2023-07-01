import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideModel } from "../redux/showModelSlice";
import Modal from "antd/lib/modal";
import { useTranslation } from "react-i18next";
import useFetch from "../localHooks/useFetch";
import Swal from "sweetalert2/dist/sweetalert2.js";

function BookingModel() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCarFromForm, setSelectedCarFromForm] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const { selectedCar, tripType } = useSelector((state) => state.showModel1);
  const { t, i18n } = useTranslation();
  const ref = useRef();

  // Get Cars
  const {
    data: carsData,
    loading: carsLoding,
    error: carsErr,
    excuteFetch: excuteGetCars,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_CAR}fdsf`,

    "get",
    false
  );

  // Booking
  const {
    data: postRequestData,
    loading: postRequestLoading,
    error: postRequestErr,
    excuteFetch: postRequestExcute,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_REQUEST}`,

    "post",
    false
  );

  const handleSelect = (e) => {
    setSelectedCarFromForm(e.target.value.split(","));
  };
  const state = useSelector((state) => state.showModel1.value);

  const dispatch = useDispatch();

  // Get All cars
  useEffect(() => {
    if (carsData != null) {
      console.log("cars data 55", carsData);
      let carsAfterDecode = decodeUrls(carsData);
      setCars(carsAfterDecode);
    }
  }, [carsData]);

  useEffect(() => {
    excuteGetCars(false, undefined);
    if (selectedCar) {
      setSelectedCarFromForm([
        selectedCar.payload?.carName,
        selectedCar.payload?.carImg,
      ]);
    }
  }, []);

  useEffect(() => {
    setSelectedOption(tripType?.payload);
  }, [tripType]);
  useEffect(() => {
    setSelectedCarFromForm([
      selectedCar?.payload.carName,
      selectedCar?.payload.carImg,
    ]);
  }, [selectedCar]);

  /// handle submit
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let v = e.target;
    let body = {
      PickFrom: v.pickupfrom.value,
      PickTo: v.pickupto.value,
      PickupTime: v.pickuptime.value,
      RequestDate: v.pickupdate.value,
      TripType: v.triptype.value,
      Duration: parseInt(v.duration.value),
      CarName: v.carname.value.split(",")[0],
      PhoneNumber: v.phoneNumber.value,
      Email: v.email.value,
    };
    postRequestExcute(false, undefined, body);
  };

  useEffect(() => {
    if (postRequestData?.status) {
      Swal.fire({
        title: "!نجاح",
        text: "تمت العملية بنجاح",
        icon: "success",
        confirmButtonText: "أستمر",
      });
      ref.current.reset();
      dispatch(hideModel());
    } else if (postRequestErr != null) {
      Swal.fire({
        title: "خطأ",
        text: " !هناك خطأ ما",
        icon: "error",
        confirmButtonText: "أستمر",
      });
      console.error(postRequestErr);
    }
  }, [postRequestData, postRequestErr]);

  const decodeUrls = (list) => {
    console.log(list);
    let carsAfterDecode = [];
    list.map((car) => {
      let decodedMainImgUrl = decodeURIComponent(car.carImg);
      let decodedSubImgUrl = decodeURIComponent(car.carSubImg);
      car.carImg = decodedMainImgUrl;
      car.carSubImg = decodedSubImgUrl;
      carsAfterDecode?.push(car);
    });
    return carsAfterDecode;
  };

  const isItSelected = (id) => {
    if (selectedCar != null) {
      if (selectedCar.payload.id == id) {
        return true;
      } else return false;
    }
  };
  return (
    <>
      <Modal
        title={t("model_title")}
        open={state}
        onOk={""}
        onCancel={() => dispatch(hideModel())}
        footer={false}
      >
        <form ref={ref} onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-group col">
              <label htmlFor="phoneNumber">
                {t("model_label_phonenumber")}:
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Phone number"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="email">{t("model_label_email")}:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="pickupfrom">{t("model_label_pickfrom")}:</label>
              <input
                type="text"
                className="form-control"
                id="pickupfrom"
                placeholder="Pick up from"
              />
            </div>

            <div className="form-group col">
              <label htmlFor="pickupto">{t("model_label_pickto")}</label>
              <input
                type="text"
                className="form-control"
                id="pickupto"
                placeholder="Pick up to"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="pickuptime">{t("model_label_time")}:</label>
            <input
              type="time"
              className="form-control"
              id="pickuptime"
              placeholder="Ex:12pm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pickupdate">{t("model_label_date")}:</label>
            <input
              type="date"
              className="form-control"
              id="pickupdate"
              placeholder="Ex:22/3/2022"
            />
          </div>
          <div className="form-group">
            <label htmlFor="triptype">{t("model_label_tripType")}:</label>
            <select
              value={selectedOption}
              id="triptype"
              className="form-control form-control-sm"
            >
              <option value="Select">Select---</option>
              <option value="day">Day</option>
              <option value="hour">Hour</option>
              <option value="airport">Airport transfer</option>
            </select>
          </div>
          <div className="form-group">
            <div className="form-group col">
              <label htmlFor="duration">{t("model_label_duration")}:</label>
              <select id="duration" className="form-control form-control-sm">
                <option value="Select" defaultValue={true}>
                  Select---
                </option>
                <option value={30}>30Min</option>
                <option value={1}>1Hour</option>
                <option value={2}>2Hour</option>
                <option value={4}>4Hour</option>
                <option value={6}>6Hour</option>
                <option value={8}>8Hour</option>
                <option value={12}>12Hour</option>
                <option value={24}>24Hour</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="carname">{t("model_label_car")}:</label>
            <select
              onChange={handleSelect}
              id="carname"
              className="form-control form-control-sm"
            >
              {/* <option value="Select">Select---</option> */}
              {cars?.map((car) => {
                return (
                  <option
                    key={car.id}
                    data-img={car.carImg}
                    value={[car.carName, car.carImg]}
                    selected={isItSelected(car.id)}
                  >
                    {car.carName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="row">
            <div className="col-6 ">
              <button type="submit" className="btn btn-primary send-btn">
                {postRequestLoading ? (
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                ) : (
                  " Send "
                )}
              </button>
            </div>
            <div className="col-6 car-prev">
              <img src={selectedCarFromForm[1]} height="80" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default BookingModel;
