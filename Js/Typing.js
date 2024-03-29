! function() {
    function n() {
        u(), t()
    }

    function t() {
        window.addEventListener ? window.addEventListener("message", l, !1) : window.attachEvent("onmessage", l)
    }

    function e(n) {
        var t;
        try {
            t = {}.toString.call(n)
        } catch (n) {
            t = "[object Object]"
        }
        return t
    }

    function o(n) {
        return !!(n && "object" == typeof n && "nodeType" in n && 1 === n.nodeType && n.outerHTML)
    }

    function r(n, t) {
        return n.toLowerCase() < t.toLowerCase() ? -1 : 1
    }

    function c(n) {
        if (null === n || "undefined" == typeof n) return 1;
        var t, o = e(n);
        if ("[object Number]" === o || "[object Boolean]" === o || "[object String]" === o) return 1;
        if ("[object Function]" === o || "[object global]" === o) return 2;
        if ("[object Object]" === o) {
            var r = Object.keys(n);
            for (t = 0; t < r.length; t++) {
                var c = n[r[t]];
                if (u = {}.toString.call(c), "[object Function]" === u || "[object Object]" === u || "[object Array]" === u) return 2
            }
            return 1
        }
        if ("[object Array]" === o) {
            for (t = 0; t < n.length; t++) {
                var i = n[t],
                    u = {}.toString.call(i);
                if ("[object Function]" === u || "[object Object]" === u || "[object Array]" === u) return 2
            }
            return 1
        }
        return 2
    }

    function i(n, t, o) {
        var c, u, a = "",
            l = [];
        if (o = o || "", t = t || [], null === n) return "null";
        if ("undefined" == typeof n) return "undefined";
        if (a = e(n), "[object Object]" == a && (a = "Object"), "[object Number]" == a) return "" + n;
        if ("[object Boolean]" == a) return n ? "true" : "false";
        if ("[object Function]" == a) return n.toString().split("\n  ").join("\n" + o);
        if ("[object String]" == a) return '"' + n.replace(/"/g, "'") + '"';
        for (u = 0; u < t.length; u++)
            if (n === t[u]) return "[circular " + a.slice(1) + ("outerHTML" in n ? " :\n" + n.outerHTML.split("\n").join("\n" + o) : "");
        if (t.push(n), "[object Array]" == a) {
            for (c = 0; c < n.length; c++) l.push(i(n[c], t));
            return "[" + l.join(", ") + "]"
        }
        if (a.match(/Array/)) return a;
        var f = a + " ",
            s = o + "  ";
        if (o.length / 2 < 2) {
            var b = [];
            try {
                for (c in n) b.push(c)
            } catch (n) {}
            for (b.sort(r), c = 0; c < b.length; c++) try {
                l.push(s + b[c] + ": " + i(n[b[c]], t, s))
            } catch (n) {}
        }
        return l.length ? f + "{\n" + l.join(",\n") + "\n" + o + "}" : f + "{}"
    }

    function u() {
        if (window.console)
            for (var n = 0; n < f.length; n++) ! function() {
                var t = f[n];
                window.console[t] && (window.console[t] = function() {
                    for (var n = [].slice.call(arguments), e = [], r = [], u = 0; u < n.length; u++) o(n[u]) ? (r.push(i(n[u].outerHTML)), e.push(1)) : (r.push(i(n[u])), e.push(c(n[u])));
                    s.postMessage(["console", {
                        "function": t,
                        arguments: r,
                        complexity: Math.max.apply(null, e)
                    }], "*"), this.apply(console, n)
                }.bind(console[t]))
            }()
    }

    function a(n) {
        return !!n.origin.match(/codepen/) && ("object" == typeof n.data && "command" === n.data.type)
    }

    function l(n) {
        if (a(n)) {
            var t = n.data.command;
            try {
                var e = window.eval(t)
            } catch (n) {
                return void console.error(n.message)
            }
            console.log(e)
        }
    }
    var f = ["log", "error", "warn", "info", "debug", "table", "time", "timeEnd", "count", "clear"],
        s = window.parent;
    n()
}();
