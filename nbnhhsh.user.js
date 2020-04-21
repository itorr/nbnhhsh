// ==UserScript==
// @name         能不能好好说话？
// @namespace    https://lab.magiconch.com/nbnhhsh
// @version      0.14
// @description  首字母缩写划词翻译工具
// @author       itorr
// @match        *://weibo.com/*
// @match        *://*.weibo.com/*
// @match        *://*.weibo.cn/*
// @match        *://tieba.baidu.com/*
// @match        *://*.bilibili.com/
// @match        *://*.bilibili.com/*
// @match        *://*.douban.com/group/*
// @match        *://douban.com/group/*
// @require      https://cdn.bootcss.com/vue/2.6.11/vue.min.js
// @grant        none
// ==/UserScript==

let Nbnhhsh = ((htmlText,cssText)=>{

	const API_URL = 'https://lab.magiconch.com/api/nbnhhsh/';

	const request = (method,url,data,onOver)=>{
		let x = new XMLHttpRequest();
		x.open(method,url);
		x.setRequestHeader('content-type', 'application/json');
		x.withCredentials = true;
		x.onload = ()=> onOver(x.responseText ? JSON.parse(x.responseText) : null);
		x.send(JSON.stringify(data));
		return x;
	};

	const Guess = {};
	const guess = (text,onOver)=>{
		text = text.match(/[a-z0-9]+/ig).join(',');

		if(Guess[text]){
			return onOver(Guess[text]);
		}

		if(guess._request){
			guess._request.abort();
		}

		app.loading = true;
		guess._request = request('POST',API_URL+'guess',{text},data=>{
			Guess[text] = data;
			onOver(data);
			app.loading = false;
		});
	};

	const submitTran = name=>{
		let text = prompt('输入缩写对应文字 末尾可通过括号包裹（简略注明来源）','');

		if(!text || !text.trim || !text.trim()){
			return;
		}

		request('POST',API_URL+'translation/'+name,{text},()=>{
			alert('感谢对好好说话项目的支持！审核通过后这条对应将会生效');
		});
	};

	const transArrange = trans=>{
		return trans.map(tran=>{
			const match = tran.match(/^(.+?)([（\(](.+?)[）\)])?$/);

			if(match.length === 4){
				return {
					text:match[1],
					sub:match[3]
				}
			}else{
				return {
					text:tran
				}
			}
		})
	};

	const getSelectionText = ()=>{
		let text = getSelection().toString().trim();

		if(!!text && /[a-z0-9]/i.test(text)){
			return text;
		}else{
			return null;
		}
	};

	const fixPosition = ()=>{
		let rect = getSelection().getRangeAt(0).getBoundingClientRect();

		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

		let top  = Math.floor( scrollTop + rect.top +rect.height );
		let left = Math.floor( rect.left );

		if(top === 0 && left === 0){
			app.show = false;
		}
		app.top = top;
		app.left = left;

	};

	const timer = ()=>{
		if(getSelectionText()){
			setTimeout(timer,300);
		}else{
			app.show = false;
		}
	};

	const nbnhhsh = ()=>{
		let text = getSelectionText();

		app.show = !!text && /[a-z0-9]/i.test(text);

		if(!app.show){
			return;
		}

		fixPosition();

		guess(text,data=>{
			if(!data.length){
				app.show = false;
			}else{
				app.tags = data;
			}
		});

		setTimeout(timer,300);
	};

	const _nbnhhsh = ()=>{
		setTimeout(nbnhhsh,1);
	};

	document.body.addEventListener('mouseup',_nbnhhsh);
	document.body.addEventListener('keyup',_nbnhhsh);

	const createEl = (html)=>{
		createEl._el.innerHTML = html;
		let el = createEl._el.children[0];
		document.body.appendChild(el);
		return el;
	};
	createEl._el = document.createElement('div');


	createEl(`<style>${cssText}</style>`);

	const el = createEl(htmlText);

	const app = new Vue({
		el,
		data: {
			tags:[],
			show:false,
			loading:false,
			top:0,
			left:0,
		},
		methods:{
			submitTran,
			transArrange,
		}
	});

	return {
		guess,
		submitTran,
		transArrange,
	}
})(`
<div class="nbnhhsh-box nbnhhsh-box-pop" v-if="show" :style="{top:top+'px',left:left+'px'}" @mousedown.prevent>
	<div class="nbnhhsh-loading" v-if="loading">
		加载中…
	</div>
	<div class="nbnhhsh-tag-list" v-else-if="tags.length">
		<div class="nbnhhsh-tag-item" v-for="tag in tags">
			<h4>{{tag.name}}</h4>
			<div class="nbnhhsh-tran-list" v-if="tag.trans">
				<span class="nbnhhsh-tran-item" v-for="tran in transArrange(tag.trans)">
					{{tran.text}}<sub v-if="tran.sub">{{tran.sub}}</sub>
				</span>
			</div>
			<div class="nbnhhsh-notran-box" v-else-if="tag.trans===null">
				无对应文字
			</div>
			<div v-else-if="tag.inputting && tag.inputting.length !==0">
				<div class="nbnhhsh-inputting-list">
					<h5>有可能是</h5>
					<span class="nbnhhsh-inputting-item" v-for="input in tag.inputting">{{input}}</span>
				</div>
			</div>
			<div class="nbnhhsh-notran-box" v-else @click.prevent="submitTran(tag.name)">
				尚未录入，我来提交对应文字
			</div>
			<a v-if="tag.trans!==null" @click.prevent="submitTran(tag.name)" class="nbnhhsh-add-btn" title="我来提交对应文字"></a>
		</div>
	</div>
</div>
`, `
.nbnhhsh-box{
	font:400 14px/1.4 sans-serif;
}
.nbnhhsh-box-pop{
	position: absolute;
	z-index:99999999999;
	width: 340px;
	background:#FFF;
	box-shadow: 0 3px 30px -4px rgba(0,0,0,.3);
	margin: 10px 0 100px 0;
}
.nbnhhsh-box-pop::before{
	content: '';
	position: absolute;
	top:-7px;
	left:8px;
	width: 0;
	height: 0;
	border:7px solid transparent;

	border-top:1px;
	border-bottom-color:#FFF;
}
.nbnhhsh-box sub{
    vertical-align: middle;
    
    background: rgba(0,0,0,.07);
    color: #777;
    font-size: 12px;
    line-height:16px;
    display: inline-block;
    padding: 0 3px;
    margin:-2px 0 0 2px;
    border-radius: 2px;
    letter-spacing: -0.6px;
    bottom:0;
}
.nbnhhsh-tag-list{
	/*padding:4px 0;*/
}
.nbnhhsh-tag-item{
	padding:4px 14px;
	position: relative;
}
.nbnhhsh-tag-item:nth-child(even){
	background: rgba(0, 99, 255, 0.06);
}
.nbnhhsh-tag-item h4{
	font-weight:bold;
	font-size:20px;
	line-height:28px;
    letter-spacing: 1.5px;
	margin:0;
}
.nbnhhsh-tran-list{
	color:#444;
	padding:4px 0;
	line-height:18px;
}
.nbnhhsh-tran-item{
    display: inline-block;
    padding: 2px 15px 2px 0;
}

.nbnhhsh-inputting-list{
	color:#222;
	padding:4px 0;
}
.nbnhhsh-inputting-list h5{
	font-size:12px;
	line-height:24px;
	color:#999;
	margin:0;
}
.nbnhhsh-inputting-item{
	margin-right:14px;
	display:inline-block;
}
.nbnhhsh-notran-box{
	padding:4px 0;
	color:#999;
	cursor: pointer;
}
.nbnhhsh-add-btn{
	position: absolute;
	top:0;
	right:0;
	width: 30px;
	line-height: 30px;
	text-align: center;
	color: #0059ff;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
}
.nbnhhsh-add-btn:after{
	content: '+';
}
.nbnhhsh-loading{
	text-align: center;
	color:#999;
	padding:20px 0;
}
`);
