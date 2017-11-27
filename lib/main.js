var ComponentManager = require ("simple-component-manager").ComponentManager;
var Fido2ComponentWeb = require ("fido2-server-component-web");
var Fido2ComponentCert = require("fido2-server-component-certs");

function alwaysTrue() {
    return true;
}

// setup server components
console.log ("Configuring components...");
var cm = new ComponentManager();
cm.registerType("generic", alwaysTrue);
cm.register("fido-web", "generic", new Fido2ComponentWeb());
cm.config("fido-web", "set-port", 8443);
cm.register("cert-manager", "generic", new Fido2ComponentCert());

// start all the components
console.log ("Starting server...");
cm.init();