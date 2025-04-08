/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  //useMemo를 이용합니다.
  return useMemo(() => factory, _deps);
}
