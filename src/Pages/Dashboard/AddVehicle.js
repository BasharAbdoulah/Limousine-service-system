import React, { useCallback, useEffect, useRef, useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import useFetch from "../../localHooks/useFetch";
import Swal from "sweetalert2/dist/sweetalert2.js";

function AddVehicle() {
  const [carTypes, setCarTypes] = useState();
  const [isSuccess, setIsSuccess] = useState(null);
  const [uploadLoading1, setUploadLoading1] = useState(false);
  const [uploadLoading2, setUploadLoading2] = useState(false);
  const [newImage1, setNewImage1] = useState();
  const [newImage2, setNewImage2] = useState();

  const Ref = useRef();

  useEffect(() => {
    excuteCarsTypes(false);
  }, []);

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

  // Post Cars
  const {
    data: postCarData,
    loading: postCarLoading,
    error: postCarError,
    excuteFetch: excutePostCar,
  } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}${process.env.REACT_APP_PUBLIC_CAR}`,

    "post",
    true
  );

  useEffect(() => {
    if (carsTypesData) {
      setCarTypes(carsTypesData);
    } else if (carsTypesErr != null) {
      console.error(carsTypesErr);
    }
  }, [carsTypesData]);

  useEffect(() => {
    if (postCarData?.statusCode == 200) {
      setIsSuccess(true);
      window.scrollTo({ top: 0 });
      setNewImage1();
      setNewImage2();
      Ref.current.reset();
    } else if (carsTypesErr != null) {
      console.error(postCarError);
    }
  }, [postCarData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var v = e.target;
    postCar(v, newImage1, newImage2);
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

  // Uploading the image to firebase
  const upload = (img) => {
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

  const postCar = async (v, url1, url2) => {
    const carType = carTypes?.filter(
      (type) => type.id == parseInt(v.carType.value)
    );

    let encodedUrl1 = encodeURIComponent(url1);
    let encodedUrl2 = encodeURIComponent(url2);

    const body = {
      carName: v.carName.value,
      carImg: url1,
      carSubImg: url2,
      Preview: v.preview.value,
      perHour: parseInt(v.perHour.value),
      PerDay: parseInt(v.perDay.value),
      Passengers: 4,
      airportTransfer: parseInt(v.airport.value),
      carType: carType[0]?.carTypeEn,
      carTypeId: parseInt(v.carType.value),
    };

    excutePostCar(false, undefined, body);
  };

  // Returned feedback function
  const feedback = useCallback((statu) => {
    if (statu) {
      console.log("run once");
      Swal.fire({
        title: "نجاح!",
        text: "تمت العملية بنجاح",
        icon: "success",
        confirmButtonText: "أستمر",
      });
    } else if (statu == false) {
      Swal.fire({
        title: "خطأ",
        text: "هناك خطأ ما!",
        icon: "error",
        confirmButtonText: "أستمر",
      });
    }
  }, []);

  setTimeout(() => {
    setIsSuccess(null);
  }, 3000);
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
      <form onSubmit={handleSubmit} ref={Ref}>
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
          <div className="row align-items-center">
            <div className="custom-file">
              <input
                required
                type="file"
                onChange={(e) => handleMainImg(e)}
                className="custom-file-input"
                id="mainImg"
              />
            </div>
            {newImage1 != null && <img width={200} src={newImage1} />}
            {uploadLoading1 && (
              <div className="spinner-border m-4" role="status"></div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subImg">صورة فرعية</label>
          <div className="row">
            <div className="custom-file">
              <input
                required
                onChange={(e) => handleSubImg(e)}
                type="file"
                className="custom-file-input"
                id="subImg"
              />
            </div>
            {newImage2 != null && <img width={200} src={newImage2} />}
            {uploadLoading2 && (
              <div className="spinner-border m-4" role="status"></div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="perHour">التكلفة بالساعة</label>
          <input
            required
            type="number"
            className="form-control w-25"
            id="perHour"
          />
        </div>

        <div className="form-group">
          <label htmlFor="perDay">التكلفة باليوم</label>
          <input
            type="number"
            required
            className="form-control w-25"
            id="perDay"
          />
        </div>

        <div className="form-group">
          <label htmlFor="airport">مشوار المطار</label>
          <input
            type="number"
            required
            className="form-control w-25"
            id="airport"
          />
        </div>

        <div className="form-group">
          <label htmlFor="carType">اختر نوع الهيكل</label>
          <select
            className="form-select w-25"
            id="carType"
            aria-label="carType"
          >
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
            {postCarLoading ? (
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
