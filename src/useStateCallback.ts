import React from 'react';

export function useStateCallback<T>(initialState: T) {
  const [state, setInternalState] = React.useState(initialState);

  const callback = React.useRef<(state: T) => void>();
  const triggered = React.useRef(false);

  const setState = React.useCallback(
    (updatedState: T, cb?: (state: T) => void) => {
      callback.current = cb;
      setInternalState(updatedState);
    },
    [setInternalState]
  );

  React.useEffect(() => {
    if (triggered.current && callback.current) {
      // tslint:disable-next-line:no-console
      console.log(`state with callback changed to ${state}`);
      callback.current(state);
      callback.current = undefined;
    }
  }, [state]);

  React.useEffect(() => {
    triggered.current = true;
  }, []);

  return [state, setState] as const;
}
