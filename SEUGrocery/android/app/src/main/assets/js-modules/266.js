__d(function(g,r,i,a,m,e,d){'use strict';var t,n=r(d[0]),l=r(d[1]),u=r(d[2]),o=r(d[3]),c=r(d[4]),s=r(d[5]),p=r(d[6]),k=(r(d[7]),r(d[8])),v=r(d[9]).StatusBarManager;function y(t){return{backgroundColor:null!=t.backgroundColor?{value:t.backgroundColor,animated:t.animated}:null,barStyle:null!=t.barStyle?{value:t.barStyle,animated:t.animated}:null,translucent:t.translucent,hidden:null!=t.hidden?{value:t.hidden,animated:t.animated,transition:t.showHideTransition}:null,networkActivityIndicatorVisible:t.networkActivityIndicatorVisible}}var f=(function(t){function s(){var t,l;n(this,s);for(var c=arguments.length,p=new Array(c),k=0;k<c;k++)p[k]=arguments[k];return(l=u(this,(t=o(s)).call.apply(t,[this].concat(p))))._stackEntry=null,l}return c(s,t),l(s,[{key:"componentDidMount",value:function(){this._stackEntry=s.pushStackEntry(this.props)}},{key:"componentWillUnmount",value:function(){s.popStackEntry(this._stackEntry)}},{key:"componentDidUpdate",value:function(){this._stackEntry=s.replaceStackEntry(this._stackEntry,this.props)}},{key:"render",value:function(){return null}}],[{key:"setHidden",value:function(t,n){n=n||'none',s._defaultProps.hidden.value=t,v.setHidden(t)}},{key:"setBarStyle",value:function(t,n){n=n||!1,s._defaultProps.barStyle.value=t,v.setStyle(t)}},{key:"setNetworkActivityIndicatorVisible",value:function(t){console.warn('`setNetworkActivityIndicatorVisible` is only available on iOS')}},{key:"setBackgroundColor",value:function(t,n){n=n||!1,s._defaultProps.backgroundColor.value=t,v.setColor(k(t),n)}},{key:"setTranslucent",value:function(t){s._defaultProps.translucent=t,v.setTranslucent(t)}},{key:"pushStackEntry",value:function(t){var n=y(t);return s._propsStack.push(n),s._updatePropsStack(),n}},{key:"popStackEntry",value:function(t){var n=s._propsStack.indexOf(t);-1!==n&&s._propsStack.splice(n,1),s._updatePropsStack()}},{key:"replaceStackEntry",value:function(t,n){var l=y(n),u=s._propsStack.indexOf(t);return-1!==u&&(s._propsStack[u]=l),s._updatePropsStack(),l}}]),s})(p.Component);f._propsStack=[],f._defaultProps=y({animated:!1,showHideTransition:'fade',backgroundColor:null!=(t=v.DEFAULT_BACKGROUND_COLOR)?t:'black',barStyle:'default',translucent:!1,hidden:!1,networkActivityIndicatorVisible:!1}),f._updateImmediate=null,f._currentValues=null,f.currentHeight=v.HEIGHT,f.defaultProps={animated:!1,showHideTransition:'fade'},f._updatePropsStack=function(){clearImmediate(f._updateImmediate),f._updateImmediate=setImmediate(function(){var t,n,l=f._currentValues,u=(t=f._propsStack,n=f._defaultProps,t.reduce(function(t,n){for(var l in n)null!=n[l]&&(t[l]=n[l]);return t},s({},n)));l&&l.barStyle.value===u.barStyle.value||v.setStyle(u.barStyle.value),l&&l.backgroundColor.value===u.backgroundColor.value||v.setColor(k(u.backgroundColor.value),u.backgroundColor.animated),l&&l.hidden.value===u.hidden.value||v.setHidden(u.hidden.value),l&&l.translucent===u.translucent||v.setTranslucent(u.translucent),f._currentValues=u})},m.exports=f},266,[28,29,36,39,42,17,53,49,73,14]);