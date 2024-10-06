class ao extends EventTarget {
  constructor() {
    super(...arguments), this.eventBuffer = [], this.handledTypes = [];
  }
  on(t, r) {
    const n = r;
    return this.addEventListener(t, n), this.handledTypes.push(t), this.flush(t), () => this.off(t, n);
  }
  once(t, r) {
    this.addEventListener(t, r, { once: !0 });
  }
  off(t, r) {
    this.removeEventListener(t, r);
    const n = this.handledTypes.indexOf(t, 0);
    n > -1 && this.handledTypes.splice(n, 1);
  }
  emit(t, r) {
    const n = new CustomEvent(t, { detail: r, cancelable: !0 });
    return this.handledTypes.includes(t) || this.eventBuffer.push(n), this.dispatchEvent(n), n.defaultPrevented;
  }
  emitUnsafe({ type: t, data: r }) {
    return this.emit(t, r);
  }
  // Communication with server via eventbus
  send(t, r) {
    const n = new CustomEvent("copilot-send", { detail: { command: t, data: r } });
    this.dispatchEvent(n);
  }
  // Listeners for Copilot itself
  onSend(t) {
    this.on("copilot-send", t);
  }
  offSend(t) {
    this.off("copilot-send", t);
  }
  flush(t) {
    const r = [];
    this.eventBuffer.filter((n) => n.type === t).forEach((n) => {
      this.dispatchEvent(n), r.push(n);
    }), this.eventBuffer = this.eventBuffer.filter((n) => !r.includes(n));
  }
}
var so = {
  0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
  1: function(t, r) {
    return "Cannot apply '" + t + "' to '" + r.toString() + "': Field not found.";
  },
  /*
  2(prop) {
      return `invalid decorator for '${prop.toString()}'`
  },
  3(prop) {
      return `Cannot decorate '${prop.toString()}': action can only be used on properties with a function value.`
  },
  4(prop) {
      return `Cannot decorate '${prop.toString()}': computed can only be used on getter properties.`
  },
  */
  5: "'keys()' can only be used on observable objects, arrays, sets and maps",
  6: "'values()' can only be used on observable objects, arrays, sets and maps",
  7: "'entries()' can only be used on observable objects, arrays and maps",
  8: "'set()' can only be used on observable objects, arrays and maps",
  9: "'remove()' can only be used on observable objects, arrays and maps",
  10: "'has()' can only be used on observable objects, arrays and maps",
  11: "'get()' can only be used on observable objects, arrays and maps",
  12: "Invalid annotation",
  13: "Dynamic observable objects cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  14: "Intercept handlers should return nothing or a change object",
  15: "Observable arrays cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  16: "Modification exception: the internal structure of an observable array was changed.",
  17: function(t, r) {
    return "[mobx.array] Index out of bounds, " + t + " is larger than " + r;
  },
  18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
  19: function(t) {
    return "Cannot initialize from classes that inherit from Map: " + t.constructor.name;
  },
  20: function(t) {
    return "Cannot initialize map from " + t;
  },
  21: function(t) {
    return "Cannot convert to map from '" + t + "'";
  },
  22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
  23: "It is not possible to get index atoms from arrays",
  24: function(t) {
    return "Cannot obtain administration from " + t;
  },
  25: function(t, r) {
    return "the entry '" + t + "' does not exist in the observable map '" + r + "'";
  },
  26: "please specify a property",
  27: function(t, r) {
    return "no observable property '" + t.toString() + "' found on the observable object '" + r + "'";
  },
  28: function(t) {
    return "Cannot obtain atom from " + t;
  },
  29: "Expecting some object",
  30: "invalid action stack. did you forget to finish an action?",
  31: "missing option for computed: get",
  32: function(t, r) {
    return "Cycle detected in computation " + t + ": " + r;
  },
  33: function(t) {
    return "The setter of computed value '" + t + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
  },
  34: function(t) {
    return "[ComputedValue '" + t + "'] It is not possible to assign a new value to a computed value.";
  },
  35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
  36: "isolateGlobalState should be called before MobX is running any reactions",
  37: function(t) {
    return "[mobx] `observableArray." + t + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + t + "()` instead";
  },
  38: "'ownKeys()' can only be used on observable objects",
  39: "'defineProperty()' can only be used on observable objects"
}, lo = process.env.NODE_ENV !== "production" ? so : {};
function v(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  if (process.env.NODE_ENV !== "production") {
    var i = typeof e == "string" ? e : lo[e];
    throw typeof i == "function" && (i = i.apply(null, r)), new Error("[MobX] " + i);
  }
  throw new Error(typeof e == "number" ? "[MobX] minified error nr: " + e + (r.length ? " " + r.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + e);
}
var co = {};
function $n() {
  return typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : co;
}
var Pn = Object.assign, Ct = Object.getOwnPropertyDescriptor, G = Object.defineProperty, Kt = Object.prototype, Tt = [];
Object.freeze(Tt);
var Ar = {};
Object.freeze(Ar);
var uo = typeof Proxy < "u", ho = /* @__PURE__ */ Object.toString();
function Dn() {
  uo || v(process.env.NODE_ENV !== "production" ? "`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" : "Proxy not available");
}
function Be(e) {
  process.env.NODE_ENV !== "production" && h.verifyProxies && v("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + e);
}
function I() {
  return ++h.mobxGuid;
}
function Sr(e) {
  var t = !1;
  return function() {
    if (!t)
      return t = !0, e.apply(this, arguments);
  };
}
var Ce = function() {
};
function E(e) {
  return typeof e == "function";
}
function _e(e) {
  var t = typeof e;
  switch (t) {
    case "string":
    case "symbol":
    case "number":
      return !0;
  }
  return !1;
}
function Ht(e) {
  return e !== null && typeof e == "object";
}
function P(e) {
  if (!Ht(e))
    return !1;
  var t = Object.getPrototypeOf(e);
  if (t == null)
    return !0;
  var r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r.toString() === ho;
}
function Cn(e) {
  var t = e?.constructor;
  return t ? t.name === "GeneratorFunction" || t.displayName === "GeneratorFunction" : !1;
}
function qt(e, t, r) {
  G(e, t, {
    enumerable: !1,
    writable: !0,
    configurable: !0,
    value: r
  });
}
function Tn(e, t, r) {
  G(e, t, {
    enumerable: !1,
    writable: !1,
    configurable: !0,
    value: r
  });
}
function Se(e, t) {
  var r = "isMobX" + e;
  return t.prototype[r] = !0, function(n) {
    return Ht(n) && n[r] === !0;
  };
}
function Le(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Map]";
}
function vo(e) {
  var t = Object.getPrototypeOf(e), r = Object.getPrototypeOf(t), n = Object.getPrototypeOf(r);
  return n === null;
}
function st(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Set]";
}
var Vn = typeof Object.getOwnPropertySymbols < "u";
function fo(e) {
  var t = Object.keys(e);
  if (!Vn)
    return t;
  var r = Object.getOwnPropertySymbols(e);
  return r.length ? [].concat(t, r.filter(function(n) {
    return Kt.propertyIsEnumerable.call(e, n);
  })) : t;
}
var Ze = typeof Reflect < "u" && Reflect.ownKeys ? Reflect.ownKeys : Vn ? function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : (
  /* istanbul ignore next */
  Object.getOwnPropertyNames
);
function hr(e) {
  return typeof e == "string" ? e : typeof e == "symbol" ? e.toString() : new String(e).toString();
}
function jn(e) {
  return e === null ? null : typeof e == "object" ? "" + e : e;
}
function z(e, t) {
  return Kt.hasOwnProperty.call(e, t);
}
var po = Object.getOwnPropertyDescriptors || function(t) {
  var r = {};
  return Ze(t).forEach(function(n) {
    r[n] = Ct(t, n);
  }), r;
};
function Hr(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, _o(n.key), n);
  }
}
function Ft(e, t, r) {
  return t && Hr(e.prototype, t), r && Hr(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function ae() {
  return ae = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ae.apply(this, arguments);
}
function Rn(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, vr(e, t);
}
function vr(e, t) {
  return vr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, vr(e, t);
}
function Nt(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function go(e, t) {
  if (e) {
    if (typeof e == "string") return qr(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return qr(e, t);
  }
}
function qr(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Te(e, t) {
  var r = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r) return (r = r.call(e)).next.bind(r);
  if (Array.isArray(e) || (r = go(e)) || t && e && typeof e.length == "number") {
    r && (e = r);
    var n = 0;
    return function() {
      return n >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[n++]
      };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bo(e, t) {
  if (typeof e != "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _o(e) {
  var t = bo(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
var J = /* @__PURE__ */ Symbol("mobx-stored-annotations");
function X(e) {
  function t(r, n) {
    if (lt(n))
      return e.decorate_20223_(r, n);
    Me(r, n, e);
  }
  return Object.assign(t, e);
}
function Me(e, t, r) {
  if (z(e, J) || qt(e, J, ae({}, e[J])), process.env.NODE_ENV !== "production" && Vt(r) && !z(e[J], t)) {
    var n = e.constructor.name + ".prototype." + t.toString();
    v("'" + n + "' is decorated with 'override', but no such decorated member was found on prototype.");
  }
  mo(e, r, t), Vt(r) || (e[J][t] = r);
}
function mo(e, t, r) {
  if (process.env.NODE_ENV !== "production" && !Vt(t) && z(e[J], r)) {
    var n = e.constructor.name + ".prototype." + r.toString(), i = e[J][r].annotationType_, o = t.annotationType_;
    v("Cannot apply '@" + o + "' to '" + n + "':" + (`
The field is already decorated with '@` + i + "'.") + `
Re-decorating fields is not allowed.
Use '@override' decorator for methods overridden by subclass.`);
  }
}
function lt(e) {
  return typeof e == "object" && typeof e.kind == "string";
}
function Wt(e, t) {
  process.env.NODE_ENV !== "production" && !t.includes(e.kind) && v("The decorator applied to '" + String(e.name) + "' cannot be used on a " + e.kind + " element");
}
var g = /* @__PURE__ */ Symbol("mobx administration"), ct = /* @__PURE__ */ function() {
  function e(r) {
    r === void 0 && (r = process.env.NODE_ENV !== "production" ? "Atom@" + I() : "Atom"), this.name_ = void 0, this.isPendingUnobservation = !1, this.isBeingObserved = !1, this.observers_ = /* @__PURE__ */ new Set(), this.diffValue_ = 0, this.lastAccessedBy_ = 0, this.lowestObserverState_ = _.NOT_TRACKING_, this.onBOL = void 0, this.onBUOL = void 0, this.name_ = r;
  }
  var t = e.prototype;
  return t.onBO = function() {
    this.onBOL && this.onBOL.forEach(function(n) {
      return n();
    });
  }, t.onBUO = function() {
    this.onBUOL && this.onBUOL.forEach(function(n) {
      return n();
    });
  }, t.reportObserved = function() {
    return Qn(this);
  }, t.reportChanged = function() {
    k(), ei(this), L();
  }, t.toString = function() {
    return this.name_;
  }, e;
}(), Nr = /* @__PURE__ */ Se("Atom", ct);
function kn(e, t, r) {
  t === void 0 && (t = Ce), r === void 0 && (r = Ce);
  var n = new ct(e);
  return t !== Ce && Da(n, t), r !== Ce && ui(n, r), n;
}
function yo(e, t) {
  return e === t;
}
function wo(e, t) {
  return Vr(e, t);
}
function Eo(e, t) {
  return Vr(e, t, 1);
}
function Oo(e, t) {
  return Object.is ? Object.is(e, t) : e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var Ve = {
  identity: yo,
  structural: wo,
  default: Oo,
  shallow: Eo
};
function me(e, t, r) {
  return tt(e) ? e : Array.isArray(e) ? A.array(e, {
    name: r
  }) : P(e) ? A.object(e, void 0, {
    name: r
  }) : Le(e) ? A.map(e, {
    name: r
  }) : st(e) ? A.set(e, {
    name: r
  }) : typeof e == "function" && !dt(e) && !et(e) ? Cn(e) ? je(e) : Qe(r, e) : e;
}
function Ao(e, t, r) {
  if (e == null || Ee(e) || ft(e) || ee(e) || Ie(e))
    return e;
  if (Array.isArray(e))
    return A.array(e, {
      name: r,
      deep: !1
    });
  if (P(e))
    return A.object(e, void 0, {
      name: r,
      deep: !1
    });
  if (Le(e))
    return A.map(e, {
      name: r,
      deep: !1
    });
  if (st(e))
    return A.set(e, {
      name: r,
      deep: !1
    });
  process.env.NODE_ENV !== "production" && v("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
}
function Gt(e) {
  return e;
}
function So(e, t) {
  return process.env.NODE_ENV !== "production" && tt(e) && v("observable.struct should not be used with observable values"), Vr(e, t) ? t : e;
}
var No = "override";
function Vt(e) {
  return e.annotationType_ === No;
}
function ut(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: xo,
    extend_: $o,
    decorate_20223_: Po
  };
}
function xo(e, t, r, n) {
  var i;
  if ((i = this.options_) != null && i.bound)
    return this.extend_(e, t, r, !1) === null ? 0 : 1;
  if (n === e.target_)
    return this.extend_(e, t, r, !1) === null ? 0 : 2;
  if (dt(r.value))
    return 1;
  var o = Ln(e, this, t, r, !1);
  return G(n, t, o), 2;
}
function $o(e, t, r, n) {
  var i = Ln(e, this, t, r);
  return e.defineProperty_(t, i, n);
}
function Po(e, t) {
  process.env.NODE_ENV !== "production" && Wt(t, ["method", "field"]);
  var r = t.kind, n = t.name, i = t.addInitializer, o = this, a = function(c) {
    var d, u, f, p;
    return ye((d = (u = o.options_) == null ? void 0 : u.name) != null ? d : n.toString(), c, (f = (p = o.options_) == null ? void 0 : p.autoAction) != null ? f : !1);
  };
  if (r == "field") {
    i(function() {
      Me(this, n, o);
    });
    return;
  }
  if (r == "method") {
    var l;
    return dt(e) || (e = a(e)), (l = this.options_) != null && l.bound && i(function() {
      var s = this, c = s[n].bind(s);
      c.isMobxAction = !0, s[n] = c;
    }), e;
  }
  v("Cannot apply '" + o.annotationType_ + "' to '" + String(n) + "' (kind: " + r + "):" + (`
'` + o.annotationType_ + "' can only be used on properties with a function value."));
}
function Do(e, t, r, n) {
  var i = t.annotationType_, o = n.value;
  process.env.NODE_ENV !== "production" && !E(o) && v("Cannot apply '" + i + "' to '" + e.name_ + "." + r.toString() + "':" + (`
'` + i + "' can only be used on properties with a function value."));
}
function Ln(e, t, r, n, i) {
  var o, a, l, s, c, d, u;
  i === void 0 && (i = h.safeDescriptors), Do(e, t, r, n);
  var f = n.value;
  if ((o = t.options_) != null && o.bound) {
    var p;
    f = f.bind((p = e.proxy_) != null ? p : e.target_);
  }
  return {
    value: ye(
      (a = (l = t.options_) == null ? void 0 : l.name) != null ? a : r.toString(),
      f,
      (s = (c = t.options_) == null ? void 0 : c.autoAction) != null ? s : !1,
      // https://github.com/mobxjs/mobx/discussions/3140
      (d = t.options_) != null && d.bound ? (u = e.proxy_) != null ? u : e.target_ : void 0
    ),
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: i ? e.isPlainObject_ : !0,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: !1,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: !i
  };
}
function Mn(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: Co,
    extend_: To,
    decorate_20223_: Vo
  };
}
function Co(e, t, r, n) {
  var i;
  if (n === e.target_)
    return this.extend_(e, t, r, !1) === null ? 0 : 2;
  if ((i = this.options_) != null && i.bound && (!z(e.target_, t) || !et(e.target_[t])) && this.extend_(e, t, r, !1) === null)
    return 0;
  if (et(r.value))
    return 1;
  var o = In(e, this, t, r, !1, !1);
  return G(n, t, o), 2;
}
function To(e, t, r, n) {
  var i, o = In(e, this, t, r, (i = this.options_) == null ? void 0 : i.bound);
  return e.defineProperty_(t, o, n);
}
function Vo(e, t) {
  var r;
  process.env.NODE_ENV !== "production" && Wt(t, ["method"]);
  var n = t.name, i = t.addInitializer;
  return et(e) || (e = je(e)), (r = this.options_) != null && r.bound && i(function() {
    var o = this, a = o[n].bind(o);
    a.isMobXFlow = !0, o[n] = a;
  }), e;
}
function jo(e, t, r, n) {
  var i = t.annotationType_, o = n.value;
  process.env.NODE_ENV !== "production" && !E(o) && v("Cannot apply '" + i + "' to '" + e.name_ + "." + r.toString() + "':" + (`
'` + i + "' can only be used on properties with a generator function value."));
}
function In(e, t, r, n, i, o) {
  o === void 0 && (o = h.safeDescriptors), jo(e, t, r, n);
  var a = n.value;
  if (et(a) || (a = je(a)), i) {
    var l;
    a = a.bind((l = e.proxy_) != null ? l : e.target_), a.isMobXFlow = !0;
  }
  return {
    value: a,
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: o ? e.isPlainObject_ : !0,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: !1,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: !o
  };
}
function xr(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: Ro,
    extend_: ko,
    decorate_20223_: Lo
  };
}
function Ro(e, t, r) {
  return this.extend_(e, t, r, !1) === null ? 0 : 1;
}
function ko(e, t, r, n) {
  return Mo(e, this, t, r), e.defineComputedProperty_(t, ae({}, this.options_, {
    get: r.get,
    set: r.set
  }), n);
}
function Lo(e, t) {
  process.env.NODE_ENV !== "production" && Wt(t, ["getter"]);
  var r = this, n = t.name, i = t.addInitializer;
  return i(function() {
    var o = Ue(this)[g], a = ae({}, r.options_, {
      get: e,
      context: this
    });
    a.name || (a.name = process.env.NODE_ENV !== "production" ? o.name_ + "." + n.toString() : "ObservableObject." + n.toString()), o.values_.set(n, new H(a));
  }), function() {
    return this[g].getObservablePropValue_(n);
  };
}
function Mo(e, t, r, n) {
  var i = t.annotationType_, o = n.get;
  process.env.NODE_ENV !== "production" && !o && v("Cannot apply '" + i + "' to '" + e.name_ + "." + r.toString() + "':" + (`
'` + i + "' can only be used on getter(+setter) properties."));
}
function Xt(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: Io,
    extend_: Uo,
    decorate_20223_: zo
  };
}
function Io(e, t, r) {
  return this.extend_(e, t, r, !1) === null ? 0 : 1;
}
function Uo(e, t, r, n) {
  var i, o;
  return Bo(e, this, t, r), e.defineObservableProperty_(t, r.value, (i = (o = this.options_) == null ? void 0 : o.enhancer) != null ? i : me, n);
}
function zo(e, t) {
  if (process.env.NODE_ENV !== "production") {
    if (t.kind === "field")
      throw v("Please use `@observable accessor " + String(t.name) + "` instead of `@observable " + String(t.name) + "`");
    Wt(t, ["accessor"]);
  }
  var r = this, n = t.kind, i = t.name, o = /* @__PURE__ */ new WeakSet();
  function a(l, s) {
    var c, d, u = Ue(l)[g], f = new ge(s, (c = (d = r.options_) == null ? void 0 : d.enhancer) != null ? c : me, process.env.NODE_ENV !== "production" ? u.name_ + "." + i.toString() : "ObservableObject." + i.toString(), !1);
    u.values_.set(i, f), o.add(l);
  }
  if (n == "accessor")
    return {
      get: function() {
        return o.has(this) || a(this, e.get.call(this)), this[g].getObservablePropValue_(i);
      },
      set: function(s) {
        return o.has(this) || a(this, s), this[g].setObservablePropValue_(i, s);
      },
      init: function(s) {
        return o.has(this) || a(this, s), s;
      }
    };
}
function Bo(e, t, r, n) {
  var i = t.annotationType_;
  process.env.NODE_ENV !== "production" && !("value" in n) && v("Cannot apply '" + i + "' to '" + e.name_ + "." + r.toString() + "':" + (`
'` + i + "' cannot be used on getter/setter properties"));
}
var Ko = "true", Ho = /* @__PURE__ */ Un();
function Un(e) {
  return {
    annotationType_: Ko,
    options_: e,
    make_: qo,
    extend_: Fo,
    decorate_20223_: Wo
  };
}
function qo(e, t, r, n) {
  var i, o;
  if (r.get)
    return Jt.make_(e, t, r, n);
  if (r.set) {
    var a = ye(t.toString(), r.set);
    return n === e.target_ ? e.defineProperty_(t, {
      configurable: h.safeDescriptors ? e.isPlainObject_ : !0,
      set: a
    }) === null ? 0 : 2 : (G(n, t, {
      configurable: !0,
      set: a
    }), 2);
  }
  if (n !== e.target_ && typeof r.value == "function") {
    var l;
    if (Cn(r.value)) {
      var s, c = (s = this.options_) != null && s.autoBind ? je.bound : je;
      return c.make_(e, t, r, n);
    }
    var d = (l = this.options_) != null && l.autoBind ? Qe.bound : Qe;
    return d.make_(e, t, r, n);
  }
  var u = ((i = this.options_) == null ? void 0 : i.deep) === !1 ? A.ref : A;
  if (typeof r.value == "function" && (o = this.options_) != null && o.autoBind) {
    var f;
    r.value = r.value.bind((f = e.proxy_) != null ? f : e.target_);
  }
  return u.make_(e, t, r, n);
}
function Fo(e, t, r, n) {
  var i, o;
  if (r.get)
    return Jt.extend_(e, t, r, n);
  if (r.set)
    return e.defineProperty_(t, {
      configurable: h.safeDescriptors ? e.isPlainObject_ : !0,
      set: ye(t.toString(), r.set)
    }, n);
  if (typeof r.value == "function" && (i = this.options_) != null && i.autoBind) {
    var a;
    r.value = r.value.bind((a = e.proxy_) != null ? a : e.target_);
  }
  var l = ((o = this.options_) == null ? void 0 : o.deep) === !1 ? A.ref : A;
  return l.extend_(e, t, r, n);
}
function Wo(e, t) {
  v("'" + this.annotationType_ + "' cannot be used as a decorator");
}
var Go = "observable", Xo = "observable.ref", Jo = "observable.shallow", Zo = "observable.struct", zn = {
  deep: !0,
  name: void 0,
  defaultDecorator: void 0,
  proxy: !0
};
Object.freeze(zn);
function bt(e) {
  return e || zn;
}
var fr = /* @__PURE__ */ Xt(Go), Yo = /* @__PURE__ */ Xt(Xo, {
  enhancer: Gt
}), Qo = /* @__PURE__ */ Xt(Jo, {
  enhancer: Ao
}), ea = /* @__PURE__ */ Xt(Zo, {
  enhancer: So
}), Bn = /* @__PURE__ */ X(fr);
function _t(e) {
  return e.deep === !0 ? me : e.deep === !1 ? Gt : ra(e.defaultDecorator);
}
function ta(e) {
  var t;
  return e ? (t = e.defaultDecorator) != null ? t : Un(e) : void 0;
}
function ra(e) {
  var t, r;
  return e && (t = (r = e.options_) == null ? void 0 : r.enhancer) != null ? t : me;
}
function Kn(e, t, r) {
  if (lt(t))
    return fr.decorate_20223_(e, t);
  if (_e(t)) {
    Me(e, t, fr);
    return;
  }
  return tt(e) ? e : P(e) ? A.object(e, t, r) : Array.isArray(e) ? A.array(e, t) : Le(e) ? A.map(e, t) : st(e) ? A.set(e, t) : typeof e == "object" && e !== null ? e : A.box(e, t);
}
Pn(Kn, Bn);
var na = {
  box: function(t, r) {
    var n = bt(r);
    return new ge(t, _t(n), n.name, !0, n.equals);
  },
  array: function(t, r) {
    var n = bt(r);
    return (h.useProxies === !1 || n.proxy === !1 ? Ya : Ba)(t, _t(n), n.name);
  },
  map: function(t, r) {
    var n = bt(r);
    return new _i(t, _t(n), n.name);
  },
  set: function(t, r) {
    var n = bt(r);
    return new wi(t, _t(n), n.name);
  },
  object: function(t, r, n) {
    return xe(function() {
      return hi(h.useProxies === !1 || n?.proxy === !1 ? Ue({}, n) : Ia({}, n), t, r);
    });
  },
  ref: /* @__PURE__ */ X(Yo),
  shallow: /* @__PURE__ */ X(Qo),
  deep: Bn,
  struct: /* @__PURE__ */ X(ea)
}, A = /* @__PURE__ */ Pn(Kn, na), Hn = "computed", ia = "computed.struct", pr = /* @__PURE__ */ xr(Hn), oa = /* @__PURE__ */ xr(ia, {
  equals: Ve.structural
}), Jt = function(t, r) {
  if (lt(r))
    return pr.decorate_20223_(t, r);
  if (_e(r))
    return Me(t, r, pr);
  if (P(t))
    return X(xr(Hn, t));
  process.env.NODE_ENV !== "production" && (E(t) || v("First argument to `computed` should be an expression."), E(r) && v("A setter as second argument is no longer supported, use `{ set: fn }` option instead"));
  var n = P(r) ? r : {};
  return n.get = t, n.name || (n.name = t.name || ""), new H(n);
};
Object.assign(Jt, pr);
Jt.struct = /* @__PURE__ */ X(oa);
var Fr, Wr, jt = 0, aa = 1, sa = (Fr = (Wr = /* @__PURE__ */ Ct(function() {
}, "name")) == null ? void 0 : Wr.configurable) != null ? Fr : !1, Gr = {
  value: "action",
  configurable: !0,
  writable: !1,
  enumerable: !1
};
function ye(e, t, r, n) {
  r === void 0 && (r = !1), process.env.NODE_ENV !== "production" && (E(t) || v("`action` can only be invoked on functions"), (typeof e != "string" || !e) && v("actions should have valid names, got: '" + e + "'"));
  function i() {
    return qn(e, r, t, n || this, arguments);
  }
  return i.isMobxAction = !0, i.toString = function() {
    return t.toString();
  }, sa && (Gr.value = e, G(i, "name", Gr)), i;
}
function qn(e, t, r, n, i) {
  var o = la(e, t, n, i);
  try {
    return r.apply(n, i);
  } catch (a) {
    throw o.error_ = a, a;
  } finally {
    ca(o);
  }
}
function la(e, t, r, n) {
  var i = process.env.NODE_ENV !== "production" && $() && !!e, o = 0;
  if (process.env.NODE_ENV !== "production" && i) {
    o = Date.now();
    var a = n ? Array.from(n) : Tt;
    C({
      type: Pr,
      name: e,
      object: r,
      arguments: a
    });
  }
  var l = h.trackingDerivation, s = !t || !l;
  k();
  var c = h.allowStateChanges;
  s && (Ne(), c = Zt(!0));
  var d = $r(!0), u = {
    runAsAction_: s,
    prevDerivation_: l,
    prevAllowStateChanges_: c,
    prevAllowStateReads_: d,
    notifySpy_: i,
    startTime_: o,
    actionId_: aa++,
    parentActionId_: jt
  };
  return jt = u.actionId_, u;
}
function ca(e) {
  jt !== e.actionId_ && v(30), jt = e.parentActionId_, e.error_ !== void 0 && (h.suppressReactionErrors = !0), Yt(e.prevAllowStateChanges_), Ge(e.prevAllowStateReads_), L(), e.runAsAction_ && Q(e.prevDerivation_), process.env.NODE_ENV !== "production" && e.notifySpy_ && T({
    time: Date.now() - e.startTime_
  }), h.suppressReactionErrors = !1;
}
function ua(e, t) {
  var r = Zt(e);
  try {
    return t();
  } finally {
    Yt(r);
  }
}
function Zt(e) {
  var t = h.allowStateChanges;
  return h.allowStateChanges = e, t;
}
function Yt(e) {
  h.allowStateChanges = e;
}
var Fn, da = "create";
Fn = Symbol.toPrimitive;
var ge = /* @__PURE__ */ function(e) {
  Rn(t, e);
  function t(n, i, o, a, l) {
    var s;
    return o === void 0 && (o = process.env.NODE_ENV !== "production" ? "ObservableValue@" + I() : "ObservableValue"), a === void 0 && (a = !0), l === void 0 && (l = Ve.default), s = e.call(this, o) || this, s.enhancer = void 0, s.name_ = void 0, s.equals = void 0, s.hasUnreportedChange_ = !1, s.interceptors_ = void 0, s.changeListeners_ = void 0, s.value_ = void 0, s.dehancer = void 0, s.enhancer = i, s.name_ = o, s.equals = l, s.value_ = i(n, void 0, o), process.env.NODE_ENV !== "production" && a && $() && we({
      type: da,
      object: Nt(s),
      observableKind: "value",
      debugObjectName: s.name_,
      newValue: "" + s.value_
    }), s;
  }
  var r = t.prototype;
  return r.dehanceValue = function(i) {
    return this.dehancer !== void 0 ? this.dehancer(i) : i;
  }, r.set = function(i) {
    var o = this.value_;
    if (i = this.prepareNewValue_(i), i !== h.UNCHANGED) {
      var a = $();
      process.env.NODE_ENV !== "production" && a && C({
        type: U,
        object: this,
        observableKind: "value",
        debugObjectName: this.name_,
        newValue: i,
        oldValue: o
      }), this.setNewValue_(i), process.env.NODE_ENV !== "production" && a && T();
    }
  }, r.prepareNewValue_ = function(i) {
    if (W(this), j(this)) {
      var o = R(this, {
        object: this,
        type: U,
        newValue: i
      });
      if (!o)
        return h.UNCHANGED;
      i = o.newValue;
    }
    return i = this.enhancer(i, this.value_, this.name_), this.equals(this.value_, i) ? h.UNCHANGED : i;
  }, r.setNewValue_ = function(i) {
    var o = this.value_;
    this.value_ = i, this.reportChanged(), B(this) && K(this, {
      type: U,
      object: this,
      newValue: i,
      oldValue: o
    });
  }, r.get = function() {
    return this.reportObserved(), this.dehanceValue(this.value_);
  }, r.intercept_ = function(i) {
    return ht(this, i);
  }, r.observe_ = function(i, o) {
    return o && i({
      observableKind: "value",
      debugObjectName: this.name_,
      object: this,
      type: U,
      newValue: this.value_,
      oldValue: void 0
    }), vt(this, i);
  }, r.raw = function() {
    return this.value_;
  }, r.toJSON = function() {
    return this.get();
  }, r.toString = function() {
    return this.name_ + "[" + this.value_ + "]";
  }, r.valueOf = function() {
    return jn(this.get());
  }, r[Fn] = function() {
    return this.valueOf();
  }, t;
}(ct), Wn;
function mt(e, t) {
  return !!(e & t);
}
function yt(e, t, r) {
  return r ? e |= t : e &= ~t, e;
}
Wn = Symbol.toPrimitive;
var H = /* @__PURE__ */ function() {
  function e(r) {
    this.dependenciesState_ = _.NOT_TRACKING_, this.observing_ = [], this.newObserving_ = null, this.observers_ = /* @__PURE__ */ new Set(), this.diffValue_ = 0, this.runId_ = 0, this.lastAccessedBy_ = 0, this.lowestObserverState_ = _.UP_TO_DATE_, this.unboundDepsCount_ = 0, this.value_ = new Rt(null), this.name_ = void 0, this.triggeredBy_ = void 0, this.flags_ = 0, this.derivation = void 0, this.setter_ = void 0, this.isTracing_ = M.NONE, this.scope_ = void 0, this.equals_ = void 0, this.requiresReaction_ = void 0, this.keepAlive_ = void 0, this.onBOL = void 0, this.onBUOL = void 0, r.get || v(31), this.derivation = r.get, this.name_ = r.name || (process.env.NODE_ENV !== "production" ? "ComputedValue@" + I() : "ComputedValue"), r.set && (this.setter_ = ye(process.env.NODE_ENV !== "production" ? this.name_ + "-setter" : "ComputedValue-setter", r.set)), this.equals_ = r.equals || (r.compareStructural || r.struct ? Ve.structural : Ve.default), this.scope_ = r.context, this.requiresReaction_ = r.requiresReaction, this.keepAlive_ = !!r.keepAlive;
  }
  var t = e.prototype;
  return t.onBecomeStale_ = function() {
    ba(this);
  }, t.onBO = function() {
    this.onBOL && this.onBOL.forEach(function(n) {
      return n();
    });
  }, t.onBUO = function() {
    this.onBUOL && this.onBUOL.forEach(function(n) {
      return n();
    });
  }, t.get = function() {
    if (this.isComputing && v(32, this.name_, this.derivation), h.inBatch === 0 && // !globalState.trackingDerivatpion &&
    this.observers_.size === 0 && !this.keepAlive_)
      gr(this) && (this.warnAboutUntrackedRead_(), k(), this.value_ = this.computeValue_(!1), L());
    else if (Qn(this), gr(this)) {
      var n = h.trackingContext;
      this.keepAlive_ && !n && (h.trackingContext = this), this.trackAndCompute() && ga(this), h.trackingContext = n;
    }
    var i = this.value_;
    if (xt(i))
      throw i.cause;
    return i;
  }, t.set = function(n) {
    if (this.setter_) {
      this.isRunningSetter && v(33, this.name_), this.isRunningSetter = !0;
      try {
        this.setter_.call(this.scope_, n);
      } finally {
        this.isRunningSetter = !1;
      }
    } else
      v(34, this.name_);
  }, t.trackAndCompute = function() {
    var n = this.value_, i = (
      /* see #1208 */
      this.dependenciesState_ === _.NOT_TRACKING_
    ), o = this.computeValue_(!0), a = i || xt(n) || xt(o) || !this.equals_(n, o);
    return a && (this.value_ = o, process.env.NODE_ENV !== "production" && $() && we({
      observableKind: "computed",
      debugObjectName: this.name_,
      object: this.scope_,
      type: "update",
      oldValue: n,
      newValue: o
    })), a;
  }, t.computeValue_ = function(n) {
    this.isComputing = !0;
    var i = Zt(!1), o;
    if (n)
      o = Gn(this, this.derivation, this.scope_);
    else if (h.disableErrorBoundaries === !0)
      o = this.derivation.call(this.scope_);
    else
      try {
        o = this.derivation.call(this.scope_);
      } catch (a) {
        o = new Rt(a);
      }
    return Yt(i), this.isComputing = !1, o;
  }, t.suspend_ = function() {
    this.keepAlive_ || (br(this), this.value_ = void 0, process.env.NODE_ENV !== "production" && this.isTracing_ !== M.NONE && console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access."));
  }, t.observe_ = function(n, i) {
    var o = this, a = !0, l = void 0;
    return si(function() {
      var s = o.get();
      if (!a || i) {
        var c = Ne();
        n({
          observableKind: "computed",
          debugObjectName: o.name_,
          type: U,
          object: o,
          newValue: s,
          oldValue: l
        }), Q(c);
      }
      a = !1, l = s;
    });
  }, t.warnAboutUntrackedRead_ = function() {
    process.env.NODE_ENV !== "production" && (this.isTracing_ !== M.NONE && console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute."), (typeof this.requiresReaction_ == "boolean" ? this.requiresReaction_ : h.computedRequiresReaction) && console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute."));
  }, t.toString = function() {
    return this.name_ + "[" + this.derivation.toString() + "]";
  }, t.valueOf = function() {
    return jn(this.get());
  }, t[Wn] = function() {
    return this.valueOf();
  }, Ft(e, [{
    key: "isComputing",
    get: function() {
      return mt(this.flags_, e.isComputingMask_);
    },
    set: function(n) {
      this.flags_ = yt(this.flags_, e.isComputingMask_, n);
    }
  }, {
    key: "isRunningSetter",
    get: function() {
      return mt(this.flags_, e.isRunningSetterMask_);
    },
    set: function(n) {
      this.flags_ = yt(this.flags_, e.isRunningSetterMask_, n);
    }
  }, {
    key: "isBeingObserved",
    get: function() {
      return mt(this.flags_, e.isBeingObservedMask_);
    },
    set: function(n) {
      this.flags_ = yt(this.flags_, e.isBeingObservedMask_, n);
    }
  }, {
    key: "isPendingUnobservation",
    get: function() {
      return mt(this.flags_, e.isPendingUnobservationMask_);
    },
    set: function(n) {
      this.flags_ = yt(this.flags_, e.isPendingUnobservationMask_, n);
    }
  }]), e;
}();
H.isComputingMask_ = 1;
H.isRunningSetterMask_ = 2;
H.isBeingObservedMask_ = 4;
H.isPendingUnobservationMask_ = 8;
var Qt = /* @__PURE__ */ Se("ComputedValue", H), _;
(function(e) {
  e[e.NOT_TRACKING_ = -1] = "NOT_TRACKING_", e[e.UP_TO_DATE_ = 0] = "UP_TO_DATE_", e[e.POSSIBLY_STALE_ = 1] = "POSSIBLY_STALE_", e[e.STALE_ = 2] = "STALE_";
})(_ || (_ = {}));
var M;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.LOG = 1] = "LOG", e[e.BREAK = 2] = "BREAK";
})(M || (M = {}));
var Rt = function(t) {
  this.cause = void 0, this.cause = t;
};
function xt(e) {
  return e instanceof Rt;
}
function gr(e) {
  switch (e.dependenciesState_) {
    case _.UP_TO_DATE_:
      return !1;
    case _.NOT_TRACKING_:
    case _.STALE_:
      return !0;
    case _.POSSIBLY_STALE_: {
      for (var t = $r(!0), r = Ne(), n = e.observing_, i = n.length, o = 0; o < i; o++) {
        var a = n[o];
        if (Qt(a)) {
          if (h.disableErrorBoundaries)
            a.get();
          else
            try {
              a.get();
            } catch {
              return Q(r), Ge(t), !0;
            }
          if (e.dependenciesState_ === _.STALE_)
            return Q(r), Ge(t), !0;
        }
      }
      return Jn(e), Q(r), Ge(t), !1;
    }
  }
}
function W(e) {
  if (process.env.NODE_ENV !== "production") {
    var t = e.observers_.size > 0;
    !h.allowStateChanges && (t || h.enforceActions === "always") && console.warn("[MobX] " + (h.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + e.name_);
  }
}
function ha(e) {
  process.env.NODE_ENV !== "production" && !h.allowStateReads && h.observableRequiresReaction && console.warn("[mobx] Observable '" + e.name_ + "' being read outside a reactive context.");
}
function Gn(e, t, r) {
  var n = $r(!0);
  Jn(e), e.newObserving_ = new Array(
    // Reserve constant space for initial dependencies, dynamic space otherwise.
    // See https://github.com/mobxjs/mobx/pull/3833
    e.runId_ === 0 ? 100 : e.observing_.length
  ), e.unboundDepsCount_ = 0, e.runId_ = ++h.runId;
  var i = h.trackingDerivation;
  h.trackingDerivation = e, h.inBatch++;
  var o;
  if (h.disableErrorBoundaries === !0)
    o = t.call(r);
  else
    try {
      o = t.call(r);
    } catch (a) {
      o = new Rt(a);
    }
  return h.inBatch--, h.trackingDerivation = i, fa(e), va(e), Ge(n), o;
}
function va(e) {
  process.env.NODE_ENV !== "production" && e.observing_.length === 0 && (typeof e.requiresObservable_ == "boolean" ? e.requiresObservable_ : h.reactionRequiresObservable) && console.warn("[mobx] Derivation '" + e.name_ + "' is created/updated without reading any observable value.");
}
function fa(e) {
  for (var t = e.observing_, r = e.observing_ = e.newObserving_, n = _.UP_TO_DATE_, i = 0, o = e.unboundDepsCount_, a = 0; a < o; a++) {
    var l = r[a];
    l.diffValue_ === 0 && (l.diffValue_ = 1, i !== a && (r[i] = l), i++), l.dependenciesState_ > n && (n = l.dependenciesState_);
  }
  for (r.length = i, e.newObserving_ = null, o = t.length; o--; ) {
    var s = t[o];
    s.diffValue_ === 0 && Zn(s, e), s.diffValue_ = 0;
  }
  for (; i--; ) {
    var c = r[i];
    c.diffValue_ === 1 && (c.diffValue_ = 0, pa(c, e));
  }
  n !== _.UP_TO_DATE_ && (e.dependenciesState_ = n, e.onBecomeStale_());
}
function br(e) {
  var t = e.observing_;
  e.observing_ = [];
  for (var r = t.length; r--; )
    Zn(t[r], e);
  e.dependenciesState_ = _.NOT_TRACKING_;
}
function Xn(e) {
  var t = Ne();
  try {
    return e();
  } finally {
    Q(t);
  }
}
function Ne() {
  var e = h.trackingDerivation;
  return h.trackingDerivation = null, e;
}
function Q(e) {
  h.trackingDerivation = e;
}
function $r(e) {
  var t = h.allowStateReads;
  return h.allowStateReads = e, t;
}
function Ge(e) {
  h.allowStateReads = e;
}
function Jn(e) {
  if (e.dependenciesState_ !== _.UP_TO_DATE_) {
    e.dependenciesState_ = _.UP_TO_DATE_;
    for (var t = e.observing_, r = t.length; r--; )
      t[r].lowestObserverState_ = _.UP_TO_DATE_;
  }
}
var nr = function() {
  this.version = 6, this.UNCHANGED = {}, this.trackingDerivation = null, this.trackingContext = null, this.runId = 0, this.mobxGuid = 0, this.inBatch = 0, this.pendingUnobservations = [], this.pendingReactions = [], this.isRunningReactions = !1, this.allowStateChanges = !1, this.allowStateReads = !0, this.enforceActions = !0, this.spyListeners = [], this.globalReactionErrorHandlers = [], this.computedRequiresReaction = !1, this.reactionRequiresObservable = !1, this.observableRequiresReaction = !1, this.disableErrorBoundaries = !1, this.suppressReactionErrors = !1, this.useProxies = !0, this.verifyProxies = !1, this.safeDescriptors = !0;
}, ir = !0, h = /* @__PURE__ */ function() {
  var e = /* @__PURE__ */ $n();
  return e.__mobxInstanceCount > 0 && !e.__mobxGlobals && (ir = !1), e.__mobxGlobals && e.__mobxGlobals.version !== new nr().version && (ir = !1), ir ? e.__mobxGlobals ? (e.__mobxInstanceCount += 1, e.__mobxGlobals.UNCHANGED || (e.__mobxGlobals.UNCHANGED = {}), e.__mobxGlobals) : (e.__mobxInstanceCount = 1, e.__mobxGlobals = /* @__PURE__ */ new nr()) : (setTimeout(function() {
    v(35);
  }, 1), new nr());
}();
function pa(e, t) {
  e.observers_.add(t), e.lowestObserverState_ > t.dependenciesState_ && (e.lowestObserverState_ = t.dependenciesState_);
}
function Zn(e, t) {
  e.observers_.delete(t), e.observers_.size === 0 && Yn(e);
}
function Yn(e) {
  e.isPendingUnobservation === !1 && (e.isPendingUnobservation = !0, h.pendingUnobservations.push(e));
}
function k() {
  h.inBatch++;
}
function L() {
  if (--h.inBatch === 0) {
    ni();
    for (var e = h.pendingUnobservations, t = 0; t < e.length; t++) {
      var r = e[t];
      r.isPendingUnobservation = !1, r.observers_.size === 0 && (r.isBeingObserved && (r.isBeingObserved = !1, r.onBUO()), r instanceof H && r.suspend_());
    }
    h.pendingUnobservations = [];
  }
}
function Qn(e) {
  ha(e);
  var t = h.trackingDerivation;
  return t !== null ? (t.runId_ !== e.lastAccessedBy_ && (e.lastAccessedBy_ = t.runId_, t.newObserving_[t.unboundDepsCount_++] = e, !e.isBeingObserved && h.trackingContext && (e.isBeingObserved = !0, e.onBO())), e.isBeingObserved) : (e.observers_.size === 0 && h.inBatch > 0 && Yn(e), !1);
}
function ei(e) {
  e.lowestObserverState_ !== _.STALE_ && (e.lowestObserverState_ = _.STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === _.UP_TO_DATE_ && (process.env.NODE_ENV !== "production" && t.isTracing_ !== M.NONE && ti(t, e), t.onBecomeStale_()), t.dependenciesState_ = _.STALE_;
  }));
}
function ga(e) {
  e.lowestObserverState_ !== _.STALE_ && (e.lowestObserverState_ = _.STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === _.POSSIBLY_STALE_ ? (t.dependenciesState_ = _.STALE_, process.env.NODE_ENV !== "production" && t.isTracing_ !== M.NONE && ti(t, e)) : t.dependenciesState_ === _.UP_TO_DATE_ && (e.lowestObserverState_ = _.UP_TO_DATE_);
  }));
}
function ba(e) {
  e.lowestObserverState_ === _.UP_TO_DATE_ && (e.lowestObserverState_ = _.POSSIBLY_STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === _.UP_TO_DATE_ && (t.dependenciesState_ = _.POSSIBLY_STALE_, t.onBecomeStale_());
  }));
}
function ti(e, t) {
  if (console.log("[mobx.trace] '" + e.name_ + "' is invalidated due to a change in: '" + t.name_ + "'"), e.isTracing_ === M.BREAK) {
    var r = [];
    ri(Ca(e), r, 1), new Function(`debugger;
/*
Tracing '` + e.name_ + `'

You are entering this break point because derivation '` + e.name_ + "' is being traced and '" + t.name_ + `' is now forcing it to update.
Just follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update
The stackframe you are looking for is at least ~6-8 stack-frames up.

` + (e instanceof H ? e.derivation.toString().replace(/[*]\//g, "/") : "") + `

The dependencies for this derivation are:

` + r.join(`
`) + `
*/
    `)();
  }
}
function ri(e, t, r) {
  if (t.length >= 1e3) {
    t.push("(and many more)");
    return;
  }
  t.push("" + "	".repeat(r - 1) + e.name), e.dependencies && e.dependencies.forEach(function(n) {
    return ri(n, t, r + 1);
  });
}
var Ye = /* @__PURE__ */ function() {
  function e(r, n, i, o) {
    r === void 0 && (r = process.env.NODE_ENV !== "production" ? "Reaction@" + I() : "Reaction"), this.name_ = void 0, this.onInvalidate_ = void 0, this.errorHandler_ = void 0, this.requiresObservable_ = void 0, this.observing_ = [], this.newObserving_ = [], this.dependenciesState_ = _.NOT_TRACKING_, this.diffValue_ = 0, this.runId_ = 0, this.unboundDepsCount_ = 0, this.isDisposed_ = !1, this.isScheduled_ = !1, this.isTrackPending_ = !1, this.isRunning_ = !1, this.isTracing_ = M.NONE, this.name_ = r, this.onInvalidate_ = n, this.errorHandler_ = i, this.requiresObservable_ = o;
  }
  var t = e.prototype;
  return t.onBecomeStale_ = function() {
    this.schedule_();
  }, t.schedule_ = function() {
    this.isScheduled_ || (this.isScheduled_ = !0, h.pendingReactions.push(this), ni());
  }, t.isScheduled = function() {
    return this.isScheduled_;
  }, t.runReaction_ = function() {
    if (!this.isDisposed_) {
      k(), this.isScheduled_ = !1;
      var n = h.trackingContext;
      if (h.trackingContext = this, gr(this)) {
        this.isTrackPending_ = !0;
        try {
          this.onInvalidate_(), process.env.NODE_ENV !== "production" && this.isTrackPending_ && $() && we({
            name: this.name_,
            type: "scheduled-reaction"
          });
        } catch (i) {
          this.reportExceptionInDerivation_(i);
        }
      }
      h.trackingContext = n, L();
    }
  }, t.track = function(n) {
    if (!this.isDisposed_) {
      k();
      var i = $(), o;
      process.env.NODE_ENV !== "production" && i && (o = Date.now(), C({
        name: this.name_,
        type: "reaction"
      })), this.isRunning_ = !0;
      var a = h.trackingContext;
      h.trackingContext = this;
      var l = Gn(this, n, void 0);
      h.trackingContext = a, this.isRunning_ = !1, this.isTrackPending_ = !1, this.isDisposed_ && br(this), xt(l) && this.reportExceptionInDerivation_(l.cause), process.env.NODE_ENV !== "production" && i && T({
        time: Date.now() - o
      }), L();
    }
  }, t.reportExceptionInDerivation_ = function(n) {
    var i = this;
    if (this.errorHandler_) {
      this.errorHandler_(n, this);
      return;
    }
    if (h.disableErrorBoundaries)
      throw n;
    var o = process.env.NODE_ENV !== "production" ? "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" : "[mobx] uncaught error in '" + this + "'";
    h.suppressReactionErrors ? process.env.NODE_ENV !== "production" && console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)") : console.error(o, n), process.env.NODE_ENV !== "production" && $() && we({
      type: "error",
      name: this.name_,
      message: o,
      error: "" + n
    }), h.globalReactionErrorHandlers.forEach(function(a) {
      return a(n, i);
    });
  }, t.dispose = function() {
    this.isDisposed_ || (this.isDisposed_ = !0, this.isRunning_ || (k(), br(this), L()));
  }, t.getDisposer_ = function(n) {
    var i = this, o = function a() {
      i.dispose(), n == null || n.removeEventListener == null || n.removeEventListener("abort", a);
    };
    return n == null || n.addEventListener == null || n.addEventListener("abort", o), o[g] = this, o;
  }, t.toString = function() {
    return "Reaction[" + this.name_ + "]";
  }, t.trace = function(n) {
    n === void 0 && (n = !1), ka(this, n);
  }, e;
}(), Xr = 100, _a = function(t) {
  return t();
};
function ni() {
  h.inBatch > 0 || h.isRunningReactions || _a(ma);
}
function ma() {
  h.isRunningReactions = !0;
  for (var e = h.pendingReactions, t = 0; e.length > 0; ) {
    ++t === Xr && (console.error(process.env.NODE_ENV !== "production" ? "Reaction doesn't converge to a stable state after " + Xr + " iterations." + (" Probably there is a cycle in the reactive function: " + e[0]) : "[mobx] cycle in reaction: " + e[0]), e.splice(0));
    for (var r = e.splice(0), n = 0, i = r.length; n < i; n++)
      r[n].runReaction_();
  }
  h.isRunningReactions = !1;
}
var kt = /* @__PURE__ */ Se("Reaction", Ye);
function $() {
  return process.env.NODE_ENV !== "production" && !!h.spyListeners.length;
}
function we(e) {
  if (process.env.NODE_ENV !== "production" && h.spyListeners.length)
    for (var t = h.spyListeners, r = 0, n = t.length; r < n; r++)
      t[r](e);
}
function C(e) {
  if (process.env.NODE_ENV !== "production") {
    var t = ae({}, e, {
      spyReportStart: !0
    });
    we(t);
  }
}
var ya = {
  type: "report-end",
  spyReportEnd: !0
};
function T(e) {
  process.env.NODE_ENV !== "production" && we(e ? ae({}, e, {
    type: "report-end",
    spyReportEnd: !0
  }) : ya);
}
function wa(e) {
  return process.env.NODE_ENV === "production" ? (console.warn("[mobx.spy] Is a no-op in production builds"), function() {
  }) : (h.spyListeners.push(e), Sr(function() {
    h.spyListeners = h.spyListeners.filter(function(t) {
      return t !== e;
    });
  }));
}
var Pr = "action", Ea = "action.bound", ii = "autoAction", Oa = "autoAction.bound", oi = "<unnamed action>", _r = /* @__PURE__ */ ut(Pr), Aa = /* @__PURE__ */ ut(Ea, {
  bound: !0
}), mr = /* @__PURE__ */ ut(ii, {
  autoAction: !0
}), Sa = /* @__PURE__ */ ut(Oa, {
  autoAction: !0,
  bound: !0
});
function ai(e) {
  var t = function(n, i) {
    if (E(n))
      return ye(n.name || oi, n, e);
    if (E(i))
      return ye(n, i, e);
    if (lt(i))
      return (e ? mr : _r).decorate_20223_(n, i);
    if (_e(i))
      return Me(n, i, e ? mr : _r);
    if (_e(n))
      return X(ut(e ? ii : Pr, {
        name: n,
        autoAction: e
      }));
    process.env.NODE_ENV !== "production" && v("Invalid arguments for `action`");
  };
  return t;
}
var fe = /* @__PURE__ */ ai(!1);
Object.assign(fe, _r);
var Qe = /* @__PURE__ */ ai(!0);
Object.assign(Qe, mr);
fe.bound = /* @__PURE__ */ X(Aa);
Qe.bound = /* @__PURE__ */ X(Sa);
function Pl(e) {
  return qn(e.name || oi, !1, e, this, void 0);
}
function dt(e) {
  return E(e) && e.isMobxAction === !0;
}
function si(e, t) {
  var r, n, i, o, a;
  t === void 0 && (t = Ar), process.env.NODE_ENV !== "production" && (E(e) || v("Autorun expects a function as first argument"), dt(e) && v("Autorun does not accept actions since actions are untrackable"));
  var l = (r = (n = t) == null ? void 0 : n.name) != null ? r : process.env.NODE_ENV !== "production" ? e.name || "Autorun@" + I() : "Autorun", s = !t.scheduler && !t.delay, c;
  if (s)
    c = new Ye(l, function() {
      this.track(f);
    }, t.onError, t.requiresObservable);
  else {
    var d = li(t), u = !1;
    c = new Ye(l, function() {
      u || (u = !0, d(function() {
        u = !1, c.isDisposed_ || c.track(f);
      }));
    }, t.onError, t.requiresObservable);
  }
  function f() {
    e(c);
  }
  return (i = t) != null && (o = i.signal) != null && o.aborted || c.schedule_(), c.getDisposer_((a = t) == null ? void 0 : a.signal);
}
var Na = function(t) {
  return t();
};
function li(e) {
  return e.scheduler ? e.scheduler : e.delay ? function(t) {
    return setTimeout(t, e.delay);
  } : Na;
}
function ci(e, t, r) {
  var n, i, o, a;
  r === void 0 && (r = Ar), process.env.NODE_ENV !== "production" && ((!E(e) || !E(t)) && v("First and second argument to reaction should be functions"), P(r) || v("Third argument of reactions should be an object"));
  var l = (n = r.name) != null ? n : process.env.NODE_ENV !== "production" ? "Reaction@" + I() : "Reaction", s = fe(l, r.onError ? xa(r.onError, t) : t), c = !r.scheduler && !r.delay, d = li(r), u = !0, f = !1, p, y = r.compareStructural ? Ve.structural : r.equals || Ve.default, m = new Ye(l, function() {
    u || c ? S() : f || (f = !0, d(S));
  }, r.onError, r.requiresObservable);
  function S() {
    if (f = !1, !m.isDisposed_) {
      var F = !1, $e = p;
      m.track(function() {
        var te = ua(!1, function() {
          return e(m);
        });
        F = u || !y(p, te), p = te;
      }), (u && r.fireImmediately || !u && F) && s(p, $e, m), u = !1;
    }
  }
  return (i = r) != null && (o = i.signal) != null && o.aborted || m.schedule_(), m.getDisposer_((a = r) == null ? void 0 : a.signal);
}
function xa(e, t) {
  return function() {
    try {
      return t.apply(this, arguments);
    } catch (r) {
      e.call(this, r);
    }
  };
}
var $a = "onBO", Pa = "onBUO";
function Da(e, t, r) {
  return di($a, e, t, r);
}
function ui(e, t, r) {
  return di(Pa, e, t, r);
}
function di(e, t, r, n) {
  var i = typeof n == "function" ? se(t, r) : se(t), o = E(n) ? n : r, a = e + "L";
  return i[a] ? i[a].add(o) : i[a] = /* @__PURE__ */ new Set([o]), function() {
    var l = i[a];
    l && (l.delete(o), l.size === 0 && delete i[a]);
  };
}
function hi(e, t, r, n) {
  process.env.NODE_ENV !== "production" && (arguments.length > 4 && v("'extendObservable' expected 2-4 arguments"), typeof e != "object" && v("'extendObservable' expects an object as first argument"), ee(e) && v("'extendObservable' should not be used on maps, use map.merge instead"), P(t) || v("'extendObservable' only accepts plain objects as second argument"), (tt(t) || tt(r)) && v("Extending an object with another observable (object) is not supported"));
  var i = po(t);
  return xe(function() {
    var o = Ue(e, n)[g];
    Ze(i).forEach(function(a) {
      o.extend_(
        a,
        i[a],
        // must pass "undefined" for { key: undefined }
        r && a in r ? r[a] : !0
      );
    });
  }), e;
}
function Ca(e, t) {
  return vi(se(e, t));
}
function vi(e) {
  var t = {
    name: e.name_
  };
  return e.observing_ && e.observing_.length > 0 && (t.dependencies = Ta(e.observing_).map(vi)), t;
}
function Ta(e) {
  return Array.from(new Set(e));
}
var Va = 0;
function fi() {
  this.message = "FLOW_CANCELLED";
}
fi.prototype = /* @__PURE__ */ Object.create(Error.prototype);
var or = /* @__PURE__ */ Mn("flow"), ja = /* @__PURE__ */ Mn("flow.bound", {
  bound: !0
}), je = /* @__PURE__ */ Object.assign(function(t, r) {
  if (lt(r))
    return or.decorate_20223_(t, r);
  if (_e(r))
    return Me(t, r, or);
  process.env.NODE_ENV !== "production" && arguments.length !== 1 && v("Flow expects single argument with generator function");
  var n = t, i = n.name || "<unnamed flow>", o = function() {
    var l = this, s = arguments, c = ++Va, d = fe(i + " - runid: " + c + " - init", n).apply(l, s), u, f = void 0, p = new Promise(function(y, m) {
      var S = 0;
      u = m;
      function F(D) {
        f = void 0;
        var re;
        try {
          re = fe(i + " - runid: " + c + " - yield " + S++, d.next).call(d, D);
        } catch (ce) {
          return m(ce);
        }
        te(re);
      }
      function $e(D) {
        f = void 0;
        var re;
        try {
          re = fe(i + " - runid: " + c + " - yield " + S++, d.throw).call(d, D);
        } catch (ce) {
          return m(ce);
        }
        te(re);
      }
      function te(D) {
        if (E(D?.then)) {
          D.then(te, m);
          return;
        }
        return D.done ? y(D.value) : (f = Promise.resolve(D.value), f.then(F, $e));
      }
      F(void 0);
    });
    return p.cancel = fe(i + " - runid: " + c + " - cancel", function() {
      try {
        f && Jr(f);
        var y = d.return(void 0), m = Promise.resolve(y.value);
        m.then(Ce, Ce), Jr(m), u(new fi());
      } catch (S) {
        u(S);
      }
    }), p;
  };
  return o.isMobXFlow = !0, o;
}, or);
je.bound = /* @__PURE__ */ X(ja);
function Jr(e) {
  E(e.cancel) && e.cancel();
}
function et(e) {
  return e?.isMobXFlow === !0;
}
function Ra(e, t) {
  return e ? t !== void 0 ? process.env.NODE_ENV !== "production" && (ee(e) || ft(e)) ? v("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.") : Ee(e) ? e[g].values_.has(t) : !1 : Ee(e) || !!e[g] || Nr(e) || kt(e) || Qt(e) : !1;
}
function tt(e) {
  return process.env.NODE_ENV !== "production" && arguments.length !== 1 && v("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property"), Ra(e);
}
function ka() {
  if (process.env.NODE_ENV !== "production") {
    for (var e = !1, t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    typeof r[r.length - 1] == "boolean" && (e = r.pop());
    var i = La(r);
    if (!i)
      return v("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    i.isTracing_ === M.NONE && console.log("[mobx.trace] '" + i.name_ + "' tracing enabled"), i.isTracing_ = e ? M.BREAK : M.LOG;
  }
}
function La(e) {
  switch (e.length) {
    case 0:
      return h.trackingDerivation;
    case 1:
      return se(e[0]);
    case 2:
      return se(e[0], e[1]);
  }
}
function Z(e, t) {
  t === void 0 && (t = void 0), k();
  try {
    return e.apply(t);
  } finally {
    L();
  }
}
function ue(e) {
  return e[g];
}
var Ma = {
  has: function(t, r) {
    return process.env.NODE_ENV !== "production" && h.trackingDerivation && Be("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead."), ue(t).has_(r);
  },
  get: function(t, r) {
    return ue(t).get_(r);
  },
  set: function(t, r, n) {
    var i;
    return _e(r) ? (process.env.NODE_ENV !== "production" && !ue(t).values_.has(r) && Be("add a new observable property through direct assignment. Use 'set' from 'mobx' instead."), (i = ue(t).set_(r, n, !0)) != null ? i : !0) : !1;
  },
  deleteProperty: function(t, r) {
    var n;
    return process.env.NODE_ENV !== "production" && Be("delete properties from an observable object. Use 'remove' from 'mobx' instead."), _e(r) ? (n = ue(t).delete_(r, !0)) != null ? n : !0 : !1;
  },
  defineProperty: function(t, r, n) {
    var i;
    return process.env.NODE_ENV !== "production" && Be("define property on an observable object. Use 'defineProperty' from 'mobx' instead."), (i = ue(t).defineProperty_(r, n)) != null ? i : !0;
  },
  ownKeys: function(t) {
    return process.env.NODE_ENV !== "production" && h.trackingDerivation && Be("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead."), ue(t).ownKeys_();
  },
  preventExtensions: function(t) {
    v(13);
  }
};
function Ia(e, t) {
  var r, n;
  return Dn(), e = Ue(e, t), (n = (r = e[g]).proxy_) != null ? n : r.proxy_ = new Proxy(e, Ma);
}
function j(e) {
  return e.interceptors_ !== void 0 && e.interceptors_.length > 0;
}
function ht(e, t) {
  var r = e.interceptors_ || (e.interceptors_ = []);
  return r.push(t), Sr(function() {
    var n = r.indexOf(t);
    n !== -1 && r.splice(n, 1);
  });
}
function R(e, t) {
  var r = Ne();
  try {
    for (var n = [].concat(e.interceptors_ || []), i = 0, o = n.length; i < o && (t = n[i](t), t && !t.type && v(14), !!t); i++)
      ;
    return t;
  } finally {
    Q(r);
  }
}
function B(e) {
  return e.changeListeners_ !== void 0 && e.changeListeners_.length > 0;
}
function vt(e, t) {
  var r = e.changeListeners_ || (e.changeListeners_ = []);
  return r.push(t), Sr(function() {
    var n = r.indexOf(t);
    n !== -1 && r.splice(n, 1);
  });
}
function K(e, t) {
  var r = Ne(), n = e.changeListeners_;
  if (n) {
    n = n.slice();
    for (var i = 0, o = n.length; i < o; i++)
      n[i](t);
    Q(r);
  }
}
var ar = /* @__PURE__ */ Symbol("mobx-keys");
function er(e, t, r) {
  return process.env.NODE_ENV !== "production" && (!P(e) && !P(Object.getPrototypeOf(e)) && v("'makeAutoObservable' can only be used for classes that don't have a superclass"), Ee(e) && v("makeAutoObservable can only be used on objects not already made observable")), P(e) ? hi(e, e, t, r) : (xe(function() {
    var n = Ue(e, r)[g];
    if (!e[ar]) {
      var i = Object.getPrototypeOf(e), o = new Set([].concat(Ze(e), Ze(i)));
      o.delete("constructor"), o.delete(g), qt(i, ar, o);
    }
    e[ar].forEach(function(a) {
      return n.make_(
        a,
        // must pass "undefined" for { key: undefined }
        t && a in t ? t[a] : !0
      );
    });
  }), e);
}
var Zr = "splice", U = "update", Ua = 1e4, za = {
  get: function(t, r) {
    var n = t[g];
    return r === g ? n : r === "length" ? n.getArrayLength_() : typeof r == "string" && !isNaN(r) ? n.get_(parseInt(r)) : z(Lt, r) ? Lt[r] : t[r];
  },
  set: function(t, r, n) {
    var i = t[g];
    return r === "length" && i.setArrayLength_(n), typeof r == "symbol" || isNaN(r) ? t[r] = n : i.set_(parseInt(r), n), !0;
  },
  preventExtensions: function() {
    v(15);
  }
}, Dr = /* @__PURE__ */ function() {
  function e(r, n, i, o) {
    r === void 0 && (r = process.env.NODE_ENV !== "production" ? "ObservableArray@" + I() : "ObservableArray"), this.owned_ = void 0, this.legacyMode_ = void 0, this.atom_ = void 0, this.values_ = [], this.interceptors_ = void 0, this.changeListeners_ = void 0, this.enhancer_ = void 0, this.dehancer = void 0, this.proxy_ = void 0, this.lastKnownLength_ = 0, this.owned_ = i, this.legacyMode_ = o, this.atom_ = new ct(r), this.enhancer_ = function(a, l) {
      return n(a, l, process.env.NODE_ENV !== "production" ? r + "[..]" : "ObservableArray[..]");
    };
  }
  var t = e.prototype;
  return t.dehanceValue_ = function(n) {
    return this.dehancer !== void 0 ? this.dehancer(n) : n;
  }, t.dehanceValues_ = function(n) {
    return this.dehancer !== void 0 && n.length > 0 ? n.map(this.dehancer) : n;
  }, t.intercept_ = function(n) {
    return ht(this, n);
  }, t.observe_ = function(n, i) {
    return i === void 0 && (i = !1), i && n({
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: "splice",
      index: 0,
      added: this.values_.slice(),
      addedCount: this.values_.length,
      removed: [],
      removedCount: 0
    }), vt(this, n);
  }, t.getArrayLength_ = function() {
    return this.atom_.reportObserved(), this.values_.length;
  }, t.setArrayLength_ = function(n) {
    (typeof n != "number" || isNaN(n) || n < 0) && v("Out of range: " + n);
    var i = this.values_.length;
    if (n !== i)
      if (n > i) {
        for (var o = new Array(n - i), a = 0; a < n - i; a++)
          o[a] = void 0;
        this.spliceWithArray_(i, 0, o);
      } else
        this.spliceWithArray_(n, i - n);
  }, t.updateArrayLength_ = function(n, i) {
    n !== this.lastKnownLength_ && v(16), this.lastKnownLength_ += i, this.legacyMode_ && i > 0 && Ai(n + i + 1);
  }, t.spliceWithArray_ = function(n, i, o) {
    var a = this;
    W(this.atom_);
    var l = this.values_.length;
    if (n === void 0 ? n = 0 : n > l ? n = l : n < 0 && (n = Math.max(0, l + n)), arguments.length === 1 ? i = l - n : i == null ? i = 0 : i = Math.max(0, Math.min(i, l - n)), o === void 0 && (o = Tt), j(this)) {
      var s = R(this, {
        object: this.proxy_,
        type: Zr,
        index: n,
        removedCount: i,
        added: o
      });
      if (!s)
        return Tt;
      i = s.removedCount, o = s.added;
    }
    if (o = o.length === 0 ? o : o.map(function(u) {
      return a.enhancer_(u, void 0);
    }), this.legacyMode_ || process.env.NODE_ENV !== "production") {
      var c = o.length - i;
      this.updateArrayLength_(l, c);
    }
    var d = this.spliceItemsIntoValues_(n, i, o);
    return (i !== 0 || o.length !== 0) && this.notifyArraySplice_(n, o, d), this.dehanceValues_(d);
  }, t.spliceItemsIntoValues_ = function(n, i, o) {
    if (o.length < Ua) {
      var a;
      return (a = this.values_).splice.apply(a, [n, i].concat(o));
    } else {
      var l = this.values_.slice(n, n + i), s = this.values_.slice(n + i);
      this.values_.length += o.length - i;
      for (var c = 0; c < o.length; c++)
        this.values_[n + c] = o[c];
      for (var d = 0; d < s.length; d++)
        this.values_[n + o.length + d] = s[d];
      return l;
    }
  }, t.notifyArrayChildUpdate_ = function(n, i, o) {
    var a = !this.owned_ && $(), l = B(this), s = l || a ? {
      observableKind: "array",
      object: this.proxy_,
      type: U,
      debugObjectName: this.atom_.name_,
      index: n,
      newValue: i,
      oldValue: o
    } : null;
    process.env.NODE_ENV !== "production" && a && C(s), this.atom_.reportChanged(), l && K(this, s), process.env.NODE_ENV !== "production" && a && T();
  }, t.notifyArraySplice_ = function(n, i, o) {
    var a = !this.owned_ && $(), l = B(this), s = l || a ? {
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: Zr,
      index: n,
      removed: o,
      added: i,
      removedCount: o.length,
      addedCount: i.length
    } : null;
    process.env.NODE_ENV !== "production" && a && C(s), this.atom_.reportChanged(), l && K(this, s), process.env.NODE_ENV !== "production" && a && T();
  }, t.get_ = function(n) {
    if (this.legacyMode_ && n >= this.values_.length) {
      console.warn(process.env.NODE_ENV !== "production" ? "[mobx.array] Attempt to read an array index (" + n + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX" : "[mobx] Out of bounds read: " + n);
      return;
    }
    return this.atom_.reportObserved(), this.dehanceValue_(this.values_[n]);
  }, t.set_ = function(n, i) {
    var o = this.values_;
    if (this.legacyMode_ && n > o.length && v(17, n, o.length), n < o.length) {
      W(this.atom_);
      var a = o[n];
      if (j(this)) {
        var l = R(this, {
          type: U,
          object: this.proxy_,
          index: n,
          newValue: i
        });
        if (!l)
          return;
        i = l.newValue;
      }
      i = this.enhancer_(i, a);
      var s = i !== a;
      s && (o[n] = i, this.notifyArrayChildUpdate_(n, i, a));
    } else {
      for (var c = new Array(n + 1 - o.length), d = 0; d < c.length - 1; d++)
        c[d] = void 0;
      c[c.length - 1] = i, this.spliceWithArray_(o.length, 0, c);
    }
  }, e;
}();
function Ba(e, t, r, n) {
  return r === void 0 && (r = process.env.NODE_ENV !== "production" ? "ObservableArray@" + I() : "ObservableArray"), n === void 0 && (n = !1), Dn(), xe(function() {
    var i = new Dr(r, t, n, !1);
    Tn(i.values_, g, i);
    var o = new Proxy(i.values_, za);
    return i.proxy_ = o, e && e.length && i.spliceWithArray_(0, 0, e), o;
  });
}
var Lt = {
  clear: function() {
    return this.splice(0);
  },
  replace: function(t) {
    var r = this[g];
    return r.spliceWithArray_(0, r.values_.length, t);
  },
  // Used by JSON.stringify
  toJSON: function() {
    return this.slice();
  },
  /*
   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
   * since these functions alter the inner structure of the array, the have side effects.
   * Because the have side effects, they should not be used in computed function,
   * and for that reason the do not call dependencyState.notifyObserved
   */
  splice: function(t, r) {
    for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++)
      i[o - 2] = arguments[o];
    var a = this[g];
    switch (arguments.length) {
      case 0:
        return [];
      case 1:
        return a.spliceWithArray_(t);
      case 2:
        return a.spliceWithArray_(t, r);
    }
    return a.spliceWithArray_(t, r, i);
  },
  spliceWithArray: function(t, r, n) {
    return this[g].spliceWithArray_(t, r, n);
  },
  push: function() {
    for (var t = this[g], r = arguments.length, n = new Array(r), i = 0; i < r; i++)
      n[i] = arguments[i];
    return t.spliceWithArray_(t.values_.length, 0, n), t.values_.length;
  },
  pop: function() {
    return this.splice(Math.max(this[g].values_.length - 1, 0), 1)[0];
  },
  shift: function() {
    return this.splice(0, 1)[0];
  },
  unshift: function() {
    for (var t = this[g], r = arguments.length, n = new Array(r), i = 0; i < r; i++)
      n[i] = arguments[i];
    return t.spliceWithArray_(0, 0, n), t.values_.length;
  },
  reverse: function() {
    return h.trackingDerivation && v(37, "reverse"), this.replace(this.slice().reverse()), this;
  },
  sort: function() {
    h.trackingDerivation && v(37, "sort");
    var t = this.slice();
    return t.sort.apply(t, arguments), this.replace(t), this;
  },
  remove: function(t) {
    var r = this[g], n = r.dehanceValues_(r.values_).indexOf(t);
    return n > -1 ? (this.splice(n, 1), !0) : !1;
  }
};
w("at", V);
w("concat", V);
w("flat", V);
w("includes", V);
w("indexOf", V);
w("join", V);
w("lastIndexOf", V);
w("slice", V);
w("toString", V);
w("toLocaleString", V);
w("toSorted", V);
w("toSpliced", V);
w("with", V);
w("every", q);
w("filter", q);
w("find", q);
w("findIndex", q);
w("findLast", q);
w("findLastIndex", q);
w("flatMap", q);
w("forEach", q);
w("map", q);
w("some", q);
w("toReversed", q);
w("reduce", pi);
w("reduceRight", pi);
function w(e, t) {
  typeof Array.prototype[e] == "function" && (Lt[e] = t(e));
}
function V(e) {
  return function() {
    var t = this[g];
    t.atom_.reportObserved();
    var r = t.dehanceValues_(t.values_);
    return r[e].apply(r, arguments);
  };
}
function q(e) {
  return function(t, r) {
    var n = this, i = this[g];
    i.atom_.reportObserved();
    var o = i.dehanceValues_(i.values_);
    return o[e](function(a, l) {
      return t.call(r, a, l, n);
    });
  };
}
function pi(e) {
  return function() {
    var t = this, r = this[g];
    r.atom_.reportObserved();
    var n = r.dehanceValues_(r.values_), i = arguments[0];
    return arguments[0] = function(o, a, l) {
      return i(o, a, l, t);
    }, n[e].apply(n, arguments);
  };
}
var Ka = /* @__PURE__ */ Se("ObservableArrayAdministration", Dr);
function ft(e) {
  return Ht(e) && Ka(e[g]);
}
var gi, bi, Ha = {}, oe = "add", Mt = "delete";
gi = Symbol.iterator;
bi = Symbol.toStringTag;
var _i = /* @__PURE__ */ function() {
  function e(r, n, i) {
    var o = this;
    n === void 0 && (n = me), i === void 0 && (i = process.env.NODE_ENV !== "production" ? "ObservableMap@" + I() : "ObservableMap"), this.enhancer_ = void 0, this.name_ = void 0, this[g] = Ha, this.data_ = void 0, this.hasMap_ = void 0, this.keysAtom_ = void 0, this.interceptors_ = void 0, this.changeListeners_ = void 0, this.dehancer = void 0, this.enhancer_ = n, this.name_ = i, E(Map) || v(18), xe(function() {
      o.keysAtom_ = kn(process.env.NODE_ENV !== "production" ? o.name_ + ".keys()" : "ObservableMap.keys()"), o.data_ = /* @__PURE__ */ new Map(), o.hasMap_ = /* @__PURE__ */ new Map(), r && o.merge(r);
    });
  }
  var t = e.prototype;
  return t.has_ = function(n) {
    return this.data_.has(n);
  }, t.has = function(n) {
    var i = this;
    if (!h.trackingDerivation)
      return this.has_(n);
    var o = this.hasMap_.get(n);
    if (!o) {
      var a = o = new ge(this.has_(n), Gt, process.env.NODE_ENV !== "production" ? this.name_ + "." + hr(n) + "?" : "ObservableMap.key?", !1);
      this.hasMap_.set(n, a), ui(a, function() {
        return i.hasMap_.delete(n);
      });
    }
    return o.get();
  }, t.set = function(n, i) {
    var o = this.has_(n);
    if (j(this)) {
      var a = R(this, {
        type: o ? U : oe,
        object: this,
        newValue: i,
        name: n
      });
      if (!a)
        return this;
      i = a.newValue;
    }
    return o ? this.updateValue_(n, i) : this.addValue_(n, i), this;
  }, t.delete = function(n) {
    var i = this;
    if (W(this.keysAtom_), j(this)) {
      var o = R(this, {
        type: Mt,
        object: this,
        name: n
      });
      if (!o)
        return !1;
    }
    if (this.has_(n)) {
      var a = $(), l = B(this), s = l || a ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: Mt,
        object: this,
        oldValue: this.data_.get(n).value_,
        name: n
      } : null;
      return process.env.NODE_ENV !== "production" && a && C(s), Z(function() {
        var c;
        i.keysAtom_.reportChanged(), (c = i.hasMap_.get(n)) == null || c.setNewValue_(!1);
        var d = i.data_.get(n);
        d.setNewValue_(void 0), i.data_.delete(n);
      }), l && K(this, s), process.env.NODE_ENV !== "production" && a && T(), !0;
    }
    return !1;
  }, t.updateValue_ = function(n, i) {
    var o = this.data_.get(n);
    if (i = o.prepareNewValue_(i), i !== h.UNCHANGED) {
      var a = $(), l = B(this), s = l || a ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: U,
        object: this,
        oldValue: o.value_,
        name: n,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && a && C(s), o.setNewValue_(i), l && K(this, s), process.env.NODE_ENV !== "production" && a && T();
    }
  }, t.addValue_ = function(n, i) {
    var o = this;
    W(this.keysAtom_), Z(function() {
      var c, d = new ge(i, o.enhancer_, process.env.NODE_ENV !== "production" ? o.name_ + "." + hr(n) : "ObservableMap.key", !1);
      o.data_.set(n, d), i = d.value_, (c = o.hasMap_.get(n)) == null || c.setNewValue_(!0), o.keysAtom_.reportChanged();
    });
    var a = $(), l = B(this), s = l || a ? {
      observableKind: "map",
      debugObjectName: this.name_,
      type: oe,
      object: this,
      name: n,
      newValue: i
    } : null;
    process.env.NODE_ENV !== "production" && a && C(s), l && K(this, s), process.env.NODE_ENV !== "production" && a && T();
  }, t.get = function(n) {
    return this.has(n) ? this.dehanceValue_(this.data_.get(n).get()) : this.dehanceValue_(void 0);
  }, t.dehanceValue_ = function(n) {
    return this.dehancer !== void 0 ? this.dehancer(n) : n;
  }, t.keys = function() {
    return this.keysAtom_.reportObserved(), this.data_.keys();
  }, t.values = function() {
    var n = this, i = this.keys();
    return rt({
      next: function() {
        var a = i.next(), l = a.done, s = a.value;
        return {
          done: l,
          value: l ? void 0 : n.get(s)
        };
      }
    });
  }, t.entries = function() {
    var n = this, i = this.keys();
    return rt({
      next: function() {
        var a = i.next(), l = a.done, s = a.value;
        return {
          done: l,
          value: l ? void 0 : [s, n.get(s)]
        };
      }
    });
  }, t[gi] = function() {
    return this.entries();
  }, t.forEach = function(n, i) {
    for (var o = Te(this), a; !(a = o()).done; ) {
      var l = a.value, s = l[0], c = l[1];
      n.call(i, c, s, this);
    }
  }, t.merge = function(n) {
    var i = this;
    return ee(n) && (n = new Map(n)), Z(function() {
      P(n) ? fo(n).forEach(function(o) {
        return i.set(o, n[o]);
      }) : Array.isArray(n) ? n.forEach(function(o) {
        var a = o[0], l = o[1];
        return i.set(a, l);
      }) : Le(n) ? (vo(n) || v(19, n), n.forEach(function(o, a) {
        return i.set(a, o);
      })) : n != null && v(20, n);
    }), this;
  }, t.clear = function() {
    var n = this;
    Z(function() {
      Xn(function() {
        for (var i = Te(n.keys()), o; !(o = i()).done; ) {
          var a = o.value;
          n.delete(a);
        }
      });
    });
  }, t.replace = function(n) {
    var i = this;
    return Z(function() {
      for (var o = qa(n), a = /* @__PURE__ */ new Map(), l = !1, s = Te(i.data_.keys()), c; !(c = s()).done; ) {
        var d = c.value;
        if (!o.has(d)) {
          var u = i.delete(d);
          if (u)
            l = !0;
          else {
            var f = i.data_.get(d);
            a.set(d, f);
          }
        }
      }
      for (var p = Te(o.entries()), y; !(y = p()).done; ) {
        var m = y.value, S = m[0], F = m[1], $e = i.data_.has(S);
        if (i.set(S, F), i.data_.has(S)) {
          var te = i.data_.get(S);
          a.set(S, te), $e || (l = !0);
        }
      }
      if (!l)
        if (i.data_.size !== a.size)
          i.keysAtom_.reportChanged();
        else
          for (var D = i.data_.keys(), re = a.keys(), ce = D.next(), Kr = re.next(); !ce.done; ) {
            if (ce.value !== Kr.value) {
              i.keysAtom_.reportChanged();
              break;
            }
            ce = D.next(), Kr = re.next();
          }
      i.data_ = a;
    }), this;
  }, t.toString = function() {
    return "[object ObservableMap]";
  }, t.toJSON = function() {
    return Array.from(this);
  }, t.observe_ = function(n, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && v("`observe` doesn't support fireImmediately=true in combination with maps."), vt(this, n);
  }, t.intercept_ = function(n) {
    return ht(this, n);
  }, Ft(e, [{
    key: "size",
    get: function() {
      return this.keysAtom_.reportObserved(), this.data_.size;
    }
  }, {
    key: bi,
    get: function() {
      return "Map";
    }
  }]), e;
}(), ee = /* @__PURE__ */ Se("ObservableMap", _i);
function qa(e) {
  if (Le(e) || ee(e))
    return e;
  if (Array.isArray(e))
    return new Map(e);
  if (P(e)) {
    var t = /* @__PURE__ */ new Map();
    for (var r in e)
      t.set(r, e[r]);
    return t;
  } else
    return v(21, e);
}
var mi, yi, Fa = {};
mi = Symbol.iterator;
yi = Symbol.toStringTag;
var wi = /* @__PURE__ */ function() {
  function e(r, n, i) {
    var o = this;
    n === void 0 && (n = me), i === void 0 && (i = process.env.NODE_ENV !== "production" ? "ObservableSet@" + I() : "ObservableSet"), this.name_ = void 0, this[g] = Fa, this.data_ = /* @__PURE__ */ new Set(), this.atom_ = void 0, this.changeListeners_ = void 0, this.interceptors_ = void 0, this.dehancer = void 0, this.enhancer_ = void 0, this.name_ = i, E(Set) || v(22), this.enhancer_ = function(a, l) {
      return n(a, l, i);
    }, xe(function() {
      o.atom_ = kn(o.name_), r && o.replace(r);
    });
  }
  var t = e.prototype;
  return t.dehanceValue_ = function(n) {
    return this.dehancer !== void 0 ? this.dehancer(n) : n;
  }, t.clear = function() {
    var n = this;
    Z(function() {
      Xn(function() {
        for (var i = Te(n.data_.values()), o; !(o = i()).done; ) {
          var a = o.value;
          n.delete(a);
        }
      });
    });
  }, t.forEach = function(n, i) {
    for (var o = Te(this), a; !(a = o()).done; ) {
      var l = a.value;
      n.call(i, l, l, this);
    }
  }, t.add = function(n) {
    var i = this;
    if (W(this.atom_), j(this)) {
      var o = R(this, {
        type: oe,
        object: this,
        newValue: n
      });
      if (!o)
        return this;
    }
    if (!this.has(n)) {
      Z(function() {
        i.data_.add(i.enhancer_(n, void 0)), i.atom_.reportChanged();
      });
      var a = process.env.NODE_ENV !== "production" && $(), l = B(this), s = l || a ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: oe,
        object: this,
        newValue: n
      } : null;
      a && process.env.NODE_ENV !== "production" && C(s), l && K(this, s), a && process.env.NODE_ENV !== "production" && T();
    }
    return this;
  }, t.delete = function(n) {
    var i = this;
    if (j(this)) {
      var o = R(this, {
        type: Mt,
        object: this,
        oldValue: n
      });
      if (!o)
        return !1;
    }
    if (this.has(n)) {
      var a = process.env.NODE_ENV !== "production" && $(), l = B(this), s = l || a ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: Mt,
        object: this,
        oldValue: n
      } : null;
      return a && process.env.NODE_ENV !== "production" && C(s), Z(function() {
        i.atom_.reportChanged(), i.data_.delete(n);
      }), l && K(this, s), a && process.env.NODE_ENV !== "production" && T(), !0;
    }
    return !1;
  }, t.has = function(n) {
    return this.atom_.reportObserved(), this.data_.has(this.dehanceValue_(n));
  }, t.entries = function() {
    var n = 0, i = Array.from(this.keys()), o = Array.from(this.values());
    return rt({
      next: function() {
        var l = n;
        return n += 1, l < o.length ? {
          value: [i[l], o[l]],
          done: !1
        } : {
          done: !0
        };
      }
    });
  }, t.keys = function() {
    return this.values();
  }, t.values = function() {
    this.atom_.reportObserved();
    var n = this, i = 0, o = Array.from(this.data_.values());
    return rt({
      next: function() {
        return i < o.length ? {
          value: n.dehanceValue_(o[i++]),
          done: !1
        } : {
          done: !0
        };
      }
    });
  }, t.replace = function(n) {
    var i = this;
    return Ie(n) && (n = new Set(n)), Z(function() {
      Array.isArray(n) ? (i.clear(), n.forEach(function(o) {
        return i.add(o);
      })) : st(n) ? (i.clear(), n.forEach(function(o) {
        return i.add(o);
      })) : n != null && v("Cannot initialize set from " + n);
    }), this;
  }, t.observe_ = function(n, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && v("`observe` doesn't support fireImmediately=true in combination with sets."), vt(this, n);
  }, t.intercept_ = function(n) {
    return ht(this, n);
  }, t.toJSON = function() {
    return Array.from(this);
  }, t.toString = function() {
    return "[object ObservableSet]";
  }, t[mi] = function() {
    return this.values();
  }, Ft(e, [{
    key: "size",
    get: function() {
      return this.atom_.reportObserved(), this.data_.size;
    }
  }, {
    key: yi,
    get: function() {
      return "Set";
    }
  }]), e;
}(), Ie = /* @__PURE__ */ Se("ObservableSet", wi), Yr = /* @__PURE__ */ Object.create(null), Qr = "remove", yr = /* @__PURE__ */ function() {
  function e(r, n, i, o) {
    n === void 0 && (n = /* @__PURE__ */ new Map()), o === void 0 && (o = Ho), this.target_ = void 0, this.values_ = void 0, this.name_ = void 0, this.defaultAnnotation_ = void 0, this.keysAtom_ = void 0, this.changeListeners_ = void 0, this.interceptors_ = void 0, this.proxy_ = void 0, this.isPlainObject_ = void 0, this.appliedAnnotations_ = void 0, this.pendingKeys_ = void 0, this.target_ = r, this.values_ = n, this.name_ = i, this.defaultAnnotation_ = o, this.keysAtom_ = new ct(process.env.NODE_ENV !== "production" ? this.name_ + ".keys" : "ObservableObject.keys"), this.isPlainObject_ = P(this.target_), process.env.NODE_ENV !== "production" && !Si(this.defaultAnnotation_) && v("defaultAnnotation must be valid annotation"), process.env.NODE_ENV !== "production" && (this.appliedAnnotations_ = {});
  }
  var t = e.prototype;
  return t.getObservablePropValue_ = function(n) {
    return this.values_.get(n).get();
  }, t.setObservablePropValue_ = function(n, i) {
    var o = this.values_.get(n);
    if (o instanceof H)
      return o.set(i), !0;
    if (j(this)) {
      var a = R(this, {
        type: U,
        object: this.proxy_ || this.target_,
        name: n,
        newValue: i
      });
      if (!a)
        return null;
      i = a.newValue;
    }
    if (i = o.prepareNewValue_(i), i !== h.UNCHANGED) {
      var l = B(this), s = process.env.NODE_ENV !== "production" && $(), c = l || s ? {
        type: U,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        oldValue: o.value_,
        name: n,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && s && C(c), o.setNewValue_(i), l && K(this, c), process.env.NODE_ENV !== "production" && s && T();
    }
    return !0;
  }, t.get_ = function(n) {
    return h.trackingDerivation && !z(this.target_, n) && this.has_(n), this.target_[n];
  }, t.set_ = function(n, i, o) {
    return o === void 0 && (o = !1), z(this.target_, n) ? this.values_.has(n) ? this.setObservablePropValue_(n, i) : o ? Reflect.set(this.target_, n, i) : (this.target_[n] = i, !0) : this.extend_(n, {
      value: i,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }, this.defaultAnnotation_, o);
  }, t.has_ = function(n) {
    if (!h.trackingDerivation)
      return n in this.target_;
    this.pendingKeys_ || (this.pendingKeys_ = /* @__PURE__ */ new Map());
    var i = this.pendingKeys_.get(n);
    return i || (i = new ge(n in this.target_, Gt, process.env.NODE_ENV !== "production" ? this.name_ + "." + hr(n) + "?" : "ObservableObject.key?", !1), this.pendingKeys_.set(n, i)), i.get();
  }, t.make_ = function(n, i) {
    if (i === !0 && (i = this.defaultAnnotation_), i !== !1) {
      if (rn(this, i, n), !(n in this.target_)) {
        var o;
        if ((o = this.target_[J]) != null && o[n])
          return;
        v(1, i.annotationType_, this.name_ + "." + n.toString());
      }
      for (var a = this.target_; a && a !== Kt; ) {
        var l = Ct(a, n);
        if (l) {
          var s = i.make_(this, n, l, a);
          if (s === 0)
            return;
          if (s === 1)
            break;
        }
        a = Object.getPrototypeOf(a);
      }
      tn(this, i, n);
    }
  }, t.extend_ = function(n, i, o, a) {
    if (a === void 0 && (a = !1), o === !0 && (o = this.defaultAnnotation_), o === !1)
      return this.defineProperty_(n, i, a);
    rn(this, o, n);
    var l = o.extend_(this, n, i, a);
    return l && tn(this, o, n), l;
  }, t.defineProperty_ = function(n, i, o) {
    o === void 0 && (o = !1), W(this.keysAtom_);
    try {
      k();
      var a = this.delete_(n);
      if (!a)
        return a;
      if (j(this)) {
        var l = R(this, {
          object: this.proxy_ || this.target_,
          name: n,
          type: oe,
          newValue: i.value
        });
        if (!l)
          return null;
        var s = l.newValue;
        i.value !== s && (i = ae({}, i, {
          value: s
        }));
      }
      if (o) {
        if (!Reflect.defineProperty(this.target_, n, i))
          return !1;
      } else
        G(this.target_, n, i);
      this.notifyPropertyAddition_(n, i.value);
    } finally {
      L();
    }
    return !0;
  }, t.defineObservableProperty_ = function(n, i, o, a) {
    a === void 0 && (a = !1), W(this.keysAtom_);
    try {
      k();
      var l = this.delete_(n);
      if (!l)
        return l;
      if (j(this)) {
        var s = R(this, {
          object: this.proxy_ || this.target_,
          name: n,
          type: oe,
          newValue: i
        });
        if (!s)
          return null;
        i = s.newValue;
      }
      var c = en(n), d = {
        configurable: h.safeDescriptors ? this.isPlainObject_ : !0,
        enumerable: !0,
        get: c.get,
        set: c.set
      };
      if (a) {
        if (!Reflect.defineProperty(this.target_, n, d))
          return !1;
      } else
        G(this.target_, n, d);
      var u = new ge(i, o, process.env.NODE_ENV !== "production" ? this.name_ + "." + n.toString() : "ObservableObject.key", !1);
      this.values_.set(n, u), this.notifyPropertyAddition_(n, u.value_);
    } finally {
      L();
    }
    return !0;
  }, t.defineComputedProperty_ = function(n, i, o) {
    o === void 0 && (o = !1), W(this.keysAtom_);
    try {
      k();
      var a = this.delete_(n);
      if (!a)
        return a;
      if (j(this)) {
        var l = R(this, {
          object: this.proxy_ || this.target_,
          name: n,
          type: oe,
          newValue: void 0
        });
        if (!l)
          return null;
      }
      i.name || (i.name = process.env.NODE_ENV !== "production" ? this.name_ + "." + n.toString() : "ObservableObject.key"), i.context = this.proxy_ || this.target_;
      var s = en(n), c = {
        configurable: h.safeDescriptors ? this.isPlainObject_ : !0,
        enumerable: !1,
        get: s.get,
        set: s.set
      };
      if (o) {
        if (!Reflect.defineProperty(this.target_, n, c))
          return !1;
      } else
        G(this.target_, n, c);
      this.values_.set(n, new H(i)), this.notifyPropertyAddition_(n, void 0);
    } finally {
      L();
    }
    return !0;
  }, t.delete_ = function(n, i) {
    if (i === void 0 && (i = !1), W(this.keysAtom_), !z(this.target_, n))
      return !0;
    if (j(this)) {
      var o = R(this, {
        object: this.proxy_ || this.target_,
        name: n,
        type: Qr
      });
      if (!o)
        return null;
    }
    try {
      var a, l;
      k();
      var s = B(this), c = process.env.NODE_ENV !== "production" && $(), d = this.values_.get(n), u = void 0;
      if (!d && (s || c)) {
        var f;
        u = (f = Ct(this.target_, n)) == null ? void 0 : f.value;
      }
      if (i) {
        if (!Reflect.deleteProperty(this.target_, n))
          return !1;
      } else
        delete this.target_[n];
      if (process.env.NODE_ENV !== "production" && delete this.appliedAnnotations_[n], d && (this.values_.delete(n), d instanceof ge && (u = d.value_), ei(d)), this.keysAtom_.reportChanged(), (a = this.pendingKeys_) == null || (l = a.get(n)) == null || l.set(n in this.target_), s || c) {
        var p = {
          type: Qr,
          observableKind: "object",
          object: this.proxy_ || this.target_,
          debugObjectName: this.name_,
          oldValue: u,
          name: n
        };
        process.env.NODE_ENV !== "production" && c && C(p), s && K(this, p), process.env.NODE_ENV !== "production" && c && T();
      }
    } finally {
      L();
    }
    return !0;
  }, t.observe_ = function(n, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && v("`observe` doesn't support the fire immediately property for observable objects."), vt(this, n);
  }, t.intercept_ = function(n) {
    return ht(this, n);
  }, t.notifyPropertyAddition_ = function(n, i) {
    var o, a, l = B(this), s = process.env.NODE_ENV !== "production" && $();
    if (l || s) {
      var c = l || s ? {
        type: oe,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        name: n,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && s && C(c), l && K(this, c), process.env.NODE_ENV !== "production" && s && T();
    }
    (o = this.pendingKeys_) == null || (a = o.get(n)) == null || a.set(!0), this.keysAtom_.reportChanged();
  }, t.ownKeys_ = function() {
    return this.keysAtom_.reportObserved(), Ze(this.target_);
  }, t.keys_ = function() {
    return this.keysAtom_.reportObserved(), Object.keys(this.target_);
  }, e;
}();
function Ue(e, t) {
  var r;
  if (process.env.NODE_ENV !== "production" && t && Ee(e) && v("Options can't be provided for already observable objects."), z(e, g))
    return process.env.NODE_ENV !== "production" && !(Tr(e) instanceof yr) && v("Cannot convert '" + It(e) + `' into observable object:
The target is already observable of different type.
Extending builtins is not supported.`), e;
  process.env.NODE_ENV !== "production" && !Object.isExtensible(e) && v("Cannot make the designated object observable; it is not extensible");
  var n = (r = t?.name) != null ? r : process.env.NODE_ENV !== "production" ? (P(e) ? "ObservableObject" : e.constructor.name) + "@" + I() : "ObservableObject", i = new yr(e, /* @__PURE__ */ new Map(), String(n), ta(t));
  return qt(e, g, i), e;
}
var Wa = /* @__PURE__ */ Se("ObservableObjectAdministration", yr);
function en(e) {
  return Yr[e] || (Yr[e] = {
    get: function() {
      return this[g].getObservablePropValue_(e);
    },
    set: function(r) {
      return this[g].setObservablePropValue_(e, r);
    }
  });
}
function Ee(e) {
  return Ht(e) ? Wa(e[g]) : !1;
}
function tn(e, t, r) {
  var n;
  process.env.NODE_ENV !== "production" && (e.appliedAnnotations_[r] = t), (n = e.target_[J]) == null || delete n[r];
}
function rn(e, t, r) {
  if (process.env.NODE_ENV !== "production" && !Si(t) && v("Cannot annotate '" + e.name_ + "." + r.toString() + "': Invalid annotation."), process.env.NODE_ENV !== "production" && !Vt(t) && z(e.appliedAnnotations_, r)) {
    var n = e.name_ + "." + r.toString(), i = e.appliedAnnotations_[r].annotationType_, o = t.annotationType_;
    v("Cannot apply '" + o + "' to '" + n + "':" + (`
The field is already annotated with '` + i + "'.") + `
Re-annotating fields is not allowed.
Use 'override' annotation for methods overridden by subclass.`);
  }
}
var Ga = /* @__PURE__ */ Oi(0), Xa = /* @__PURE__ */ function() {
  var e = !1, t = {};
  return Object.defineProperty(t, "0", {
    set: function() {
      e = !0;
    }
  }), Object.create(t)[0] = 1, e === !1;
}(), sr = 0, Ei = function() {
};
function Ja(e, t) {
  Object.setPrototypeOf ? Object.setPrototypeOf(e.prototype, t) : e.prototype.__proto__ !== void 0 ? e.prototype.__proto__ = t : e.prototype = t;
}
Ja(Ei, Array.prototype);
var Cr = /* @__PURE__ */ function(e, t, r) {
  Rn(n, e);
  function n(o, a, l, s) {
    var c;
    return l === void 0 && (l = process.env.NODE_ENV !== "production" ? "ObservableArray@" + I() : "ObservableArray"), s === void 0 && (s = !1), c = e.call(this) || this, xe(function() {
      var d = new Dr(l, a, s, !0);
      d.proxy_ = Nt(c), Tn(Nt(c), g, d), o && o.length && c.spliceWithArray(0, 0, o), Xa && Object.defineProperty(Nt(c), "0", Ga);
    }), c;
  }
  var i = n.prototype;
  return i.concat = function() {
    this[g].atom_.reportObserved();
    for (var a = arguments.length, l = new Array(a), s = 0; s < a; s++)
      l[s] = arguments[s];
    return Array.prototype.concat.apply(
      this.slice(),
      //@ts-ignore
      l.map(function(c) {
        return ft(c) ? c.slice() : c;
      })
    );
  }, i[r] = function() {
    var o = this, a = 0;
    return rt({
      next: function() {
        return a < o.length ? {
          value: o[a++],
          done: !1
        } : {
          done: !0,
          value: void 0
        };
      }
    });
  }, Ft(n, [{
    key: "length",
    get: function() {
      return this[g].getArrayLength_();
    },
    set: function(a) {
      this[g].setArrayLength_(a);
    }
  }, {
    key: t,
    get: function() {
      return "Array";
    }
  }]), n;
}(Ei, Symbol.toStringTag, Symbol.iterator);
Object.entries(Lt).forEach(function(e) {
  var t = e[0], r = e[1];
  t !== "concat" && qt(Cr.prototype, t, r);
});
function Oi(e) {
  return {
    enumerable: !1,
    configurable: !0,
    get: function() {
      return this[g].get_(e);
    },
    set: function(r) {
      this[g].set_(e, r);
    }
  };
}
function Za(e) {
  G(Cr.prototype, "" + e, Oi(e));
}
function Ai(e) {
  if (e > sr) {
    for (var t = sr; t < e + 100; t++)
      Za(t);
    sr = e;
  }
}
Ai(1e3);
function Ya(e, t, r) {
  return new Cr(e, t, r);
}
function se(e, t) {
  if (typeof e == "object" && e !== null) {
    if (ft(e))
      return t !== void 0 && v(23), e[g].atom_;
    if (Ie(e))
      return e.atom_;
    if (ee(e)) {
      if (t === void 0)
        return e.keysAtom_;
      var r = e.data_.get(t) || e.hasMap_.get(t);
      return r || v(25, t, It(e)), r;
    }
    if (Ee(e)) {
      if (!t)
        return v(26);
      var n = e[g].values_.get(t);
      return n || v(27, t, It(e)), n;
    }
    if (Nr(e) || Qt(e) || kt(e))
      return e;
  } else if (E(e) && kt(e[g]))
    return e[g];
  v(28);
}
function Tr(e, t) {
  if (e || v(29), t !== void 0)
    return Tr(se(e, t));
  if (Nr(e) || Qt(e) || kt(e) || ee(e) || Ie(e))
    return e;
  if (e[g])
    return e[g];
  v(24, e);
}
function It(e, t) {
  var r;
  if (t !== void 0)
    r = se(e, t);
  else {
    if (dt(e))
      return e.name;
    Ee(e) || ee(e) || Ie(e) ? r = Tr(e) : r = se(e);
  }
  return r.name_;
}
function xe(e) {
  var t = Ne(), r = Zt(!0);
  k();
  try {
    return e();
  } finally {
    L(), Yt(r), Q(t);
  }
}
var nn = Kt.toString;
function Vr(e, t, r) {
  return r === void 0 && (r = -1), wr(e, t, r);
}
function wr(e, t, r, n, i) {
  if (e === t)
    return e !== 0 || 1 / e === 1 / t;
  if (e == null || t == null)
    return !1;
  if (e !== e)
    return t !== t;
  var o = typeof e;
  if (o !== "function" && o !== "object" && typeof t != "object")
    return !1;
  var a = nn.call(e);
  if (a !== nn.call(t))
    return !1;
  switch (a) {
    case "[object RegExp]":
    case "[object String]":
      return "" + e == "" + t;
    case "[object Number]":
      return +e != +e ? +t != +t : +e == 0 ? 1 / +e === 1 / t : +e == +t;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +t;
    case "[object Symbol]":
      return typeof Symbol < "u" && Symbol.valueOf.call(e) === Symbol.valueOf.call(t);
    case "[object Map]":
    case "[object Set]":
      r >= 0 && r++;
      break;
  }
  e = on(e), t = on(t);
  var l = a === "[object Array]";
  if (!l) {
    if (typeof e != "object" || typeof t != "object")
      return !1;
    var s = e.constructor, c = t.constructor;
    if (s !== c && !(E(s) && s instanceof s && E(c) && c instanceof c) && "constructor" in e && "constructor" in t)
      return !1;
  }
  if (r === 0)
    return !1;
  r < 0 && (r = -1), n = n || [], i = i || [];
  for (var d = n.length; d--; )
    if (n[d] === e)
      return i[d] === t;
  if (n.push(e), i.push(t), l) {
    if (d = e.length, d !== t.length)
      return !1;
    for (; d--; )
      if (!wr(e[d], t[d], r - 1, n, i))
        return !1;
  } else {
    var u = Object.keys(e), f;
    if (d = u.length, Object.keys(t).length !== d)
      return !1;
    for (; d--; )
      if (f = u[d], !(z(t, f) && wr(e[f], t[f], r - 1, n, i)))
        return !1;
  }
  return n.pop(), i.pop(), !0;
}
function on(e) {
  return ft(e) ? e.slice() : Le(e) || ee(e) || st(e) || Ie(e) ? Array.from(e.entries()) : e;
}
function rt(e) {
  return e[Symbol.iterator] = Qa, e;
}
function Qa() {
  return this;
}
function Si(e) {
  return (
    // Can be function
    e instanceof Object && typeof e.annotationType_ == "string" && E(e.make_) && E(e.extend_)
  );
}
["Symbol", "Map", "Set"].forEach(function(e) {
  var t = $n();
  typeof t[e] > "u" && v("MobX requires global '" + e + "' to be available or polyfilled");
});
typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ == "object" && __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
  spy: wa,
  extras: {
    getDebugName: It
  },
  $mobx: g
});
const an = "copilot-conf";
class be {
  static get sessionConfiguration() {
    const t = sessionStorage.getItem(an);
    return t ? JSON.parse(t) : {};
  }
  static saveCopilotActivation(t) {
    const r = this.sessionConfiguration;
    r.active = t, this.persist(r);
  }
  static getCopilotActivation() {
    return this.sessionConfiguration.active;
  }
  static saveSpotlightActivation(t) {
    const r = this.sessionConfiguration;
    r.spotlightActive = t, this.persist(r);
  }
  static getSpotlightActivation() {
    return this.sessionConfiguration.spotlightActive;
  }
  static saveSpotlightPosition(t, r, n, i) {
    const o = this.sessionConfiguration;
    o.spotlightPosition = { left: t, top: r, right: n, bottom: i }, this.persist(o);
  }
  static getSpotlightPosition() {
    return this.sessionConfiguration.spotlightPosition;
  }
  static saveDrawerSize(t, r) {
    const n = this.sessionConfiguration;
    n.drawerSizes = n.drawerSizes ?? {}, n.drawerSizes[t] = r, this.persist(n);
  }
  static getDrawerSize(t) {
    const r = this.sessionConfiguration;
    if (r.drawerSizes)
      return r.drawerSizes[t];
  }
  static savePanelConfigurations(t) {
    const r = this.sessionConfiguration;
    r.sectionPanelState = t, this.persist(r);
  }
  static getPanelConfigurations() {
    return this.sessionConfiguration.sectionPanelState;
  }
  static persist(t) {
    sessionStorage.setItem(an, JSON.stringify(t));
  }
  static savePrompts(t) {
    const r = this.sessionConfiguration;
    r.prompts = t, this.persist(r);
  }
  static getPrompts() {
    return this.sessionConfiguration.prompts || [];
  }
}
class es {
  constructor() {
    this.spotlightActive = !1, this.welcomeActive = !1, this.loginCheckActive = !1, this.userInfo = void 0, this.active = !1, this.activatedFrom = null, this.activatedAtLeastOnce = !1, this.operationInProgress = void 0, this.operationWaitsHmrUpdate = void 0, this.idePluginState = void 0, this.notifications = [], this.infoTooltip = null, this.sectionPanelDragging = !1, this.spotlightDragging = !1, this.sectionPanelResizing = !1, this.drawerResizing = !1, this.jdkInfo = void 0, er(this, {
      notifications: A.shallow
    }), this.spotlightActive = be.getSpotlightActivation() ?? !1;
  }
  setActive(t, r) {
    this.active = t, t && (this.activatedAtLeastOnce = !0), this.activatedFrom = r ?? null;
  }
  setSpotlightActive(t) {
    this.spotlightActive = t;
  }
  setWelcomeActive(t) {
    this.welcomeActive = t;
  }
  setLoginCheckActive(t) {
    this.loginCheckActive = t;
  }
  setUserInfo(t) {
    this.userInfo = t;
  }
  startOperation(t) {
    if (this.operationInProgress)
      throw new Error(`An ${t} operation is already in progress`);
    if (this.operationWaitsHmrUpdate)
      throw new Error("Wait for files to be updated to start a new operation");
    this.operationInProgress = t;
  }
  stopOperation(t) {
    if (this.operationInProgress) {
      if (this.operationInProgress !== t)
        return;
    } else return;
    this.operationInProgress = void 0;
  }
  setIdePluginState(t) {
    this.idePluginState = t;
  }
  toggleActive(t) {
    this.setActive(!this.active, this.active ? null : t ?? null);
  }
  reset() {
    this.active = !1, this.activatedAtLeastOnce = !1;
  }
  setNotifications(t) {
    this.notifications = t;
  }
  removeNotification(t) {
    t.animatingOut = !0, setTimeout(() => {
      this.reallyRemoveNotification(t);
    }, 180);
  }
  reallyRemoveNotification(t) {
    const r = this.notifications.indexOf(t);
    r > -1 && this.notifications.splice(r, 1);
  }
  setTooltip(t, r) {
    this.infoTooltip = {
      text: t,
      loader: r
    };
  }
  clearTooltip() {
    this.infoTooltip = null;
  }
  setSectionPanelDragging(t) {
    this.sectionPanelDragging = t;
  }
  setSpotlightDragging(t) {
    this.spotlightDragging = t;
  }
  setSectionPanelResizing(t) {
    this.sectionPanelResizing = t;
  }
  setDrawerResizing(t) {
    this.drawerResizing = t;
  }
}
const Re = "copilot-", ts = "24.4.14", Dl = "attention-required", Cl = "https://plugins.jetbrains.com/plugin/23758-vaadin", Tl = "https://marketplace.visualstudio.com/items?itemName=vaadin.vaadin-vscode", Vl = (e, t, r) => t >= e.left && t <= e.right && r >= e.top && r <= e.bottom, rs = (e) => {
  const t = [];
  let r = is(e);
  for (; r; )
    t.push(r), r = r.parentElement;
  return t;
}, ns = (e, t) => {
  let r = e;
  for (; !(r instanceof HTMLElement && r.localName === `${Re}main`); ) {
    if (!r.isConnected)
      return null;
    if (r.parentNode ? r = r.parentNode : r.host && (r = r.host), r instanceof HTMLElement && r.localName === t)
      return r;
  }
  return null;
};
function is(e) {
  return e.parentElement ?? e.parentNode?.host;
}
function nt(e) {
  return !e || !(e instanceof HTMLElement) ? !1 : [...rs(e), e].map((t) => t.localName).some((t) => t.startsWith(Re));
}
function jl(e) {
  return e instanceof Element;
}
function Rl(e) {
  return e.startsWith("vaadin-") ? e.substring(7).split("-").map((n) => n.charAt(0).toUpperCase() + n.slice(1)).join(" ") : e;
}
function kl(e) {
  if (!e)
    return;
  if (e.id)
    return `#${e.id}`;
  if (!e.children)
    return;
  const t = Array.from(e.children).find((n) => n.localName === "label");
  if (t)
    return t.outerText.trim();
  const r = Array.from(e.childNodes).find(
    (n) => n.nodeType === Node.TEXT_NODE && n.textContent && n.textContent.trim().length > 0
  );
  if (r && r.textContent)
    return r.textContent.trim();
}
var Ni = /* @__PURE__ */ ((e) => (e["vaadin-combo-box"] = "vaadin-combo-box", e["vaadin-date-picker"] = "vaadin-date-picker", e["vaadin-dialog"] = "vaadin-dialog", e["vaadin-multi-select-combo-box"] = "vaadin-multi-select-combo-box", e["vaadin-select"] = "vaadin-select", e["vaadin-time-picker"] = "vaadin-time-picker", e))(Ni || {});
const Ke = {
  "vaadin-combo-box": {
    hideOnActivation: !0,
    open: (e) => wt(e),
    close: (e) => Et(e)
  },
  "vaadin-select": {
    hideOnActivation: !0,
    open: (e) => {
      const t = e;
      $i(t, t._overlayElement), t.opened = !0;
    },
    close: (e) => {
      const t = e;
      Pi(t, t._overlayElement), t.opened = !1;
    }
  },
  "vaadin-multi-select-combo-box": {
    hideOnActivation: !0,
    open: (e) => wt(e.$.comboBox),
    close: (e) => {
      Et(e.$.comboBox), e.removeAttribute("focused");
    }
  },
  "vaadin-date-picker": {
    hideOnActivation: !0,
    open: (e) => wt(e),
    close: (e) => Et(e)
  },
  "vaadin-time-picker": {
    hideOnActivation: !0,
    open: (e) => wt(e.$.comboBox),
    close: (e) => {
      Et(e.$.comboBox), e.removeAttribute("focused");
    }
  },
  "vaadin-dialog": {
    hideOnActivation: !1
  }
}, xi = (e) => {
  e.preventDefault(), e.stopImmediatePropagation();
}, wt = (e) => {
  e.addEventListener("focusout", xi, { capture: !0 }), $i(e), e.opened = !0;
}, Et = (e) => {
  Pi(e), e.removeAttribute("focused"), e.removeEventListener("focusout", xi, { capture: !0 }), e.opened = !1;
}, $i = (e, t) => {
  const r = t ?? e.$.overlay;
  r.__oldModeless = r.modeless, r.modeless = !0;
}, Pi = (e, t) => {
  const r = t ?? e.$.overlay;
  r.modeless = r.__oldModeless !== void 0 ? r.__oldModeless : r.modeless, delete r.__oldModeless;
};
class os {
  constructor() {
    this.openedOverlayOwners = /* @__PURE__ */ new Set(), this.overlayCloseEventListener = (t) => {
      nt(t.target?.owner) || (window.Vaadin.copilot._uiState.active || nt(t.detail.sourceEvent.target)) && (t.preventDefault(), t.stopImmediatePropagation());
    };
  }
  /**
   * Modifies pointer-events property to auto if dialog overlay is present on body element. <br/>
   * Overriding closeOnOutsideClick method in order to keep overlay present while copilot is active
   * @private
   */
  onCopilotActivation() {
    const t = Array.from(document.body.children).find(
      (n) => n.localName.startsWith("vaadin") && n.localName.endsWith("-overlay")
    );
    if (!t)
      return;
    const r = this.getOwner(t);
    if (r) {
      const n = Ke[r.localName];
      if (!n)
        return;
      n.hideOnActivation && n.close ? n.close(r) : document.body.style.getPropertyValue("pointer-events") === "none" && document.body.style.removeProperty("pointer-events");
    }
  }
  /**
   * Restores pointer-events state on deactivation. <br/>
   * Closes opened overlays while using copilot.
   * @private
   */
  onCopilotDeactivation() {
    this.openedOverlayOwners.forEach((r) => {
      const n = Ke[r.localName];
      n && n.close && n.close(r);
    }), document.body.querySelector("vaadin-dialog-overlay") && document.body.style.setProperty("pointer-events", "none");
  }
  getOwner(t) {
    const r = t;
    return r.owner ?? r.__dataHost;
  }
  addOverlayOutsideClickEvent() {
    document.documentElement.addEventListener("vaadin-overlay-outside-click", this.overlayCloseEventListener, {
      capture: !0
    }), document.documentElement.addEventListener("vaadin-overlay-escape-press", this.overlayCloseEventListener, {
      capture: !0
    });
  }
  removeOverlayOutsideClickEvent() {
    document.documentElement.removeEventListener("vaadin-overlay-outside-click", this.overlayCloseEventListener), document.documentElement.removeEventListener("vaadin-overlay-escape-press", this.overlayCloseEventListener);
  }
  toggle(t) {
    const r = Ke[t.localName];
    this.isOverlayActive(t) ? (r.close(t), this.openedOverlayOwners.delete(t)) : (r.open(t), this.openedOverlayOwners.add(t));
  }
  isOverlayActive(t) {
    const r = Ke[t.localName];
    return r.active ? r.active(t) : t.hasAttribute("opened");
  }
  overlayStatus(t) {
    if (!t)
      return { visible: !1 };
    const r = t.localName;
    let n = Object.keys(Ni).includes(r);
    if (!n)
      return { visible: !1 };
    const i = Ke[t.localName];
    i.hasOverlay && (n = i.hasOverlay(t));
    const o = this.isOverlayActive(t);
    return { visible: n, active: o };
  }
}
function Di(e, t) {
  const r = e();
  r ? t(r) : setTimeout(() => Di(e, t), 50);
}
async function Ci(e) {
  const t = e();
  if (t)
    return t;
  let r;
  const n = new Promise((o) => {
    r = o;
  }), i = setInterval(() => {
    const o = e();
    o && (clearInterval(i), r(o));
  }, 10);
  return n;
}
function as(e) {
  return A.box(e, { deep: !1 });
}
function ss(e) {
  return e && typeof e.lastAccessedBy_ == "number";
}
function Ll(e) {
  if (e) {
    if (typeof e == "string")
      return e;
    if (!ss(e))
      throw new Error(`Expected message to be a string or an observable value but was ${JSON.stringify(e)}`);
    return e.get();
  }
}
function Ml(e, t) {
  return e.length > t ? `${e.substring(0, t - 3)}...` : e;
}
const ls = {
  userAgent: navigator.userAgent,
  locale: navigator.language,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
};
async function jr() {
  return Ci(() => {
    const e = window.Vaadin.devTools, t = e?.frontendConnection && e?.frontendConnection.status === "active";
    return e !== void 0 && t && e?.frontendConnection;
  });
}
function ke(e, t) {
  jr().then((r) => r.send(e, { ...t, context: ls }));
}
async function Il() {
  return await jr(), !!window.Vaadin.devTools.conf.backend;
}
class cs {
  constructor() {
    this.promise = new Promise((t) => {
      this.resolveInit = t;
    });
  }
  done(t) {
    this.resolveInit(t);
  }
}
class us {
  constructor() {
    this.dismissedNotifications = [], this.termsSummaryDismissed = !1, this.activationButtonPosition = null, this.paletteState = null, this.activationShortcut = !0, this.activationAnimation = !0, er(this), this.initializer = new cs(), this.initializer.promise.then(() => {
      ci(
        () => JSON.stringify(this),
        () => {
          ke("copilot-set-machine-configuration", { conf: JSON.stringify(sn(this)) });
        }
      );
    }), window.Vaadin.copilot.eventbus.on("copilot-machine-configuration", (t) => {
      const r = t.detail.conf;
      Object.assign(this, sn(r)), this.initializer.done(!0), t.preventDefault();
    }), this.loadData();
  }
  loadData() {
    ke("copilot-get-machine-configuration", {});
  }
  addDismissedNotification(t) {
    this.dismissedNotifications.push(t);
  }
  getDismissedNotifications() {
    return this.dismissedNotifications;
  }
  setTermsSummaryDismissed(t) {
    this.termsSummaryDismissed = t;
  }
  isTermsSummaryDismissed() {
    return this.termsSummaryDismissed;
  }
  getActivationButtonPosition() {
    return this.activationButtonPosition;
  }
  setActivationButtonPosition(t) {
    this.activationButtonPosition = t;
  }
  getPaletteState() {
    return this.paletteState;
  }
  setPaletteState(t) {
    this.paletteState = t;
  }
  isActivationShortcut() {
    return this.activationShortcut;
  }
  setActivationShortcut(t) {
    this.activationShortcut = t;
  }
  isActivationAnimation() {
    return this.activationAnimation;
  }
  setActivationAnimation(t) {
    this.activationAnimation = t;
  }
}
function sn(e) {
  const t = { ...e };
  return delete t.initializer, t;
}
const Ti = async (e, t, r) => window.Vaadin.copilot.comm(e, t, r);
class ds {
  constructor() {
    this._previewActivated = !1, this._remainingTimeInMillis = -1, this._active = !1, this._configurationLoaded = !1, er(this);
  }
  setConfiguration(t) {
    this._previewActivated = t.previewActivated, t.previewActivated ? this._remainingTimeInMillis = t.remainingTimeInMillis : this._remainingTimeInMillis = -1, this._active = t.active, this._configurationLoaded = !0;
  }
  get previewActivated() {
    return this._previewActivated;
  }
  get remainingTimeInMillis() {
    return this._remainingTimeInMillis;
  }
  get active() {
    return this._active;
  }
  get configurationLoaded() {
    return this._configurationLoaded;
  }
  get expired() {
    return this.previewActivated && !this.active;
  }
  reset() {
    this._previewActivated = !1, this._active = !1, this._configurationLoaded = !1, this._remainingTimeInMillis = -1;
  }
  loadPreviewConfiguration() {
    Ti(`${Re}get-preview`, {}, (t) => {
      const r = t.data;
      this.setConfiguration(r);
    }).catch((t) => {
      Promise.resolve().then(() => Bs).then((r) => {
        r.handleCopilotError("Load preview configuration failed", t);
      });
    });
  }
}
class hs {
  constructor() {
    this._panels = [], this._attentionRequiredPanelTag = null, this._floatingPanelsZIndexOrder = [], er(this), this.restorePositions();
  }
  restorePositions() {
    const t = be.getPanelConfigurations();
    t && (this._panels = this._panels.map((r) => {
      const n = t.find((i) => i.tag === r.tag);
      return n && (r = Object.assign(r, { ...n })), r;
    }));
  }
  /**
   * Adds panelTag as last element -focused- to list.
   * @param panelConfiguration
   */
  addFocusedFloatingPanel(t) {
    this._floatingPanelsZIndexOrder = this._floatingPanelsZIndexOrder.filter((r) => r !== t.tag), t.floating && this._floatingPanelsZIndexOrder.push(t.tag);
  }
  /**
   * Returns the focused z-index of floating panel as following order
   * <ul>
   *     <li>Returns 50 for last(focused) element </li>
   *     <li>Returns the index of element in list(starting from 0) </li>
   *     <li>Returns 0 if panel is not in the list</li>
   * </ul>
   * @param panelTag
   */
  getFloatingPanelZIndex(t) {
    const r = this._floatingPanelsZIndexOrder.findIndex((n) => n === t);
    return r === this._floatingPanelsZIndexOrder.length - 1 ? 50 : r === -1 ? 0 : r;
  }
  get floatingPanelsZIndexOrder() {
    return this._floatingPanelsZIndexOrder;
  }
  get attentionRequiredPanelTag() {
    return this._attentionRequiredPanelTag;
  }
  set attentionRequiredPanelTag(t) {
    this._attentionRequiredPanelTag = t;
  }
  getAttentionRequiredPanelConfiguration() {
    return this._panels.find((t) => t.tag === this._attentionRequiredPanelTag);
  }
  clearAttention() {
    this._attentionRequiredPanelTag = null;
  }
  get panels() {
    return this._panels;
  }
  addPanel(t) {
    this._panels.push(t), this.restorePositions();
  }
  getPanelByTag(t) {
    return this._panels.find((r) => r.tag === t);
  }
  updatePanel(t, r) {
    const n = [...this._panels], i = n.find((o) => o.tag === t);
    if (i) {
      for (const o in r)
        i[o] = r[o];
      r.floating === !1 && (this._floatingPanelsZIndexOrder = this._floatingPanelsZIndexOrder.filter((o) => o !== t)), this._panels = n, be.savePanelConfigurations(this._panels);
    }
  }
  updateOrders(t) {
    const r = [...this._panels];
    r.forEach((n) => {
      const i = t.find((o) => o.tag === n.tag);
      i && (n.panelOrder = i.order);
    }), this._panels = r, be.savePanelConfigurations(r);
  }
}
window.Vaadin ??= {};
window.Vaadin.copilot ??= {};
window.Vaadin.copilot.plugins = [];
window.Vaadin.copilot._uiState = new es();
window.Vaadin.copilot.eventbus = new ao();
window.Vaadin.copilot.overlayManager = new os();
window.Vaadin.copilot._machineState = new us();
window.Vaadin.copilot._previewState = new ds();
window.Vaadin.copilot._sectionPanelUiState = new hs();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vs = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis, Rr = $t.ShadowRoot && ($t.ShadyCSS === void 0 || $t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, kr = Symbol(), ln = /* @__PURE__ */ new WeakMap();
let Vi = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== kr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Rr && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = ln.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ln.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ie = (e) => new Vi(typeof e == "string" ? e : e + "", void 0, kr), fs = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, o) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[o + 1], e[0]);
  return new Vi(r, e, kr);
}, ps = (e, t) => {
  if (Rr) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = $t.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, cn = Rr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return ie(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: gs, defineProperty: bs, getOwnPropertyDescriptor: _s, getOwnPropertyNames: ms, getOwnPropertySymbols: ys, getPrototypeOf: ws } = Object, tr = globalThis, un = tr.trustedTypes, Es = un ? un.emptyScript : "", Os = tr.reactiveElementPolyfillSupport, Xe = (e, t) => e, Er = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Es : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, ji = (e, t) => !gs(e, t), dn = { attribute: !0, type: String, converter: Er, reflect: !1, hasChanged: ji };
Symbol.metadata ??= Symbol("metadata"), tr.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let De = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = dn) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && bs(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: o } = _s(this.prototype, t) ?? { get() {
      return this[r];
    }, set(a) {
      this[r] = a;
    } };
    return { get() {
      return i?.call(this);
    }, set(a) {
      const l = i?.call(this);
      o.call(this, a), this.requestUpdate(t, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? dn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Xe("elementProperties"))) return;
    const t = ws(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Xe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Xe("properties"))) {
      const r = this.properties, n = [...ms(r), ...ys(r)];
      for (const i of n) this.createProperty(i, r[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [n, i] of r) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, n] of this.elementProperties) {
      const i = this._$Eu(r, n);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) r.unshift(cn(i));
    } else t !== void 0 && r.push(cn(t));
    return r;
  }
  static _$Eu(t, r) {
    const n = r.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const n of r.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ps(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, r, n) {
    this._$AK(t, n);
  }
  _$EC(t, r) {
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : Er).toAttribute(r, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = n.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Er;
      this._$Em = i, this[i] = a.fromAttribute(r, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, r, n) {
    if (t !== void 0) {
      if (n ??= this.constructor.getPropertyOptions(t), !(n.hasChanged ?? ji)(this[t], r)) return;
      this.P(t, r, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, r, n) {
    this._$AL.has(t) || this._$AL.set(t, r), n.reflect === !0 && this._$Em !== t && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, o] of n) o.wrapped !== !0 || this._$AL.has(i) || this[i] === void 0 || this.P(i, this[i], o);
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(r)) : this._$EU();
    } catch (n) {
      throw t = !1, this._$EU(), n;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej &&= this._$Ej.forEach((r) => this._$EC(r, this[r])), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
De.elementStyles = [], De.shadowRootOptions = { mode: "open" }, De[Xe("elementProperties")] = /* @__PURE__ */ new Map(), De[Xe("finalized")] = /* @__PURE__ */ new Map(), Os?.({ ReactiveElement: De }), (tr.reactiveElementVersions ??= []).push("2.0.4");
const Pe = Symbol("LitMobxRenderReaction"), hn = Symbol("LitMobxRequestUpdate");
function As(e, t) {
  var r, n;
  return n = class extends e {
    constructor() {
      super(...arguments), this[r] = () => {
        this.requestUpdate();
      };
    }
    connectedCallback() {
      super.connectedCallback();
      const o = this.constructor.name || this.nodeName;
      this[Pe] = new t(`${o}.update()`, this[hn]), this.hasUpdated && this.requestUpdate();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this[Pe] && (this[Pe].dispose(), this[Pe] = void 0);
    }
    update(o) {
      this[Pe] ? this[Pe].track(super.update.bind(this, o)) : super.update(o);
    }
  }, r = hn, n;
}
function Ss(e) {
  return As(e, Ye);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lr = globalThis, Ut = Lr.trustedTypes, vn = Ut ? Ut.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Mr = "$lit$", Y = `lit$${(Math.random() + "").slice(9)}$`, Ir = "?" + Y, Ns = `<${Ir}>`, Oe = document, it = () => Oe.createComment(""), ot = (e) => e === null || typeof e != "object" && typeof e != "function", Ri = Array.isArray, ki = (e) => Ri(e) || typeof e?.[Symbol.iterator] == "function", lr = `[ 	
\f\r]`, He = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fn = /-->/g, pn = />/g, de = RegExp(`>|${lr}(?:([^\\s"'>=/]+)(${lr}*=${lr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gn = /'/g, bn = /"/g, Li = /^(?:script|style|textarea|title)$/i, Mi = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), zt = Mi(1), Kl = Mi(2), le = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), _n = /* @__PURE__ */ new WeakMap(), pe = Oe.createTreeWalker(Oe, 129);
function Ii(e, t) {
  if (!Array.isArray(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return vn !== void 0 ? vn.createHTML(t) : t;
}
const Ui = (e, t) => {
  const r = e.length - 1, n = [];
  let i, o = t === 2 ? "<svg>" : "", a = He;
  for (let l = 0; l < r; l++) {
    const s = e[l];
    let c, d, u = -1, f = 0;
    for (; f < s.length && (a.lastIndex = f, d = a.exec(s), d !== null); ) f = a.lastIndex, a === He ? d[1] === "!--" ? a = fn : d[1] !== void 0 ? a = pn : d[2] !== void 0 ? (Li.test(d[2]) && (i = RegExp("</" + d[2], "g")), a = de) : d[3] !== void 0 && (a = de) : a === de ? d[0] === ">" ? (a = i ?? He, u = -1) : d[1] === void 0 ? u = -2 : (u = a.lastIndex - d[2].length, c = d[1], a = d[3] === void 0 ? de : d[3] === '"' ? bn : gn) : a === bn || a === gn ? a = de : a === fn || a === pn ? a = He : (a = de, i = void 0);
    const p = a === de && e[l + 1].startsWith("/>") ? " " : "";
    o += a === He ? s + Ns : u >= 0 ? (n.push(c), s.slice(0, u) + Mr + s.slice(u) + Y + p) : s + Y + (u === -2 ? l : p);
  }
  return [Ii(e, o + (e[r] || "<?>") + (t === 2 ? "</svg>" : "")), n];
};
class at {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let o = 0, a = 0;
    const l = t.length - 1, s = this.parts, [c, d] = Ui(t, r);
    if (this.el = at.createElement(c, n), pe.currentNode = this.el.content, r === 2) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = pe.nextNode()) !== null && s.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Mr)) {
          const f = d[a++], p = i.getAttribute(u).split(Y), y = /([.?@])?(.*)/.exec(f);
          s.push({ type: 1, index: o, name: y[2], strings: p, ctor: y[1] === "." ? Bi : y[1] === "?" ? Ki : y[1] === "@" ? Hi : pt }), i.removeAttribute(u);
        } else u.startsWith(Y) && (s.push({ type: 6, index: o }), i.removeAttribute(u));
        if (Li.test(i.tagName)) {
          const u = i.textContent.split(Y), f = u.length - 1;
          if (f > 0) {
            i.textContent = Ut ? Ut.emptyScript : "";
            for (let p = 0; p < f; p++) i.append(u[p], it()), pe.nextNode(), s.push({ type: 2, index: ++o });
            i.append(u[f], it());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ir) s.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(Y, u + 1)) !== -1; ) s.push({ type: 7, index: o }), u += Y.length - 1;
      }
      o++;
    }
  }
  static createElement(t, r) {
    const n = Oe.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Ae(e, t, r = e, n) {
  if (t === le) return t;
  let i = n !== void 0 ? r._$Co?.[n] : r._$Cl;
  const o = ot(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ??= [])[n] = i : r._$Cl = i), i !== void 0 && (t = Ae(e, i._$AS(e, t.values), i, n)), t;
}
class zi {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: n } = this._$AD, i = (t?.creationScope ?? Oe).importNode(r, !0);
    pe.currentNode = i;
    let o = pe.nextNode(), a = 0, l = 0, s = n[0];
    for (; s !== void 0; ) {
      if (a === s.index) {
        let c;
        s.type === 2 ? c = new ze(o, o.nextSibling, this, t) : s.type === 1 ? c = new s.ctor(o, s.name, s.strings, this, t) : s.type === 6 && (c = new qi(o, this, t)), this._$AV.push(c), s = n[++l];
      }
      a !== s?.index && (o = pe.nextNode(), a++);
    }
    return pe.currentNode = Oe, i;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class ze {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, n, i) {
    this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && t?.nodeType === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = Ae(this, t, r), ot(t) ? t === O || t == null || t === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : t !== this._$AH && t !== le && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ki(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== O && ot(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Oe.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = at.createElement(Ii(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(r);
    else {
      const o = new zi(i, this), a = o.u(this.options);
      o.p(r), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let r = _n.get(t.strings);
    return r === void 0 && _n.set(t.strings, r = new at(t)), r;
  }
  k(t) {
    Ri(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const o of t) i === r.length ? r.push(n = new ze(this.S(it()), this.S(it()), this, this.options)) : n = r[i], n._$AI(o), i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, i, o) {
    this.type = 1, this._$AH = O, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = O;
  }
  _$AI(t, r = this, n, i) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = Ae(this, t, r, 0), a = !ot(t) || t !== this._$AH && t !== le, a && (this._$AH = t);
    else {
      const l = t;
      let s, c;
      for (t = o[0], s = 0; s < o.length - 1; s++) c = Ae(this, l[n + s], r, s), c === le && (c = this._$AH[s]), a ||= !ot(c) || c !== this._$AH[s], c === O ? t = O : t !== O && (t += (c ?? "") + o[s + 1]), this._$AH[s] = c;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Bi extends pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === O ? void 0 : t;
  }
}
class Ki extends pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== O);
  }
}
class Hi extends pt {
  constructor(t, r, n, i, o) {
    super(t, r, n, i, o), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Ae(this, t, r, 0) ?? O) === le) return;
    const n = this._$AH, i = t === O && n !== O || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== O && (n === O || i);
    i && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class qi {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ae(this, t);
  }
}
const xs = { P: Mr, A: Y, C: Ir, M: 1, L: Ui, R: zi, D: ki, V: Ae, I: ze, H: pt, N: Ki, U: Hi, B: Bi, F: qi }, $s = Lr.litHtmlPolyfillSupport;
$s?.(at, ze), (Lr.litHtmlVersions ??= []).push("3.1.2");
const Ps = (e, t, r) => {
  const n = r?.renderBefore ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const o = r?.renderBefore ?? null;
    n._$litPart$ = i = new ze(t.insertBefore(it(), o), o, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Je = class extends De {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ps(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return le;
  }
};
Je._$litElement$ = !0, Je.finalized = !0, globalThis.litElementHydrateSupport?.({ LitElement: Je });
const Ds = globalThis.litElementPolyfillSupport;
Ds?.({ LitElement: Je });
(globalThis.litElementVersions ??= []).push("4.0.4");
class Cs extends Ss(Je) {
}
class Ts extends Cs {
  constructor() {
    super(...arguments), this.disposers = [];
  }
  /**
   * Creates a MobX reaction using the given parameters and disposes it when this element is detached.
   *
   * This should be called from `connectedCallback` to ensure that the reaction is active also if the element is attached again later.
   */
  reaction(t, r, n) {
    this.disposers.push(ci(t, r, n));
  }
  /**
   * Creates a MobX autorun using the given parameters and disposes it when this element is detached.
   *
   * This should be called from `connectedCallback` to ensure that the reaction is active also if the element is attached again later.
   */
  autorun(t, r) {
    this.disposers.push(si(t, r));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disposers.forEach((t) => {
      t();
    }), this.disposers = [];
  }
}
const gt = window.Vaadin.copilot._sectionPanelUiState;
if (!gt)
  throw new Error("Tried to access copilot section panel ui state before it was initialized.");
let ve = [];
const mn = [];
function yn(e) {
  e.init({
    addPanel: (t) => {
      gt.addPanel(t);
    },
    send(t, r) {
      ke(t, r);
    }
  });
}
function Vs() {
  ve.push(import("./copilot-log-plugin-DDSuLeuC.js")), ve.push(import("./copilot-info-plugin-unyzoAG8.js")), ve.push(import("./copilot-features-plugin-JdFJlWAm.js")), ve.push(import("./copilot-feedback-plugin-CtxrrtYy.js")), ve.push(import("./copilot-shortcuts-plugin-BmwvD2NA.js"));
}
function js() {
  {
    const e = `https://cdn.vaadin.com/copilot/${ts}/copilot-plugins.js`;
    import(
      /* @vite-ignore */
      e
    ).catch((t) => {
      console.warn(`Unable to load plugins from ${e}. Some Copilot features are unavailable.`, t);
    });
  }
}
function Rs() {
  Promise.all(ve).then(() => {
    const e = window.Vaadin;
    if (e.copilot.plugins) {
      const t = e.copilot.plugins;
      e.copilot.plugins.push = (r) => yn(r), Array.from(t).forEach((r) => {
        mn.includes(r) || (yn(r), mn.push(r));
      });
    }
  }), ve = [];
}
class ks {
  constructor() {
    this.active = !1, this.activate = () => {
      this.active = !0, this.blurActiveApplicationElement();
    }, this.deactivate = () => {
      this.active = !1;
    }, this.focusInEventListener = (t) => {
      this.active && (t.preventDefault(), t.stopPropagation(), nt(t.target) || requestAnimationFrame(() => {
        t.target.blur && t.target.blur(), document.body.querySelector("copilot-main")?.focus();
      }));
    };
  }
  hostConnectedCallback() {
    const t = this.getApplicationRootElement();
    t && t instanceof HTMLElement && t.addEventListener("focusin", this.focusInEventListener);
  }
  hostDisconnectedCallback() {
    const t = this.getApplicationRootElement();
    t && t instanceof HTMLElement && t.removeEventListener("focusin", this.focusInEventListener);
  }
  getApplicationRootElement() {
    return document.body.firstElementChild;
  }
  blurActiveApplicationElement() {
    document.activeElement && document.activeElement.blur && document.activeElement.blur();
  }
}
const Ot = new ks(), x = window.Vaadin.copilot.eventbus;
if (!x)
  throw new Error("Tried to access copilot eventbus before it was initialized.");
const qe = window.Vaadin.copilot.overlayManager, ql = {
  AddClickListener: "Add Click Listener",
  AI: "AI",
  Delete: "Delete",
  DragAndDrop: "Drag and Drop",
  Duplicate: "Duplicate",
  SetLabel: "Set label",
  SetText: "Set text",
  SetHelper: "Set helper text",
  WrapWithTag: "Wrapping with tag",
  Alignment: "Alignment",
  Padding: "Padding",
  ModifyComponentSource: "Modify component source",
  Gap: "Gap"
}, b = window.Vaadin.copilot._uiState;
if (!b)
  throw new Error("Tried to access copilot ui state before it was initialized.");
const Ur = (e, t) => {
  ke("copilot-track-event", { event: e, value: t });
};
var zr = /* @__PURE__ */ ((e) => (e.INFORMATION = "information", e.WARNING = "warning", e.ERROR = "error", e))(zr || {});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fi = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Wi = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Gi = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, r, n) {
    this._$Ct = t, this._$AM = r, this._$Ci = n;
  }
  _$AS(t, r) {
    return this.update(t, r);
  }
  update(t, r) {
    return this.render(...r);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Or = class extends Gi {
  constructor(t) {
    if (super(t), this.it = O, t.type !== Fi.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === O || t == null) return this._t = void 0, this.it = t;
    if (t === le) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const r = [t];
    return r.raw = r, this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
};
Or.directiveName = "unsafeHTML", Or.resultType = 1;
const Ls = Wi(Or);
function Xi() {
  return import("./copilot-notification-DKwsq0H1.js");
}
const Ms = (e) => {
  rr("Unspecified error", e);
}, Is = (e) => e.error ? (Us({
  error: e.error,
  message: e.errorMessage,
  stackTrace: e.errorStacktrace
}), !0) : !1, Ji = (e, t, r) => {
  Xi().then(({ showNotification: n }) => {
    n({
      type: zr.ERROR,
      message: e,
      details: as(
        zt`<vaadin-details summary="Details" style="color: var(--dev-tools-text-color)"
          ><div>
            <code class="codeblock" style="white-space: normal;color: var(--dev-tools-background-color-active)"
              ><copilot-copy></copilot-copy>${Ls(t)}</code
            >
            <vaadin-button hidden>Report this issue</vaadin-button>
          </div></vaadin-details
        >`
      ),
      delay: 3e4
    });
  }), Ur("error", `${e}
\`\`\`${r}\`\`\``), b.operationWaitsHmrUpdate = void 0;
}, Us = (e) => {
  Ji(e.error, e.message, e.stackTrace);
};
function zs(e, t) {
  Ji(e, t.message, t.stack || "");
}
function rr(e, t) {
  Xi().then(({ showNotification: r }) => {
    r({
      type: zr.ERROR,
      message: "Copilot internal error",
      details: e + (t ? `
${t}` : "")
    });
  }), Ur("error", `${e}
\`\`\`${t}\`\`\``);
}
const Bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  handleBrowserOperationError: zs,
  handleCopilotError: rr,
  handleErrorDuringOperation: Ms,
  handleServerOperationErrorIfNeeded: Is
}, Symbol.toStringTag, { value: "Module" })), Zi = window.Vaadin.copilot._previewState;
if (!Zi)
  throw new Error("Tried to access copilot preview state before it was initialized.");
const Yi = () => {
  Ks().then((e) => b.setUserInfo(e)).catch((e) => rr("Failed to load userInfo", e));
}, Ks = async () => Ti(`${Re}get-user-info`, {}, (e) => (delete e.data.reqId, e.data)), Hs = async () => Ci(() => b.userInfo), Gl = async () => (await Hs()).vaadiner;
x.on("copilot-prokey-received", (e) => {
  Yi(), e.preventDefault();
});
function qs() {
  const e = window.navigator.userAgent;
  return e.indexOf("Windows") !== -1 ? "Windows" : e.indexOf("Mac") !== -1 ? "Mac" : e.indexOf("Linux") !== -1 ? "Linux" : null;
}
function Fs() {
  return qs() === "Mac";
}
function Ws() {
  return Fs() ? "⌘" : "Ctrl";
}
const Qi = window.Vaadin.copilot._machineState;
if (!Qi)
  throw new Error("Trying to use stored machine state before it was initialized");
function Gs(e) {
  return e.composed && e.composedPath().map((t) => t.localName).some((t) => t === "copilot-spotlight");
}
function Xs(e) {
  return e.composed && e.composedPath().map((t) => t.localName).some((t) => t === "copilot-drawer-panel" || t === "copilot-section-panel-wrapper");
}
let cr = !1, At = 0;
const wn = (e) => {
  if (Qi.isActivationShortcut())
    if (e.key === "Shift" && !e.ctrlKey && !e.altKey && !e.metaKey)
      cr = !0;
    else if (cr && e.shiftKey && (e.key === "Control" || e.key === "Meta")) {
      if (At++, At === 2) {
        b.toggleActive("shortcut");
        return;
      }
      setTimeout(() => {
        At = 0;
      }, 500);
    } else
      cr = !1, At = 0;
  b.active && Js(e);
}, Js = (e) => {
  const t = Gs(e);
  if (e.shiftKey && e.code === "Space")
    b.setSpotlightActive(!b.spotlightActive), e.stopPropagation(), e.preventDefault();
  else if (e.key === "Escape") {
    if (e.stopPropagation(), b.loginCheckActive) {
      b.setLoginCheckActive(!1);
      return;
    }
    x.emit("close-drawers", {}), b.setSpotlightActive(!1);
  } else !Xs(e) && !t && Zs(e) ? (x.emit("delete-selected", {}), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "d" && !t ? (x.emit("duplicate-selected", {}), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "b" && !t ? (x.emit("show-selected-in-ide", {}), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "z" ? b.idePluginState?.supportedActions?.find((r) => r === "undo") && (x.emit("undoRedo", { undo: !e.shiftKey }), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "c" && !t && e.composed && e.composedPath().map((r) => r.localName).some((r) => r === "copilot-component-overlay") && (x.emit("copy-selected", {}), e.preventDefault(), e.stopPropagation());
}, Zs = (e) => (e.key === "Backspace" || e.key === "Delete") && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey, ne = Ws(), Xl = {
  toggleCopilot: `<kbd>⇧</kbd> + <kbd>${ne}</kbd> <kbd>${ne}</kbd>`,
  toggleCommandWindow: "<kbd>⇧</kbd> + <kbd>Space</kbd>",
  undo: `<kbd>${ne}</kbd> + <kbd>Z</kbd>`,
  redo: `<kbd>${ne}</kbd> + <kbd>⇧</kbd> + <kbd>Z</kbd>`,
  duplicate: `<kbd>${ne}</kbd> + <kbd>D</kbd>`,
  goToSource: `<kbd>${ne}</kbd> + <kbd>B</kbd>`,
  selectParent: "<kbd>←</kbd>",
  selectPreviousSibling: "<kbd>↑</kbd>",
  selectNextSibling: "<kbd>↓</kbd>",
  delete: "<kbd>DEL</kbd>",
  copy: `<kbd>${ne}</kbd> + <kbd>C</kbd>`,
  paste: `<kbd>${ne}</kbd> + <kbd>V</kbd>`
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const eo = Symbol.for(""), Ys = (e) => {
  if (e?.r === eo) return e?._$litStatic$;
}, to = (e) => ({ _$litStatic$: e, r: eo }), En = /* @__PURE__ */ new Map(), Qs = (e) => (t, ...r) => {
  const n = r.length;
  let i, o;
  const a = [], l = [];
  let s, c = 0, d = !1;
  for (; c < n; ) {
    for (s = t[c]; c < n && (o = r[c], (i = Ys(o)) !== void 0); ) s += i + t[++c], d = !0;
    c !== n && l.push(o), a.push(s), c++;
  }
  if (c === n && a.push(t[n]), d) {
    const u = a.join("$$lit$$");
    (t = En.get(u)) === void 0 && (a.raw = a, En.set(u, t = a)), r = l;
  }
  return e(t, ...r);
}, Bt = Qs(zt);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: el } = xs, On = () => document.createComment(""), Fe = (e, t, r) => {
  const n = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
  if (r === void 0) {
    const o = n.insertBefore(On(), i), a = n.insertBefore(On(), i);
    r = new el(o, a, e, e.options);
  } else {
    const o = r._$AB.nextSibling, a = r._$AM, l = a !== e;
    if (l) {
      let s;
      r._$AQ?.(e), r._$AM = e, r._$AP !== void 0 && (s = e._$AU) !== a._$AU && r._$AP(s);
    }
    if (o !== i || l) {
      let s = r._$AA;
      for (; s !== o; ) {
        const c = s.nextSibling;
        n.insertBefore(s, i), s = c;
      }
    }
  }
  return r;
}, he = (e, t, r = e) => (e._$AI(t, r), e), tl = {}, rl = (e, t = tl) => e._$AH = t, nl = (e) => e._$AH, ur = (e) => {
  e._$AP?.(!1, !0);
  let t = e._$AA;
  const r = e._$AB.nextSibling;
  for (; t !== r; ) {
    const n = t.nextSibling;
    t.remove(), t = n;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const An = (e, t, r) => {
  const n = /* @__PURE__ */ new Map();
  for (let i = t; i <= r; i++) n.set(e[i], i);
  return n;
}, ro = Wi(class extends Gi {
  constructor(e) {
    if (super(e), e.type !== Fi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, r) {
    let n;
    r === void 0 ? r = t : t !== void 0 && (n = t);
    const i = [], o = [];
    let a = 0;
    for (const l of e) i[a] = n ? n(l, a) : a, o[a] = r(l, a), a++;
    return { values: o, keys: i };
  }
  render(e, t, r) {
    return this.dt(e, t, r).values;
  }
  update(e, [t, r, n]) {
    const i = nl(e), { values: o, keys: a } = this.dt(t, r, n);
    if (!Array.isArray(i)) return this.ut = a, o;
    const l = this.ut ??= [], s = [];
    let c, d, u = 0, f = i.length - 1, p = 0, y = o.length - 1;
    for (; u <= f && p <= y; ) if (i[u] === null) u++;
    else if (i[f] === null) f--;
    else if (l[u] === a[p]) s[p] = he(i[u], o[p]), u++, p++;
    else if (l[f] === a[y]) s[y] = he(i[f], o[y]), f--, y--;
    else if (l[u] === a[y]) s[y] = he(i[u], o[y]), Fe(e, s[y + 1], i[u]), u++, y--;
    else if (l[f] === a[p]) s[p] = he(i[f], o[p]), Fe(e, i[u], i[f]), f--, p++;
    else if (c === void 0 && (c = An(a, p, y), d = An(l, u, f)), c.has(l[u])) if (c.has(l[f])) {
      const m = d.get(a[p]), S = m !== void 0 ? i[m] : null;
      if (S === null) {
        const F = Fe(e, i[u]);
        he(F, o[p]), s[p] = F;
      } else s[p] = he(S, o[p]), Fe(e, i[u], S), i[m] = null;
      p++;
    } else ur(i[f]), f--;
    else ur(i[u]), u++;
    for (; p <= y; ) {
      const m = Fe(e, s[y + 1]);
      he(m, o[p]), s[p++] = m;
    }
    for (; u <= f; ) {
      const m = i[u++];
      m !== null && ur(m);
    }
    return this.ut = a, rl(e, s), le;
  }
}), Pt = /* @__PURE__ */ new Map(), il = (e) => {
  const r = gt.panels.filter((n) => !n.floating && n.panel === e).sort((n, i) => n.panelOrder - i.panelOrder);
  return Bt`
    ${ro(
    r,
    (n) => n.tag,
    (n) => {
      const i = to(n.tag);
      return Bt`
                        <copilot-section-panel-wrapper panelTag="${i}">
                            <${i} slot="content"></${i}>
                        </copilot-section-panel-wrapper>`;
    }
  )}
  `;
}, ol = () => {
  const e = gt.panels;
  return Bt`
    ${ro(
    e.filter((t) => t.floating),
    (t) => t.tag,
    (t) => {
      const r = to(t.tag);
      return Bt`
                        <copilot-section-panel-wrapper panelTag="${r}">
                            <${r} slot="content"></${r}>
                        </copilot-section-panel-wrapper>`;
    }
  )}
  `;
}, Jl = (e) => {
  const t = e.panelTag, r = e.querySelector('[slot="content"]');
  r && Pt.set(t, r);
}, Zl = (e) => {
  if (Pt.has(e.panelTag)) {
    const t = Pt.get(e.panelTag);
    e.querySelector('[slot="content"]').replaceWith(t);
  }
  Pt.delete(e.panelTag);
};
var N = [];
for (var dr = 0; dr < 256; ++dr)
  N.push((dr + 256).toString(16).slice(1));
function al(e, t = 0) {
  return (N[e[t + 0]] + N[e[t + 1]] + N[e[t + 2]] + N[e[t + 3]] + "-" + N[e[t + 4]] + N[e[t + 5]] + "-" + N[e[t + 6]] + N[e[t + 7]] + "-" + N[e[t + 8]] + N[e[t + 9]] + "-" + N[e[t + 10]] + N[e[t + 11]] + N[e[t + 12]] + N[e[t + 13]] + N[e[t + 14]] + N[e[t + 15]]).toLowerCase();
}
var St, sl = new Uint8Array(16);
function ll() {
  if (!St && (St = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !St))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return St(sl);
}
var cl = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const Sn = {
  randomUUID: cl
};
function ul(e, t, r) {
  if (Sn.randomUUID && !t && !e)
    return Sn.randomUUID();
  e = e || {};
  var n = e.random || (e.rng || ll)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, t) {
    r = r || 0;
    for (var i = 0; i < 16; ++i)
      t[r + i] = n[i];
    return t;
  }
  return al(n);
}
const Dt = [], We = [], Yl = async (e, t, r) => {
  let n, i;
  t.reqId = ul();
  const o = new Promise((a, l) => {
    n = a, i = l;
  });
  return Dt.push({
    handleMessage(a) {
      if (a?.data?.reqId !== t.reqId)
        return !1;
      try {
        n(r(a));
      } catch (l) {
        i(l.toString());
      }
      return !0;
    }
  }), ke(e, t), o;
};
function dl(e) {
  for (const t of Dt)
    if (t.handleMessage(e))
      return Dt.splice(Dt.indexOf(t), 1), !0;
  if (x.emitUnsafe({ type: e.command, data: e.data }))
    return !0;
  for (const t of io())
    if (no(t, e))
      return !0;
  return We.push(e), !1;
}
function no(e, t) {
  return e.handleMessage?.call(e, t);
}
function hl() {
  if (We.length)
    for (const e of io())
      for (let t = 0; t < We.length; t++)
        no(e, We[t]) && (We.splice(t, 1), t--);
}
function io() {
  const e = document.querySelector("copilot-main");
  return e ? e.renderRoot.querySelectorAll("copilot-section-panel-wrapper *") : [];
}
const vl = ":host{--gray-h: 220;--gray-s: 30%;--gray-l: 30%;--gray-hsl: var(--gray-h) var(--gray-s) var(--gray-l);--gray: hsl(var(--gray-hsl));--gray-50: hsl(var(--gray-hsl) / .05);--gray-100: hsl(var(--gray-hsl) / .1);--gray-150: hsl(var(--gray-hsl) / .16);--gray-200: hsl(var(--gray-hsl) / .24);--gray-250: hsl(var(--gray-hsl) / .34);--gray-300: hsl(var(--gray-hsl) / .46);--gray-350: hsl(var(--gray-hsl) / .6);--gray-400: hsl(var(--gray-hsl) / .7);--gray-450: hsl(var(--gray-hsl) / .8);--gray-500: hsl(var(--gray-hsl) / .9);--gray-550: hsl(var(--gray-hsl));--gray-600: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 2%));--gray-650: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 4%));--gray-700: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 8%));--gray-750: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 12%));--gray-800: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 20%));--gray-850: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 23%));--gray-900: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 30%));--blue-h: 220;--blue-s: 90%;--blue-l: 53%;--blue-hsl: var(--blue-h) var(--blue-s) var(--blue-l);--blue: hsl(var(--blue-hsl));--blue-50: hsl(var(--blue-hsl) / .05);--blue-100: hsl(var(--blue-hsl) / .1);--blue-150: hsl(var(--blue-hsl) / .2);--blue-200: hsl(var(--blue-hsl) / .3);--blue-250: hsl(var(--blue-hsl) / .4);--blue-300: hsl(var(--blue-hsl) / .5);--blue-350: hsl(var(--blue-hsl) / .6);--blue-400: hsl(var(--blue-hsl) / .7);--blue-450: hsl(var(--blue-hsl) / .8);--blue-500: hsl(var(--blue-hsl) / .9);--blue-550: hsl(var(--blue-hsl));--blue-600: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 4%));--blue-650: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 8%));--blue-700: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 12%));--blue-750: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 15%));--blue-800: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 18%));--blue-850: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 24%));--blue-900: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 27%));--purple-h: 246;--purple-s: 90%;--purple-l: 60%;--purple-hsl: var(--purple-h) var(--purple-s) var(--purple-l);--purple: hsl(var(--purple-hsl));--purple-50: hsl(var(--purple-hsl) / .05);--purple-100: hsl(var(--purple-hsl) / .1);--purple-150: hsl(var(--purple-hsl) / .2);--purple-200: hsl(var(--purple-hsl) / .3);--purple-250: hsl(var(--purple-hsl) / .4);--purple-300: hsl(var(--purple-hsl) / .5);--purple-350: hsl(var(--purple-hsl) / .6);--purple-400: hsl(var(--purple-hsl) / .7);--purple-450: hsl(var(--purple-hsl) / .8);--purple-500: hsl(var(--purple-hsl) / .9);--purple-550: hsl(var(--purple-hsl));--purple-600: hsl(var(--purple-h) calc(var(--purple-s) - 4%) calc(var(--purple-l) - 2%));--purple-650: hsl(var(--purple-h) calc(var(--purple-s) - 8%) calc(var(--purple-l) - 4%));--purple-700: hsl(var(--purple-h) calc(var(--purple-s) - 15%) calc(var(--purple-l) - 7%));--purple-750: hsl(var(--purple-h) calc(var(--purple-s) - 23%) calc(var(--purple-l) - 11%));--purple-800: hsl(var(--purple-h) calc(var(--purple-s) - 24%) calc(var(--purple-l) - 15%));--purple-850: hsl(var(--purple-h) calc(var(--purple-s) - 24%) calc(var(--purple-l) - 19%));--purple-900: hsl(var(--purple-h) calc(var(--purple-s) - 27%) calc(var(--purple-l) - 23%));--green-h: 150;--green-s: 80%;--green-l: 42%;--green-hsl: var(--green-h) var(--green-s) var(--green-l);--green: hsl(var(--green-hsl));--green-50: hsl(var(--green-hsl) / .05);--green-100: hsl(var(--green-hsl) / .1);--green-150: hsl(var(--green-hsl) / .2);--green-200: hsl(var(--green-hsl) / .3);--green-250: hsl(var(--green-hsl) / .4);--green-300: hsl(var(--green-hsl) / .5);--green-350: hsl(var(--green-hsl) / .6);--green-400: hsl(var(--green-hsl) / .7);--green-450: hsl(var(--green-hsl) / .8);--green-500: hsl(var(--green-hsl) / .9);--green-550: hsl(var(--green-hsl));--green-600: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 2%));--green-650: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 4%));--green-700: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 8%));--green-750: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 12%));--green-800: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 15%));--green-850: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 19%));--green-900: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 23%));--yellow-h: 38;--yellow-s: 98%;--yellow-l: 64%;--yellow-hsl: var(--yellow-h) var(--yellow-s) var(--yellow-l);--yellow: hsl(var(--yellow-hsl));--yellow-50: hsl(var(--yellow-hsl) / .07);--yellow-100: hsl(var(--yellow-hsl) / .12);--yellow-150: hsl(var(--yellow-hsl) / .2);--yellow-200: hsl(var(--yellow-hsl) / .3);--yellow-250: hsl(var(--yellow-hsl) / .4);--yellow-300: hsl(var(--yellow-hsl) / .5);--yellow-350: hsl(var(--yellow-hsl) / .6);--yellow-400: hsl(var(--yellow-hsl) / .7);--yellow-450: hsl(var(--yellow-hsl) / .8);--yellow-500: hsl(var(--yellow-hsl) / .9);--yellow-550: hsl(var(--yellow-hsl));--yellow-600: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 5%));--yellow-650: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 10%));--yellow-700: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 15%));--yellow-750: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 20%));--yellow-800: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 25%));--yellow-850: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 30%));--yellow-900: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 35%));--red-h: 355;--red-s: 75%;--red-l: 55%;--red-hsl: var(--red-h) var(--red-s) var(--red-l);--red: hsl(var(--red-hsl));--red-50: hsl(var(--red-hsl) / .05);--red-100: hsl(var(--red-hsl) / .1);--red-150: hsl(var(--red-hsl) / .2);--red-200: hsl(var(--red-hsl) / .3);--red-250: hsl(var(--red-hsl) / .4);--red-300: hsl(var(--red-hsl) / .5);--red-350: hsl(var(--red-hsl) / .6);--red-400: hsl(var(--red-hsl) / .7);--red-450: hsl(var(--red-hsl) / .8);--red-500: hsl(var(--red-hsl) / .9);--red-550: hsl(var(--red-hsl));--red-600: hsl(var(--red-h) calc(var(--red-s) - 5%) calc(var(--red-l) - 2%));--red-650: hsl(var(--red-h) calc(var(--red-s) - 10%) calc(var(--red-l) - 4%));--red-700: hsl(var(--red-h) calc(var(--red-s) - 15%) calc(var(--red-l) - 8%));--red-750: hsl(var(--red-h) calc(var(--red-s) - 20%) calc(var(--red-l) - 12%));--red-800: hsl(var(--red-h) calc(var(--red-s) - 25%) calc(var(--red-l) - 15%));--red-850: hsl(var(--red-h) calc(var(--red-s) - 30%) calc(var(--red-l) - 19%));--red-900: hsl(var(--red-h) calc(var(--red-s) - 35%) calc(var(--red-l) - 23%));--codeblock-bg: #f4f4f4;--vaadin-logo-blue: #00b4f0}:host(.dark){--gray-s: 15%;--gray-l: 70%;--gray-600: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 6%));--gray-650: hsl(var(--gray-h) calc(var(--gray-s) - 5%) calc(var(--gray-l) + 14%));--gray-700: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 26%));--gray-750: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 36%));--gray-800: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 48%));--gray-850: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 62%));--gray-900: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 70%));--blue-s: 90%;--blue-l: 58%;--blue-600: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 6%));--blue-650: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 12%));--blue-700: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 17%));--blue-750: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 22%));--blue-800: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 28%));--blue-850: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 35%));--blue-900: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 43%));--purple-600: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 4%));--purple-650: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 9%));--purple-700: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 12%));--purple-750: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 18%));--purple-800: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 24%));--purple-850: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 29%));--purple-900: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 33%));--green-600: hsl(calc(var(--green-h) - 1) calc(var(--green-s) - 5%) calc(var(--green-l) + 5%));--green-650: hsl(calc(var(--green-h) - 2) calc(var(--green-s) - 10%) calc(var(--green-l) + 12%));--green-700: hsl(calc(var(--green-h) - 4) calc(var(--green-s) - 15%) calc(var(--green-l) + 20%));--green-750: hsl(calc(var(--green-h) - 6) calc(var(--green-s) - 20%) calc(var(--green-l) + 29%));--green-800: hsl(calc(var(--green-h) - 8) calc(var(--green-s) - 25%) calc(var(--green-l) + 37%));--green-850: hsl(calc(var(--green-h) - 10) calc(var(--green-s) - 30%) calc(var(--green-l) + 42%));--green-900: hsl(calc(var(--green-h) - 12) calc(var(--green-s) - 35%) calc(var(--green-l) + 48%));--yellow-600: hsl(calc(var(--yellow-h) + 1) var(--yellow-s) calc(var(--yellow-l) + 4%));--yellow-650: hsl(calc(var(--yellow-h) + 2) var(--yellow-s) calc(var(--yellow-l) + 7%));--yellow-700: hsl(calc(var(--yellow-h) + 4) var(--yellow-s) calc(var(--yellow-l) + 11%));--yellow-750: hsl(calc(var(--yellow-h) + 6) var(--yellow-s) calc(var(--yellow-l) + 16%));--yellow-800: hsl(calc(var(--yellow-h) + 8) var(--yellow-s) calc(var(--yellow-l) + 20%));--yellow-850: hsl(calc(var(--yellow-h) + 10) var(--yellow-s) calc(var(--yellow-l) + 24%));--yellow-900: hsl(calc(var(--yellow-h) + 12) var(--yellow-s) calc(var(--yellow-l) + 29%));--red-600: hsl(calc(var(--red-h) - 1) calc(var(--red-s) - 5%) calc(var(--red-l) + 3%));--red-650: hsl(calc(var(--red-h) - 2) calc(var(--red-s) - 10%) calc(var(--red-l) + 7%));--red-700: hsl(calc(var(--red-h) - 4) calc(var(--red-s) - 15%) calc(var(--red-l) + 14%));--red-750: hsl(calc(var(--red-h) - 6) calc(var(--red-s) - 20%) calc(var(--red-l) + 19%));--red-800: hsl(calc(var(--red-h) - 8) calc(var(--red-s) - 25%) calc(var(--red-l) + 24%));--red-850: hsl(calc(var(--red-h) - 10) calc(var(--red-s) - 30%) calc(var(--red-l) + 30%));--red-900: hsl(calc(var(--red-h) - 12) calc(var(--red-s) - 35%) calc(var(--red-l) + 36%));--codeblock-bg: var(--gray-100)}", fl = ":host{--font-family: Inter, system-ui, ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;--monospace-font-family: Inconsolata, Monaco, Consolas, Courier New, Courier, monospace;--font-size-0: .6875rem;--font-size-1: .75rem;--font-size-2: .875rem;--font-size-3: 1rem;--font-size-4: 1.125rem;--font-size-5: 1.25rem;--font-size-6: 1.375rem;--font-size-7: 1.5rem;--line-height-1: 1.125rem;--line-height-2: 1.25rem;--line-height-3: 1.5rem;--line-height-4: 1.75rem;--line-height-5: 2rem;--line-height-6: 2.25rem;--line-height-7: 2.5rem;--font-weight-bold: 500;--font-weight-strong: 600;--font: normal 400 var(--font-size-3) / var(--line-height-3) var(--font-family);--font-bold: normal var(--font-weight-bold) var(--font-size-3) / var(--line-height-3) var(--font-family);--font-strong: normal var(--font-weight-strong) var(--font-size-3) / var(--line-height-3) var(--font-family);--font-small: normal 400 var(--font-size-2) / var(--line-height-2) var(--font-family);--font-small-bold: normal var(--font-weight-bold) var(--font-size-2) / var(--line-height-2) var(--font-family);--font-small-strong: normal var(--font-weight-strong) var(--font-size-2) / var(--line-height-2) var(--font-family);--font-xsmall: normal 400 var(--font-size-1) / var(--line-height-1) var(--font-family);--font-xsmall-bold: normal var(--font-weight-bold) var(--font-size-1) / var(--line-height-1) var(--font-family);--font-xsmall-strong: normal var(--font-weight-strong) var(--font-size-1) / var(--line-height-1) var(--font-family);--font-button: normal var(--font-weight-bold) var(--font-size-1) / var(--line-height-1) var(--font-family);--font-tooltip: normal var(--font-weight-bold) var(--font-size-1) / var(--line-height-2) var(--font-family);--radius-1: .1875rem;--radius-2: .375rem;--radius-3: .75rem;--space-25: 2px;--space-50: 4px;--space-75: 6px;--space-100: 8px;--space-150: 12px;--space-200: 16px;--space-300: 24px;--space-400: 32px;--space-500: 40px;--space-600: 48px;--space-700: 56px;--space-800: 64px;--space-900: 72px;--z-index-component-selector: 100;--z-index-floating-panel: 101;--z-index-drawer: 150;--z-index-opened-drawer: 151;--z-index-spotlight: 200;--z-index-popover: 300;--z-index-activation-button: 1000;--duration-1: .1s;--duration-2: .2s;--duration-3: .3s;--duration-4: .4s;--button-background: var(--gray-100);--button-background-hover: var(--gray-150)}:host{--lumo-font-family: var(--font-family);--lumo-font-size-xs: var(--font-size-1);--lumo-font-size-s: var(--font-size-2);--lumo-font-size-m: var(--font-size-3);--lumo-font-size-l: var(--font-size-4);--lumo-font-size-xl: var(--font-size-5);--lumo-font-size-xxl: var(--font-size-6);--lumo-font-size-xxxl: var(--font-size-7);--lumo-line-height-s: var(--line-height-2);--lumo-line-height-m: var(--line-height-3);--lumo-line-height-l: var(--line-height-4);--lumo-border-radius-s: var(--radius-1);--lumo-border-radius-m: var(--radius-2);--lumo-border-radius-l: var(--radius-3);--lumo-base-color: var(--surface-0);--lumo-body-text-color: var(--color-high-contrast);--lumo-header-text-color: var(--color-high-contrast);--lumo-secondary-text-color: var(--color);--lumo-tertiary-text-color: var(--color);--lumo-error-text-color: var(--color-danger);--lumo-primary-text-color: var(--color-high-contrast);--lumo-primary-color: var(--background-button-primary);--lumo-primary-color-50pct: var(--color-accent);--lumo-primary-contrast-color: var(--lumo-secondary-text-color);--lumo-space-xs: var(--space-50);--lumo-space-s: var(--space-100);--lumo-space-m: var(--space-200);--lumo-space-l: var(--space-300);--lumo-space-xl: var(--space-500);--lumo-icon-size-xs: var(--font-size-1);--lumo-icon-size-s: var(--font-size-2);--lumo-icon-size-m: var(--font-size-3);--lumo-icon-size-l: var(--font-size-4);--lumo-icon-size-xl: var(--font-size-5)}:host{color-scheme:light;--surface-0: hsl(var(--gray-h) var(--gray-s) 90% / .8);--surface-1: hsl(var(--gray-h) var(--gray-s) 95% / .8);--surface-2: hsl(var(--gray-h) var(--gray-s) 100% / .8);--surface-background: linear-gradient( hsl(var(--gray-h) var(--gray-s) 95% / .7), hsl(var(--gray-h) var(--gray-s) 95% / .65) );--surface-glow: radial-gradient(circle at 30% 0%, hsl(var(--gray-h) var(--gray-s) 98% / .7), transparent 50%);--surface-border-glow: radial-gradient(at 50% 50%, hsl(var(--purple-h) 90% 90% / .8) 0, transparent 50%);--surface: var(--surface-glow) no-repeat border-box, var(--surface-background) no-repeat padding-box, hsl(var(--gray-h) var(--gray-s) 98% / .2);--surface-with-border-glow: var(--surface-glow) no-repeat border-box, var(--surface-background) no-repeat padding-box, var(--surface-border-glow) no-repeat border-box 0 0 / var(--glow-size, 600px) var(--glow-size, 600px);--surface-border-color: hsl(var(--gray-h) var(--gray-s) 100% / .7);--surface-backdrop-filter: blur(10px);--surface-box-shadow-1: 0 0 0 .5px hsl(var(--gray-h) var(--gray-s) 5% / .15), 0 6px 12px -1px hsl(var(--shadow-hsl) / .3);--surface-box-shadow-2: 0 0 0 .5px hsl(var(--gray-h) var(--gray-s) 5% / .15), 0 24px 40px -4px hsl(var(--shadow-hsl) / .4);--background-button: linear-gradient( hsl(var(--gray-h) var(--gray-s) 98% / .4), hsl(var(--gray-h) var(--gray-s) 90% / .2) );--background-button-active: hsl(var(--gray-h) var(--gray-s) 80% / .2);--color: var(--gray-500);--color-high-contrast: var(--gray-900);--color-accent: var(--purple-700);--color-danger: var(--red-700);--border-color: var(--gray-150);--border-color-high-contrast: var(--gray-300);--border-color-button: var(--gray-350);--border-color-popover: hsl(var(--gray-hsl) / .08);--border-color-dialog: hsl(var(--gray-hsl) / .08);--accent-color: var(--purple-600);--selection-color: hsl(var(--blue-hsl));--shadow-hsl: var(--gray-h) var(--gray-s) 20%;--lumo-contrast-5pct: var(--gray-100);--lumo-contrast-10pct: var(--gray-200);--lumo-contrast-60pct: var(--gray-400);--lumo-contrast-80pct: var(--gray-600);--lumo-contrast-90pct: var(--gray-800);--card-bg: rgba(255, 255, 255, .5);--card-hover-bg: rgba(255, 255, 255, .65);--card-open-bg: rgba(255, 255, 255, .8);--card-border: 1px solid rgba(0, 50, 100, .15);--card-open-shadow: 0px 1px 4px -1px rgba(28, 52, 84, .26);--card-section-border: var(--card-border);--card-field-bg: var(--lumo-contrast-5pct)}:host(.dark){color-scheme:dark;--surface-0: hsl(var(--gray-h) var(--gray-s) 10% / .85);--surface-1: hsl(var(--gray-h) var(--gray-s) 14% / .85);--surface-2: hsl(var(--gray-h) var(--gray-s) 18% / .85);--surface-background: linear-gradient( hsl(var(--gray-h) var(--gray-s) 8% / .65), hsl(var(--gray-h) var(--gray-s) 8% / .7) );--surface-glow: radial-gradient( circle at 30% 0%, hsl(var(--gray-h) calc(var(--gray-s) * 2) 90% / .12), transparent 50% );--surface: var(--surface-glow) no-repeat border-box, var(--surface-background) no-repeat padding-box, hsl(var(--gray-h) var(--gray-s) 20% / .4);--surface-border-glow: hsl(var(--gray-h) var(--gray-s) 20% / .4) radial-gradient(at 50% 50%, hsl(250 40% 80% / .4) 0, transparent 50%);--surface-border-color: hsl(var(--gray-h) var(--gray-s) 50% / .2);--surface-box-shadow-1: 0 0 0 .5px hsl(var(--purple-h) 40% 5% / .4), 0 6px 12px -1px hsl(var(--shadow-hsl) / .4);--surface-box-shadow-2: 0 0 0 .5px hsl(var(--purple-h) 40% 5% / .4), 0 24px 40px -4px hsl(var(--shadow-hsl) / .5);--color: var(--gray-650);--background-button: linear-gradient( hsl(var(--gray-h) calc(var(--gray-s) * 2) 80% / .1), hsl(var(--gray-h) calc(var(--gray-s) * 2) 80% / 0) );--background-button-active: hsl(var(--gray-h) var(--gray-s) 10% / .1);--border-color-popover: hsl(var(--gray-h) var(--gray-s) 90% / .1);--border-color-dialog: hsl(var(--gray-h) var(--gray-s) 90% / .1);--shadow-hsl: 0 0% 0%;--lumo-disabled-text-color: var(--lumo-contrast-60pct);--card-bg: rgba(255, 255, 255, .05);--card-hover-bg: rgba(255, 255, 255, .065);--card-open-bg: rgba(255, 255, 255, .1);--card-border: 1px solid rgba(255, 255, 255, .11);--card-open-shadow: 0px 1px 4px -1px rgba(0, 0, 0, .26);--card-section-border: var(--card-border);--card-field-bg: var(--lumo-contrast-10pct)}", pl = "button{-webkit-appearance:none;appearance:none;background:var(--background-button);background-origin:border-box;font:var(--font-button);color:var(--color-high-contrast);border:1px solid var(--border-color);border-radius:var(--radius-2);padding:var(--space-25) var(--space-100)}button:focus-visible{outline:2px solid var(--blue-500);outline-offset:2px}button:active:not(:disabled){background:var(--background-button-active)}button:disabled{color:var(--gray-400);background:transparent}", gl = ":is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay){z-index:var(--z-index-popover)}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay):first-of-type{padding-top:0}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay)::part(overlay){color:inherit;font:inherit;background:var(--surface);-webkit-backdrop-filter:var(--surface-backdrop-filter);backdrop-filter:var(--surface-backdrop-filter);border-radius:var(--radius-2);border:1px solid var(--surface-border-color);box-shadow:var(--surface-box-shadow-1)}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay)::part(content){padding:var(--space-50)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item){color:var(--color-high-contrast);font:var(--font-small);display:flex;align-items:center;cursor:default;padding:var(--space-75) var(--space-100);min-height:0;border-radius:var(--radius-1);--_lumo-item-selected-icon-display: none}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item)[disabled],:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item)[disabled] .hint,:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item)[disabled] vaadin-icon{color:var(--lumo-disabled-text-color)}:is(vaadin-context-menu-item,vaadin-menu-bar-item)[expanded]{background:var(--gray-200)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item):not([disabled]):hover{background:var(--color-high-contrast);color:var(--surface-2);--lumo-tertiary-text-color: var(--surface-2);--color: currentColor;--border-color: var(--surface-0)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item)[focus-ring]{outline:2px solid var(--selection-color);outline-offset:-2px}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item):is([aria-haspopup=true]):after{margin-inline-end:calc(var(--space-200) * -1);margin-right:unset}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item).danger{color:var(--color-danger);--color: currentColor}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item).danger:not([disabled]):hover{background-color:var(--color-danger)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item)::part(content){display:flex;align-items:center;gap:var(--space-100)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item) vaadin-icon{width:1em;height:1em;padding:0;color:var(--color)}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay) hr{margin:var(--space-50)}:is(vaadin-context-menu-item,vaadin-select-item,vaadin-menu-bar-item) .label{padding-inline-end:var(--space-300)}:is(vaadin-context-menu-item,vaadin-select-item,vaadin-menu-bar-item) .hint{margin-inline-start:auto;color:var(--color)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item) kbd{display:inline-block;border-radius:var(--radius-1);border:1px solid var(--border-color);min-width:1em;min-height:1em;text-align:center;margin:0 .1em;padding:.1em .25em;box-sizing:border-box;font-size:var(--font-size-1);font-family:var(--font-family);line-height:1}:is(copilot-alignment-overlay)::part(content){padding:0}:is(.padding-values-overlay){--lumo-base-color: var(--selection-color);--color-high-contrast: white}:is(.padding-values-overlay) vaadin-combo-box-item:hover{color:#272c35d9}", bl = "code.codeblock{background:var(--codeblock-bg);border-radius:var(--radius-2);display:block;font-family:var(--monospace-font-family);font-size:var(--font-size-1);line-height:var(--line-height-1);overflow:hidden;padding:.3125rem 1.75rem .3125rem var(--space-100);position:relative;text-overflow:ellipsis;white-space:pre}copilot-copy{position:absolute;right:0;top:0}copilot-copy button{align-items:center;background:none;border:1px solid transparent;border-radius:var(--radius-2);color:var(--color);display:flex;font:var(--font-button);height:1.75rem;justify-content:center;padding:0;width:1.75rem}copilot-copy button:hover{color:var(--color-high-contrast)}", _l = "vaadin-dialog-overlay::part(overlay){background:#fff}vaadin-dialog-overlay::part(content){background:var(--surface);font:var(--font-xsmall);padding:var(--space-300)}vaadin-dialog-overlay::part(header){background:var(--surface);font:var(--font-xsmall-strong);border-bottom:1px solid var(--border-color);padding:var(--space-100) var(--space-150)}vaadin-dialog-overlay::part(footer){background:var(--surface);padding:var(--space-150)}vaadin-dialog-overlay::part(header-content){display:flex;line-height:normal;justify-content:space-between;width:100%;align-items:center}vaadin-dialog-overlay [slot=header-content] h2{margin:0;padding:0;font:var(--font-small-bold)}vaadin-dialog-overlay [slot=header-content] .close{line-height:0}vaadin-dialog-overlay{--vaadin-button-font-size: var(--font-size-1);--vaadin-button-height: var(--line-height-4)}vaadin-dialog-overlay vaadin-button[theme~=primary]{background-color:hsl(var(--blue-hsl))}vaadin-dialog-overlay a svg{height:12px;width:12px}.dialog-footer vaadin-button{--vaadin-button-primary-background: var(--button-background);--vaadin-button-border-radius: var(--radius-1);--vaadin-button-primary-text-color: var(--color-high-contrast);--vaadin-button-height: var(--line-height-5);font:var(--font-small-bold)}.dialog-footer vaadin-button span[slot=suffix]{display:flex}.dialog-footer vaadin-button span[slot=suffix] svg{height:14px;width:14px}", ml = ":host{--vaadin-input-field-label-font-size: var(--font-size-1);--vaadin-select-label-font-size: var(--font-size-1);--vaadin-input-field-helper-font-size: var(--font-size-0);--vaadin-button-font-size: var(--font-size-2);--vaadin-checkbox-label-font-size: var(--font-size-1);--vaadin-input-field-background: var(--lumo-contrast-10pct);--vaadin-input-field-height: 26px;--vaadin-input-field-value-font-size: var(--font-xsmall)}";
var Ql = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function yl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function ec(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var Br = { exports: {} };
function oo(e, t = 100, r = {}) {
  if (typeof e != "function")
    throw new TypeError(`Expected the first parameter to be a function, got \`${typeof e}\`.`);
  if (t < 0)
    throw new RangeError("`wait` must not be negative.");
  const { immediate: n } = typeof r == "boolean" ? { immediate: r } : r;
  let i, o, a, l, s;
  function c() {
    const f = i, p = o;
    return i = void 0, o = void 0, s = e.apply(f, p), s;
  }
  function d() {
    const f = Date.now() - l;
    f < t && f >= 0 ? a = setTimeout(d, t - f) : (a = void 0, n || (s = c()));
  }
  const u = function(...f) {
    if (i && this !== i)
      throw new Error("Debounced method called with different contexts.");
    i = this, o = f, l = Date.now();
    const p = n && !a;
    return a || (a = setTimeout(d, t)), p && (s = c()), s;
  };
  return u.clear = () => {
    a && (clearTimeout(a), a = void 0);
  }, u.flush = () => {
    a && u.trigger();
  }, u.trigger = () => {
    s = c(), u.clear();
  }, u;
}
Br.exports.debounce = oo;
Br.exports = oo;
var wl = Br.exports;
const El = /* @__PURE__ */ yl(wl);
class Ol {
  constructor() {
    this.documentActive = !0, this.addListeners = () => {
      window.addEventListener("pageshow", this.handleWindowVisibilityChange), window.addEventListener("pagehide", this.handleWindowVisibilityChange), window.addEventListener("focus", this.handleWindowFocusChange), window.addEventListener("blur", this.handleWindowFocusChange), document.addEventListener("visibilitychange", this.handleDocumentVisibilityChange);
    }, this.removeListeners = () => {
      window.removeEventListener("pageshow", this.handleWindowVisibilityChange), window.removeEventListener("pagehide", this.handleWindowVisibilityChange), window.removeEventListener("focus", this.handleWindowFocusChange), window.removeEventListener("blur", this.handleWindowFocusChange), document.removeEventListener("visibilitychange", this.handleDocumentVisibilityChange);
    }, this.handleWindowVisibilityChange = (t) => {
      t.type === "pageshow" ? this.dispatch(!0) : this.dispatch(!1);
    }, this.handleWindowFocusChange = (t) => {
      t.type === "focus" ? this.dispatch(!0) : this.dispatch(!1);
    }, this.handleDocumentVisibilityChange = () => {
      this.dispatch(!document.hidden);
    }, this.dispatch = (t) => {
      if (t !== this.documentActive) {
        const r = window.Vaadin.copilot.eventbus;
        this.documentActive = t, r.emit("document-activation-change", { active: this.documentActive });
      }
    };
  }
  copilotActivated() {
    this.addListeners();
  }
  copilotDeactivated() {
    this.removeListeners();
  }
}
const Nn = new Ol();
var Al = Object.defineProperty, Sl = Object.getOwnPropertyDescriptor, Nl = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Sl(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, r, i) : a(i)) || i);
  return n && i && Al(t, r, i), i;
};
let xn = class extends Ts {
  constructor() {
    super(...arguments), this.removers = [], this.initialized = !1, this.toggleOperationInProgressAttr = () => {
      this.toggleAttribute("operation-in-progress", b.operationWaitsHmrUpdate !== void 0);
    }, this.operationInProgressCursorUpdateDebounceFunc = El(this.toggleOperationInProgressAttr, 500), this.overlayOutsideClickListener = (e) => {
      nt(e.target?.owner) || (b.active || nt(e.detail.sourceEvent.target)) && e.preventDefault();
    };
  }
  static get styles() {
    return [
      ie(vl),
      ie(fl),
      ie(pl),
      ie(gl),
      ie(bl),
      ie(_l),
      ie(ml),
      fs`
        :host {
          position: fixed;
          inset: 0;
          z-index: 9999;
          contain: strict;
          font: var(--font-small);
          color: var(--color);
          pointer-events: all;
          cursor: var(--cursor, default);
        }

        :host([operation-in-progress]) {
          --cursor: wait;
          --lumo-clickable-cursor: wait;
        }

        :host(:not([active])) {
          visibility: hidden !important;
          pointer-events: none;
        }

        /* Hide floating panels when not active */

        :host(:not([active])) > copilot-section-panel-wrapper {
          display: none !important;
        }

        /* Keep activation button and menu visible */

        copilot-activation-button,
        .activation-button-menu {
          visibility: visible;
        }

        copilot-activation-button {
          pointer-events: auto;
        }

        a {
          color: var(--blue-600);
          text-decoration-color: var(--blue-200);
        }

        :host([user-select-none]) {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Needed to prevent a JS error because of monkey patched '_attachOverlay'. It is some scope issue, */
        /* where 'this._placeholder.parentNode' is undefined - the scope if 'this' gets messed up at some point. */
        /* We also don't want animations on the overlays to make the feel faster, so this is fine. */

        :is(
            vaadin-context-menu-overlay,
            vaadin-menu-bar-overlay,
            vaadin-select-overlay,
            vaadin-combo-box-overlay,
            vaadin-tooltip-overlay
          ):is([opening], [closing]),
        :is(
            vaadin-context-menu-overlay,
            vaadin-menu-bar-overlay,
            vaadin-select-overlay,
            vaadin-combo-box-overlay,
            vaadin-tooltip-overlay
          )::part(overlay) {
          animation: none !important;
        }

        :host(:not([active])) copilot-drawer-panel::before {
          animation: none;
        }

        /* Workaround for https://github.com/vaadin/web-components/issues/5400 */

        :host([active]) .activation-button-menu .activate,
        :host(:not([active])) .activation-button-menu .deactivate,
        :host(:not([active])) .activation-button-menu .toggle-spotlight {
          display: none;
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.init().catch((e) => rr("Unable to initialize copilot", e));
  }
  async init() {
    if (this.initialized)
      return;
    await window.Vaadin.copilot._machineState.initializer.promise, document.body.style.setProperty("--dev-tools-button-display", "none"), await import("./copilot-global-vars-later-CmTog5Oe.js"), await import("./copilot-init-step2-BX-9Rj17.js"), Vs(), this.tabIndex = 0, Ot.hostConnectedCallback(), window.addEventListener("keydown", wn), x.onSend(this.handleSendEvent), this.removers.push(x.on("close-drawers", this.closeDrawers.bind(this))), this.removers.push(
      x.on("open-attention-required-drawer", this.openDrawerIfPanelRequiresAttention.bind(this))
    ), this.removers.push(
      x.on("set-pointer-events", (t) => {
        this.style.pointerEvents = t.detail.enable ? "" : "none";
      })
    ), this.addEventListener("mousemove", this.mouseMoveListener), this.addEventListener("dragover", this.mouseMoveListener), qe.addOverlayOutsideClickEvent();
    const e = window.matchMedia("(prefers-color-scheme: dark)");
    this.classList.toggle("dark", e.matches), e.addEventListener("change", (t) => {
      this.classList.toggle("dark", e.matches);
    }), this.reaction(
      () => b.spotlightActive,
      () => {
        be.saveSpotlightActivation(b.spotlightActive), Array.from(this.shadowRoot.querySelectorAll("copilot-section-panel-wrapper")).filter((t) => t.panelInfo?.floating === !0).forEach((t) => {
          b.spotlightActive ? t.style.setProperty("display", "none") : t.style.removeProperty("display");
        });
      }
    ), this.reaction(
      () => b.active,
      () => {
        this.toggleAttribute("active", b.active), b.active ? this.activate() : this.deactivate(), be.saveCopilotActivation(b.active);
      }
    ), this.reaction(
      () => b.activatedAtLeastOnce,
      () => {
        Yi(), js();
      }
    ), this.reaction(
      () => b.sectionPanelDragging,
      () => {
        b.sectionPanelDragging && Array.from(this.shadowRoot.children).filter((r) => r.localName.endsWith("-overlay")).forEach((r) => {
          r.close && r.close();
        });
      }
    ), this.reaction(
      () => b.operationWaitsHmrUpdate,
      () => {
        b.operationWaitsHmrUpdate ? this.operationInProgressCursorUpdateDebounceFunc() : (this.operationInProgressCursorUpdateDebounceFunc.clear(), this.toggleOperationInProgressAttr());
      }
    ), be.getCopilotActivation() && jr().then(() => {
      b.setActive(!0, "restore");
    }), this.removers.push(
      x.on("user-select", (t) => {
        const { allowSelection: r } = t.detail;
        this.toggleAttribute("user-select-none", !r);
      })
    ), this.initialized = !0;
  }
  /**
   * Called when Copilot is activated. Good place to start attach listeners etc.
   */
  activate() {
    Ur("activate"), Ot.activate(), Nn.copilotActivated(), Rs(), this.openDrawerIfPanelRequiresAttention(), document.documentElement.addEventListener("mouseleave", this.mouseLeaveListener), qe.onCopilotActivation(), x.emit("component-tree-updated", {}), Zi.loadPreviewConfiguration();
  }
  /**
   * Called when Copilot is deactivated. Good place to remove listeners etc.
   */
  deactivate() {
    this.closeDrawers(), Ot.deactivate(), Nn.copilotDeactivated(), document.documentElement.removeEventListener("mouseleave", this.mouseLeaveListener), qe.onCopilotDeactivation();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Ot.hostDisconnectedCallback(), window.removeEventListener("keydown", wn), x.offSend(this.handleSendEvent), this.removers.forEach((e) => e()), this.removeEventListener("mousemove", this.mouseMoveListener), this.removeEventListener("dragover", this.mouseMoveListener), qe.removeOverlayOutsideClickEvent(), document.documentElement.removeEventListener("vaadin-overlay-outside-click", this.overlayOutsideClickListener);
  }
  handleSendEvent(e) {
    const t = e.detail.command, r = e.detail.data;
    ke(t, r);
  }
  /**
   * Opens the attention required drawer if there is any.
   */
  openDrawerIfPanelRequiresAttention() {
    const e = gt.getAttentionRequiredPanelConfiguration();
    if (!e)
      return;
    const t = e.panel;
    if (!t || e.floating)
      return;
    const r = this.shadowRoot.querySelector(`copilot-drawer-panel[position="${t}"]`);
    r.opened = !0;
  }
  render() {
    return zt`
      <copilot-activation-button
        @activation-btn-clicked="${() => {
      b.toggleActive("button"), b.setLoginCheckActive(!1);
    }}"
        @spotlight-activation-changed="${(e) => {
      b.setSpotlightActive(e.detail);
    }}"
        .spotlightOn="${b.spotlightActive}">
      </copilot-activation-button>
      <copilot-component-selector></copilot-component-selector>
      <copilot-label-editor-container></copilot-label-editor-container>
      <copilot-info-tooltip></copilot-info-tooltip>
      ${this.renderDrawer("left")} ${this.renderDrawer("right")} ${this.renderDrawer("bottom")} ${ol()}
      <copilot-spotlight ?active=${b.spotlightActive && b.active}></copilot-spotlight>
      <copilot-login-check ?active=${b.loginCheckActive && b.active}></copilot-login-check>
      <copilot-notifications-container></copilot-notifications-container>
    `;
  }
  renderDrawer(e) {
    return zt` <copilot-drawer-panel no-transition position=${e}>
      ${il(e)}
    </copilot-drawer-panel>`;
  }
  /**
   * Closes the open drawers if any opened unless an overlay is opened from drawer.
   */
  closeDrawers() {
    const e = this.shadowRoot.querySelectorAll(`${Re}drawer-panel`);
    if (!Array.from(e).some((o) => o.opened))
      return;
    const r = Array.from(this.shadowRoot.children).find(
      (o) => o.localName.endsWith("overlay")
    ), n = r && qe.getOwner(r);
    if (!n) {
      e.forEach((o) => {
        o.opened = !1;
      });
      return;
    }
    const i = ns(n, "copilot-drawer-panel");
    if (!i) {
      e.forEach((o) => {
        o.opened = !1;
      });
      return;
    }
    Array.from(e).filter((o) => o.position !== i.position).forEach((o) => {
      o.opened = !1;
    });
  }
  updated(e) {
    super.updated(e), this.attachActivationButtonToBody(), hl();
  }
  attachActivationButtonToBody() {
    const e = document.body.querySelectorAll("copilot-activation-button");
    e.length > 1 && e[0].remove();
  }
  mouseMoveListener(e) {
    e.composedPath().find((t) => t.localName === `${Re}drawer-panel`) || this.closeDrawers();
  }
  mouseLeaveListener() {
    x.emit("close-drawers", {});
  }
};
xn = Nl([
  vs("copilot-main")
], xn);
const xl = window.Vaadin, $l = {
  init(e) {
    Di(
      () => window.Vaadin.devTools,
      (t) => {
        const r = t.handleFrontendMessage;
        t.handleFrontendMessage = (n) => {
          dl(n) || r.call(t, n);
        };
      }
    );
  }
};
xl.devToolsPlugins.push($l);
customElements.whenDefined("vaadin-dev-tools").then(() => {
  const e = window, t = e.Vaadin.devTools.frontendConnection.onReload;
  e.Vaadin.devTools.frontendConnection.onReload = () => {
    t(), e.Vaadin.copilot.eventbus.emit("java-after-update", {});
  };
});
export {
  Dl as A,
  Zl as B,
  be as C,
  Ls as D,
  bl as E,
  pl as F,
  Ll as G,
  zr as H,
  Ur as I,
  Ml as J,
  ss as K,
  er as L,
  Ts as M,
  Gl as N,
  ql as O,
  Re as P,
  Cl as Q,
  Er as R,
  ji as S,
  O as T,
  Kl as U,
  Tl as V,
  yl as a,
  x as b,
  Ql as c,
  Ti as d,
  b as e,
  kl as f,
  ec as g,
  rr as h,
  jl as i,
  Il as j,
  Yl as k,
  gt as l,
  Vl as m,
  fs as n,
  Qi as o,
  Rl as p,
  Je as q,
  ie as r,
  ke as s,
  vs as t,
  Xl as u,
  ul as v,
  Pl as w,
  zt as x,
  El as y,
  Jl as z
};
