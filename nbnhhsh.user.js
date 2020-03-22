// ==UserScript==
// @name         能不能好好说话
// @namespace    https://lab.magiconch.com/nbnhhsh
// @version      0.1
// @description  首字母缩写划词翻译工具
// @author       itorr
// @match        https://weibo.com/*
// @match        https://www.weibo.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {

let APIURL = 'https://lab.magiconch.com/api/nbnhhsh/';
let Nbnhhsh = {};

let guess = (text,onOver)=>{

	if(Nbnhhsh[text]){
		return onOver(Nbnhhsh[text]);
	}
	if(guess.x){
		guess.x.abort();
	}
	app.loading = true;
	guess.x = new XMLHttpRequest();
	guess.x.open('POST',APIURL+'guess');
	guess.x.setRequestHeader('content-type', 'application/json');
	guess.x.withCredentials = true;
	guess.x.onload = ()=>{
		app.loading = false;
		let data = JSON.parse(guess.x.responseText);

		onOver(Nbnhhsh[text] = data);
	};

	guess.x.send(JSON.stringify({text}));
};
let submitTran = (name)=>{

	let text = prompt('输入缩写对应文字','');

	if(!text || !text.trim || !text.trim()){
		return;
	}

	let x = new XMLHttpRequest();
	x.open('POST',APIURL+'translation/'+name);
	x.setRequestHeader('content-type', 'application/json');
	x.withCredentials = true;
	x.onload = ()=>{
		alert('感谢对好好说话项目的支持！审核通过后这条对应将会生效');
	};
	x.send(JSON.stringify({text}));
};
let nbnhhsh = ()=>{
	let selection = window.getSelection();
	let text = selection.toString().trim();

	app.show = !!text;
	// app.show = true;

	if(text){
		let rect = selection.getRangeAt(0).getBoundingClientRect();

		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

		let top  = Math.floor( scrollTop + rect.top +rect.height );
		let left = Math.floor( rect.left );

		app.top = top;
		app.left = left;

		guess(text,data=>{

			if(data.error){
				app.error = data.error;
			}else{
				app.error = null;
				app.tags = data;
				if(!data.length){
					app.show = false;
				}
			}
		});

		timer();
	}
};
let handle = ()=>{
	setTimeout(nbnhhsh,1);
};

document.body.addEventListener('mouseup',handle);
document.body.addEventListener('keyup',handle);

let timer = ()=>{
	let selection = window.getSelection();
	let text = selection.toString().trim();

	if(!text){
		app.show = false;
	}else{
		setTimeout(timer,300);
	}
};


let el = document.createElement('div');
document.body.appendChild(el);


el.innerHTML = `
	<div class="nbnhhsh-box" v-if="show" :style="{top:top+'px',left:left+'px'}" @mousedown.prevent>
		<div class="nbnhhsh-loading" v-if="loading">
			加载中…
		</div>
		<div class="nbnhhsh-tag-list" v-else-if="tags.length">
			<div class="nbnhhsh-tag-item" v-for="tag in tags">
				<h4>{{tag.name}}</h4>
				<div class="nbnhhsh-tran-list" v-if="tag.trans">
					<span class="nbnhhsh-tran-item" v-for="tran in tag.trans">{{tran}}</span>
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
				<a @click.prevent="submitTran(tag.name)" class="nbnhhsh-add-btn" title="我来提交对应文字"></a>
			</div>
		</div>
	</div>
`;


let app;


let j = (src,onOver) =>{
	let el = document.createElement('script');
	el.src = src;
	if(onOver){
		el.onload = onOver;
	}
	document.body.appendChild(el);
};

j('https://cdn.bootcss.com/vue/2.6.11/vue.min.js',()=>{
	document.body.appendChild(el);
	app = new Vue({
		el,
		data: {
			tags:[],
			loading:false,
			show:false,
			top:0,
			left:0
		},
		methods:{
			submitTran
		}
	})
});


let styleEl = document.createElement('style');
document.body.appendChild(styleEl);

styleEl.innerHTML=`
.nbnhhsh-box{
	position: absolute;
	z-index:99999999999;
	width: 210px;
	background:#FFF;
	box-shadow: 0 3px 30px -4px rgba(0,0,0,.3);
	margin: 10px 0 100px 0;
	font:400 14px/1.4 sans-serif;
}
.nbnhhsh-box::before{
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
	font-size:18px;
}
.nbnhhsh-tran-list{
	color:#222;
	padding:4px 0;
}
.nbnhhsh-tran-item{
	margin-right:4px;
}

.nbnhhsh-inputting-list{
	color:#222;
	padding:4px 0;
}
.nbnhhsh-inputting-list h5{
	font-size:12px;
	line-height:24px;
	color:#999;
}
.nbnhhsh-inputting-item{
	margin-right:4px;
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
`;

})();