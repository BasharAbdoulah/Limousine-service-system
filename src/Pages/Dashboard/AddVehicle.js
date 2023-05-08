import axios from "axios";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import { Image } from "antd";

function AddVehicle() {
  const [carTypes, setCarTypes] = useState();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [images, setImage] = useState();
  const [uploadLoading1, setUploadLoading1] = useState(false);
  const [uploadLoading2, setUploadLoading2] = useState(false);
  const [newImage1, setNewImage1] = useState();
  const [newImage2, setNewImage2] = useState();

  useEffect(() => {
    const getData = async () => {
      // Get car Types
      const res = await axios.get("https://localhost:44316/api/CarTypes");
      console.log(res.data);
      if (res.status) setCarTypes(res?.data);
    };

    getData();
  }, []);

  console.log(carTypes);

  const imagesListRef = ref(storage, "images/");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    var v = e.target;
    console.log(images);
    let urls = [];
    upload(0)
      .then((q) => {
        urls = [q];
        return upload(1);
      })
      .then((w) => {
        urls.push(w);
        postCar(v, urls);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMainImg = async (e) => {
    console.log(e.target.files);
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

  console.log(newImage1);

  // Uploading the image to firebase
  const upload = (img) => {
    console.log(img);
    return new Promise((resolve, reject) => {
      // if (images == null) return;
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

  const postCar = async (v, urls) => {
    const carType = carTypes?.filter(
      (type) => type.id == parseInt(v.carType.value)
    );

    await axios
      .post("https://localhost:44316/api/Car", {
        carName: v.carName.value,
        carImg: urls[0],
        carSubImg: urls[1],
        Preview: v.preview.value,
        perHour: parseInt(v.perHour.value),
        PerDay: parseInt(v.perDay.value),
        Passengers: 4,
        airportTransfer: parseInt(v.airport.value),
        carType: carType[0]?.carTypeEn,
        carTypeId: parseInt(v.carType.value),
      })
      .then((res) => {
        if (res.status) {
          setLoading(false);
          setIsSuccess(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsSuccess(false);
        setLoading(false);
      });
  };

  // Get all images urls from firebase
  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  // Returned feedback function
  const feedback = (statu) => {
    if (statu) {
      return (
        <div className="alert alert-success" role="alert">
          تمت الاضافة بنجاح!
        </div>
      );
    } else if (statu == false) {
      return (
        <div className="alert alert-danger" role="alert">
          !يوجد خطأ ما حاول, مرة اخرى
        </div>
      );
    }
  };
  return (
    <>
      <h2>أضافة المركبات</h2>
      <hr className="featurette-divider" />
      {isSuccess == true
        ? feedback(true)
        : isSuccess == false
        ? feedback(false)
        : isSuccess == null
        ? ""
        : ""}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="carName">أسم السيارة</label>
          <input required type="text" className="form-control" id="carName" />
        </div>

        <div className="form-group">
          <label htmlFor="preview">وصف عن السيارة</label>
          <textarea cols="5" rows="5" className="form-control" id="preview" />
        </div>

        <div className="form-group">
          <label htmlFor="mainImg">صورة رئيسية</label>
          <div className="row">
            <div className="custom-file">
              <input
                required
                type="file"
                onChange={(e) => handleMainImg(e)}
                className="custom-file-input"
                id="mainImg"
              />
            </div>
            {newImage1 != null && <Image width={200} src={newImage1} />}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subImg">صورة فرعية</label>
          <div className="custom-file">
            <input
              required
              onChange={(e) => handleSubImg(e)}
              type="file"
              className="custom-file-input"
              id="subImg"
            />
          </div>
          {newImage2 != null && <Image width={200} src={newImage2} />}
        </div>

        <div className="form-group">
          <label htmlFor="perHour">التكلفة بالساعة</label>
          <input required type="number" className="form-control" id="perHour" />
        </div>

        <div className="form-group">
          <label htmlFor="perDay">التكلفة باليوم</label>
          <input type="number" required className="form-control" id="perDay" />
        </div>

        <div className="form-group">
          <label htmlFor="airport">مشوار المطار</label>
          <input type="number" required className="form-control" id="airport" />
        </div>

        <div className="form-group">
          <label htmlFor="carType">اختر نوع الهيكل</label>
          <select className="form-select" id="carType" aria-label="carType">
            <option defaultValue>-- اختر --</option>
            {carTypes?.map((type) => {
              return (
                <option key={type.id} value={type.id}>
                  {type.carTypeEn}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-info">
            {loading ? (
              <div className="spinner-border text-light" role="status"></div>
            ) : (
              "أضافة"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default AddVehicle;
