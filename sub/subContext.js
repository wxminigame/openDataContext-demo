	define("messageId.js", function(require, module, exports) {
	    "use strict";
	    module.exports = {
	        MessageID: {
	            ON_MSG_GET_FRIEND_RANK_OPEN: 1,
	            ON_MSG_GET_FRIEND_RANK_NEXT: 2,
	            ON_MSG_GET_FRIEND_RANK_BEFORE: 3,
	            ON_MSG_GET_FRIEND_RANK_CLOSE: 4,
	            ON_MSG_POST_FRIEND_INFO: 5,
	            ON_MSG_GET_GROUP_RANK_OPEN: 20,
	            ON_MSG_GET_GROUP_RANK_NEXT: 21,
	            ON_MSG_GET_GROUP_RANK_BEFORE: 22,
	            ON_MSG_GET_GROUP_RANK_CLOSE: 23,
	            ON_MSG_GET_NEXT_PEOPLE: 30,
	            ON_MSG_GET_ADJACENT_PEOPLE: 31,
	            ON_MSG_GET_DOUBLE_FRIEND_RANK_OPEN: 40,
	            ON_MSG_GET_DOUBLE_FRIEND_RANK_NEXT: 41,
	            ON_MSG_GET_DOUBLE_FRIEND_RANK_BEFORE: 42,
	            ON_MSG_GET_DOUBLE_FRIEND_RANK_CLOSE: 43,
	            ON_MSG_POST_DOUBLE_FRIEND_INFO: 44,
	            ON_MSG_GET_DOUBLE_GROUP_RANK_OPEN: 50,
	            ON_MSG_GET_DOUBLE_GROUP_RANK_NEXT: 51,
	            ON_MSG_GET_DOUBLE_GROUP_RANK_BEFORE: 52,
	            ON_MSG_GET_DOUBLE_GROUP_RANK_CLOSE: 53,
	            ON_MSG_GET_MORE_RANK_OPEN: 60,
	            ON_MSG_GET_MORE_RANK_NEXT: 61,
	            ON_MSG_GET_MORE_RANK_BEFORE: 62,
	            ON_MSG_GET_MORE_QUN_RANK_OPEN: 65
	        }
	    };
	});
	define("index2.js", function(require, module, exports) {
	    "use strict";
	    ! function() {
	        function e(e, t) {
	            var i = [],
	                a = 0;
	            1 < t && (a = Math.floor((t - 1) / 2));
	            for (var o = 0; o < k.length; o++)
	                if (k[o].openid == e) {
	                    if (1 === t) 0 <= o - 1 ? i.push(k[o - 1]) : i.push(k[o]);
	                    else {
	                        var s = o - a;
	                        0 > s && (s = 0);
	                        for (var l = s; l <= o + a && k[l]; l++) i.push(k[l])
	                    }
	                    break
	                }
	            console.log("getAbjacentPeople", i), n(i)
	        }

	        function n(e) {
	            var n = wx.getSharedCanvas().getContext("2d");
	            n.fillStyle = "white", n.fillRect(0, 0, 600, 600);
	            for (var i = 0; i < e.length; i++) t(n, e[i], 200, i)
	        }

	        function t(e, n, t, i) {
	            console.log(n), e.fillStyle = "#333333", e.textAlign = "start", e.font = "30px sans-serif";
	            var a = v(n.avatarUrl);
	            if (a) {
	                var o = wx.createImage();
	                o.src = a, o.onload = function() {
	                    e.drawImage(o, i * t + 50, 100, 100, 200)
	                }
	            }
	            e.font = "28px sans-serif", e.textAlign = "center", e.fillText(n.nickname, i * t + t / 2, 400), e.fillStyle = "#F44A6C", e.font = "50px sans-serif", e.textAlign = "center", e.fillText(n.score + i, i * t + t / 2, 500)
	        }

	        function i(e, n) {
	            n ? d(function(t) {
	                console.log("friends game data:", t), k = c(t, n), e && "function" == typeof e && e()
	            }, n) : u(function(n) {
	                console.log("friends game data:", n), k = r(n), e && "function" == typeof e && e()
	            })
	        }

	        function a(e, n, t) {
	            t ? _(e, function(e) {
	                console.log("group game data:", e), k = c(e, t), n && "function" == typeof n && n()
	            }, t) : p(e, function(e) {
	                console.log("group game data:", e), k = r(e), n && "function" == typeof n && n()
	            })
	        }

	        function o(e) {
	            u(function(n) {
	                console.log("friends game data:", n), k = r(n), O = r(n, 1), e && "function" == typeof e && e()
	            }, 1)
	        }

	        function s(e, n) {
	            p(e, function(e) {
	                console.log("group game data:", e), k = r(e), O = r(e, 1), n && "function" == typeof n && n()
	            }, 1)
	        }

	        function l(e) {
	            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
	            console.log("rank list: ", k, O), console.log("page index: ", e);
	            var t = m;
	            if (1 == n && (t = E), e <= Math.ceil(k.length / t) - 1 && 0 <= e) {
	                var i = wx.getSharedCanvas().getContext("2d");
	                1 == n ? (i.canvas.width = 1100, i.canvas.height = 700, i.fillStyle = "white", i.fillRect(0, 0, 1100, 700)) : (i.canvas.width = 500, i.canvas.height = 650, i.fillStyle = "white", i.fillRect(0, 0, 700, 700));
	                for (var a = e * t, o = a; o < a + t && o < k.length; o++)
	                    if (1 == n) {
	                        var s = k[o];
	                        g(i, s, o + 1, o - a), (s = O[o]) && g(i, s, o + 1, o - a, 1)
	                    } else 2 == n ? f(i, k[o], o + 1, o - a, n) : f(i, k[o], o + 1, o - a);
	                x = e
	            } else console.warn("no page")
	        }

	        function r(e) {
	            for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, t = [], i = 0; i < e.length; i++) {
	                (function(i) {
	                    var a = e[i],
	                        o = {
	                            nickname: "",
	                            avatarUrl: "",
	                            score: null,
	                            openid: "",
	                            isVip: !1
	                        };
	                    if (n && (o[y] = 0), o.nickname = a.nickname, o.avatarUrl = a.avatarUrl, o.openid = a.openid, a.KVDataList.forEach(function(e) {
	                            "score" == e.key && (o.score = parseInt(e.value)), "isVip" == e.key && (o.isVip = parseInt(e.value)), n && e.key == y && (o[y] = parseInt(e.value))
	                        }), !o.score) return "continue";
	                    if (n && !o[y]) return "continue";
	                    if (0 == t.length) return t.push(o), "continue";
	                    for (var s = -1, l = 0; l < t.length; l++)
	                        if (n) {
	                            if (o[y] > t[l][y]) {
	                                s = l;
	                                break
	                            }
	                        } else if (o.score > t[l].score) {
	                        s = l;
	                        break
	                    } - 1 == s && (s = t.length), t.splice(s, 0, o)
	                })(i)
	            }
	            return t
	        }

	        function c(e, n) {
	            for (var t = [], i = 0; i < e.length; i++) {
	                (function(i) {
	                    var a = e[i],
	                        o = {
	                            nickname: "",
	                            avatarUrl: "",
	                            openid: "",
	                            isVip: !1
	                        };
	                    if (n && (o[n] = 0), o.nickname = a.nickname, o.avatarUrl = a.avatarUrl, o.openid = a.openid, a.KVDataList.forEach(function(e) {
	                            e.key == n && (o[n] = parseInt(e.value)), "isVip" == e.key && (o.isVip = parseInt(e.value))
	                        }), !o[n]) return "continue";
	                    if (0 == t.length) return t.push(o), "continue";
	                    for (var s = -1, l = 0; l < t.length; l++)
	                        if (o[n] > t[l][n]) {
	                            s = l;
	                            break
	                        } - 1 == s && (s = t.length), t.splice(s, 0, o)
	                })(i)
	            }
	            return t
	        }

	        function f(e, n, t, i) {
	            var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
	                o = n.nickname,
	                s = n.avatarUrl,
	                l = n.score;
	            2 == a && (l = n[N]);
	            var r = n.isVip;
	            e.fillStyle = "#333333", e.textAlign = "start", e.font = "30px sans-serif";
	            if (e.fillText(t, 30, 75 + 104 * i), 1 <= t && 3 >= t) {
	                var c = wx.createImage();
	                c.src = "src/openDataContext/image/avatar_frame_" + t + ".png", c.onload = function() {
	                    e.drawImage(c, 84, 12 + 104 * i, c.width, c.height)
	                }
	            }
	            var f = v(s);
	            if (f) {
	                var g = wx.createImage();
	                g.src = f, g.onload = function() {
	                    e.drawImage(g, 85, 30 + 104 * i, 64, 64)
	                }
	            }
	            if (r && (e.fillStyle = "red"), e.font = "28px sans-serif", e.fillText(o, 170, 75 + 104 * i, 200), e.fillStyle = "white", e.fillRect(370, 30 + 104 * i, 250, 64), r) {
	                var u = wx.createImage();
	                u.src = "src/openDataContext/image/vip.png", u.onload = function() {
	                    e.drawImage(u, 378, 35 + 104 * i, u.width, u.height)
	                }
	            }
	            e.fillStyle = "#F44A6C", e.font = "34px sans-serif", e.textAlign = "right", e.fillText(l, 460, 75 + 104 * i), e.strokeStyle = "#EBEBEB", e.lineWidth = 2, e.beginPath(), 3 < t ? (e.moveTo(70, 115 + 104 * i), e.lineTo(600, 115 + 104 * i)) : (e.moveTo(70, 110 + 104 * i), e.lineTo(600, 110 + 104 * i)), e.stroke()
	        }

	        function g(e, n, t, i) {
	            var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
	                o = n.nickname,
	                s = n.avatarUrl,
	                l = 0;
	            l = a ? n[y] : n.score;
	            var r = n.isVip;
	            e.fillStyle = "#333333", e.textAlign = "start", e.font = "30px sans-serif";
	            var c = 0;
	            if (a && (c += 550), e.fillText(t, 15 + c, 75 + 104 * i), 1 <= t && 3 >= t) {
	                var f = wx.createImage();
	                f.src = "src/openDataContext/image/avatar_frame_" + t + ".png", f.onload = function() {
	                    e.drawImage(f, 60 + c, 12 + 104 * i, f.width, f.height)
	                }
	            }
	            var g = v(s);
	            if (g) {
	                var u = wx.createImage();
	                u.src = g, u.onload = function() {
	                    e.drawImage(u, 60 + c, 30 + 104 * i, 64, 64)
	                }
	            }
	            if (r && (e.fillStyle = "red"), e.font = "24rpx sans-serif", e.fillText(o, 150 + c, 75 + 104 * i), e.fillStyle = "white", e.fillRect(420 + c, 30 + 104 * i, 250, 64), r) {
	                var d = wx.createImage();
	                d.src = "src/openDataContext/image/vip.png", d.onload = function() {
	                    e.drawImage(d, 200 + c, 35 + 104 * i, d.width, d.height)
	                }
	            }
	            e.fillStyle = "#F44A6C", e.font = "34px sans-serif", e.textAlign = "right", e.fillText(l, 480 + c, 75 + 104 * i), e.strokeStyle = "#EBEBEB", e.lineWidth = 2, e.beginPath(), 3 < t ? (e.moveTo(120 + c, 115 + 104 * i), e.lineTo(450 + c, 115 + 104 * i)) : (e.moveTo(120 + c, 110 + 104 * i), e.lineTo(450 + c, 110 + 104 * i)), e.stroke()
	        }

	        function u(e) {
	            var n = ["score", "timestamp", "isVip"];
	            (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0) && n.push(y), wx.getFriendCloudStorage({
	                keyList: n,
	                success: function(n) {
	                    console.log("get friend data success:", n), e && "function" == typeof e && e(n.data)
	                },
	                fail: function(e) {
	                    console.log("get friend data fail:", e)
	                }
	            })
	        }

	        function d(e, n) {
	            var t = ["timestamp", "isVip"];
	            n && t.push(n), wx.getFriendCloudStorage({
	                keyList: t,
	                success: function(n) {
	                    console.log("get friend data success:", n), e && "function" == typeof e && e(n.data)
	                },
	                fail: function(e) {
	                    console.log("get friend data fail:", e)
	                }
	            })
	        }

	        function p(e, n) {
	            var t = ["score", "timestamp", "isVip"];
	            (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0) && t.push(y), wx.getGroupCloudStorage({
	                shareTicket: e,
	                keyList: t,
	                success: function(e) {
	                    console.log("get group data success:", e), n && "function" == typeof n && n(e.data)
	                },
	                fail: function(e) {
	                    console.log("get group data fail:", e)
	                }
	            })
	        }

	        function _(e, n, t) {
	            var i = ["timestamp", "isVip"];
	            t && i.push(t), wx.getGroupCloudStorage({
	                shareTicket: e,
	                keyList: i,
	                success: function(e) {
	                    console.log("get group data success:", e), n && "function" == typeof n && n(e.data)
	                },
	                fail: function(e) {
	                    console.log("get group data fail:", e)
	                }
	            })
	        }

	        function v(e) {
	            return e
	        }
	        var h = require("./messageId"),
	            m = 5,
	            E = 3,
	            x = 0,
	            y = 0,
	            N = 0,
	            k = [],
	            O = [];
	        wx.onMessage(function(n) {
	            console.log("on message:", n), 1 == n.id ? i(function() {
	                l(x = 0)
	            }) : 20 == n.id ? a(n.shareTicket, function() {
	                l(x = 0)
	            }) : 2 == n.id || 21 == n.id ? l(x + 1) : 3 == n.id || 22 == n.id ? l(x - 1) : 4 == n.id || 23 == n.id ? (console.log("friend rank closed"), x = 0, k = []) : 5 == n.id ? console.log("post friend info") : 30 == n.id ? (console.log("get next friend info"), i(function() {
	                e(n.openid, 1)
	            })) : 31 == n.id ? (console.log("get abjacent to the people info"), i(function() {
	                e(n.openid, 3)
	            })) : n.id == h.MessageID.ON_MSG_GET_DOUBLE_FRIEND_RANK_OPEN ? (y = n.dataName, o(function() {
	                l(x = 0, 1)
	            })) : n.id == h.MessageID.ON_MSG_GET_DOUBLE_GROUP_RANK_OPEN ? (y = n.dataName, console.log(n), s(n.shareTicket, function() {
	                l(x = 0, 1)
	            })) : n.id == h.MessageID.ON_MSG_GET_DOUBLE_FRIEND_RANK_NEXT || n.id == h.MessageID.ON_MSG_GET_DOUBLE_GROUP_RANK_NEXT ? l(x + 1, 1) : n.id == h.MessageID.ON_MSG_GET_DOUBLE_FRIEND_RANK_BEFORE || n.id == h.MessageID.ON_MSG_GET_DOUBLE_GROUP_RANK_BEFORE ? l(x - 1, 1) : n.id == h.MessageID.ON_MSG_GET_DOUBLE_FRIEND_RANK_CLOSE || n.id == h.MessageID.ON_MSG_GET_DOUBLE_GROUP_RANK_CLOSE ? (x = 0, k = [], O = []) : n.id == h.MessageID.ON_MSG_GET_MORE_RANK_OPEN ? i(function() {
	                N = n.key, l(x = 0, 2)
	            }, n.key) : n.id == h.MessageID.ON_MSG_GET_MORE_QUN_RANK_OPEN ? (console.log(n), N = n.key, a(n.shareTicket, function() {
	                l(x = 0, 2)
	            }, n.key)) : n.id == h.MessageID.ON_MSG_GET_MORE_RANK_NEXT ? l(x + 1, 2) : n.id == h.MessageID.ON_MSG_GET_MORE_RANK_BEFORE && l(x - 1, 2)
	        })
	    }();
	});
	require("index2.js");