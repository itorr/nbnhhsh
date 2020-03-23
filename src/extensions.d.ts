type Producer<R> = () => R;
type Consumer<T> = (arg1:T) => void
type Func<T, R> = (arg1:T) => R;

interface String {
  isEmpty(): boolean
}

interface Window {
  app
}

declare module '*.html' {
  const content: string;
  export default content;
}
declare module '*.css' {
  const content: string;
  export default content;
}
