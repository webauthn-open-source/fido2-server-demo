"use strict";

const assert = require("chai").assert;
const pkg = require("../package");
const path = require("path");
const { spawn } = require("child_process");
const nodeModulesDir = path.join(__dirname, "../node_modules");

function testPackage(pkgName) {
    it(`tests ${pkgName}`, async function() {
        this.timeout(300000); // eslint-disable-line no-invalid-this
        this.slow(300000); // eslint-disable-line no-invalid-this

        var pkgDir = path.join(nodeModulesDir, pkgName);
        console.log("pkgDir", pkgDir);
        // XXX: no guarantee that the devDependencies were installed unless we 'install' first
        await npmCmd(pkgDir, "install");
        await npmCmd(pkgDir, "test");
    });
}

async function npmCmd(pkgDir, cmd) {
    // spawn npm to test
    var npmArgs = [];
    npmArgs.push(cmd);

    // spawn npm
    var npmPs = spawn("npm", npmArgs, {
        cwd: pkgDir
    });

    npmPs.stdout.on("data", (data) => {
        process.stdout.write(data.toString());
    });

    npmPs.stderr.on("data", (data) => {
        process.stderr.write(data.toString());
    });

    return new Promise((resolve, reject) => {
        npmPs.on("close", (code) => {
            // console.log("npm finished with code:", code);
            if (code === 0) {
                return resolve(true);
            }
            reject(new Error("test failed with code: " + code));
        });
    });
}

describe("fido-server-demo", function() {
    it("loaded pkg", function() {
        // test goes here
        assert.isObject(pkg);
    });

    // test all packages
    for (let depPkg of Object.keys(pkg.dependencies)) {
        testPackage(depPkg);
    }
});
