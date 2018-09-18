'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IPFS = require('ipfs-mini');
var promisifyAll = require('bluebird').promisifyAll;
var resolve = require('did-resolver');
var registerMuportResolver = require('muport-did-resolver');
var didJWT = require('did-jwt');
var bs58 = require('bs58');
var Keyring = require('./keyring');
var EthereumUtils = require('./ethereum-utils');

var IPFS_CONF = { host: 'ipfs.infura.io', port: 5001, protocol: 'https' };
var ipfs = void 0;

/**
 * Primary object for interacting with a µPort identity. MuPort enables creation and
 * updating of µPort identities. It also provides functionality to sign claims and
 * help other identities recover.
 */

var MuPort = function () {

  /**
   * Instantiates a µPort identity from its serialized state.
   *
   * @param     {String}    serializeState          the serialized state of a µPort identity
   * @param     {Object}    [opts]                  optional parameters
   * @param     {Object}    opts.ipfsConf           configuration options for ipfs-mini
   * @param     {String}    opts.rpcProviderUrl     rpc url to a custom ethereum node
   * @return    {MuPort}                            self
   */
  function MuPort(serializeState) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, MuPort);

    initIpfs(opts.ipfsConf);
    this._initIdentity(serializeState);

    this.ethUtils = new EthereumUtils(opts.rpcProviderUrl);
    registerMuportResolver({ ipfsConf: opts.ipfsConf, rpcProviderUrl: opts.rpcProviderUrl });
  }

  (0, _createClass3.default)(MuPort, [{
    key: '_initIdentity',
    value: function _initIdentity(serializeState) {
      var state = JSON.parse(serializeState);
      if (!state.did || !state.document || !state.keyring) {
        throw new Error('Data missing for restoring identity');
      }
      this.did = state.did;
      this.document = state.document;
      this.documentHash = state.documentHash || this.did.split(':')[2];
      this.keyring = new Keyring(state.keyring);

      // TODO - verify integrity of identity (resolving ID should result in the same did document, etc)
    }

    /**
     * Help another identity recover. Returns a decrypted share if the current identity is a delegate
     * returns undefined otherwise
     *
     * @param     {String}    did             the did of the identity that should be recovered
     * @return    {Promise<String, Error>}    a share that the recovering identity can use
     */

  }, {
    key: 'helpRecover',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(did) {
        var muportDoc;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return MuPort.resolveIdentityDocument(did);

              case 2:
                muportDoc = _context.sent;
                return _context.abrupt('return', this.keyring.decryptOneShare(muportDoc.recoveryNetwork, muportDoc.asymEncryptionKey, this.did));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function helpRecover(_x2) {
        return _ref.apply(this, arguments);
      }

      return helpRecover;
    }()

    /**
     * The DID is the identifier of the identity. This is a unique string that can be used to
     * look up information about the identity.
     *
     * @return    {String}        the DID
     */

  }, {
    key: 'getDid',
    value: function getDid() {
      return this.did;
    }

    /**
     * The DID Document is a json object that contains information such as public keys
     *
     * @return    {Object}        the DID Document
     */

  }, {
    key: 'getDidDocument',
    value: function getDidDocument() {
      return this.document;
    }

    /**
     * The recovery delegates that can help this identity recover
     *
     * @return    {Array<String>}        an array containing the DIDs of the delegates
     */

  }, {
    key: 'getRecoveryDelegateDids',
    value: function getRecoveryDelegateDids() {
      var _this = this;

      var toBuffer = true;
      var dids = [];
      if (this.document.symEncryptedData && this.document.symEncryptedData.symEncDids) {
        dids = this.document.symEncryptedData.symEncDids.map(function (encDid) {
          return bufferToDid(_this.keyring.symDecrypt(encDid.ciphertext, encDid.nonce, toBuffer));
        });
      }
      return dids;
    }

    /**
     * This function is used to update the publicProfile and/or the recoveryNetwork of the identity.
     * The returned object has three properties; `address` an ethereum address, `costInEther` a number,
     * and `finishUpdate` a function.
     * In order to complete the update of the delegates you have to
     * send `costInEther` ether to the `address` on mainnet (or other network if you are using
     * a custom config). Once that is done the `finishUpdate` function can be called. This
     * function sends a transaction to the network that updates the identity. The function
     * will throw an error if there is to little ether in the `address`.
     * Both publicProfile and delegateDids are optional and you may pass null if you don't wish to
     * update one of them.
     *
     * @param     {Object}            publicProfile       a new public profile for the identity
     * @param     {Array<String>}     delegateDids        an array containing the 3 DIDs of the new delegates
     * @return    {Promise<Object, Error>}                an object with the data needed to finalize the update
     */

  }, {
    key: 'updateIdentity',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(publicProfile, delegateDids) {
        var _this2 = this;

        var newDocument, didsPublicKeys, newDocumentHash, address, txParams, costInEther, signedTx;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!publicProfile && !delegateDids)) {
                  _context4.next = 2;
                  break;
                }

                throw new Error('publicProfile or delegateDids has to be set');

              case 2:
                newDocument = JSON.parse((0, _stringify2.default)(this.document));

                if (publicProfile) {
                  newDocument.publicProfile = publicProfile;
                }

                if (!delegateDids) {
                  _context4.next = 15;
                  break;
                }

                if (!(delegateDids.length !== 3)) {
                  _context4.next = 7;
                  break;
                }

                throw new Error('Must provide exactly 3 DIDs');

              case 7:
                _context4.next = 9;
                return _promise2.default.all(delegateDids.map(function () {
                  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(did) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return MuPort.resolveIdentityDocument(did);

                          case 2:
                            return _context2.abrupt('return', _context2.sent.asymEncryptionKey);

                          case 3:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function (_x5) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 9:
                didsPublicKeys = _context4.sent;
                _context4.next = 12;
                return this.keyring.createShares(delegateDids, didsPublicKeys);

              case 12:
                newDocument.recoveryNetwork = _context4.sent;

                // save guardians
                newDocument.symEncryptedData = newDocument.symEncryptedData || {};
                newDocument.symEncryptedData.symEncDids = delegateDids.map(function (did) {
                  return _this2.keyring.symEncrypt(didToBuffer(did));
                });

              case 15:
                _context4.next = 17;
                return ipfs.addJSONAsync(newDocument);

              case 17:
                newDocumentHash = _context4.sent;

                // prepare ethereum tx
                address = this.keyring.getManagementAddress();
                _context4.next = 21;
                return this.ethUtils.createPublishTxParams(newDocumentHash, address);

              case 21:
                txParams = _context4.sent;
                costInEther = this.ethUtils.calculateTxCost(txParams);
                signedTx = this.keyring.externalMgmtKey ? null : this.keyring.signManagementTx(txParams);
                return _context4.abrupt('return', {
                  txParams: txParams,
                  address: address,
                  costInEther: costInEther,
                  finishUpdate: function () {
                    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(txHash) {
                      return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.t0 = txHash;

                              if (_context3.t0) {
                                _context3.next = 5;
                                break;
                              }

                              _context3.next = 4;
                              return _this2.ethUtils.sendRawTx(signedTx);

                            case 4:
                              _context3.t0 = _context3.sent;

                            case 5:
                              txHash = _context3.t0;
                              _context3.prev = 6;
                              _context3.next = 9;
                              return _this2.ethUtils.waitForTx(txHash);

                            case 9:
                              _this2.document = newDocument;
                              _this2.documentHash = newDocumentHash;
                              _context3.next = 16;
                              break;

                            case 13:
                              _context3.prev = 13;
                              _context3.t1 = _context3['catch'](6);
                              throw new Error('There was a problem with sending the transaction' + _context3.t1);

                            case 16:
                            case 'end':
                              return _context3.stop();
                          }
                        }
                      }, _callee3, _this2, [[6, 13]]);
                    }));

                    function finishUpdate(_x6) {
                      return _ref4.apply(this, arguments);
                    }

                    return finishUpdate;
                  }()
                });

              case 25:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateIdentity(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return updateIdentity;
    }()

    /**
     * Signs the given payload (claim) and return a promis with the JWT.
     *
     * @return    {Promise<String, Error>}        a promise that resolves to a JWT
     */

  }, {
    key: 'signJWT',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(payload) {
        var settings;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                settings = {
                  signer: this.keyring.getJWTSigner(),
                  issuer: this.did
                  // TODO - should we have an expiry?
                };
                return _context5.abrupt('return', didJWT.createJWT(payload, settings));

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function signJWT(_x7) {
        return _ref5.apply(this, arguments);
      }

      return signJWT;
    }()

    /**
     * Verifies a JWT.
     *
     * @param     {String}        jwt                 the JWT to verify
     * @param     {String}        audience=this.did   the audience, defaults to did of current identity
     * @return    {Promise<Object, Error>}            a promise that resolves to the decoded JWT
     */

  }, {
    key: 'verifyJWT',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(jwt) {
        var audience = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.did;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt('return', didJWT.verifyJWT(jwt, { audience: audience }));

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function verifyJWT(_x9) {
        return _ref6.apply(this, arguments);
      }

      return verifyJWT;
    }()

    /**
     * Asymmetrically encrypt a message
     *
     * @param     {String}        msg                 the message to encrypt
     * @param     {String}        toPublic            the public key to encrypt to, encoded as a base64 string
     * @param     {String}        nonce               (optional) the nonce, encoded as a base64 string
     * @return    {Object}                            an object containing the nonce and the ciphertext
     */

  }, {
    key: 'encrypt',
    value: function encrypt(msg, toPublic, nonce) {
      return this.keyring.encrypt(msg, toPublic, nonce);
    }

    /**
     * Decrypt an asymmetrically encrypted message
     *
     * @param     {String}            ciphertext          the ciphertext to decrypt, encoded as a base64 string
     * @param     {String}            fromPublic          the public key of the entity that encrypted the msg, encoded as a base64 string
     * @param     {String}            nonce               the nonce, encoded as a base64 string
     * @param     {Boolean}           toBuffer            a boolean deciding whether to
     * @return    {String | Buffer}                       the decrypted message
     */

  }, {
    key: 'decrypt',
    value: function decrypt(ciphertext, fromPublic, nonce, toBuffer) {
      return this.keyring.decrypt(ciphertext, fromPublic, nonce, toBuffer);
    }

    /**
     * Symmetrically encrypt a message
     *
     * @param     {String}        msg                 the message to encrypt
     * @param     {String}        nonce               (optional) the nonce, encoded as a base64 string
     * @return    {Object}                            an object containing the nonce and the ciphertext
     */

  }, {
    key: 'symEncrypt',
    value: function symEncrypt(msg, nonce) {
      return this.keyring.symEncrypt(msg, nonce);
    }

    /**
     * Decrypt a symmetrically encrypted message
     *
     * @param     {String}            ciphertext          the ciphertext to decrypt, encoded as a base64 string
     * @param     {String}            nonce               the nonce, encoded as a base64 string
     * @param     {Boolean}           toBuffer            a boolean deciding whether to
     * @return    {String | Buffer}                       the decrypted message
     */

  }, {
    key: 'symDecrypt',
    value: function symDecrypt(ciphertext, nonce, toBuffer) {
      return this.keyring.symDecrypt(ciphertext, nonce, toBuffer);
    }

    /**
     * Serialize the state of the current identity to be able to reconstruct it later.
     *
     * @return    {String}    the serialized state
     */

  }, {
    key: 'serializeState',
    value: function serializeState() {
      return (0, _stringify2.default)({
        did: this.did,
        document: this.document,
        documentHash: this.documentHash,
        keyring: this.keyring.serialize()
      });
    }

    /**
     * Creates a new µPort identity.
     *
     * @param     {Object}            publicProfile           a public profile for the new identity
     * @param     {Array<String>}     delegateDids            three DIDs that can be used to recover the identity at a later point (optional)
     * @param     {Object}            [opts]                  optional parameters
     * @param     {String}            opts.externalMgmtKey    an ethereum address to be used as an external managementKey
     * @param     {Object}            opts.ipfsConf           configuration options for ipfs-mini
     * @param     {String}            opts.rpcProviderUrl     rpc url to a custom ethereum node
     * @return    {Promise<MuPort, Error>}                    a promise that resolves to an instance of the MuPort class
     */

  }], [{
    key: 'newIdentity',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(publicProfile, delegateDids) {
        var _this3 = this;

        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var keyring, recoveryNetwork, symEncryptedData, didsPublicKeys, symEncryptedDelegateDids, publicKeys, doc, docHash, did;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                initIpfs(opts.ipfsConf);
                keyring = new Keyring(opts);
                recoveryNetwork = void 0;
                symEncryptedData = void 0;

                if (!delegateDids) {
                  _context8.next = 13;
                  break;
                }

                _context8.next = 7;
                return _promise2.default.all(delegateDids.map(function () {
                  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(did) {
                    return _regenerator2.default.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return MuPort.resolveIdentityDocument(did, opts);

                          case 2:
                            return _context7.abrupt('return', _context7.sent.asymEncryptionKey);

                          case 3:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee7, _this3);
                  }));

                  return function (_x13) {
                    return _ref8.apply(this, arguments);
                  };
                }()));

              case 7:
                didsPublicKeys = _context8.sent;
                _context8.next = 10;
                return keyring.createShares(delegateDids, didsPublicKeys);

              case 10:
                recoveryNetwork = _context8.sent;
                symEncryptedDelegateDids = delegateDids.map(function (did) {
                  return keyring.symEncrypt(didToBuffer(did));
                });

                symEncryptedData = { symEncDids: symEncryptedDelegateDids };

              case 13:
                publicKeys = keyring.getPublicKeys();
                doc = createMuportDocument(publicKeys, recoveryNetwork, publicProfile, symEncryptedData);
                _context8.next = 17;
                return ipfs.addJSONAsync(doc);

              case 17:
                docHash = _context8.sent;
                did = 'did:muport:' + docHash;
                return _context8.abrupt('return', new MuPort((0, _stringify2.default)({
                  did: did,
                  document: doc,
                  documentHash: docHash,
                  keyring: keyring.serialize()
                }), opts));

              case 20:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function newIdentity(_x11, _x12) {
        return _ref7.apply(this, arguments);
      }

      return newIdentity;
    }()

    /**
     * Recovers a µPort identity.
     *
     * @param     {String}            did                     the DID of the identity to be recovered
     * @param     {Array<String>}     shares                  atleast two shares that your delegates helped recover
     * @param     {Object}            [opts]                  optional parameters
     * @param     {Object}            opts.ipfsConf           configuration options for ipfs-mini
     * @param     {String}            opts.rpcProviderUrl     rpc url to a custom ethereum node
     * @return    {Promise<MuPort, Error>}                    a promise that resolves to an instance of the MuPort class
     */

  }, {
    key: 'recoverIdentity',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(did, shares) {
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                initIpfs(opts.ipfsConf);
                _context9.t0 = MuPort;
                _context9.t1 = _stringify2.default;
                _context9.t2 = did;
                _context9.next = 6;
                return MuPort.resolveIdentityDocument(did, opts);

              case 6:
                _context9.t3 = _context9.sent;
                _context9.next = 9;
                return Keyring.recoverKeyring(shares);

              case 9:
                _context9.t4 = _context9.sent.serialize();
                _context9.t5 = {
                  did: _context9.t2,
                  document: _context9.t3,
                  keyring: _context9.t4
                };
                _context9.t6 = (0, _context9.t1)(_context9.t5);
                _context9.t7 = opts;
                return _context9.abrupt('return', new _context9.t0(_context9.t6, _context9.t7));

              case 14:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function recoverIdentity(_x15, _x16) {
        return _ref9.apply(this, arguments);
      }

      return recoverIdentity;
    }()

    /**
     * Resovles the identity document for the given DID.
     *
     * @param     {String}            did                     the DID of the identity
     * @param     {Object}            [opts]                  optional parameters
     * @param     {Object}            opts.ipfsConf           configuration options for ipfs-mini
     * @param     {String}            opts.rpcProviderUrl     rpc url to a custom ethereum node
     * @return    {Promise<Object, Error>}                    a promise that resolves to the identity document
     */

  }, {
    key: 'resolveIdentityDocument',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(did, opts) {
        var didDoc, managementKeyStruct, publicKeys, recoveryNetwork, publicProfile, symEncryptedData;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (opts) {
                  registerMuportResolver({ ipfsConf: opts.ipfsConf, rpcProviderUrl: opts.rpcProviderUrl });
                }
                _context10.next = 3;
                return resolve(did);

              case 3:
                didDoc = _context10.sent;
                managementKeyStruct = didDoc.publicKey.find(function (key) {
                  return key.id.indexOf('#managementKey') !== -1;
                });
                publicKeys = {
                  signingKey: didDoc.publicKey.find(function (key) {
                    return key.id.indexOf('#signingKey') !== -1;
                  }).publicKeyHex,
                  managementKey: managementKeyStruct.publicKeyHex || managementKeyStruct.ethereumAddress,
                  asymEncryptionKey: didDoc.publicKey.find(function (key) {
                    return key.id.indexOf('#encryptionKey') !== -1;
                  }).publicKeyBase64
                };
                recoveryNetwork = didDoc.muportData.recoveryNetwork;
                publicProfile = didDoc.uportProfile;
                symEncryptedData = didDoc.muportData.symEncryptedData;
                return _context10.abrupt('return', createMuportDocument(publicKeys, recoveryNetwork, publicProfile, symEncryptedData));

              case 10:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function resolveIdentityDocument(_x17, _x18) {
        return _ref10.apply(this, arguments);
      }

      return resolveIdentityDocument;
    }()
  }]);
  return MuPort;
}();

var initIpfs = function initIpfs(ipfsConf) {
  ipfs = promisifyAll(new IPFS(ipfsConf || IPFS_CONF));
};

var createMuportDocument = function createMuportDocument(publicKeys, recoveryNetwork, publicProfile, symEncryptedData) {
  var doc = (0, _extends3.default)({
    version: 1
  }, publicKeys);
  if (recoveryNetwork) {
    doc.recoveryNetwork = recoveryNetwork;
  }
  if (publicProfile) {
    doc.publicProfile = publicProfile;
  }
  if (symEncryptedData) {
    doc.symEncryptedData = symEncryptedData;
  }
  return doc;
};

var bufferToDid = function bufferToDid(didBuffer) {
  return 'did:muport:' + bs58.encode(didBuffer);
};

var didToBuffer = function didToBuffer(didUri) {
  var hash = didUri.split(':')[2];
  return bs58.decode(hash);
};

module.exports = MuPort;