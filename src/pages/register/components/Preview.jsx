import { Button, Descriptions, Space } from "antd";
import { useContext } from "react";
import { RegisterContext, stepsTitles } from "../RegisterPage";

const Preview = () => {
  const registerCtx = useContext(RegisterContext);
  const labels = {
    first_name: "نام",
    last_name: "نام خانوادگی",
    phone_number: "تلفن همراه",
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

  console.log(stepsTitleExceptLast);
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
        <Button type="primary">ثبت نهایی</Button>
      </Space>
    </>
  );
};

export default Preview;
