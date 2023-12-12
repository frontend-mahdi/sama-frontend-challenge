import { Steps } from "antd";
import { useContext } from "react";
import { RegisterContext } from "../utils/RegisterContext";
import { stepsTitles } from "../utils/consts";

const StepsIndicator = () => {
  const { step } = useContext(RegisterContext);
  return (
    <Steps
      size="small"
      current={step}
      items={stepsTitles}
      style={{
        borderRadius: "10px",
        padding: "1rem",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};

export default StepsIndicator;
