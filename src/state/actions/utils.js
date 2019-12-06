import ens from 'ethereum-ens';

const fetchEns = async (address) => {
  try {
    let name = await ens.reverse(address).name();
    // Check to be sure the reverse record is correct.
    if (address !== await ens.resolver(name).addr()) {
      name = null;
    }
    console.log('canonicalname', name);

    if (name) return name;

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

    if (data) return data.domains[0].name;

    return errors;
  } catch (error) {
    console.log('ensRequest', error);
  }
};

export default fetchEns;