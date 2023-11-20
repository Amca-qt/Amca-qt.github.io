var CSSReload = {
    head: null,
    init: function() {
        this._storeHead(), this._listenToPostMessages()
    },
    _storeHead: function() {
        this.head = document.head || document.getElementsByTagName("head")[0]
    },
    _shouldHandleMessage: function(e) {
        return e.origin.match(/codepen/)
    },
    _listenToPostMessages: function() {
        function e(e) {
            window.addEventListener ? window.addEventListener("message", e, !1) : window.attachEvent("onmessage", e)
        }
        var t = this;
        e(function(e) {
            try {
                if (!t._shouldHandleMessage(e)) return;
                var n = JSON.parse(e.data);
                "string" == typeof n.css && t._refreshCSS(n)
            } catch (e) {}
        })
    },
    _messageEvent: function() {
        return "attachEvent" === this._eventMethod() ? "onmessage" : "message"
    },
    _eventMethod: function() {
        return window.addEventListener ? "addEventListener" : "attachEvent"
    },
    _refreshCSS: function(e) {
        var t = this._findPrevCPStyle(),
            n = document.createElement("style");
        n.type = "text/css", n.className = "cp-pen-styles", n.styleSheet ? n.styleSheet.cssText = e.css : n.appendChild(document.createTextNode(e.css)), this.head.appendChild(n), t && t.parentNode.removeChild(t), "prefixfree" === e.css_prefix && StyleFix.process()
    },
    _findPrevCPStyle: function() {
        for (var e = document.getElementsByTagName("style"), t = e.length - 1; t >= 0; t--)
            if ("cp-pen-styles" === e[t].className) return e[t];
        return !1
    }
};
CSSReload.init();
