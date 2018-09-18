'use strict'

const ImmutableDBNotDefinedError = () => new Error('ImmutableDB instance not defined')
const LogNotDefinedError = () => new Error('Log instance not defined')
const NotALogError = () => new Error('Given argument is not an instance of Log')

module.exports = {
  ImmutableDBNotDefinedError: ImmutableDBNotDefinedError,
  LogNotDefinedError: LogNotDefinedError,
  NotALogError: NotALogError,
}
