  var send = function send() {
    var defer = promiEvent(!isSendTx),
        payload = method.toPayload(Array.prototype.slice.call(arguments)); // CALLBACK function

    var sendTxCallback = function sendTxCallback(err, result) {
      try {
        result = method.formatOutput(result);
      } catch (e) {
        err = e;
      }

      if (result instanceof Error) {
        err = result;
      }

      if (!err) {
        if (payload.callback) {
          payload.callback(null, result);
        }
      } else {
        if (err.error) {
          err = err.error;
        }

        return utils._fireError(err, defer.eventEmitter, defer.reject, payload.callback);
      } // return PROMISE


      if (!isSendTx) {
        if (!err) {
          defer.resolve(result);
        } // return PROMIEVENT

      } else {
        defer.eventEmitter.emit('transactionHash', result);

        method._confirmTransaction(defer, result, payload);
      }
    }; // SENDS the SIGNED SIGNATURE


    var sendSignedTx = function sendSignedTx(sign) {
      var signedPayload = _.extend({}, payload, {
        method: 'eth_sendRawTransaction',
        params: [sign.rawTransaction]
      });

      method.requestManager.send(signedPayload, sendTxCallback);
    };

    var sendRequest = function sendRequest(payload, method) {
      if (method && method.accounts && method.accounts.wallet && method.accounts.wallet.length) {
        var wallet; // ETH_SENDTRANSACTION

        if (payload.method === 'eth_sendTransaction') {
          var tx = payload.params[0];
          wallet = getWallet(_.isObject(tx) ? tx.from : null, method.accounts); // If wallet was found, sign tx, and send using sendRawTransaction

          if (wallet && wallet.privateKey) {
            return method.accounts.signTransaction(_.omit(tx, 'from'), wallet.privateKey).then(sendSignedTx);
          } // ETH_SIGN

        } else if (payload.method === 'eth_sign') {
          var data = payload.params[1];
          wallet = getWallet(payload.params[0], method.accounts); // If wallet was found, sign tx, and send using sendRawTransaction

          if (wallet && wallet.privateKey) {
            var sign = method.accounts.sign(data, wallet.privateKey);

            if (payload.callback) {
              payload.callback(null, sign.signature);
            }

            defer.resolve(sign.signature);
            return;
          }
        }
      }

      return method.requestManager.send(payload, sendTxCallback);
    }; // Send the actual transaction


    if (isSendTx && _.isObject(payload.params[0]) && typeof payload.params[0].gasPrice === 'undefined') {
      var getGasPrice = new Method({
        name: 'getGasPrice',
        call: 'eth_gasPrice',
        params: 0
      }).createFunction(method.requestManager);
      getGasPrice(function (err, gasPrice) {
        if (gasPrice) {
          payload.params[0].gasPrice = gasPrice;
        }

        sendRequest(payload, method);
      });
    } else {
      sendRequest(payload, method);
    }

    return defer.eventEmitter;
  }; // necessary to attach things to the method