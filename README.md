[![Waffle.io - Columns and their card count](https://badge.waffle.io/apowers313/fido2-server-demo.svg?columns=all)](https://waffle.io/apowers313/fido2-server-demo)

Currently in beta. Good for demos and prototypes, but not production ready.

## Installation

### NPM
``` bash
git clone --recursive https://github.com/apowers313/fido2-server-demo
cd fido2-server-demo
npm install
npm start
```

Note: this has been developed and tested on MacOS X, and webauthn.org was running this server on Ubuntu Linux. It has not been tested on Windows -- please open [issues](https://github.com/apowers313/fido2-server-demo/issues) for Windows bugs.

Note: this project uses `async` / `await` and requires node.js 7.6+. If you are running OpenSSH >1.1.0 (e.g. - Debian Buster), it requires node.js 10+.

### Docker
There is also a Docker image available, which makes it much less likely that you will have configuration problems. Here are the instructions for using the Docker image.

* Install [Docker for Windows](https://docs.docker.com/docker-for-windows/install/#start-docker-for-windows) or [Docker for Mac](https://www.docker.com/docker-mac) or use one of the [several other install options](https://docs.docker.com/install/).
* run the command: `docker run -d -p 8888:8888 -p 8443:8443 apowers313/fido2-server:prod-canary`
* open https://localhost:8443

## Configuration

Edit `scm-config.json` to change ports, domains, and certificate paths.

This a [simple-component-manager](https://github.com/apowers313/simple-component-manager) configuration file where each component is replaceable with one of a similar type (logger, user data store, cert manager, etc.). More components and documentation will be forthcoming. For now, hopefully things like changing ports and certificate paths are fairly obvious.

## Components

The following components are used for this server:

* [component-fido2](https://github.com/apowers313/component-fido2) (Also note that the core FIDO2 functionality is implemented in [fido2-lib](https://github.com/apowers313/fido2-lib))
* [component-uds-json](https://github.com/apowers313/component-uds-json)
* [component-certs](https://github.com/apowers313/component-certs)
* [component-web](https://github.com/apowers313/component-web)
* [component-logger-winston](https://github.com/apowers313/component-logger-winston)

## Bugs / Help / Contributing

If you find bugs or need help, open a GitHub issue. If you are so inspired, feel free to submit a pull request. Also feel free to just send a note saying that you're using the server and what you think of it -- it's nice to know when a project is being used.

You can also find me on Twitter at [@apowers313](https://twitter.com/apowers313).

## Security Considerations

This server does a number of things that shouldn't be done in a real server. These are for demonstration purposes and will be phased out over the next couple months:

1. Attestation is not currently required to be verified. If an authenticator doesn't have attestation, the registration will still be successful and a warning message will be logged.
2. This allows both User Presence (UP) and User Verification (UV) to be used for first-factor authentication. Typically only UV should be used for first-factor authentication, but given that U2F tokens are going to be the most commonly available authenticator in the short term, this server still allows UP-only authenticators to behave in a password-less fashion.
3. User accounts are wide open -- the session is not currently checked for previous authentication, so anyone can add any authenticator to any username. This is great for demos (and inspired by [demo.yubico.com/u2f](https://demo.yubico.com/u2f)) but not how things would work in the real world. This will change in the near future.

## Sponsor
Note that while I used to be Technical Director for FIDO Alliance (and I am currently the Technical Advisor for FIDO Alliance), THIS PROJECT IS NOT ENDORSED OR SPONSORED BY FIDO ALLIANCE.

Work for this project is supported by my consulting company: [WebAuthn Consulting](https://webauthn.consulting/).

## Other FIDO2 / WebAuthn Projects
There are a number of other great FIDO2 and WebAuthn projects out there. I love all things FIDO2 and WebAuthn, so here's a list of other projects (Note: I'm not affiliated with any of these projects):

### Open Source Servers

* [Google / Java](https://github.com/google/webauthndemo)
* [MasterCard / Java (Spring)](https://github.com/Mastercard/fido2-rp-spring)
* [Mozilla / JavaScript (Browser)](https://github.com/jcjones/webauthn.bin.coffee)
* [FIDO Alliance / JavaScript](https://github.com/fido-alliance/webauthn-demo)
* [cedarcode / Ruby](https://github.com/cedarcode/webauthn-ruby)
* [abergs / .NET](https://github.com/abergs/fido2-net-lib)

### Open Source Clients

* [apowers313 / JavaScript (Browser)](https://github.com/apowers313/webauthn-simple-app)

### Open Source CTAP2

* [Yubico / C](https://developers.yubico.com/libfido2/)
* [Yubico / Python](https://developers.yubico.com/python-fido2/)

### Open Access Servers

* apowers313: [webauthn.org](https://webauthn.org)
* Duo: [webauthn.io](https://webauthn.io/)
* Mozilla: [webauthn.bin.coffee](https://webauthn.bin.coffee/)
* Yubico: [demo.yubico.com/webauthn](https://demo.yubico.com/webauthn)
* watahani: [webauthn-tutorial-haniyama.now.sh](https://webauthn-tutorial-haniyama.now.sh/)

If your project isn't listed here and you would like it to be, drop me a note and I would be happy to add it.
