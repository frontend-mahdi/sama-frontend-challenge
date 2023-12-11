import { Layout, Space, Steps } from "antd";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { layoutContentStyle } from "utils/styles";
import Preview from "./components/Preview";
import LegalPersonalForm from "./components/forms/first/LegalPersonalForm";
import PersonalForm from "./components/forms/first/PersonalForm";
import LocationForm from "./components/forms/second/LocationForm";
import BankForm from "./components/forms/third/BankForm";

const { Content, Header } = Layout;

export const RegisterContext = createContext({
  step: 0,
  setStep: () => {},
  stepsContent: new Map(),
  setStepsContent: () => {},
});

export const stepsTitles = [
  {
    title: "اطلاعات اولیه",
  },
  {
    title: "اطلاعات محل سکونت",
  },
  {
    title: "اطلاعات بانکی",
  },
  {
    title: "ثبت نهایی",
  },
];

const RegisterPage = () => {
  const [step, setStep] = useState(0);
  const [stepsContent, setStepsContent] = useState(new Map());

  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const validRoles = new Set(["personal", "legal"]);
  const role = validRoles.has(searchParam.get("role") ?? "")
    ? searchParam.get("role")
    : "notValid";

  useEffect(() => {
    if (role === "notValid") navigate("/");
    setStepsContent((stepsContent) => stepsContent.set(0, { type: role }));
  }, [role, navigate]);
  console.log(stepsContent);
  const content = {
    0: {
      personal: <PersonalForm />,
      legal: <LegalPersonalForm />,
    }[role],
    1: <LocationForm />,
    2: <BankForm />,
    3: <Preview />,
  }[step];

  return (
    <Layout style={{ marginInline: "auto", maxWidth: "1400px" }}>
      <Space direction="vertical" size={50} style={layoutContentStyle}>
        <RegisterContext.Provider
          value={{ step, setStep, stepsContent, setStepsContent }}
        >
          <Header
            style={{
              ...layoutContentStyle,
              marginBlock: "2rem",
              height: "unset",
            }}
          >
            <Steps size="small" current={step} items={stepsTitles} />
          </Header>
          <Content style={layoutContentStyle}>{content}</Content>
          {/* <Footer style={layoutContentStyle}>
            <Space direction="horizontal">
             
              <Button
                type="primary"
                onClick={() => setStep((_step) => _step + 1)}
              >
                مرحله
              </Button>
            </Space>
          </Footer> */}
        </RegisterContext.Provider>
      </Space>
    </Layout>
  );
};

export default RegisterPage;
