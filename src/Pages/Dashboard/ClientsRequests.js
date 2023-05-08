import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";

//
function ClientsRequests() {
  const [requests, setRequests] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getDate();
  }, []);

  const getDate = async (skip, take) => {
    if (skip == undefined) skip = 0;
    if (take == undefined) take = 6;
    console.log("skip number", skip, take);
    await axios
      .get(`https://localhost:44316/api/Request?skip=${skip}&take=${take}`)
      .then((res) => {
        if (res.status == 200) setRequests(res.data);
      })
      .catch((err) => console.error(err));
  };

  const handlePagination = (e) => {
    let skip = 6;

    if (e > 2) {
      skip = e * skip - 6;
    }
    getDate(skip, 6);
  };
  // carName: "test";
  // duration: 24;
  // email: "test@gmail.com";
  // phoneNumber: "4534543346";
  // pickFrom: "jahra";
  // pickTo: "test";
  // pickupTime: "45am";
  // requestDate: "1/2/2030";
  // requestId: 6;
  // requestTime: "2023-05-04T06:49:52.753";
  // tripType: "day";

  const formatDate = (timestamp) => {
    // const timestamp = '2023-05-03T07:48:37.803';
    const date = new Date(timestamp);

    // Extract the date and time components";
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12; // Convert to 12-hour format
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const ampm = hours24 >= 12 ? "PM" : "AM"; // Determine AM/PM context

    // Format the date and time components into a string
    const formattedTime = `${ampm} ${year}-${month}-${day} ${hours12}:${minutes} `;

    console.log(formattedTime); // Output: 2023-05-03 7:48:37.803 AM

    return formattedTime;
  };

  console.log(requests);
  return (
    <div className="container">
      <div className="requests">
        {requests?.map((req, i) => {
          return (
            <div key={req.requestId} className="request">
              <h4>طلب رقم:{i + 1} </h4>
              <p>أسم السيارة: {req.carName}</p>
              <p>مدة الرحلة: {req.duration}</p>
              <p>ألايميل: {req.email}</p>
              <p>رقم الهاتف: {req.phoneNumber}</p>
              <p>مكان الالتقاط: {req.pickFrom}</p>
              <p>توصيل الى: {req.pickTo}</p>
              <p>وقت الالتقاط: {req.pickupTime}</p>
              <p>موعد الالتقاط: {req.requestDate}</p>
              <p>وقت ارسال الطلب: {formatDate(req.requestTime)}</p>
              <p>نوع الرحلة: {req.tripType}</p>
            </div>
          );
        })}
      </div>
      <div className="row">
        <div className="pagination">
          <Pagination
            style={{ direction: "ltr" }}
            onChange={(e) => handlePagination(e)}
            defaultCurrent={1}
            total={333}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientsRequests;
