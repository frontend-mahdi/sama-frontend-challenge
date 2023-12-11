import { Button, Result, Typography } from "antd";

import { Link } from "react-router-dom";
const { Text } = Typography;

function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <Result
      status="error"
      title="خطایی رخ داده است"
      children={<Text code>{error.message}</Text>}
      extra={
        <Link to="/">
          <Button type="primary" onClick={() => resetErrorBoundary()}>
            بازگشت به خانه
          </Button>
        </Link>
      }
    />
  );
}

export default fallbackRender;
