'use strict';

var ImmutableDBNotDefinedError = function ImmutableDBNotDefinedError() {
  return new Error('ImmutableDB instance not defined');
};
var LogNotDefinedError = function LogNotDefinedError() {
  return new Error('Log instance not defined');
};
var NotALogError = function NotALogError() {
  return new Error('Given argument is not an instance of Log');
};

module.exports = {
  ImmutableDBNotDefinedError: ImmutableDBNotDefinedError,
  LogNotDefinedError: LogNotDefinedError,
  NotALogError: NotALogError
};