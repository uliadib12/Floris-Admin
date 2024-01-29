var g=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function _(c){return c&&c.__esModule&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c}var d={exports:{}};(function(c,l){(function(u,n){var s=function(m){if(typeof m.document!="object")throw new Error("Cookies.js requires a `window` with a `document` object");var t=function(e,r,o){return arguments.length===1?t.get(e):t.set(e,r,o)};return t._document=m.document,t._cacheKeyPrefix="cookey.",t._maxExpireDate=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),t.defaults={path:"/",secure:!1},t.get=function(e){t._cachedDocumentCookie!==t._document.cookie&&t._renewCache();var r=t._cache[t._cacheKeyPrefix+e];return r===n?n:decodeURIComponent(r)},t.set=function(e,r,o){return o=t._getExtendedOptions(o),o.expires=t._getExpiresDate(r===n?-1:o.expires),t._document.cookie=t._generateCookieString(e,r,o),t},t.expire=function(e,r){return t.set(e,n,r)},t._getExtendedOptions=function(e){return{path:e&&e.path||t.defaults.path,domain:e&&e.domain||t.defaults.domain,expires:e&&e.expires||t.defaults.expires,secure:e&&e.secure!==n?e.secure:t.defaults.secure}},t._isValidDate=function(e){return Object.prototype.toString.call(e)==="[object Date]"&&!isNaN(e.getTime())},t._getExpiresDate=function(e,r){if(r=r||new Date,typeof e=="number"?e=e===1/0?t._maxExpireDate:new Date(r.getTime()+e*1e3):typeof e=="string"&&(e=new Date(e)),e&&!t._isValidDate(e))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return e},t._generateCookieString=function(e,r,o){e=e.replace(/[^#$&+\^`|]/g,encodeURIComponent),e=e.replace(/\(/g,"%28").replace(/\)/g,"%29"),r=(r+"").replace(/[^!#$&-+\--:<-\[\]-~]/g,encodeURIComponent),o=o||{};var a=e+"="+r;return a+=o.path?";path="+o.path:"",a+=o.domain?";domain="+o.domain:"",a+=o.expires?";expires="+o.expires.toUTCString():"",a+=o.secure?";secure":"",a},t._getCacheFromString=function(e){for(var r={},o=e?e.split("; "):[],a=0;a<o.length;a++){var i=t._getKeyValuePairFromCookieString(o[a]);r[t._cacheKeyPrefix+i.key]===n&&(r[t._cacheKeyPrefix+i.key]=i.value)}return r},t._getKeyValuePairFromCookieString=function(e){var r=e.indexOf("=");r=r<0?e.length:r;var o=e.substr(0,r),a;try{a=decodeURIComponent(o)}catch(i){console&&typeof console.error=="function"&&console.error('Could not decode cookie with key "'+o+'"',i)}return{key:a,value:e.substr(r+1)}},t._renewCache=function(){t._cache=t._getCacheFromString(t._document.cookie),t._cachedDocumentCookie=t._document.cookie},t._areEnabled=function(){var e="cookies.js",r=t.set(e,1).get(e)==="1";return t.expire(e),r},t.enabled=t._areEnabled(),t},f=u&&typeof u.document=="object"?s(u):s;typeof n=="function"&&n.amd?n(function(){return f}):(l=c.exports=f,l.Cookies=f)})(typeof window>"u"?g:window)})(d,d.exports);var h=d.exports;const y=_(h);y.get("user");