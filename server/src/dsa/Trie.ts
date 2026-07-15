class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let current = this.root;

    for (const char of word.toUpperCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }

      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
  }

  search(word: string): boolean {
    let current = this.root;

    for (const char of word.toUpperCase()) {
      if (!current.children.has(char)) {
        return false;
      }

      current = current.children.get(char)!;
    }

    return current.isEndOfWord;
  }

  startsWith(prefix: string): string[] {
    let current = this.root;

    for (const char of prefix.toUpperCase()) {
      if (!current.children.has(char)) {
        return [];
      }

      current = current.children.get(char)!;
    }

    const words: string[] = [];

    this.collectWords(current, prefix.toUpperCase(), words);

    return words;
  }

  private collectWords(
    node: TrieNode,
    currentWord: string,
    words: string[]
  ) {
    if (node.isEndOfWord) {
      words.push(currentWord);
    }

    for (const [char, child] of node.children) {
      this.collectWords(
        child,
        currentWord + char,
        words
      );
    }
  }
}