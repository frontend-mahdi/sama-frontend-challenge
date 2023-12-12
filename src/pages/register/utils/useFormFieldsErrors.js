import { Form } from "antd";
import { useContext, useEffect } from "react";
import { RegisterContext } from "./RegisterContext";

const useFormFieldsErrors = (stepIndex) => {
  const [form] = Form.useForm();

  const { stepsContentError } = useContext(RegisterContext);

  const registerCtxError = stepsContentError.get(stepIndex);
  console.log(registerCtxError);
  useEffect(() => {
    if (registerCtxError && form) {
      console.log(registerCtxError);
      registerCtxError.forEach(({ field, error }) => {
        form.setFields([
          {
            name: field,
            errors: [error], // Set the specific input field as invalid with the provided error message
          },
        ]);
      });
    }
  }, [registerCtxError, form]);

  return form;
};

export default useFormFieldsErrors;
