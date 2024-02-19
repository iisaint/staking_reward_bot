const axios = require('axios').default;

module.exports = class Onekv {
  constructor(){}

  async getRank(stashList, network='polkadot') {
    try {
      console.log(stashList);
      const response = await axios.get('https://polkadot.w3f.community/candidates');
      const candidates = response.data;
      // Sort the candidates by the 'total' field in descending order
      const sortedCandidates = candidates.sort((a, b) => b.total - a.total);
      // Add a rank based on the sorting
      sortedCandidates.forEach((candidate, index) => {
        candidate.rank = index + 1; // Adding 1 to start the ranking at 1 instead of 0
      });

      // Filter candidates based on the stash list for the specified network
      const filteredCandidates = sortedCandidates.filter(candidate =>
        stashList.some(stashItem => stashItem.stash === candidate.stash && stashItem.network === network)
      );

      const finalCandidates = filteredCandidates.map((candidate) => ({
        name: candidate.name,
        rank: candidate.rank,
        total: candidate.total,
        score: candidate.score
    }));

      console.log(`finalCandidates: ${finalCandidates.length}`)
      console.log(finalCandidates);
      return finalCandidates;
    } catch (error) {
      console.error('Failed to fetch and sort candidates:', error.message);
    }
    
  }

}