const { BASE_URL } = require("mocks/consts");
const { useState } = require("react");

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
      if (response.ok) {
        setIsLoading(false);
        const result = await response.json();
        return result;
      } else {
        setIsLoading(false);
        const result = await response.json();
        const error = new Error();
        error.message = JSON.stringify(result);
        throw error;
      }
    } catch (error) {
      console.error("Error in mutation:", error.message);
      setIsLoading(false);
      throw error;
    }
  };

  return { mutate, isLoading };
}

export default useCustomMutation;
