import { Button, Form, Input, Space } from "antd";
import { RegisterContext } from "pages/register/RegisterPage";
import { useContext } from "react";
import { ibanValidator } from "utils/validators/ibanValidator";

const BankForm = () => {
  const registerCtx = useContext(RegisterContext);
  const onFinish = (values) => {
    registerCtx.setStepsContent((stepsContent) => stepsContent.set(3, values));
    registerCtx.setStep((_step) => _step + 1);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="bankInfo"
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
        ...registerCtx.stepsContent.get(3),
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="نام بانک"
        name="bank_name"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="شماره شبا"
        name="iban"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
          {
            validator: (_, value) => ibanValidator(value),
          },
        ]}
      >
        <Input placeholder="IRxxxxxxxxxxxxxxxxxxxxxxxx" />
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

export default BankForm;
