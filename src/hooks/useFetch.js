import { useEffect, useState } from 'react';

const useFetch = (url, headers, thirdPartyData) => {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((jsonRes) => {
        // Success
      })
      .catch((err) => {
        // Error
      });
  }, [url]);
};

export default useFetch;
