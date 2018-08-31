import idx from './idx'
export const initialState = {
  provider: 'infura',
  chain: 'rinkeby'
}
export const getProvider = (state) =>state.provider
export const getDelta = (state,delta) =>state[delta] || null
export const getDeltaData = (state,delta) => (state[delta] && state[delta].data) || null
export const getDeltaStatus = (state,delta) => (state[delta] && state[delta].status) || null
export const getFilter = (state, key, value) => Object.keys(state).filter(item => idx(state, _=> _[item].data[key] ) === value ? 1 : 0)
export const getStarting = (state, starts) => Object.keys(state).filter(item => item.startsWith(starts)).map(filteredItem=> state[filteredItem])
export const getStartingData = (state, starts) => Object.keys(state).filter(item => item.startsWith(starts)).map(filteredItem=> state[filteredItem].data)
export const getBlockScan = (state) => Object.keys(state).filter(item => item.startsWith('block|scan')).map(filteredItem=> state[filteredItem])