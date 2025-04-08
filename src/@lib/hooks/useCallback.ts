/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  const _savedDeps = useRef<null | DependencyList>(null);
  const _savedFactory = useRef<null | T>(null);

  if (_savedDeps.current === null) _savedDeps.current = _deps;
  if (_savedFactory.current === null) _savedFactory.current = factory;

  if (!shallowEquals(_deps, _savedDeps.current)) {
    _savedDeps.current = _deps;
    _savedFactory.current = factory;
  }
  return _savedFactory.current;
}
