import { Button, Form, Select, Space } from "antd";
import { RegisterContext } from "pages/register/RegisterPage";
import { useContext } from "react";
const { Option } = Select;

const LocationForm = () => {
  const registerCtx = useContext(RegisterContext);
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
        remember: true,
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
        <Select placeholder="انتخاب کنید" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
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
        <Select placeholder="انتخاب کنید" allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
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
