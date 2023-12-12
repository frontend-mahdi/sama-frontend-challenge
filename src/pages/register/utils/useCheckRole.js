import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RegisterContext } from "./RegisterContext";

const useCheckRole = () => {
  const { setStepsContent } = useContext(RegisterContext);
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const validRoles = new Set(["personal", "legal"]);
  const role = validRoles.has(searchParam.get("role") ?? "")
    ? searchParam.get("role")
    : "notValid";

  useEffect(() => {
    if (role === "notValid") navigate("/");
    setStepsContent((stepsContent) => stepsContent.set(0, { type: role }));
  }, [role, navigate, setStepsContent]);
  return role;
};

export default useCheckRole;
