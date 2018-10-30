// let webThree = {};

// if (window.ethereum) {
//   console.log('ethereum');
//   webThree = new Web3(ethereum); // eslint-disable-line no-undef
//   // window.web3 = new Web3(ethereum); // eslint-disable-line no-undef
//   try {
//     ethereum.enable(); // eslint-disable-line no-undef
//     // await ethereum.enable(); // eslint-disable-line no-undef
//     // Acccounts now exposed
//   } catch (error) {
//     // add function to handle refuse access here
//   }
// } else if (window.web3) {
//   console.log('web3');
//   webThree = new Web3(web3.currentProvider); // eslint-disable-line no-undef
//   // window.web3 = new Web3(web3.currentProvider); // eslint-disable-line no-undef
//   // Acccounts always exposed
// } else {
//   console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
// }

// export {
//   webThree as
//   default,
// };