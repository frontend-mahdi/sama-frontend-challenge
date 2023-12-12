import { App, Button, Descriptions, Space, Spin } from "antd";
import { useContext } from "react";
import useCustomFetch from "services/useFetch";
import useCustomMutation from "services/useMutation";
import { RegisterContext, stepsTitles } from "../RegisterPage";
const Preview = () => {
  const { message } = App.useApp();
  const registerCtx = useContext(RegisterContext);
  const provinceId = registerCtx.stepsContent.get(2).province ?? null;
  const { data: provincesData } = useCustomFetch({
    url: "/provinces",
    method: "GET",
  });

  const { data: citiesData } = useCustomFetch({
    url: provinceId ? `/cities/${provinceId}` : null,
    method: "GET",
  });

  const { mutate, isLoading } = useCustomMutation();

  const labels = {
    first_name: "نام",
    last_name: "نام خانوادگی",
    phone: "تلفن همراه",
    national_code: "کد ملی",
    registration_number: "شماره ثبت",
    tel: "تلفن ثابت",
    province: "استان",
    city: "شهر",
    bank_name: "نام بانک",
    iban: "شماره شبا",
    type: "نوع",
  };

  function collectItemsFromCtx(index) {
    const stepContent = registerCtx.stepsContent.get(index);

    let items = [];
    if (index === 1) {
      const zeroStep = registerCtx.stepsContent.get(0);
      items.push({
        key: Object.keys(zeroStep)[0],
        label: labels[Object.keys(zeroStep)[0]],
        children: Object.values(zeroStep)[0] === "legal" ? "حقوقی" : "حقیقی",
      });
    }
    if (index === 2) {
      const locationData = registerCtx.stepsContent.get(2);
      items = [
        {
          key: "province",
          label: labels["province"],
          children: provincesData.results.find(
            (province) => province.id === locationData.province
          )?.name,
        },
        {
          key: "city",
          label: labels["city"],
          children: citiesData.results.find(
            (city) => city.id === locationData.city
          )?.name,
        },
      ];
    } else
      for (const [key, value] of Object.entries(stepContent)) {
        items.push({
          key,
          label: labels[key],
          children: value,
        });
      }
    return items;
  }
  const stepsTitleExceptLast = stepsTitles.slice(0, -1);

  async function submitFormHandler() {
    let payload = {};
    for (const value of registerCtx.stepsContent.values()) {
      payload = { ...payload, ...value };
    }
    try {
      const result = await mutate("/submit", "POST", payload);
      message.success(result.detail);
    } catch (error) {
      const errorMessage = JSON.parse(error.message);
      message.error("خطا در فرم ارسالی از سمت سرور");
      console.log(errorMessage);
      const stepMapper = {
        info: 0,
        address: 1,
        bank: 2,
      };
      const step = stepMapper[errorMessage.detail];

      registerCtx.setStepsContentError((_stepsError) =>
        _stepsError.set(step, errorMessage.extra)
      );
      registerCtx.setStep(step);

      const mockErrorMessage = {
        code: "validation_error",
        detail: "info",
        extra: [
          {
            field: "first_name",
            error: "The length should be grater then 3 characters.",
          },
        ],
      };
    }
  }
  return (
    <>
      {stepsTitleExceptLast.map((step, index) => (
        <Descriptions
          key={index}
          title={step.title}
          items={collectItemsFromCtx(index + 1)}
          colon
          size="small"
          column={1}
          layout="horizontal"
          style={{
            maxWidth: 600,
            paddingInline: "1rem",
            marginInline: "auto",
            marginBlock: "1rem",
          }}
        />
      ))}
      <Space direction="horizontal" size={20} style={{ marginBlock: "3rem" }}>
        <Button
          onClick={() => registerCtx.setStep((_step) => _step - 1)}
          disabled={registerCtx.step === 0}
        >
          مرحله قبل
        </Button>
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
