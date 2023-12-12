import { Button, Space, Spin } from "antd";
import { RegisterContext } from "pages/register/utils/RegisterContext";
import useFormFieldsErrors from "pages/register/utils/useFormFieldsErrors";
import { useContext, useState } from "react";
import useCustomFetch from "services/useFetch";
import FormContainer from "../../form/FormContainer";

const AddressForm = () => {
  const { setStep, setStepsContent, setStepsContentError, stepsContent, step } =
    useContext(RegisterContext);
  const preProvinceId = stepsContent.get(step)?.province ?? null;
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

  const form = useFormFieldsErrors(step);
  const handleProvinceChange = (value) => {
    setProvinceChanged(false);
    setProvinceId(value);
  };

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
      name="addressInfo"
      initialValues={{
        remember: true && provinceChaged,
        ...stepsContent.get(step),
      }}
      onSubmitHandler={onFinish}
      onFailedHandler={onFinishFailed}
    >
      {provincesLoading ? (
        <Spin />
      ) : provincesData ? (
        <FormContainer.Select
          label="استان"
          name="province"
          rules={[
            {
              required: true,
              message: "این فیلد اجباری است",
            },
          ]}
          options={provincesData.results}
          onChange={handleProvinceChange}
          disabled={!provincesData}
        />
      ) : (
        <p>مشکلی در دریافت استانها رخ داده است</p>
      )}

      {citiesLoading ? (
        <Spin />
      ) : (
        <FormContainer.Select
          label="شهر"
          name="city"
          rules={[
            {
              required: true,
              message: "این فیلد اجباری است",
            },
          ]}
          value={selectedCity}
          options={citiesData?.results ?? []}
          onChange={(value) => {
            setSelectedCity(value);
            setProvinceChanged(true);
          }}
          disabled={!citiesData}
        />
      )}
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

export default AddressForm;
