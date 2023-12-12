import { createContext, useState } from "react";

export const RegisterContext = createContext({
  step: 1,
  setStep: () => {},
  stepsContent: new Map(),
  setStepsContent: () => {},
  stepsContentError: new Map(),
  setStepsContentError: () => {},
});

export const RegisterContextProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [stepsContent, setStepsContent] = useState(new Map());
  const [stepsContentError, setStepsContentError] = useState(new Map());
  return (
    <RegisterContext.Provider
      value={{
        step,
        setStep,
        stepsContent,
        setStepsContent,
        stepsContentError,
        setStepsContentError,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
