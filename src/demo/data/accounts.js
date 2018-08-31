// Logos
import LogoGitcoin from "assets/logoGitcoin.jpg";
import logoBountiesNetwork from "assets/logoBountiesNetwork.jpg";
import LogoGnosis from "assets/logoGnosis.png";
import LogoGovernX from "assets/logoGovernX.png";
import LogoAugur from "assets/logoAugur.png";

// Blockies
import blockiePurple from "assets/blockiePurple.png";
import blockieGreen from "assets/blockieGreen.png";
import blockieYellow from "assets/blockieYellow.png";

// Background
import bgUniverse from "src/assets/images/bgUniverse.jpg";

export default [
  {
    balanceEth: 4.20,
    balanceTokens: 10,
    balanceCurrency: 5203,
    category: "Bounties",
    bg: bgUniverse,
    blockie: blockiePurple,
    gradient:["#6832a2", "#4e3df5"],
    transactionsCount: 128,
    interactions: [
      {
        address: "0xgit",
        logo: LogoGitcoin
      },
      {
        address: "0xbounty",
        logo: logoBountiesNetwork
      }
    ]
  }
];
