import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Spin } from "antd";
import useFetch from "../../localHooks/useFetch";

//
function ClientsRequests() {
  const [requests, setRequests] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    excuteFetch(true, `?skip=${0}&take=${6}`);
  }, []);

  const {
    excuteFetch,
    data,
    loading: lodaingS,
    error,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_REQUEST}`,
    "get",
    true
  );

  useEffect(() => {
    if (data != null) {
      let reversed = [];
      data.requests.map((e) => reversed.unshift(e));
      setRequests(reversed);
    }
  }, [data]);

  const handlePagination = async (e) => {
    setCurrentPage(e);
    let skip = 6;

    if (e > 2) {
      skip = e * skip - 6;
    } else if (e == 1) skip = 0;

    await excuteFetch(true, `?skip=${skip}&take=${6}`);
  };

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

    return formattedTime;
  };

  return (
    <div className="container d-sm-flex justify-content-center align-items-center h-100 flex-column">
      {lodaingS ? (
        <div className="spinner-border text-warning" role="status"></div>
      ) : (
        <>
          <div className="requests">
            {requests?.map((req, i) => {
              return (
                <div key={req.requestId} className="request">
                  <h4>طلب رقم:{requests.length - i}</h4>
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
                defaultCurrent={currentPage}
                total={data?.total}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ClientsRequests;
