import { App, Button, Space, Spin } from "antd";
import { RegisterContext } from "pages/register/utils/RegisterContext";
import { useContext } from "react";
import useCustomMutation from "services/useMutation";
import FormsSummery from "./components/FormsSummery";

const Preview = () => {
  const { message } = App.useApp();
  const { setStep, stepsContent, setStepsContentError } =
    useContext(RegisterContext);

  const { mutate, isLoading } = useCustomMutation();

  async function submitFormHandler() {
    let payload = {};
    for (const value of stepsContent.values()) {
      payload = { ...payload, ...value };
    }
    try {
      const result = await mutate("/submit", "POST", payload);
      message.success(result.detail);
    } catch (error) {
      const errorMessage = JSON.parse(error.message);
      message.error("خطا در فرم ارسالی از سمت سرور");
      const stepMapper = {
        info: 1,
        address: 2,
        bank: 3,
      };
      const step = stepMapper[errorMessage.detail];

      setStepsContentError((_stepsError) =>
        _stepsError.set(step, errorMessage.extra)
      );
      setStep(step);
    }
  }
  return (
    <>
      <FormsSummery />
      <Space direction="horizontal" size={20} style={{ marginBlock: "3rem" }}>
        <Button onClick={() => setStep((_step) => _step - 1)}>مرحله قبل</Button>
        {isLoading ? (
          <Spin />
        ) : (
          <Button type="primary" onClick={submitFormHandler}>
            ثبت نهایی
          </Button>
        )}
      </Space>
    </>
  );
};

export default Preview;
