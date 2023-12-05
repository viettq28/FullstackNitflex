import { useState, useCallback } from 'react';
// hook xử lý Lấy dữ liệu từ API
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const sendRequest = useCallback(async (url, applyData, opts) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = !opts ? await fetch(url) : await fetch(url, opts);

      if (!response.ok) {
        throw new Error('Request failed!');
      }
      
      const data = await response.json();
      applyData(data);
    }catch (err) {
      setError(err.message || 'Something went wrong');
    }

    setIsLoading(false);

  }, []); 

  return {
    isLoading,
    error,
    sendRequest
  }
};
export default useHttp;
