import { shallowEquals } from "../equalities";

type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<T> = (value: T) => void;

/**컴포넌트에 state 변수를 추가할 수 있는 리액트 훅 */
export function useState<T>(
  initialState: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  //section1: state를 정의합니다.
  let state: T;

  if (typeof initialState === "function") {
    state = (initialState as () => T)();
  } else {
    state = initialState;
  }

  //section2: setState를 정의합니다.
  const setState: Dispatch<SetStateAction<T>> = (nextStateUpdater) => {
    let nextState;

    if (typeof nextStateUpdater === "function") {
      nextState = (nextStateUpdater as (prevState: T) => T)(state);
    } else {
      nextState = nextStateUpdater;
    }

    if (shallowEquals(state, nextState)) {
      console.warn("setState로 들어온 매개변수가 동일합니다");
      return;
    }

    state = nextState;
  };

  return [state, setState];
}
