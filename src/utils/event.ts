export const sendEvent = (eventName: string, detail: any) => {
  document.dispatchEvent(new CustomEvent(eventName, { detail }))
}

export const listenEvent = (
  eventName: string,
  handler: (...arg: any) => any,
  context = document
) => {
  context.addEventListener(eventName, handler)
  return () => context.removeEventListener(eventName, handler)
}
