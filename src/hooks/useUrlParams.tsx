import { ReadonlyURLSearchParams } from "next/navigation";

type ParamValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | (string | number | boolean)[];

type ParamsObject = Record<string, ParamValue>;

export function useUrlParams(searchParams: ReadonlyURLSearchParams) {
  // Helper function to build URL with params
  const buildUrl = (params: URLSearchParams) => {
    const paramString = params.toString();
    const pathname = window.location.pathname;
    return paramString ? `${pathname}?${paramString}` : pathname;
  };

  // Function overloads for better TypeScript support
  function updateParams(
    key: string,
    value: ParamValue,
    pushToHistory?: boolean,
  ): URLSearchParams;
  function updateParams(
    params: ParamsObject,
    pushToHistory?: boolean,
  ): URLSearchParams;
  function updateParams(
    keyOrParams: string | ParamsObject,
    value?: ParamValue | boolean,
    pushToHistory?: boolean,
  ) {
    const params = new URLSearchParams(searchParams.toString());
    let shouldPushToHistory = true; // Default to true

    if (typeof keyOrParams === "string") {
      // Single parameter update
      // Handle the case where value might be boolean (pushToHistory)
      const actualValue = typeof value === "boolean" ? undefined : value;
      shouldPushToHistory =
        typeof value === "boolean" ? value : (pushToHistory ?? true);

      if (
        actualValue === undefined ||
        actualValue === null ||
        actualValue === ""
      ) {
        params.delete(keyOrParams);
      } else {
        params.set(keyOrParams, String(actualValue));
      }
    } else {
      // Multiple parameters update
      shouldPushToHistory = typeof value === "boolean" ? value : true;

      Object.entries(keyOrParams).forEach(([key, value]) => {
        params.delete(key); // clear existing values

        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v !== undefined && v !== null && v !== "") {
              params.append(key, String(v));
            }
          });
        } else if (value !== undefined && value !== null && value !== "") {
          params.set(key, String(value));
        }
      });
    }

    // Use pushState or replaceState based on the flag
    const url = buildUrl(params);
    if (shouldPushToHistory) {
      window.history.pushState(null, "", url);
    } else {
      window.history.replaceState(null, "", url);
    }
    return params;
  }

  const deleteParams = (...keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((key) => params.delete(key));
    // Default to pushState for deleteParams to maintain history
    window.history.replaceState(null, "", buildUrl(params));
    return params;
  };

  const clearParams = () => {
    const params = new URLSearchParams();
    // Default to pushState for clearParams to maintain history
    window.history.replaceState(null, "", window.location.pathname);
    return params;
  };

  // Additional utility function to get current param value
  const getParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  // Get all values for a key (useful for arrays)
  const getParamAll = (key: string): string[] => {
    return searchParams.getAll(key);
  };

  // Check if param exists
  const hasParam = (key: string): boolean => {
    return searchParams.has(key);
  };

  return {
    updateParams,
    deleteParams,
    clearParams,
    getParam,
    getParamAll,
    hasParam,
  };
}
