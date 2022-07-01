import { MutableRefObject, useEffect, useRef } from 'react';
interface DebugEvent<T = any> {
  action: string;
  data: T;
}
export const debugData = <P>(events: DebugEvent<P>[], timer = 1000): void => {
  if (process.env.NODE_ENV === 'development' && isEnvBrowser()) {
    for (const event of events) {
      setTimeout(() => {
        window.dispatchEvent(
          new MessageEvent('message', { data: { action: event.action, data: event.data } }),
        );
      }, timer);
    }
  }
};
export async function fetchNui<T = any>(
  eventName: string,
  resName?: string,
  data?: any,
): Promise<T> {
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  };
  let resourceName;
  if (resName != null) {
    resourceName = resName;
  } else {
    resourceName = (window as any).GetParentResourceName
      ? (window as any).GetParentResourceName()
      : 'nui-frame-app';
  }
  const resp = await fetch(`https://${resourceName}/${eventName}`, options);
  const respFormatted = await resp.json();
  return respFormatted;
}
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;
export const noop = () => {};
interface NuiMessageData<T = unknown> {
  action: string;
  data: T;
}
type NuiHandlerSignature<T> = (data: T) => void;
export const useNuiEvent = <T = any>(action: string, handler: (data: T) => void) => {
  const savedHandler: MutableRefObject<NuiHandlerSignature<T>> = useRef(noop);
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
      const { action: eventAction, data } = event.data;
      if (savedHandler.current) {
        if (eventAction === action) {
          savedHandler.current(data);
        }
      }
    };
    window.addEventListener('message', eventListener);
    return () => window.removeEventListener('message', eventListener);
  }, [action]);
};
export interface useNuiEventProps {
  nui_toggle: boolean;
  data: any;
}
