!function(e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).invisicoding=e()}(function(){return function t(o,f,i){function u(r,e){if(!f[r]){if(!o[r]){var n="function"==typeof require&&require;if(!e&&n)return n(r,!0);if(d)return d(r,!0);throw(e=new Error("Cannot find module '"+r+"'")).code="MODULE_NOT_FOUND",e}n=f[r]={exports:{}},o[r][0].call(n.exports,function(e){return u(o[r][1][e]||e)},n,n.exports,t,o,f,i)}return f[r].exports}for(var d="function"==typeof require&&require,e=0;e<i.length;e++)u(i[e]);return u}({1:[function(e,r,n){function o(){return[8203,8299,8291,8297,8236,8234,8296,8300,8298,8302]}function t(e){return e.charCodeAt(0)-31}function f(e){if(""==e)return"";if(1<e.length)throw new Error("Expected a single character, got multiple");e=t(e);return String.fromCharCode(o()[Math.floor(e/10)])+String.fromCharCode(o()[e%10])}function i(e,r){return u(o().indexOf(e),o().indexOf(r))}function u(e,r){return String.fromCharCode(10*e+r+31)}r.exports={encode:function(e,r){let n="",t=0,o=0;for(;t<e.length||o<r.length;)n=(n+=e.charAt(t++))+f(r.charAt(o++));return n},encodeCharToCode:t,encodeCharToSecret:f,decode:function(r){let n="";for(let e=1;e<r.length;e++){var t=r.charAt(e).charCodeAt(0);-1!==o().indexOf(t)&&(n+=i(t,r.charAt(++e).charCodeAt(0)))}return n},decodeChar:i,decodeCharFromCodes:u,getKey:o}},{}]},{},[1])(1)});
