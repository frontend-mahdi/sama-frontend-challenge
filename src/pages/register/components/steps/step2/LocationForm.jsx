import { Button, Form, Select, Space, Spin } from "antd";
import { RegisterContext } from "pages/register/utils/RegisterContext";
import { useContext, useState } from "react";
import useCustomFetch from "services/useFetch";
const { Option } = Select;

const LocationForm = () => {
  const registerCtx = useContext(RegisterContext);
  const preProvinceId = registerCtx.stepsContent.get(2)?.province ?? null;
  const [provinceId, setProvinceId] = useState(preProvinceId);
  const [selectedCity, setSelectedCity] = useState(null);
  const [provinceChaged, setProvinceChanged] = useState(true);

  const { data: provincesData, isLoading: provincesLoading } = useCustomFetch({
    url: "/provinces",
    method: "GET",
  });

  const { data: citiesData, citiesLoading } = useCustomFetch({
    url: provinceId ? `/cities/${provinceId}` : null,
    method: "GET",
  });

  const handleProvinceChange = (value) => {
    setProvinceChanged(false);
    setProvinceId(value);
  };

  const onFinish = (values) => {
    registerCtx.setStepsContent((stepsContent) => stepsContent.set(2, values));
    registerCtx.setStep((_step) => _step + 1);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="locationInfo"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
        paddingInline: "1rem",
        marginInline: "auto",
      }}
      initialValues={{
        remember: true && provinceChaged,
        ...registerCtx.stepsContent.get(2),
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="استان"
        name="province"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
        ]}
      >
        {provincesLoading ? (
          <Spin />
        ) : (
          <Select
            placeholder="انتخاب کنید"
            allowClear
            disabled={!provincesData}
            onChange={handleProvinceChange}
          >
            {provincesData
              ? provincesData.results.map((province) => (
                  <Option key={province.id} value={province.id}>
                    {province.name}
                  </Option>
                ))
              : null}
          </Select>
        )}
      </Form.Item>
      <Form.Item
        label="شهر"
        name="city"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
        ]}
      >
        {citiesLoading ? (
          <Spin />
        ) : (
          <Select
            value={selectedCity}
            onChange={(value) => {
              setSelectedCity(value);
              setProvinceChanged(true);
            }}
            placeholder="انتخاب کنید"
            allowClear
            disabled={!citiesData}
          >
            {citiesData
              ? citiesData.results.map((city) => (
                  <Option key={city.id} value={city.id}>
                    {city.name}
                  </Option>
                ))
              : null}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 3,
          span: 18,
        }}
        style={{ marginTop: "3rem" }}
      >
        <Space direction="horizontal" size={20}>
          <Button
            onClick={() => registerCtx.setStep((_step) => _step - 1)}
            disabled={registerCtx.step === 0}
          >
            مرحله قبل
          </Button>
          <Button type="primary" htmlType="submit">
            مرحله بعد
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LocationForm;
