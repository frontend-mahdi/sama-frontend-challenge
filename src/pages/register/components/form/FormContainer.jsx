import { Button, Form, Input, Select } from "antd";

const FormContainer = ({
  form,
  name,
  initialValues,
  onSubmitHandler,
  onFailedHandler,
  children,
}) => {
  return (
    <Form
      form={form}
      name={name}
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
      initialValues={initialValues}
      onFinish={onSubmitHandler}
      onFinishFailed={onFailedHandler}
      autoComplete="off"
    >
      {children}
    </Form>
  );
};

FormContainer.Text = ({ label, name, rules, placeholder = "" }) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};
FormContainer.Select = ({
  label,
  name,
  rules,
  options,
  value = undefined,
  onChange,
  placeholder = "انتخاب کنید",
  disabled = false,
}) => {
  const { Option } = Select;
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        placeholder={placeholder}
        allowClear
        disabled={disabled}
        onChange={onChange}
        value={value}
      >
        {options.map((province) => (
          <Option key={province.id} value={province.id}>
            {province.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

FormContainer.Button = ({ text, type = "primary", htmlType = "button" }) => {
  return (
    <Form.Item>
      <Button type={type} htmlType={htmlType}>
        {text}
      </Button>
    </Form.Item>
  );
};

export default FormContainer;
