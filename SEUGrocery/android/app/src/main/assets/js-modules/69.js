__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),s=r(d[1]),n={transform:t.arrayOf(t.oneOfType([t.shape({perspective:t.number}),t.shape({rotate:t.string}),t.shape({rotateX:t.string}),t.shape({rotateY:t.string}),t.shape({rotateZ:t.string}),t.shape({scale:t.number}),t.shape({scaleX:t.number}),t.shape({scaleY:t.number}),t.shape({translateX:t.number}),t.shape({translateY:t.number}),t.shape({skewX:t.string}),t.shape({skewY:t.string})])),transformMatrix:function(t,s,n){if(t[s])return new Error("The transformMatrix style property is deprecated. Use `transform: [{ matrix: ... }]` instead.")},decomposedMatrix:function(t,s,n){if(t[s])return new Error("The decomposedMatrix style property is deprecated. Use `transform: [...]` instead.")},scaleX:s(t.number,'Use the transform prop instead.'),scaleY:s(t.number,'Use the transform prop instead.'),rotation:s(t.number,'Use the transform prop instead.'),translateX:s(t.number,'Use the transform prop instead.'),translateY:s(t.number,'Use the transform prop instead.')};m.exports=n},69,[65,70]);