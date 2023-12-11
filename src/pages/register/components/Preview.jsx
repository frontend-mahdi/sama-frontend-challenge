import { Button, Descriptions, Space } from "antd";
import { useContext } from "react";
import { RegisterContext, stepsTitles } from "../RegisterPage";

const Preview = () => {
  const registerCtx = useContext(RegisterContext);
  const items = [
    {
      key: "1",
      label: "UserName",
      children: "Zhou Maomao",
    },
    {
      key: "2",
      label: "Telephone",
      children: "1810000000",
    },
    {
      key: "3",
      label: "Live",
      children: "Hangzhou, Zhejiang",
    },
    {
      key: "4",
      label: "Remark",
      children: "empty",
    },
    {
      key: "5",
      label: "Address",
      children:
        "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
    },
  ];
  const stepsTitleExceptLast = [...stepsTitles];
  stepsTitleExceptLast.pop();

  return (
    <>
      {stepsTitleExceptLast.map((step, index) => (
        <Descriptions
          key={index}
          title={step.title}
          items={items}
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
      <Space direction="horizontal" size={20}>
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
