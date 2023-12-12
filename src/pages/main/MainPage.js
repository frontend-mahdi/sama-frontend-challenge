import { Button, Layout, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { layoutContentStyle } from "utils/styles";

const { Content, Header } = Layout;
const { Title } = Typography;

const MainPage = () => {
  return (
    <Layout style={{ marginInline: "auto", maxWidth: "1400px" }}>
      <Space direction="vertical" size={50} style={layoutContentStyle}>
        <Header style={layoutContentStyle}>
          <Title level={4}>نقش خود را مشخص کنید</Title>
        </Header>
        <Content style={layoutContentStyle}>
          <Space direction="horizontal" align="center" size={12}>
            <Link to="/register?role=personal">
              <Button type="primary" size="large">
                حقیقی
              </Button>
            </Link>
            <Link to="/register?role=legal">
              <Button type="dashed" size="large">
                حقوقی
              </Button>
            </Link>
          </Space>
        </Content>
      </Space>
    </Layout>
  );
};

export default MainPage;
