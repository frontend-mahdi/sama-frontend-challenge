import { BASE_URL } from "mocks/consts";
import { useEffect, useState } from "react";

const cache = {};

function useCustomFetch({ url, method, body = undefined }) {
  const cacheKey = JSON.stringify({ url, method, body });

  const [data, setData] = useState(cache[cacheKey] ?? null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (url && !cache[cacheKey]) {
      setIsLoading(true);
      fetch(`${BASE_URL}${url}`, {
        method,
        body,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          if (isMounted) {
            cache[cacheKey] = result;
            setData(result);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error(
            "There was a problem with the fetch operation: ",
            error
          );
          setIsLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [body, cacheKey, method, url]);

  return { data, isLoading };
}

export default useCustomFetch;
