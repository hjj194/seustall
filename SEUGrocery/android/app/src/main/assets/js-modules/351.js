__d(function(g,r,i,a,m,e,d){var t=r(d[0]);Object.defineProperty(e,"__esModule",{value:!0}),e.ThemeConsumer=e.default=void 0;var u=t(r(d[1])),n=t(r(d[2])),l=t(r(d[3])),f=t(r(d[4])),o=t(r(d[5])),h=t(r(d[6])),s=t(r(d[7])),c=t(r(d[8])),p=t(r(d[9])),v=h.default.createContext(),T=(function(t){function s(t){var n;return(0,u.default)(this,s),(n=(0,l.default)(this,(0,f.default)(s).call(this,t))).updateTheme=function(t){n.setState(function(u){var n=u.theme;return{theme:(0,c.default)(n,t)}})},n.getTheme=function(){return n.state.theme},n.state={theme:(0,c.default)({colors:p.default},t.theme)},n}return(0,o.default)(s,t),(0,n.default)(s,[{key:"render",value:function(){return h.default.createElement(v.Provider,{value:{theme:this.state.theme,updateTheme:this.updateTheme}},this.props.children)}}]),s})(h.default.Component);e.default=T,T.propTypes={theme:s.default.object,children:s.default.node.isRequired},T.defaultProps={theme:{}};var C=v.Consumer;e.ThemeConsumer=C},351,[7,28,29,36,39,42,53,65,352,348]);