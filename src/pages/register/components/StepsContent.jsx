import { useContext } from "react";
import { RegisterContext } from "../utils/RegisterContext";
import useCheckRole from "../utils/useCheckRole";
import LegalPersonalForm from "./steps/step1/LegalPersonalForm";
import PersonalForm from "./steps/step1/PersonalForm";
import AddressForm from "./steps/step2/AddressForm";
import BankForm from "./steps/step3/BankForm";
import Preview from "./steps/step4/Preview";

const StepsContent = () => {
  const { step } = useContext(RegisterContext);
  const role = useCheckRole();
  const content = {
    1: {
      personal: <PersonalForm />,
      legal: <LegalPersonalForm />,
    }[role],
    2: <AddressForm />,
    3: <BankForm />,
    4: <Preview />,
  }[step];
  return content;
};

export default StepsContent;
