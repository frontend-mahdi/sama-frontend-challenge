import { BASE_URL } from "mocks/consts";
import { useState } from "react";

function useCustomMutation() {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (url, method, body) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setIsLoading(false);
      return result;
    } catch (error) {
      console.error("Error in mutation:", error);
      setIsLoading(false);
      throw error;
    }
  };

  return { mutate, isLoading };
}

export default useCustomMutation;
