export default class Analytics {
  constructor() {
    this.ipCounts = new Map();
    this.urlCounts = new Map();
    this.uniqueIPs = new Set();
  }

  processLogEntry({ ipAddress, url }) {
    // Update IP counts
    this.ipCounts.set(ipAddress, (this.ipCounts.get(ipAddress) || 0) + 1);
    this.uniqueIPs.add(ipAddress);

    // Update URL counts
    this.urlCounts.set(url, (this.urlCounts.get(url) || 0) + 1);
  }

  getUniqueIPCount() {
    return this.uniqueIPs.size;
  }

  hasData() {
    return this.ipCounts.size > 0 && this.urlCounts.size > 0;
  }

  getTopN(map, n) {
    const sortedEntries = Array.from(map.entries()).sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
    );

    // Find all entries that tie for the top N counts
    const result = [];
    let rank = 0;
    let prevCount = null;

    for (const [key, count] of sortedEntries) {
      if (prevCount !== count) {
        rank += 1;
        if (rank > n) break;
      }
      result.push({ key, count, rank });
      prevCount = count;
    }

    return result;
  }

  printResults() {
    console.log(`\nNumber of Unique IP Addresses: ${this.getUniqueIPCount()}`);

    console.log('\nTop 3 Most Visited URLs:');
    this.displayTopNResults(this.getTopN(this.urlCounts, 3), 'visits');

    console.log('\nTop 3 Most Active IP Addresses:');
    this.displayTopNResults(this.getTopN(this.ipCounts, 3), 'requests');
  }

  displayTopNResults(results, metric) {
    const groupedResults = results.reduce((acc, { key, count, rank }) => {
      if (!acc[rank]) acc[rank] = [];
      acc[rank].push({ key, count });
      return acc;
    }, {});

    for (let i = 1; i <= 3; i++) {
      const ordinal = getOrdinal(i);
      if (groupedResults[i]) {
        const { count } = groupedResults[i][0];
        console.log(`\n${ordinal} - ${count} ${metric}:`);
        groupedResults[i].forEach(({ key }) => console.log(key));
      } else {
        console.log(`\n${ordinal}:`);
        console.log('N/A');
      }
    }
  }
}

function getOrdinal(n) {
  const ordinals = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return `${n}${ordinals[(v - 20) % 10] || ordinals[v] || ordinals[0]}`;
}
