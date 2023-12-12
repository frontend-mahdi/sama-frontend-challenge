import { Button, Space } from "antd";
import { RegisterContext } from "pages/register/utils/RegisterContext";
import useFormFieldsErrors from "pages/register/utils/useFormFieldsErrors";
import { useContext } from "react";
import { ibanValidator } from "utils/validators/ibanValidator";
import FormContainer from "../../form/FormContainer";

const PersonalForm = () => {
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
      name="bankInfo"
      initialValues={{
        remember: true,
        ...stepsContent.get(step),
      }}
      onSubmitHandler={onFinish}
      onFailedHandler={onFinishFailed}
    >
      <FormContainer.Text
        label="نام بانک"
        name="bank_name"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
        ]}
      />
      <FormContainer.Text
        label="شماره شبا"
        name="iban"
        placeholder="IRxxxxxxxxxxxxxxxxxxxxxxxx"
        rules={[
          {
            required: true,
            message: "این فیلد اجباری است",
          },
          {
            validator: (_, value) => ibanValidator(value),
          },
        ]}
      />

      <Space direction="horizontal" size={20}>
        <Button
          onClick={() => setStep((_step) => _step - 1)}
          style={{ marginBottom: "24px" }}
        >
          مرحله قبل
        </Button>
        <FormContainer.Button text="مرحله بعد" htmlType="submit" />
      </Space>
    </FormContainer>
  );
};

export default PersonalForm;
