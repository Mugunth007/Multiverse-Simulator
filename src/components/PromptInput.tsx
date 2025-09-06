import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from './common/Button';
import { Card } from './common/Card';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  loading: boolean;
}

const EXAMPLE_PROMPTS = [
  "What if the Roman Empire never fell?",
  "What if AI was invented in 1700?",
  "What if the Library of Alexandria was never destroyed?",
  "What if humans developed telepathy in ancient times?",
  "What if the dinosaurs never went extinct?"
];

export const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, loading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onSubmit(prompt.trim());
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
          <Sparkles className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-blue-300 text-sm font-medium">AI Multiverse Simulator</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Explore Infinite Possibilities
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Enter any "What if" scenario and watch as AI generates an entire alternate universe complete with 
          timelines, characters, and immersive narratives.
        </p>
      </div>

      <Card className="p-8" gradient>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What if... (e.g., What if the Roman Empire never fell?)"
              className="w-full px-6 py-4 bg-gray-850/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 font-medium"
              disabled={loading}
            />
            <Button
              type="submit"
              className="absolute right-3 top-3 bottom-3"
              loading={loading}
              disabled={!prompt.trim()}
              icon={<Send className="w-4 h-4" />}
            >
              Generate
            </Button>
          </div>
        </form>

        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4 font-medium">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                disabled={loading}
                className="px-3 py-2 text-xs bg-gray-850/50 hover:bg-gray-800/50 text-gray-400 hover:text-white rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 disabled:opacity-50 font-medium"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};