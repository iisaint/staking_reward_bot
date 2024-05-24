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

  async getRank_v2(stashList, network='polkadot') {
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

      // Calculate rankings for each field of interest
      const rankedFields = ['spanInclusion', 'inclusion', 'nominated', 'bonded', 'location', 'region', 'country', 'provider', 'nominatorStake', 'randomness'];
      rankedFields.forEach(field => {
        for (let x=0; x < filteredCandidates.length; x++) {
          let count = 0;
          let same = 0;
          for (let i=0; i < sortedCandidates.length; i++) {
            if (sortedCandidates[i].score) {
              if (parseFloat(filteredCandidates[x].score[field]) < parseFloat(sortedCandidates[i].score[field])) {
                count++;
              }
              if (parseFloat(filteredCandidates[x].score[field]) === parseFloat(sortedCandidates[i].score[field])) {
                same++;
              }
            }
          }
          filteredCandidates[x][`${field}_rank`] = `${count}/${sortedCandidates.length}/${same}`;
        }
      });

      const finalCandidates = filteredCandidates.map((candidate) => ({
        name: candidate.name,
        rank: candidate.rank,
        total: candidate.total,
        score: candidate.score,
        valid: candidate.valid,
        score: {
          aggregate: candidate.score.aggregate,
          spanInclusion: candidate.score.spanInclusion,
          spanInclusion_rank: candidate.spanInclusion_rank,
          inclusion: candidate.score.inclusion,
          inclusion_rank: candidate.inclusion_rank,
          nominated: candidate.score.nominated,
          nominated_rank: candidate.nominated_rank,
          bound: candidate.score.bonded,
          bonded_rank: candidate.bonded_rank,
          location: candidate.score.location,
          location_rank: candidate.location_rank,
          region: candidate.score.region,
          region_rank: candidate.region_rank,
          country: candidate.score.country,
          country_rank: candidate.country_rank,
          provider: candidate.score.provider,
          provider_rank: candidate.provider_rank,
          nominatorStake: candidate.score.nominatorStake,
          nominatorStake_rank: candidate.nominatorStake_rank,
          randomness: candidate.score.randomness,
          randomness_rank: candidate.randomness_rank
        }
      }));

      console.log(`finalCandidates: ${finalCandidates.length}`)
      console.log(finalCandidates);
      return finalCandidates;
    } catch (error) {
      console.error('Failed to fetch and sort candidates:', error.message);
    }
  }

}