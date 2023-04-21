export default {
  explorers: {
    KMD: () => 'https://kmd.explorer.dexstats.info',
    NFTX: path => `https://explorer.nftx.pw/${path}`,
    TKLTEST: path => `http://explorer.komodoplatform.com:20000/${path}/TKLTEST`,
    TKLTEST2: path => `http://explorer.komodoplatform.com:20000/${path}/TKLTEST2`,
  },
  insightApi: {
    NFTX: 'https://explorer.nftx.pw/insight-api-komodo',
    KMD: 'https://kmd.explorer.dexstats.info/insight-api-komodo',
    TKLTEST: 'https://explorer.komodoplatform.com:10000/tkltest/api/',
  },
  discord: 'https://discord.gg/MHxJZVFkqa',
  website: 'https://nftx.pw',
  websiteRoadmap: 'https://nftx.pw',
  githubIssue:
    'https://github.com/nftx-sergei',
  devEmail: 'mailto:support@nftx.pw',
  security: 'https://hackernoon.com/best-practices-for-key-security-for-your-crypto-wallets',
};
