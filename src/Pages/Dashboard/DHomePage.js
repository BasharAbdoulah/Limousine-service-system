import React, { useCallback, useEffect, useState } from "react";
import cadilac from "../../images/Cadillac-CT6-EU-spec-2016-2560x1600-001.jpg";
import Modal from "antd/lib/modal";
import { Alert, Button } from "antd";
import CountUp from "react-countup";
import axios from "axios";
import {
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Spin,
  Col,
  Row,
  Statistic,
} from "antd";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import useFetch from "../../localHooks/useFetch";
import EditModel from "./EditModel";
import Swal from "sweetalert2/dist/sweetalert2.js";

function DHomePage() {
  const [cars, setCars] = useState([]);
  const [newImage1, setNewImage1] = useState();
  const [newImage2, setNewImage2] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [lastRequest, setLastRequest] = useState(null);
  const [requests, setRequests] = useState([]);

  const [uploadLoading1, setUploadLoading1] = useState(false);
  const [uploadLoading2, setUploadLoading2] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getData();
  }, []);

  // Delete Implementation
  const {
    data: delData,
    loading: deleteLoading,
    error: delError,
    excuteFetch: excuteDelete,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_CAR}/${selectedCar?.id}`,

    "delete",
    true
  );

  // Get Cars types
  const {
    data: carsTypesData,
    loading: carsTypesLoading,
    error: carsTypesErr,
    excuteFetch: excuteCarsTypes,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_CARTYPE}`,
    "get",
    true
  );

  // Get Cars
  const {
    data: carsData,
    loading: carsLoding,
    error: carsErr,
    excuteFetch: excuteCars,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_CAR}`,

    "get",
    true
  );

  // Get vsitors Analytics
  const {
    data: analyticsData,
    loading: analyticsLoading,
    error: analyticsErr,
    excuteFetch: excuteAnalytics,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_ANALYTICS}`,

    "get",
    true
  );

  //Get requests
  const {
    excuteFetch: requestsExcute,
    data: requestsData,
    loading: requestsLoading,
    error: requestsErr,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_REQUEST}`,

    "get",
    true
  );

  //Get requests
  const {
    excuteFetch: lastRequestExcute,
    data: lastRequestData,
    loading: lastRequestLo,
    error: lastRequestErr,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_LASTREQUEST}`,
    "get",
    true
  );

  //Edit car
  const {
    excuteFetch: excuteEdit,
    data: editData,
    loading: editLoading,
    error: editErr,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_CAR}/${selectedCar?.id}`,

    "put",
    true
  );

  // Delete response
  useEffect(() => {
    if (delData?.statusCode === 200) {
      setIsSuccess(true);
      setIsModalOpen(false);
      excuteCars(false);
      feedback(true);
    } else if (delError != null) {
      setIsModalOpen(false);
      setIsSuccess(false);
      feedback(false);
    }

    if (delError != null) console.error(delError);
  }, [delData]);

  // Get the all data
  const getData = async () => {
    excuteCars(false);
    excuteAnalytics(false);
    requestsExcute(false);
    lastRequestExcute(false);
    excuteCarsTypes(false);
  };

  useEffect(() => {
    let carsAfterDecode = [];
    carsData?.map((car) => {
      let decodedMainImgUrl = decodeURIComponent(car.carImg);
      let decodedSubImgUrl = decodeURIComponent(car.carSubImg);
      car.carImg = decodedMainImgUrl;
      car.carSubImg = decodedSubImgUrl;
      carsAfterDecode?.push(car);
    });

    setCars(carsAfterDecode);
  }, [carsData]);

  useEffect(() => {
    if (analyticsData) setVisitors(analyticsData);
    if (analyticsErr) console.error(analyticsErr.message);
  }, [analyticsData]);

  useEffect(() => {
    if (lastRequestData) setLastRequest(lastRequestData);
    if (lastRequestErr) console.error(analyticsErr.message);
  }, [lastRequestData]);

  useEffect(() => {
    if (requestsData) setRequests(requestsData);
    if (requestsErr) console.error(requestsErr);
  }, [requestsData]);

  useEffect(() => {
    if (editData?.statusCode == 200) {
      setEditMode(false);
      setIsSuccess(true);
      getData();
      feedback(true);
    } else if (editErr != null) {
      setEditMode(false);
      setIsSuccess(false);
      feedback(false);
      console.error(editErr);
    }
  }, [editData]);

  // Returned feedback function
  const feedback = (value) => {
    if (value === true) {
      Swal.fire({
        title: "نجاح!",
        text: "تمت العملية بنجاح",
        icon: "success",
        confirmButtonText: "أستمر",
      });
    } else if (value === false) {
      Swal.fire({
        title: "خطأ",
        text: "هناك خطأ ما!",
        icon: "error",
        confirmButtonText: "أستمر",
      });
    } else if (value === null) return "";
  };

  // to close the alert after appering for a while
  if (isSuccess) {
    setTimeout(() => {
      setIsSuccess(null);
    }, 2000);
  }

  // On cancel edit model
  const editModelShow = () => setEditMode(false);

  // To fill up the edit form values
  const handleEdit = (car) => {
    setEditMode(true);
    setSelectedCar(car);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    // e.preventDefault();

    // Uploading the image to firebase

    if (newImage1 != null) {
      postCar(e, newImage1, false);
    } else if (newImage2 != null) {
      postCar(e, false, newImage2);
    } else if (newImage1 == null && newImage2 == null) {
      postCar(e, false, false);
    }
  };

  // Handle delete
  const handleDelete = () => excuteDelete(false, 0, 0);

  const handleMainImg = async (e) => {
    setUploadLoading1(true);
    await upload(e.target.files[0])
      .then((u) => setNewImage1(u))
      .catch((err) => console.log(err))
      .finally((e) => setUploadLoading1(false));
  };
  const handleSubImg = async (e) => {
    setUploadLoading2(true);
    await upload(e.target.files[0])
      .then((u) => setNewImage2(u))
      .catch((err) => console.log(err))
      .finally((e) => setUploadLoading2(false));
  };

  // To submit the changes
  const postCar = async (v, img1, img2) => {
    setLoading(true);
    excuteEdit(false, 0, 0, {
      id: selectedCar.id,
      carName: v.carName,
      carImg: img1 == false ? selectedCar.carImg : img1,
      carSubImg: img2 == false ? selectedCar.carSubImg : img2,
      Preview: v.description,
      perHour: v.perHour,
      PerDay: v.perDay,
      Passengers: 4,
      airportTransfer: v.airport,
      carType: selectedCar.carType,
      carTypeId: v.carTypeId,
    });
  };

  // Uploading the image to firebase
  const upload = (img) => {
    return new Promise((resolve, reject) => {
      if (img == null) return;
      const imageRef = ref(storage, `images/${img.name + v4()}`);
      uploadBytes(imageRef, img)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              // setUrls((prev) => [...prev, url]);
              return url;
            })
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  };
  const formatter = (value) => <CountUp end={value} separator="," />;

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
    <>
      {/* <!-- Modal --> */}

      <Modal
        style={{ direction: "rtl" }}
        title="سيتم حذف المركبة هل انت متاكد؟"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            key="link"
            type="primary"
            loading={deleteLoading}
            onClick={handleDelete}
          >
            حذف نهائي
          </Button>,
        ]}
      ></Modal>
      <div className="row">
        <h2>أحصائيات</h2>
        <hr className="featurette-divider" />
        <div className="container">
          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                title="طلبات المستخدمين"
                value={requests?.total}
                formatter={formatter}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="عدد الزيارات"
                value={visitors?.length}
                precision={2}
                formatter={formatter}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="عدد السيارات النشطة"
                value={cars?.length}
                precision={2}
                formatter={formatter}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="عدد الزيارات من اجهزة الحاسوب"
                value={visitors?.filter((v) => v.isMobile == false).length}
                precision={2}
                formatter={formatter}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="عدد الزيارات من اجهزة الهاتف"
                value={visitors?.filter((v) => v.isMobile == true).length}
                precision={2}
                formatter={formatter}
              />
            </Col>
          </Row>
        </div>
      </div>
      <hr className="featurette-divider" />
      <h2 style={{ marginBottom: "20px" }}>أخر طلب:</h2>
      {lastRequestLo ? (
        <div class="spinner-border text-warning" role="status"></div>
      ) : (
        <div
          key={requests[requests?.length - 1]?.requestId}
          className="request last-request"
        >
          <p>أسم السيارة: {lastRequest?.carName}</p>
          <p>مدة الرحلة: {lastRequest?.duration}</p>
          <p>ألايميل: {lastRequest?.email}</p>
          <p>رقم الهاتف: {lastRequest?.phoneNumber}</p>
          <p>مكان الالتقاط: {lastRequest?.pickFrom}</p>
          <p>توصيل الى: {lastRequest?.pickTo}</p>
          <p>وقت الالتقاط: {lastRequest?.pickupTime}</p>
          <p>موعد الالتقاط: {lastRequest?.requestDate}</p>
          <p>وقت ارسال الطلب: {formatDate(lastRequest?.requestTime)}</p>
          <p>نوع الرحلة: {lastRequest?.tripType}</p>
        </div>
      )}
      <hr className="featurette-divider" />
      <h2 style={{ marginBottom: "20px" }}>جميع السيارات:</h2>
      <div className="existing-cars row">
        {cars?.map((car) => {
          return (
            <div class="card" style={{ width: "18rem", direction: "ltr" }}>
              <img class="card-img-top" src={car.carImg} alt="Card image cap" />
              <div class="card-body">
                <h6 class="card-title">Model: 2018</h6>
                <h5 class="card-title">Name: {car.carName}</h5>
                <a
                  onClick={() => handleEdit(car)}
                  href="#"
                  class="btn btn-primary"
                >
                  تعديل
                </a>
                <a
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={() => {
                    setSelectedCar(car);
                    setIsModalOpen(true);
                  }}
                  class="btn btn-danger"
                >
                  حذف
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <EditModel
        editMode={editMode}
        handleSubmit={handleSubmit}
        handleMainImg={handleMainImg}
        handleSubImg={handleSubImg}
        selectedCar={selectedCar}
        newImage1={newImage1}
        newImage2={newImage2}
        uploadLoading1={uploadLoading1}
        uploadLoading2={uploadLoading2}
        carsTypesData={carsTypesData}
        editLoading={editLoading}
        editModelShow={editModelShow}
      />
    </>
  );
}

export default DHomePage;
