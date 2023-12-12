import { Layout, Space } from "antd";
import { layoutContentStyle } from "utils/styles";
import StepsContent from "./components/StepsContent";
import StepsIndicator from "./components/StepsIndicator";
import { RegisterContextProvider } from "./utils/RegisterContext";

const { Content, Header } = Layout;

const RegisterPage = () => {
  return (
    <Layout style={{ marginInline: "auto", maxWidth: "1400px" }}>
      <Space direction="vertical" size={50} style={layoutContentStyle}>
        <RegisterContextProvider>
          <Header
            style={{
              ...layoutContentStyle,
              marginBlock: "2rem",
              height: "unset",
            }}
          >
            <StepsIndicator />
          </Header>
          <Content style={layoutContentStyle}>
            <StepsContent />
          </Content>
        </RegisterContextProvider>
      </Space>
    </Layout>
  );
};

export default RegisterPage;
