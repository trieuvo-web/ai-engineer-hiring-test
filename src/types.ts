// Shared types for the hiring test

export interface Rule {
  id: string;
  name: string;
  description: string;
  conditions: string[];
  category: 'discount' | 'eligibility' | 'fraud';
}

export interface SearchResult {
  rule: Rule;
  score: number;
  matchReason: string; // why this rule matched the query
}

// TODO: Add your own types as needed
