import { Trie } from "../dsa/Trie";
import { STOCKS } from "../data/stocks";

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