__d(function(g,r,i,a,m,e,d){Object.defineProperty(e,"__esModule",{value:!0}),e.getStatusBarHeight=function(o){return t.Platform.select({ios:u?44:20,android:o?0:t.StatusBar.currentHeight,default:0})},e.isExpo=void 0;var t=r(d[0]),o=t.Dimensions.get('window'),n=o.height,s=o.width,u=!1;'ios'!==t.Platform.OS||t.Platform.isPad||t.Platform.isTVOS||(u=375===s&&812===n||414===s&&896===n);e.isExpo=function(){return void 0!==(g.Expo||g.__expo||g.__exponent)}},346,[8]);