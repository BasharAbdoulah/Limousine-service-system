import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideModel, showModel } from "../redux/showModelSlice";
import Modal from "antd/lib/modal";

function BookingModel() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState([]);
  const handleSelect = (e) => {
    setSelectedCar(e.target.value.split(","));
  };
  const state = useSelector((state) => state.showModel1.value);

  const dispatch = useDispatch();

  // Get All cars
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("https://localhost:44316/api/Car");
      if (data.data) setCars(data.data);
    };
    fetchData();
  }, []);

  console.log(state);

  /// handle submit
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let v = e.target;

    await axios
      .post("https://localhost:44316/api/Request/SendRequest", {
        PickFrom: v.pickupfrom.value,
        PickTo: v.pickupto.value,
        PickupTime: v.pickuptime.value,
        RequestDate: v.pickupdate.value,
        TripType: v.triptype.value,
        Duration: parseInt(v.duration.value),
        CarNameEn: v.car.value.split(",")[0],
        CarNameAr: "none",
        PhoneNumber: v.phoneNumber.value,
        Email: v.email.value,
      })
      .then((res) => {
        if (res.status == 200) setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={state}
        onOk={""}
        onCancel={() => dispatch(hideModel())}
        footer={false}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-group col">
              <label for="phoneNumber">Phone number:</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Phone number"
              />
            </div>
            <div className="form-group col">
              <label for="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group col">
              <label for="pickupfrom">Pick up from:</label>
              <input
                type="text"
                className="form-control"
                id="pickupfrom"
                placeholder="Pick up from"
              />
            </div>

            <div className="form-group col">
              <label for="pickupto">Pick up to</label>
              <input
                type="text"
                className="form-control"
                id="pickupto"
                placeholder="Pick up to"
              />
            </div>
          </div>
          <div className="form-group">
            <label for="pickuptime">Pick time:</label>
            <input
              type="time"
              className="form-control"
              id="pickuptime"
              placeholder="Ex:12pm"
            />
          </div>
          <div className="form-group">
            <label for="pickuptime">Pick Date:</label>
            <input
              type="date"
              className="form-control"
              id="pickupdate"
              placeholder="Ex:22/3/2022"
            />
          </div>
          <div className="form-group">
            <label for="triptype">Trip type:</label>
            <select id="triptype" className="form-control form-control-sm">
              <option value="Select" defaultValue>
                Select---
              </option>
              <option value="day">Day</option>
              <option value="hour">Hour</option>
              <option value="airport">Airport transfer</option>
            </select>
          </div>
          <div className="form-group">
            <div className="form-group col">
              <label for="duration">Duration:</label>
              <select id="duration" className="form-control form-control-sm">
                <option value="Select" selected>
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
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label for="car">Select car:</label>
                <select
                  onChange={handleSelect}
                  value={selectedCar}
                  id="car"
                  className="form-control form-control-sm"
                >
                  <option value="Select" defaultValue>
                    Select---
                  </option>
                  {cars?.map((car) => {
                    return (
                      <option
                        key={car.carId}
                        data-img={car.carImg}
                        value={[car.carNameEn, car.carImg]}
                      >
                        {car.carNameEn}
                      </option>
                    );
                  })}
                </select>
                <button type="submit" className="btn btn-primary send-btn">
                  {loading ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    " Send "
                  )}
                </button>
              </div>
            </div>
            <div className="col-md-6 car-prev">
              <img src={selectedCar[1]} height="80" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default BookingModel;
