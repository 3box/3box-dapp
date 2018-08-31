export default [
  // Demo 1 : Identity Information
  {
    hash: "0x4203",
    title: "Identity Information",
    anchor: {
      name: "Unity",
      signature: "0xKAM35"
    },
    claim: {
      name: "Kames Cox-Geraghty",
      dob: "Decebmer 28th, 1990",
      address: "49 Bogart, New York"
    },
    claimMeta: {
      name: {
        title: "Full Name"
      },
      dob: {
        title: "Birthday"
      },
      address: {
        title: "Address"
      },
    },
    content: {
      description: "The attestation was issued as a Proof of Individuality claim."
    },
    meta: {
      hash: "g8am20nfb62",
      issued: "April 15, 2016",
      expire: "Decebmer, 2019"
    },
  },

  // Demo 2 : Education Credential
  {
    hash: "0x4233",
    title: "Credential",
    anchor: {
      name: "MIT",
      signature: "0xKAM35"
    },
    claim: {
      name: "Certificate of Blockchain",
      institute: "MIT",
      description: "The applicant holding this Certificate has been Blockchain certified"
    },
    claimMeta: {
      name: {
        title: "Name"
      },
      institute: {
        title: "Institute"
      },
      description: {
        title: "Information",
        type: "note"
      },
    },
    content: {
      description: "The attestation was issued as a Education Credential claim."
    },
    meta: {
      hash: "k8mz1a04bqlx73",
      issued: "July 15th, 2016",
      expire: "January 1st, 2019",
      shares: 6,
    },
  }
];
