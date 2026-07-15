import { Trie } from "../dsa/Trie.js";
import { STOCKS } from "../data/stocks.js";

const trie = new Trie();

// Build the Trie once when the server starts
for (const stock of STOCKS) {
  trie.insert(stock);
}

/**
 * Returns matching stock symbols for a given prefix.
 */
export function searchStocks(prefix: string): string[] {
  if (!prefix.trim()) {
    return [];
  }

  return trie.startsWith(prefix);
}