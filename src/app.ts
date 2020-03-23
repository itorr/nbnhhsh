import { guess, submitTrans } from "./nbnhhsh";
import { MostRecentCallTo } from "./helper";

let app: { show: boolean; tags: any; error: any; };

const _guess = new MostRecentCallTo(guess, 300);

const data = {
  text:'',
  tags:[],
  loading:false,
  show:false
};
const methods = {
  submitTrans,
  nbnhhsh() {
    let text = this.text;
    app.show = !!text;
    if (!text) return;
    _guess.invoke(text).then(data => {
      app.error = null;
      app.tags = data;
    }).catch(it => {
      app.error = it;
    });
  }
};

const editor = window['editor'];
app = new window['Vue']({ el: editor, data, methods });
