import { useState, useEffect, useRef, useCallback } from 'react';
import { API_BASE_URL } from '../config';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
}

const useFetch = <T>(url: string, options: FetchOptions = {}) => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url.startsWith('/') ? url : '/' + url}`;
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const requestCountRef = useRef(0);
  const optionsRef = useRef(options);

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    requestCountRef.current++;
    const currentRequestId = requestCountRef.current;

    try {
      const response = await fetch(fullUrl, {
        method: optionsRef.current.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...optionsRef.current.headers,
        },
        body: optionsRef.current.body ? JSON.stringify(optionsRef.current.body) : undefined,
        signal: abortControllerRef.current.signal,
      });

      if (currentRequestId !== requestCountRef.current || abortControllerRef.current.signal.aborted) {
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (error) {
      if (currentRequestId !== requestCountRef.current) {
        return;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('An unknown error occurred'),
      });
    }
  }, [fullUrl]);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    setState(prev => ({ ...prev, loading: true }));
    return fetchData();
  }, [fetchData]);

  return { ...state, refetch };
};

export default useFetch; 