!function (a) { var i = {}; function p(t) { if (i[t]) return i[t].exports; var n = i[t] = { i: t, l: !1, exports: {} }; return a[t].call(n.exports, n, n.exports, p), n.l = !0, n.exports } p.m = a, p.c = i, p.d = function (a, i, t) { p.o(a, i) || Object.defineProperty(a, i, { enumerable: !0, get: t }) }, p.r = function (a) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a, "__esModule", { value: !0 }) }, p.t = function (a, i) { if (1 & i && (a = p(a)), 8 & i) return a; if (4 & i && "object" == typeof a && a && a.__esModule) return a; var t = Object.create(null); if (p.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: a }), 2 & i && "string" != typeof a) for (var n in a) p.d(t, n, function (i) { return a[i] }.bind(null, n)); return t }, p.n = function (a) { var i = a && a.__esModule ? function () { return a.default } : function () { return a }; return p.d(i, "a", i), i }, p.o = function (a, i) { return Object.prototype.hasOwnProperty.call(a, i) }, p.p = "", p(p.s = 1) }([function (a, i, p) { "use strict"; var t = this && this.__awaiter || function (a, i, p, t) { return new (p || (p = Promise))((function (n, o) { function e(a) { try { c(t.next(a)) } catch (a) { o(a) } } function l(a) { try { c(t.throw(a)) } catch (a) { o(a) } } function c(a) { var i; a.done ? n(a.value) : (i = a.value, i instanceof p ? i : new p((function (a) { a(i) }))).then(e, l) } c((t = t.apply(a, i || [])).next()) })) }; Object.defineProperty(i, "__esModule", { value: !0 }), i.InternalError = i.NotFoundError = i.MethodNotAllowedError = i.serveSinglePageApp = i.mapRequestToAsset = i.getAssetFromKV = void 0; const n = p(2), o = p(6); Object.defineProperty(i, "MethodNotAllowedError", { enumerable: !0, get: function () { return o.MethodNotAllowedError } }), Object.defineProperty(i, "NotFoundError", { enumerable: !0, get: function () { return o.NotFoundError } }), Object.defineProperty(i, "InternalError", { enumerable: !0, get: function () { return o.InternalError } }); const e = { browserTTL: null, edgeTTL: 172800, bypassCache: !1 }; function l(a) { return Object.assign({ ASSET_NAMESPACE: __STATIC_CONTENT, ASSET_MANIFEST: __STATIC_CONTENT_MANIFEST, cacheControl: e, defaultMimeType: "text/plain", defaultDocument: "index.html" }, a) } const c = (a, i) => { i = l(i); const p = new URL(a.url); let t = p.pathname; return t.endsWith("/") ? t = t.concat(i.defaultDocument) : n.getType(t) || (t = t.concat("/" + i.defaultDocument)), p.pathname = t, new Request(p.toString(), a) }; i.mapRequestToAsset = c, i.serveSinglePageApp = function (a, i) { i = l(i), a = c(a, i); const p = new URL(a.url); return p.pathname.endsWith(".html") ? new Request(`${p.origin}/${i.defaultDocument}`, a) : a }; i.getAssetFromKV = (a, i) => t(void 0, void 0, void 0, (function* () { i = l(i); const p = a.request, t = i.ASSET_NAMESPACE, s = "string" == typeof i.ASSET_MANIFEST ? JSON.parse(i.ASSET_MANIFEST) : i.ASSET_MANIFEST; if (void 0 === t) throw new o.InternalError("there is no KV namespace bound to the script"); const d = new URL(p.url).pathname.replace(/^\/+/, ""); let m, r = !1; if (i.mapRequestToAsset) m = i.mapRequestToAsset(p); else if (s[d]) m = p; else if (s[decodeURIComponent(d)]) r = !0, m = p; else { const a = c(p), t = new URL(a.url).pathname.replace(/^\/+/, ""); s[decodeURIComponent(t)] ? (r = !0, m = a) : m = c(p, i) } if (!["GET", "HEAD"].includes(m.method)) throw new o.MethodNotAllowedError(m.method + " is not a valid request method"); const x = new URL(m.url); let v = (r ? decodeURIComponent(x.pathname) : x.pathname).replace(/^\/+/, ""); const u = caches.default; let f = n.getType(v) || i.defaultMimeType; (f.startsWith("text") || "application/javascript" === f) && (f += "; charset=utf-8"); let g = !1; void 0 !== s && s[v] && (v = s[v], g = !0); let h = new Request(`${x.origin}/${v}`, p); const b = (() => { switch (typeof i.cacheControl) { case "function": return i.cacheControl(p); case "object": return i.cacheControl; default: return e } })(), w = (a = v, i = "strong") => { if (!a) return ""; switch (i) { case "weak": return a.startsWith("W/") ? a : "W/" + a; case "strong": return a.startsWith('W/"') && (a = a.replace("W/", "")), a.endsWith('"') || (a = `"${a}"`), a; default: return "" } }; i.cacheControl = Object.assign({}, e, b), (i.cacheControl.bypassCache || null === i.cacheControl.edgeTTL || "HEAD" == p.method) && (g = !1); const k = "number" == typeof i.cacheControl.browserTTL; let y = null; if (g && (y = yield u.match(h)), y) if (y.status > 300 && y.status < 400) y.body && "cancel" in Object.getPrototypeOf(y.body) ? (y.body.cancel(),