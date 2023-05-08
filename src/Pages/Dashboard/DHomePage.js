import React, { useEffect, useState } from "react";
import cadilac from "../../images/Cadillac-CT6-EU-spec-2016-2560x1600-001.jpg";
import Modal from "antd/lib/modal";
import Alert from "antd/lib/alert";
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

function DHomePage() {
  const [cars, setCars] = useState([]);
  const [newImage1, setNewImage1] = useState();
  const [newImage2, setNewImage2] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadLoading1, setUploadLoading1] = useState(false);
  const [uploadLoading2, setUploadLoading2] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getData();
  }, []);

  // Delete the vehicle
  const handleDelete = async () => {
    console.log("selected car id is", selectedCar.id);
    await axios
      .delete(`https://localhost:44316/api/Car/${selectedCar.id}`)
      .then((res) => {
        if (res.status === 200) {
          setIsSuccess(true);
          setIsModalOpen(false);
          getData();
        } else {
          setIsModalOpen(false);
          setIsSuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsModalOpen(false);
        setIsSuccess(false);
      });
  };

  // Get the cars data
  const getData = async () => {
    const response = await axios
      .get("https://localhost:44316/api/Car")
      .catch((err) => console.log(err.message));

    if (response.status === 200) {
      setCars(response.data);
    }
  };
  // Returned feedback function
  const feedback = (statu) => {
    if (statu) {
      return (
        <Alert message="تمت العملية بنجاح" type="success" showIcon closable />
      );
    } else if (statu == false) {
      return (
        <Alert
          message=" !يوجد خطأ ما حاول, مرة اخرى"
          type="error"
          showIcon
          closable
        />
      );
    }
  };

  // to close the alert after appering for a while
  if (isSuccess) {
    setTimeout(() => {
      setIsSuccess(undefined);
    }, 4000);
  }

  // To fill up the edit form values
  const handleEdit = (car) => {
    setEditMode(true);
    setSelectedCar(car);

    form.setFieldValue("carName", car.carName);
    form.setFieldValue("perDay", car.perDay);
    form.setFieldValue("perHour", car.perHour);
    form.setFieldValue("carType", car.carType);
    form.setFieldValue("airport", car.airportTransfer);
    form.setFieldValue("description", car.preview);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    // e.preventDefault();
    console.log("new image 1", newImage1);
    console.log("new image 2", newImage2);

    let urls = [];
    // Uploading the image to firebase

    if (newImage1 != null) {
      postCar(e, newImage1, false);
    } else if (newImage2 != null) {
      postCar(e, false, newImage2);
    } else if (newImage1 == null && newImage2 == null) {
      postCar(e, false, false);
    }
  };

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
    console.log("img 1", img1);
    console.log("img 2", img2);
    console.log("selected car", selectedCar);
    await axios
      .put(`https://localhost:44316/api/Car/${selectedCar.id}`, {
        id: selectedCar.id,
        carName: v.carName,
        carImg: img1 == false ? selectedCar.carImg : img1,
        carSubImg: img2 == false ? selectedCar.carSubImg : img2,
        Preview: v.description,
        perHour: v.perHour,
        PerDay: v.perDay,
        Passengers: 4,
        airportTransfer: v.airport,
        carType: v.carType,
        carTypeId: selectedCar.carTypeId,
      })
      .then((res) => {
        if (res.status == 200) {
          setEditMode(false);
          setIsSuccess(true);
          setLoading(false);
          getData();
        } else {
          setEditMode(false);
          setIsSuccess(false);
        }
      })
      .catch((err) => {
        setEditMode(false);
        setIsSuccess(false);
        console.error(err);
      })
      .finally(() => setLoading(false));
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

  return (
    <>
      {/* <!-- Modal --> */}

      <Modal
        style={{ direction: "rtl" }}
        title="سيتم حذف المركبة هل انت متاكد؟"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      ></Modal>
      <div className="row">
        <h2>أحصائيات</h2>
        <hr className="featurette-divider" />
        <div className="container">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="طلبات المستخدمين"
                value={112893}
                formatter={formatter}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="عدد الزيارات"
                value={112893}
                precision={2}
                formatter={formatter}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="عدد السيارات النشطة"
                value={112893}
                precision={2}
                formatter={formatter}
              />
            </Col>
          </Row>
        </div>
      </div>
      <hr className="featurette-divider" />
      <h2>جميع السيارات:</h2>
      <hr className="featurette-divider" />
      <div className="existing-cars row">
        {isSuccess == true
          ? feedback(true)
          : isSuccess == false
          ? feedback(false)
          : isSuccess == null
          ? ""
          : ""}
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
      <Modal
        open={editMode}
        title="تعديل بيانات السيارة"
        okText="تعديل"
        cancelText="الغاء"
        onCancel={() => setEditMode(false)}
        confirmLoading={loading}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleSubmit(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="carName"
            label="أسم السيارة"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="وصف السيارة">
            <Input type="textarea" />
          </Form.Item>
          <hr className="featurette-divider" />
          <Form.Item
            label="الصورة الرئيسية"
            name="mainImg"
            className="image-container"
            rules={[
              {
                required: false,
                message: "الحقل مطلوب",
              },
            ]}
          >
            <input
              style={{ marginBottom: "10px" }}
              required
              type="file"
              onChange={(e) => handleMainImg(e)}
              className="custom-file-input"
              id="mainImg"
            />
            <Image
              width={200}
              src={newImage1 == null ? selectedCar?.carImg : newImage1}
              preview={{
                src: selectedCar?.carImg,
              }}
            />
            {uploadLoading1 && (
              <Spin size="large" style={{ margin: "0 30px" }} />
            )}
          </Form.Item>
          <hr className="featurette-divider" />
          <Form.Item
            label="الصورة الفرعية"
            name="subImg"
            rules={[
              {
                required: false,
                message: "الحقل مطلوب",
              },
            ]}
          >
            <input
              required
              style={{ marginBottom: "10px" }}
              type="file"
              onChange={(e) => handleSubImg(e)}
              className="custom-file-input"
              id="subImg"
            />
            <Image
              width={200}
              src={newImage2 == null ? selectedCar?.carSubImg : newImage2}
              preview={{
                src: selectedCar?.carSubImg,
              }}
            />
            {uploadLoading2 && (
              <Spin size="large" style={{ margin: "0 30px" }} />
            )}
          </Form.Item>
          <Form.Item
            label="التكلفة بالساعة"
            name="perHour"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="التكلفة باليوم"
            name="perDay"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="مشوار المطار"
            name="airport"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="نوع السيارة"
            name="carType"
            rules={[
              {
                required: true,
                message: "الحقل مطلوب",
              },
            ]}
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default DHomePage;
