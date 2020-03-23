String.prototype.isEmpty = () => this.length == 0;

export class MostRecentCallTo<T, R> {
  op: Func<T, R>; timer: number; delay_ms: number;
  constructor(op: Func<T, R>, delay_ms: number) {
    this.op = op;
    this.timer = null;
    this.delay_ms = delay_ms;
  }
  invoke(arg1: T): Promise<R> {
    if (this.timer) clearTimeout(this.timer);
    return new Promise(resolve => setTimeout(() => resolve(this.op(arg1)), this.delay_ms));
  }
}

export class HTTPc {
  xhr: XMLHttpRequest
  _defaultHeaders = {'content-type': 'application/json'};
  _defaultOnSend = (self:HTTPc) => { this.xhr.withCredentials = true };
  cancel() { this.xhr?.abort(); }
  send(method: string, url: string, data: string, headers: Object = this._defaultHeaders, onSend = this._defaultOnSend): Promise<string> {
    this.cancel();
    this.xhr = new XMLHttpRequest();
    this.xhr.open(method, url);
    for (let [key, content] of Object.entries(headers))
      this.xhr.setRequestHeader(key, content);
    onSend(this);
    this.xhr.send(data);
    return new Promise((resolve, reject) => {
      this.xhr.onload = () => resolve(this.xhr.responseText);
      this.xhr.onerror = reject;
    });
  }
}

export function recheckWhileDelayed(predicate: Producer<boolean>, delay_ms: number, action: Function) {
  if (predicate()) action();
  else setTimeout(recheckWhileDelayed.bind(null, predicate, delay_ms, action), delay_ms);
}

//// HTML DSL
export { Config, singleElement, withAttribute, withInnerHTML }

type Config = Consumer<HTMLElement>
function singleElement<H extends keyof(HTMLElementTagNameMap)>(tagName: H, ...configs: [Config]): HTMLElementTagNameMap[H] {
  let e = document.createElement(tagName);
  configs.forEach(runOn => runOn(e));
  return e;
}
function withAttribute(name: string, value: any): Config {
  return e => { e.setAttribute(name, value); };
}
function withInnerHTML(innerHTML: string): Config {
  return e => { e.innerHTML = innerHTML; };
}

export { appendResource, appendResourceRaw }
function appendResource(tagName: keyof(HTMLElementTagNameMap), src: string): Promise<Event> {
  let e = document.body.appendChild(singleElement(tagName, withAttribute("src", src)));
  return new Promise(resolve => { e.onload = resolve; });
};
function appendResourceRaw<H extends keyof(HTMLElementTagNameMap)>(tagName: H, innerHTML: string): HTMLElementTagNameMap[H] {
  let e = singleElement(tagName, withInnerHTML(innerHTML));
  document.body.appendChild(e);
  return e;
}
