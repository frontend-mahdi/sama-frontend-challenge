import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="۴۰۴"
      subTitle="صفحه موردنظر یافت نشد"
      extra={
        <Link to="/">
          <Button type="primary">بازگشت به خانه</Button>
        </Link>
      }
    />
  );
};

export default NotFoundPage;
