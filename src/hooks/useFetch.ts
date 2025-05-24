import { useState, useEffect, useRef } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

const useFetch = <T>(url: string, options: FetchOptions = {}) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const requestCountRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      
      // Increment request count to track unique requests
      requestCountRef.current++;
      const currentRequestId = requestCountRef.current;

      const startTime = Date.now();
      const requestId = Math.random().toString(36).substring(7);

      try {
        // Log request
        console.log(`[${requestId}] Request:`, {
          url,
          method: options.method || 'GET',
          headers: options.headers,
          body: options.body,
          timestamp: new Date().toISOString(),
        });

        const response = await fetch(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          body: options.body ? JSON.stringify(options.body) : undefined,
          signal: abortControllerRef.current.signal,
        });

        // Check if this request is still the latest one
        if (currentRequestId !== requestCountRef.current) {
          return;
        }

        // Check if request was aborted
        if (abortControllerRef.current.signal.aborted) {
          return;
        }

        const data = await response.json();

        // Check again if this is still the latest request
        if (currentRequestId !== requestCountRef.current) {
          return;
        }

        // Log response
        console.log(`[${requestId}] Response:`, {
          status: response.status,
          statusText: response.statusText,
          data,
          duration: `${Date.now() - startTime}ms`,
          timestamp: new Date().toISOString(),
        });

        // Save to localStorage
        const logEntry = {
          requestId,
          url,
          method: options.method || 'GET',
          requestBody: options.body,
          responseStatus: response.status,
          responseData: data,
          timestamp: new Date().toISOString(),
          duration: Date.now() - startTime,
        };

        const logs = JSON.parse(localStorage.getItem('api_logs') || '[]');
        logs.push(logEntry);
        localStorage.setItem('api_logs', JSON.stringify(logs.slice(-50))); // Keep last 50 logs

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        setState({
          data,
          loading: false,
          error: null,
        });
      } catch (error) {
        // Don't set error state if request was aborted or not the latest
        if (currentRequestId !== requestCountRef.current) {
          return;
        }

        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        console.error(`[${requestId}] Error:`, error);
        setState({
          data: null,
          loading: false,
          error: error as Error,
        });
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, options.method, JSON.stringify(options.headers), JSON.stringify(options.body)]);

  return state;
};

export default useFetch; 