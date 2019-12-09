import ENS from 'ethereum-ens';
import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider();
const ens = new ENS(provider);

const fetchEns = async (address) => {
  try {
    // console.log('ensobj', ens);
    // console.log('ensobj2', ens.reverse);
    // let name = await ens.reverse(address).name();
    // // Check to be sure the reverse record is correct.
    // if (address !== await ens.resolver(name).addr()) {
    //   name = null;
    // }
    // console.log('canonicalname', name);

    // if (name) return name;

    const ensDomainRequest = {
      query: ` {
          domains(where:{ owner: "${address}" }) {
            name
          }
        }`,
    };

    const res = await fetch('https://api.thegraph.com/subgraphs/name/ensdomains/ens', {
      method: 'POST',
      body: JSON.stringify(ensDomainRequest),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200 && res.status !== 201) throw new Error('Failed', res);

    const {
      data,
      errors,
    } = await res.json();
    if (data.domains.length) return data.domains[0].name;

    return errors;
  } catch (error) {
    console.log('ensRequest', error);
  }
};

export default fetchEns;