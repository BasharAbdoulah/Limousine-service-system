import { Form, Image, Input, Modal, Spin, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";

function EditModel({
  editMode,
  handleSubmit,
  handleMainImg,
  handleSubImg,
  selectedCar,
  newImage1,
  newImage2,
  uploadLoading1,
  uploadLoading2,
  carsTypesData,
  editLoading,
  editModelShow,
}) {
  const [form] = Form.useForm();
  const [carsTypesOptions, setCarsTypesOptions] = useState([]);

  useEffect(() => {
    let options = [];
    carsTypesData?.map((type) => {
      options.push({
        label: type.carTypeEn,
        value: type.id,
      });
    });
    setCarsTypesOptions(options);
  }, [carsTypesData]);

  useEffect(() => {
    if (selectedCar != undefined) {
      console.log("selected", selectedCar);
      form.setFieldValue("carName", selectedCar.carName);
      form.setFieldValue("perDay", selectedCar.perDay);
      form.setFieldValue("perHour", selectedCar.perHour);
      form.setFieldValue("carTypeId", selectedCar.carTypeId);
      form.setFieldValue("airport", selectedCar.airportTransfer);
      form.setFieldValue("description", selectedCar.preview);
    }
  }, [selectedCar]);

  return (
    <Modal
      open={editMode}
      title="تعديل بيانات السيارة"
      okText="تعديل"
      cancelText="الغاء"
      onCancel={editModelShow}
      confirmLoading={editLoading}
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
          {uploadLoading1 && <Spin size="large" style={{ margin: "0 30px" }} />}
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
          {uploadLoading2 && <Spin size="large" style={{ margin: "0 30px" }} />}
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
          name="carTypeId"
          rules={[
            {
              required: true,
              message: "الحقل مطلوب",
            },
          ]}
        >
          <Select options={carsTypesOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditModel;
