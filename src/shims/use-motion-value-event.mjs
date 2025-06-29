import { useInsertionEffect } from 'react';
export function useMotionValueEvent(value, event, callback) {
  useInsertionEffect(() => value.on(event, callback), [value, event, callback]);
}
export default useMotionValueEvent;
