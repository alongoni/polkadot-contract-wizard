"use strict";(self.webpackChunkpolkadot_contract_wizard=self.webpackChunkpolkadot_contract_wizard||[]).push([[3047],{595:function(e){function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,o,r){if(t.language===a){var c=t.tokenStack=[];t.code=t.code.replace(o,(function(e){if("function"===typeof r&&!r(e))return e;for(var o,i=c.length;-1!==t.code.indexOf(o=n(a,i));)++i;return c[i]=e,o})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var o=0,r=Object.keys(t.tokenStack);!function c(i){for(var u=0;u<i.length&&!(o>=r.length);u++){var l=i[u];if("string"===typeof l||l.content&&"string"===typeof l.content){var p=r[o],s=t.tokenStack[p],g="string"===typeof l?l:l.content,f=n(a,p),k=g.indexOf(f);if(k>-1){++o;var d=g.substring(0,k),h=new e.Token(a,e.tokenize(s,t.grammar),"language-"+a,s),m=g.substring(k+f.length),y=[];d&&y.push.apply(y,c([d])),y.push(h),m&&y.push.apply(y,c([m])),"string"===typeof l?i.splice.apply(i,[u,1].concat(y)):l.content=y}}else l.content&&c(l.content)}return i}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_markupTemplating.a155cd8c.chunk.js.map