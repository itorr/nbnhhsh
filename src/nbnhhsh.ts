import { HTTPc, recheckWhileDelayed, appendResourceRaw, appendResource } from './helper'

const API_URL = 'https://lab.magiconch.com/api/nbnhhsh/';
const cachedWords = {};

const httpc = new HTTPc();
let app: { loading: boolean; show: boolean; top: number; left: number; tags: any; error: any; };

export async function guess(text: string) {
  if (cachedWords[text]) return cachedWords[text];

  app.loading = true;
  const resp = await httpc.send('POST', `${API_URL}/guess`, JSON.stringify({ text }));
  app.loading = false;
  let data = JSON.parse(resp);
  cachedWords[text] = data;
  return data;
};

export function submitTrans(name: string, trans: string = prompt('输入缩写对应文字', '')) {
  if (trans?.trim().isEmpty() ?? true) return;

  let httpc = new HTTPc();
  httpc.send('POST', `${API_URL}/translation/${name}`, JSON.stringify({ text: trans })).then(_ => {
    alert('感谢对好好说话项目的支持！审核通过后这条对应将会生效');
  });
};

export function getSelectionText() {
  let selection = window.getSelection();
  return selection.toString().trim();
}

export async function nbnhhsh() {
  let text = getSelectionText();
  app.show = !!(text);
  if (!app.show) return;

  positWordsDialog();
  guess(text).then(data => {
    app.error = null;
    app.tags = data;
    if (data.length == 0) app.show = false;
  }).catch(it => {
    app.error = it;
  });

  recheckSelectionForHide();
};

function positWordsDialog() {
  let rect = getSelection().getRangeAt(0).getBoundingClientRect();

  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  let top  = Math.floor( scrollTop + rect.top +rect.height );
  let left = Math.floor( rect.left );

  app.top = top;
  app.left = left;
}

const RECHECK_DELAY = 300;
function recheckSelectionForHide() {
  recheckWhileDelayed(() => !getSelectionText().isEmpty(), RECHECK_DELAY,
    () => { app.show = false });
}

const handler = () => setTimeout(nbnhhsh, 1);

document.body.addEventListener('mouseup', handler);
document.body.addEventListener('keyup', handler);

// front-end matters
import css_nbnhhsh from '../res/nbnhhsh.css'
import html_nbnhhsh from '../res/ui_nbnhhsh.html'

appendResourceRaw('style', css_nbnhhsh);
const word_ui = appendResourceRaw('div', html_nbnhhsh);

appendResource('script', 'https://cdn.bootcss.com/vue/2.6.11/vue.min.js').then(() => {
  app = new window['Vue']({
    el: word_ui,
    data: {
      tags:[],
      loading:false,
      show:false,
      top:0,
      left:0
    },
    methods: {
      submitTrans
    }
  })
});
