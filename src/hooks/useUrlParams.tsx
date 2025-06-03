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
  // Function overloads for better TypeScript support
  function updateParams(key: string, value: ParamValue): URLSearchParams;
  function updateParams(params: ParamsObject): URLSearchParams;
  function updateParams(
    keyOrParams: string | ParamsObject,
    value?: ParamValue,
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (typeof keyOrParams === "string") {
      // Single parameter update
      if (value === undefined || value === null || value === "") {
        params.delete(keyOrParams);
      } else {
        params.set(keyOrParams, String(value));
      }
    } else {
      // Multiple parameters update
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

    window.history.pushState(null, "", `?${params.toString()}`);
    return params;
  }

  const deleteParams = (...keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((key) => params.delete(key));
    window.history.pushState(null, "", `?${params.toString()}`);
    return params;
  };

  const clearParams = () => {
    const params = new URLSearchParams();
    window.history.pushState(null, "", window.location.pathname);
    return params;
  };

  return { updateParams, deleteParams, clearParams };
}
