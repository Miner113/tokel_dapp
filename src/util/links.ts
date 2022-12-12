export default {
  explorers: {
    KMD: () => 'https://kmd.explorer.dexstats.info',
    GRMS: path => `https://explorer.grms.pw/${path}`,
    TKLTEST: path => `http://explorer.komodoplatform.com:20000/${path}/TKLTEST`,
    TKLTEST2: path => `http://explorer.komodoplatform.com:20000/${path}/TKLTEST2`,
  },
  insightApi: {
    GRMS: 'https://explorer.grms.pw/insight-api-komodo',
    KMD: 'https://kmd.explorer.dexstats.info/insight-api-komodo',
    TKLTEST: 'https://explorer.komodoplatform.com:10000/tkltest/api/',
  },
  discord: 'https://discord.gg/MHxJZVFkqa',
  website: 'https://tokel.io',
  websiteRoadmap: 'https://tokel.io/roadmap',
  githubIssue:
    'https://github.com/TokelPlatform/tokel_app/issues/new?assignees=&labels=bug&template=1-Bug_report.md',
  devEmail: 'mailto:support@tokel.io',
  security: 'https://hackernoon.com/best-practices-for-key-security-for-your-crypto-wallets',
};
