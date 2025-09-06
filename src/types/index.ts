export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  category: 'political' | 'technological' | 'cultural' | 'military' | 'economic' | 'natural';
}

export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  personality: string[];
  goals: string[];
  relationships: Record<string, string>;
  timeline: string; // Which timeline they belong to
  status: 'alive' | 'dead' | 'legendary' | 'unknown';
  imageUrl?: string;
}

export interface MultiverseScenario {
  id: string;
  prompt: string;
  title: string;
  description: string;
  timeline: TimelineEvent[];
  characters: Character[];
  worldState: {
    technology: string;
    politics: string;
    culture: string;
    geography: string;
  };
  artifacts: {
    maps: string[];
    flags: string[];
    music: string[];
    documents: string[];
  };
  createdAt: Date;
}

export interface WorldQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
  timestamp: Date;
}