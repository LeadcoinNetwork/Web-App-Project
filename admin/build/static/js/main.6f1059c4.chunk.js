;(this["webpackJsonpleadcoin-admin"] =
  this["webpackJsonpleadcoin-admin"] || []).push([
  [0],
  {
    336: function(e, a, t) {
      e.exports = t(487)
    },
    341: function(e, a, t) {},
    487: function(e, a, t) {
      "use strict"
      t.r(a)
      var r = t(0),
        n = t.n(r),
        c = t(12),
        o = t.n(c),
        s = (t(341), t(560)),
        l = t(559),
        m = t(249),
        u = Object(m.a)("/api/admin"),
        i = t(250),
        E = t.n(i),
        d = {
          login: function(e) {
            var a = e.username,
              t = e.password,
              r = new Request("/api/admin/authenticate/login", {
                method: "POST",
                body: JSON.stringify({ username: a, password: t }),
                headers: new Headers({ "Content-Type": "application/json" }),
              })
            return fetch(r)
              .then(function(e) {
                if (e.status < 200 || e.status >= 300)
                  throw new Error(e.statusText)
                return e.json()
              })
              .then(function(e) {
                var a = e.token,
                  t = E()(a)
                localStorage.setItem("token", a),
                  localStorage.setItem("permissions", t.permissions)
              })
          },
          logout: function() {
            localStorage.removeItem("token"),
              localStorage.removeItem("permissions")
            var e = new Request("/api/admin/authenticate/logout", {
              method: "POST",
              headers: new Headers({ "Content-Type": "application/json" }),
            })
            return fetch(e).then(function(e) {
              if (e.status < 200 || e.status >= 300)
                throw new Error(e.statusText)
            })
          },
          checkError: function(e) {
            var a = e.status
            return 401 === a || 403 === a
              ? (localStorage.removeItem("token"), Promise.reject())
              : Promise.resolve()
          },
          checkAuth: function() {
            return localStorage.getItem("token")
              ? Promise.resolve()
              : Promise.reject()
          },
          getPermissions: function() {
            var e = localStorage.getItem("permissions")
            return e ? Promise.resolve(e) : Promise.reject()
          },
        },
        f = t(290),
        h = t.n(f),
        g = t(291),
        p = t.n(g),
        b = t(292),
        w = t.n(b),
        v = t(293),
        I = t.n(v),
        T = t(294),
        k = t.n(T),
        y = t(295),
        x = t.n(y),
        j = t(566),
        P = t(540),
        S = t(544),
        _ = t(561),
        O = t(562),
        B = t(552),
        A = t(553),
        R = t(569),
        C = t(554),
        H = t(555),
        U = t(556),
        D = t(565),
        J = t(563),
        N = t(570),
        W = [{ id: "user" }, { id: "admin" }],
        q = function(e) {
          return n.a.createElement(
            j.a,
            e,
            n.a.createElement(P.a, { source: "id" }),
            n.a.createElement(S.a, { source: "fname" }),
            n.a.createElement(S.a, { source: "lname" }),
            n.a.createElement(S.a, { source: "email" }),
            n.a.createElement(P.a, { source: "balance" }),
            n.a.createElement(P.a, { source: "rating" }),
            n.a.createElement(P.a, { source: "numberReviews" }),
            n.a.createElement(S.a, { source: "country" }),
            n.a.createElement(S.a, { source: "phone" }),
            n.a.createElement(S.a, { source: "company" }),
            n.a.createElement(S.a, { source: "wallet" }),
            n.a.createElement(S.a, { source: "role" }),
          )
        },
        M = function(e) {
          return n.a.createElement(
            _.a,
            Object.assign({}, e, {
              bulkActionButtons: !1,
              filters: n.a.createElement(q, null),
            }),
            n.a.createElement(
              O.a,
              null,
              n.a.createElement(B.a, { source: "id" }),
              n.a.createElement(A.a, { source: "fname" }),
              n.a.createElement(A.a, { source: "lname" }),
              n.a.createElement(R.a, { source: "email" }),
              n.a.createElement(B.a, { source: "balance" }),
              n.a.createElement(B.a, { source: "rating" }),
              n.a.createElement(B.a, { source: "numberReviews" }),
              n.a.createElement(A.a, { source: "country" }),
              n.a.createElement(A.a, { source: "phone" }),
              n.a.createElement(A.a, { source: "company" }),
              n.a.createElement(A.a, { source: "wallet" }),
              n.a.createElement(C.a, { source: "getNotifications" }),
              n.a.createElement(C.a, { source: "getEmails" }),
              n.a.createElement(A.a, { source: "favorites" }),
              n.a.createElement(A.a, { source: "role" }),
              n.a.createElement(H.a, { source: "created" }),
              n.a.createElement(U.a, null),
            ),
          )
        },
        L = function(e) {
          return n.a.createElement(
            D.a,
            e,
            n.a.createElement(
              J.a,
              null,
              n.a.createElement(P.a, { source: "id", disabled: !0 }),
              n.a.createElement(S.a, { source: "fname", disabled: !0 }),
              n.a.createElement(S.a, { source: "lname", disabled: !0 }),
              n.a.createElement(N.a, {
                source: "role",
                choices: W,
                optionText: "id",
              }),
            ),
          )
        },
        Y = [{ id: "Yes" }, { id: "No" }],
        $ = [
          { id: "Website building" },
          { id: "Crypto" },
          { id: "Insurance" },
          { id: "Loans" },
        ],
        z = [{ id: "Mostly Static" }, { id: "Dynamic" }],
        F = function(e) {
          return n.a.createElement(
            j.a,
            e,
            n.a.createElement(P.a, { source: "id" }),
            n.a.createElement(P.a, { source: "ownerId" }),
            n.a.createElement(S.a, { source: "telephone" }),
            n.a.createElement(S.a, { source: "email" }),
            n.a.createElement(P.a, { source: "bought_from" }),
            n.a.createElement(N.a, {
              source: "industry",
              choices: $,
              optionText: "id",
            }),
            n.a.createElement(N.a, {
              source: "content_updates",
              choices: z,
              optionText: "id",
            }),
            n.a.createElement(S.a, { source: "content_updates" }),
            n.a.createElement(P.a, { source: "budget" }),
            n.a.createElement(N.a, {
              source: "mobile_design",
              choices: Y,
              optionText: "id",
            }),
            n.a.createElement(N.a, {
              source: "seo",
              choices: Y,
              optionText: "id",
            }),
            n.a.createElement(N.a, {
              source: "e_commerce",
              choices: Y,
              optionText: "id",
            }),
            n.a.createElement(N.a, {
              source: "content_management",
              choices: Y,
              optionText: "id",
            }),
            n.a.createElement(N.a, {
              source: "blog",
              choices: Y,
              optionText: "id",
            }),
            n.a.createElement(N.a, {
              source: "hosting",
              choices: Y,
              optionText: "id",
            }),
            n.a.createElement(S.a, { source: "comments" }),
          )
        },
        G = function(e) {
          return n.a.createElement(
            _.a,
            Object.assign({}, e, {
              bulkActionButtons: !1,
              filters: n.a.createElement(F, null),
            }),
            n.a.createElement(
              O.a,
              null,
              n.a.createElement(B.a, { source: "id" }),
              n.a.createElement(B.a, { source: "ownerId" }),
              n.a.createElement(A.a, { source: "telephone" }),
              n.a.createElement(R.a, { source: "email" }),
              n.a.createElement(A.a, { source: "bought_from" }),
              n.a.createElement(A.a, { source: "industry" }),
              n.a.createElement(A.a, { source: "content_updates" }),
              n.a.createElement(A.a, { source: "functionality" }),
              n.a.createElement(A.a, { source: "mobile_design" }),
              n.a.createElement(A.a, { source: "seo" }),
              n.a.createElement(A.a, { source: "content_management" }),
              n.a.createElement(A.a, { source: "e_commerce" }),
              n.a.createElement(A.a, { source: "blog" }),
              n.a.createElement(A.a, { source: "languages" }),
              n.a.createElement(B.a, { source: "budget" }),
              n.a.createElement(A.a, { source: "hosting" }),
              n.a.createElement(A.a, { source: "comments" }),
              n.a.createElement(C.a, { source: "favorite" }),
              n.a.createElement(C.a, { source: "active" }),
              n.a.createElement(C.a, { source: "forSale" }),
              n.a.createElement(C.a, { source: "isReview" }),
              n.a.createElement(H.a, { source: "date" }),
            ),
          )
        },
        K = function(e) {
          return n.a.createElement(
            j.a,
            e,
            n.a.createElement(P.a, { source: "id" }),
            n.a.createElement(P.a, { source: "from" }),
            n.a.createElement(P.a, { source: "to" }),
            n.a.createElement(P.a, { source: "value" }),
            n.a.createElement(S.a, { source: "txHash" }),
          )
        },
        Q = function(e) {
          return n.a.createElement(
            _.a,
            Object.assign({}, e, {
              bulkActionButtons: !1,
              filters: n.a.createElement(K, null),
            }),
            n.a.createElement(
              O.a,
              null,
              n.a.createElement(B.a, { source: "id" }),
              n.a.createElement(B.a, { source: "from" }),
              n.a.createElement(B.a, { source: "to" }),
              n.a.createElement(B.a, { source: "value" }),
              n.a.createElement(A.a, { source: "txHash" }),
              n.a.createElement(H.a, { source: "date", showTime: !0 }),
            ),
          )
        },
        V = function(e) {
          return n.a.createElement(
            j.a,
            e,
            n.a.createElement(P.a, { source: "id" }),
            n.a.createElement(P.a, { source: "leadId" }),
            n.a.createElement(P.a, { source: "creatorId" }),
            n.a.createElement(P.a, { source: "startPrice" }),
          )
        },
        X = function(e) {
          return n.a.createElement(
            _.a,
            Object.assign({}, e, {
              bulkActionButtons: !1,
              filters: n.a.createElement(V, null),
            }),
            n.a.createElement(
              O.a,
              null,
              n.a.createElement(B.a, { source: "id" }),
              n.a.createElement(B.a, { source: "leadId" }),
              n.a.createElement(B.a, { source: "creatorId" }),
              n.a.createElement(B.a, { source: "startPrice" }),
              n.a.createElement(H.a, { source: "startDate", showTime: !0 }),
              n.a.createElement(H.a, { source: "endDate", showTime: !0 }),
              n.a.createElement(C.a, { source: "isClosed" }),
            ),
          )
        },
        Z = function(e) {
          return n.a.createElement(
            j.a,
            e,
            n.a.createElement(P.a, { source: "id" }),
            n.a.createElement(P.a, { source: "price" }),
            n.a.createElement(P.a, { source: "userId" }),
            n.a.createElement(P.a, { source: "auctionId" }),
          )
        },
        ee = function(e) {
          return n.a.createElement(
            _.a,
            Object.assign({}, e, {
              bulkActionButtons: !1,
              filters: n.a.createElement(Z, null),
            }),
            n.a.createElement(
              O.a,
              null,
              n.a.createElement(B.a, { source: "id" }),
              n.a.createElement(B.a, { source: "price" }),
              n.a.createElement(B.a, { source: "userId" }),
              n.a.createElement(B.a, { source: "auctionId" }),
              n.a.createElement(H.a, { source: "date", showTime: !0 }),
            ),
          )
        },
        ae = function(e) {
          return n.a.createElement(
            j.a,
            e,
            n.a.createElement(P.a, { source: "id" }),
            n.a.createElement(P.a, { source: "toUserId" }),
            n.a.createElement(P.a, { source: "fromUserId" }),
            n.a.createElement(P.a, { source: "rating" }),
            n.a.createElement(S.a, { source: "comment" }),
          )
        },
        te = function(e) {
          return n.a.createElement(
            _.a,
            Object.assign({}, e, {
              bulkActionButtons: !1,
              filters: n.a.createElement(ae, null),
            }),
            n.a.createElement(
              O.a,
              null,
              n.a.createElement(B.a, { source: "id" }),
              n.a.createElement(B.a, { source: "toUserId" }),
              n.a.createElement(B.a, { source: "fromUserId" }),
              n.a.createElement(B.a, { source: "rating" }),
              n.a.createElement(A.a, { source: "comment" }),
              n.a.createElement(H.a, { source: "date", showTime: !0 }),
            ),
          )
        },
        re = function() {
          return n.a.createElement(
            s.a,
            { dataProvider: u, authProvider: d },
            n.a.createElement(l.a, {
              name: "users",
              icon: h.a,
              list: M,
              edit: L,
            }),
            n.a.createElement(l.a, { name: "leads", icon: p.a, list: G }),
            n.a.createElement(l.a, {
              name: "transactions",
              icon: w.a,
              list: Q,
            }),
            n.a.createElement(l.a, { name: "auctions", icon: I.a, list: X }),
            n.a.createElement(l.a, { name: "bets", icon: k.a, list: ee }),
            n.a.createElement(l.a, { name: "reviews", icon: x.a, list: te }),
          )
        }
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
          ),
      )
      o.a.render(
        n.a.createElement(n.a.StrictMode, null, n.a.createElement(re, null)),
        document.getElementById("root"),
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready
            .then(function(e) {
              e.unregister()
            })
            .catch(function(e) {
              console.error(e.message)
            })
    },
  },
  [[336, 1, 2]],
])
//# sourceMappingURL=main.6f1059c4.chunk.js.map
