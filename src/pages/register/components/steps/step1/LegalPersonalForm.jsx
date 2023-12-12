import { Button, Form, Input, Space } from "antd";
import { RegisterContext } from "pages/register/utils/RegisterContext";
import { useContext, useEffect } from "react";
import { telNumberValidator } from "utils/validators/telNumberValidator";

const LegalPersonalForm = () => {
  const [form] = Form.useForm();

  const registerCtx = useContext(RegisterContext);
  const registerCtxError = registerCtx.stepsContentError.get(0);

  const onFinish = (values) => {
    registerCtx.setStepsContentError((_stepsError) => _stepsError.set(0, null));
    registerCtx.setStepsContent((stepsContent) => stepsContent.set(1, values));
    registerCtx.setStep((_step) => _step + 1);
    console.log(registerCtx.step);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (registerCtxError) {
      console.log(registerCtxError);
      registerCtxError.forEach(({ field, error }) => {
        form.setFields([
          {
            name: field,
            errors: [error], // Set the specific input field as invalid with the provided error message
          },
        ]);
      });
    }
    return () => {};
  }, [registerCtxError, form]);

  return (
    <Form
      form={form}
      name="personalInfo"
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
        ...registerCtx.stepsContent.get(1),
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="نام"
        name="first_name"
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
        label="نام خانوادگی"
        name="last_name"
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
        label="شماره ثبت"
        name="registration_number"
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
        label="تلفن ثابت"
        name="tel"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
          {
            validator: (_, value) => telNumberValidator(value),
          },
        ]}
      >
        <Input placeholder="0xxxxxxx" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 3,
          span: 18,
        }}
        style={{ marginTop: "3rem" }}
      >
        <Space direction="horizontal" size={20}>
          <Button type="primary" htmlType="submit">
            مرحله بعد
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LegalPersonalForm;
