var ComponentManager = require ("simple-component-manager").ComponentManager;
var Fido2ComponentWeb = require ("fido2-server-component-web");
var Fido2ComponentCert = require("fido2-server-component-certs");

// setup server components
console.log ("Configuring components...");
var cm = new ComponentManager();
cm.register("fido-web", "generic", new Fido2ComponentWeb());
cm.config("fido-web", "set-port", 8443);

cm.register("cert-manager", "generic", new Fido2ComponentCert());

// start all the components
console.log ("Starting server...");
cm.init();

cm.config("fido-web", "add-dynamic", {
    path: "/webauthn/register/challenge",
    method: "post",
    fn: function(req, res) {
        console.log ("body", req.body);
        var hexChallenge = "00112233445566778899aaBBccDDeeFF";
        var base64Challenge = "YWJjMTIzIT8kKiYoKSctPUB+";
        var base64UrlChallenge = "YWJjMTIzIT8kKiYoKSctPUB-";
        // console.log ("req", req);
        var response = {
            status: "ok",
            challenge: hexChallenge
        };
        res.send (JSON.stringify(response));
    }
});

cm.config("fido-web", "add-dynamic", {
    path: "/webauthn/register/response",
    method: "post",
    fn: function(req, res) {
        console.log ("got register response");
        console.log ("body", req.body);
        var response = {
            status: "ok",
        };
        res.send (JSON.stringify(response));
    }
});