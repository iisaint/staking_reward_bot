const Onekv = require('./onekv');

(async () => {
  const onekv = new Onekv();

  // 定義 stashList 和 network
  const stashList = [
    { stash: '16iiKwFsRKRsjAiEpD4zgNgEX84nzHtHHNFKXhz1sHtan3ne', network: 'polkadot' },
    { stash: '16SDUqoRr6f8DAyKhYWvo9dwFPdJHeFXFr1may1vhomqqPTQ', network: 'polkadot' },
    { stash: '12b843A8c1w4CnHNkLJxtAyMe6AjiiKvZqJ7R6kD66phq4eu', network: 'polkadot' },
    // 添加更多的 stash item 如需要
  ];
  const network = 'polkadot';

  try {
    const rankedCandidates = await onekv.getRank_v2(stashList, network);
    console.log('Ranked Candidates:', rankedCandidates);
  } catch (error) {
    console.error('Error fetching ranked candidates:', error);
  }
})();
