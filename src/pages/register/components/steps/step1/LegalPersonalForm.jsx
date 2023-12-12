import { Space } from "antd";
import { RegisterContext } from "pages/register/utils/RegisterContext";
import useFormFieldsErrors from "pages/register/utils/useFormFieldsErrors";
import { useContext } from "react";
import { telNumberValidator } from "utils/validators/telNumberValidator";
import FormContainer from "../../form/FormContainer";

const LegalPersonalForm = () => {
  const { setStep, setStepsContent, setStepsContentError, stepsContent, step } =
    useContext(RegisterContext);

  const form = useFormFieldsErrors(step);

  const onFinish = (values) => {
    setStepsContentError((_stepsContentError) =>
      _stepsContentError.set(step, null)
    );
    setStepsContent((_stepsContent) => _stepsContent.set(step, values));
    setStep((_step) => _step + 1);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <FormContainer
      form={form}
      name="legalPersonalInfo"
      initialValues={{
        remember: true,
        ...stepsContent.get(step),
      }}
      onSubmitHandler={onFinish}
      onFailedHandler={onFinishFailed}
    >
      <FormContainer.Text
        label="نام"
        name="first_name"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
        ]}
      />
      <FormContainer.Text
        label="نام خانوادگی"
        name="last_name"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
        ]}
      />
      <FormContainer.Text
        label="شماره ثبت"
        name="registration_number"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
        ]}
      />
      <FormContainer.Text
        label="تلفن ثابت"
        name="tel"
        placeholder="0xxxxxxx"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
          {
            validator: (_, value) => telNumberValidator(value),
          },
        ]}
      />
      <Space direction="horizontal" size={20}>
        <FormContainer.Button text="مرحله بعد" htmlType="submit" />
      </Space>
    </FormContainer>
  );
};

export default LegalPersonalForm;
