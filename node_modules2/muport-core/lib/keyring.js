'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bip39 = require('bip39');
var hdkey = require('ethereumjs-wallet/hdkey');
var Tx = require('ethereumjs-tx');
var nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
var bs58 = require('bs58');
var sss = require('secrets.js');
var SimpleSigner = require('did-jwt').SimpleSigner;

var BASE_PATH = "m/7696500'/0'/0'";
var MM_PATH = "m/44'/60'/0'/0";

var Keyring = function () {
  function Keyring() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Keyring);

    opts.mnemonic = opts.mnemonic || bip39.generateMnemonic();
    this._initKeys(opts);
  }

  (0, _createClass3.default)(Keyring, [{
    key: 'createShares',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dids, publicKeys) {
        var amount, theshold, entropyStr, shares, nonce;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                amount = 3;
                theshold = 2;

                if (!(dids.length !== amount && publicKeys.length !== amount)) {
                  _context.next = 4;
                  break;
                }

                throw new Error('There needs to be exactly ' + amount + ' dids and corresponding publicKeys');

              case 4:
                entropyStr = bip39.mnemonicToEntropy(this.mnemonic).toString('hex');
                _context.next = 7;
                return sss.share(entropyStr, amount, theshold);

              case 7:
                shares = _context.sent;
                nonce = randomNonce();
                // we need to add 0 to the end of the shares because they are of odd length

                return _context.abrupt('return', {
                  nonce: nacl.util.encodeBase64(nonce),
                  ciphertexts: [this.encrypt(Buffer.concat([didToBuffer(dids[0]), Buffer.from(shares[0] + '0', 'hex')]), publicKeys[0], nonce).ciphertext, this.encrypt(Buffer.concat([didToBuffer(dids[1]), Buffer.from(shares[1] + '0', 'hex')]), publicKeys[1], nonce).ciphertext, this.encrypt(Buffer.concat([didToBuffer(dids[2]), Buffer.from(shares[2] + '0', 'hex')]), publicKeys[2], nonce).ciphertext]
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createShares(_x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return createShares;
    }()
  }, {
    key: 'encrypt',
    value: function encrypt(msg, toPublic, nonce) {
      nonce = nonce || randomNonce();
      toPublic = nacl.util.decodeBase64(toPublic);
      if (typeof msg === 'string') {
        msg = nacl.util.decodeUTF8(msg);
      }
      var ciphertext = nacl.box(msg, nonce, toPublic, this.asymEncryptionKey.secretKey);

      return {
        nonce: nacl.util.encodeBase64(nonce),
        ciphertext: nacl.util.encodeBase64(ciphertext)
      };
    }
  }, {
    key: 'decrypt',
    value: function decrypt(ciphertext, fromPublic, nonce, toBuffer) {
      fromPublic = nacl.util.decodeBase64(fromPublic);
      ciphertext = nacl.util.decodeBase64(ciphertext);
      nonce = nacl.util.decodeBase64(nonce);

      var cleartext = nacl.box.open(ciphertext, nonce, fromPublic, this.asymEncryptionKey.secretKey);
      if (toBuffer) {
        return cleartext ? Buffer.from(cleartext) : null;
      }
      return cleartext ? nacl.util.encodeUTF8(cleartext) : null;
    }
  }, {
    key: 'decryptOneShare',
    value: function decryptOneShare(recoveryNetwork, fromPublic, did) {
      var didBuf = didToBuffer(did);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(recoveryNetwork.ciphertexts), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var box = _step.value;

          var cleartextBuf = this.decrypt(box, fromPublic, recoveryNetwork.nonce, true);
          // where we able to decrypt?
          // check if encrypted did is our did
          if (cleartextBuf && didBuf.equals(cleartextBuf.slice(0, didBuf.length))) {
            // return the decrypted share, remove the trailing zero
            return cleartextBuf.slice(didBuf.length, cleartextBuf.length + 1).toString('hex').slice(0, -1);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'symEncrypt',
    value: function symEncrypt(msg, nonce) {
      return symEncryptBase(msg, this.symEncryptionKey, nonce);
    }
  }, {
    key: 'symDecrypt',
    value: function symDecrypt(ciphertext, nonce, toBuffer) {
      return symDecryptBase(ciphertext, this.symEncryptionKey, nonce, toBuffer);
    }
  }, {
    key: 'getJWTSigner',
    value: function getJWTSigner() {
      return SimpleSigner(this.signingKey._hdkey._privateKey);
    }
  }, {
    key: 'signManagementTx',
    value: function signManagementTx(txParams) {
      if (this.externalMgmtKey) throw new Error('Can not sign transaction if externalMgmtKey is set');
      var privKey = this.managementKey.getWallet().getPrivateKey();
      var tx = new Tx(txParams);
      tx.sign(privKey);
      return '0x' + tx.serialize().toString('hex');
    }
  }, {
    key: 'getManagementAddress',
    value: function getManagementAddress() {
      if (this.externalMgmtKey) {
        return this.managementKey;
      }
      return this.managementKey.getWallet().getChecksumAddressString();
    }
  }, {
    key: 'getPublicKeys',
    value: function getPublicKeys() {
      return {
        signingKey: this.signingKey._hdkey._publicKey.toString('hex'),
        managementKey: this.externalMgmtKey ? this.managementKey : this.managementKey._hdkey._publicKey.toString('hex'),
        asymEncryptionKey: nacl.util.encodeBase64(this.asymEncryptionKey.publicKey)
      };
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var obj = { mnemonic: this.mnemonic };
      if (this.externalMgmtKey) {
        obj.externalMgmtKey = this.managementKey;
      }
      return obj;
    }
  }, {
    key: '_initKeys',
    value: function _initKeys(_ref2) {
      var mnemonic = _ref2.mnemonic,
          externalMgmtKey = _ref2.externalMgmtKey;

      this.mnemonic = mnemonic;
      var seed = bip39.mnemonicToSeed(mnemonic);
      var seedKey = hdkey.fromMasterSeed(seed);
      var baseKey = seedKey.derivePath(BASE_PATH);
      this.signingKey = baseKey.deriveChild(0);
      var tmpEncKey = baseKey.deriveChild(2)._hdkey._privateKey;
      this.asymEncryptionKey = nacl.box.keyPair.fromSecretKey(tmpEncKey);
      this.symEncryptionKey = baseKey.deriveChild(3)._hdkey._privateKey;

      if (externalMgmtKey) {
        this.managementKey = externalMgmtKey;
        this.externalMgmtKey = true;
      } else {
        // Management key is used to sign ethereum txs, so we use the MM base path
        this.managementKey = seedKey.derivePath(MM_PATH).deriveChild(0);
      }
    }
  }], [{
    key: 'recoverKeyring',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(shares) {
        var entropy;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return sss.combine(shares);

              case 2:
                entropy = _context2.sent;
                return _context2.abrupt('return', new Keyring({
                  mnemonic: bip39.entropyToMnemonic(entropy)
                }));

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function recoverKeyring(_x4) {
        return _ref3.apply(this, arguments);
      }

      return recoverKeyring;
    }()
  }]);
  return Keyring;
}();

var randomNonce = function randomNonce() {
  return nacl.randomBytes(24);
};

var didToBuffer = function didToBuffer(didUri) {
  var hash = didUri.split(':')[2];
  return bs58.decode(hash);
};

var symEncryptBase = function symEncryptBase(msg, symKey, nonce) {
  nonce = nonce || randomNonce();
  if (typeof msg === 'string') {
    msg = nacl.util.decodeUTF8(msg);
  }

  var ciphertext = nacl.secretbox(msg, nonce, symKey);

  return {
    nonce: nacl.util.encodeBase64(nonce),
    ciphertext: nacl.util.encodeBase64(ciphertext)
  };
};

var symDecryptBase = function symDecryptBase(ciphertext, symKey, nonce, toBuffer) {
  ciphertext = nacl.util.decodeBase64(ciphertext);
  nonce = nacl.util.decodeBase64(nonce);

  var cleartext = nacl.secretbox.open(ciphertext, nonce, symKey);
  if (toBuffer) {
    return cleartext ? Buffer.from(cleartext) : null;
  }
  return cleartext ? nacl.util.encodeUTF8(cleartext) : null;
};

module.exports = Keyring;