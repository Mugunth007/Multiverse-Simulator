import { TimelineEvent, Character, MultiverseScenario, WorldQuestion } from '../types';

// Mock AI service - Replace these functions with actual GPT-API calls
export class AIService {
  private static instance: AIService;
  
  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateScenario(prompt: string): Promise<MultiverseScenario> {
    // TODO: Replace with actual GPT-API call
    console.log('🤖 AI Service: Generating scenario for:', prompt);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const scenarioId = Date.now().toString();
    
    // Mock data generation - replace with GPT responses
    const mockTimeline = this.generateMockTimeline(prompt);
    const mockCharacters = this.generateMockCharacters(prompt, scenarioId);
    
    return {
      id: scenarioId,
      prompt,
      title: this.extractScenarioTitle(prompt),
      description: `An alternate reality where ${prompt.toLowerCase().replace('what if ', '')}`,
      timeline: mockTimeline,
      characters: mockCharacters,
      worldState: {
        technology: 'Advanced beyond our timeline due to accelerated development',
        politics: 'Restructured around new power dynamics',
        culture: 'Evolved with different values and traditions',
        geography: 'Modified by alternate historical events'
      },
      artifacts: {
        maps: ['world-map-alternate.jpg'],
        flags: ['empire-flag.jpg', 'resistance-flag.jpg'],
        music: ['anthem.mp3', 'cultural-theme.mp3'],
        documents: ['constitution-alt.pdf', 'manifesto.pdf']
      },
      createdAt: new Date()
    };
  }

  async answerWorldQuestion(question: string, scenario: MultiverseScenario): Promise<WorldQuestion> {
    // TODO: Replace with actual GPT-API call with context
    console.log('🤖 AI Service: Answering question about world:', question);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      id: Date.now().toString(),
      question,
      answer: this.generateMockAnswer(question, scenario),
      category: this.categorizeQuestion(question),
      timestamp: new Date()
    };
  }

  async generateCharacterEvolution(character: Character, scenario: MultiverseScenario): Promise<Character> {
    // TODO: Replace with actual GPT-API call
    console.log('🤖 AI Service: Evolving character:', character.name);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      ...character,
      goals: [...character.goals, 'Adapt to changing world dynamics'],
      personality: [...character.personality, 'increasingly adaptive']
    };
  }

  private extractScenarioTitle(prompt: string): string {
    return prompt.replace(/what if /i, '').replace(/\?/g, '').trim()
      .split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  private generateMockTimeline(prompt: string): TimelineEvent[] {
    // Mock timeline generation - replace with GPT
    const baseYear = 1000;
    return Array.from({ length: 8 }, (_, i) => ({
      id: `event-${i}`,
      year: baseYear + (i * 200),
      title: `Major Event ${i + 1}`,
      description: `Significant change resulting from: ${prompt}`,
      impact: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
      category: ['political', 'technological', 'cultural', 'military', 'economic'][Math.floor(Math.random() * 5)] as any
    }));
  }

  private generateMockCharacters(prompt: string, timelineId: string): Character[] {
    // Mock character generation - replace with GPT
    const names = ['Aria Stellaris', 'Marcus Technos', 'Elena Vortex', 'Kai Quantum'];
    return names.map((name, i) => ({
      id: `char-${i}`,
      name,
      title: `${['Emperor', 'Inventor', 'Revolutionary', 'Philosopher'][i]} of the New Age`,
      description: `A key figure shaped by the alternate timeline where ${prompt}`,
      personality: ['ambitious', 'intelligent', 'charismatic'],
      goals: ['Reshape society', 'Advance knowledge', 'Protect allies'],
      relationships: {},
      timeline: timelineId,
      status: 'alive' as const
    }));
  }

  private generateMockAnswer(question: string, scenario: MultiverseScenario): string {
    return `In this alternate reality, ${question.toLowerCase()} has evolved uniquely due to the conditions set by "${scenario.prompt}". The answer involves complex interactions between technology, society, and the natural world that differ significantly from our timeline.`;
  }

  private categorizeQuestion(question: string): string {
    const categories = {
      'technology': ['tech', 'science', 'invention', 'machine'],
      'culture': ['culture', 'society', 'people', 'tradition'],
      'politics': ['government', 'politics', 'law', 'power'],
      'geography': ['geography', 'land', 'climate', 'environment']
    };
    
    const lowerQuestion = question.toLowerCase();
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
        return category;
      }
    }
    return 'general';
  }
}