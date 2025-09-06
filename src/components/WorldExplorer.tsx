import React, { useState } from 'react';
import { MessageCircle, Send, Globe, Music, Map, FileText, Image } from 'lucide-react';
import { MultiverseScenario, WorldQuestion } from '../types';
import { Card } from './common/Card';
import { Button } from './common/Button';

interface WorldExplorerProps {
  scenario: MultiverseScenario;
  onAskQuestion: (question: string) => Promise<WorldQuestion>;
  loading: boolean;
}

const QUICK_QUESTIONS = [
  "What is the dominant technology in this world?",
  "How do people govern themselves?",
  "What are the major cultural differences?",
  "What does art and music look like?",
  "How has geography been affected?",
  "What are the social structures like?"
];

export const WorldExplorer: React.FC<WorldExplorerProps> = ({
  scenario,
  onAskQuestion,
  loading
}) => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<WorldQuestion[]>([]);
  const [asking, setAsking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || asking) return;

    setAsking(true);
    try {
      const answer = await onAskQuestion(question.trim());
      setConversation(prev => [...prev, answer]);
      setQuestion('');
    } catch (error) {
      console.error('Failed to ask question:', error);
    } finally {
      setAsking(false);
    }
  };

  const handleQuickQuestion = async (quickQuestion: string) => {
    setQuestion(quickQuestion);
    if (asking) return;

    setAsking(true);
    try {
      const answer = await onAskQuestion(quickQuestion);
      setConversation(prev => [...prev, answer]);
    } catch (error) {
      console.error('Failed to ask question:', error);
    } finally {
      setAsking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3 flex items-center justify-center tracking-tight">
          <Globe className="w-7 h-7 mr-3 text-blue-500" />
          World Explorer
        </h2>
        <p className="text-gray-500 font-medium">
          Ask questions about this alternate reality and discover its secrets
        </p>
      </div>

      {/* World State Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 text-center" hover>
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Globe className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">Technology</h3>
          <p className="text-xs text-gray-400 font-normal leading-relaxed">{scenario.worldState.technology}</p>
        </Card>

        <Card className="p-6 text-center" hover>
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-4 h-4 text-green-400" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">Politics</h3>
          <p className="text-xs text-gray-400 font-normal leading-relaxed">{scenario.worldState.politics}</p>
        </Card>

        <Card className="p-6 text-center" hover>
          <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Music className="w-4 h-4 text-pink-400" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">Culture</h3>
          <p className="text-xs text-gray-400 font-normal leading-relaxed">{scenario.worldState.culture}</p>
        </Card>

        <Card className="p-6 text-center" hover>
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Map className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-2 tracking-tight">Geography</h3>
          <p className="text-xs text-gray-400 font-normal leading-relaxed">{scenario.worldState.geography}</p>
        </Card>
      </div>

      {/* Artifacts Preview */}
      <Card className="p-8" gradient>
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center tracking-tight">
          <Image className="w-5 h-5 mr-3 text-blue-400" />
          World Artifacts
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <Map className="w-10 h-10 text-blue-400 mx-auto mb-3" />
            <p className="text-sm text-gray-300 font-medium">Maps</p>
            <p className="text-xs text-gray-500 font-normal">{scenario.artifacts.maps.length} available</p>
          </div>
          <div className="text-center">
            <Image className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <p className="text-sm text-gray-300 font-medium">Flags</p>
            <p className="text-xs text-gray-500 font-normal">{scenario.artifacts.flags.length} available</p>
          </div>
          <div className="text-center">
            <Music className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p className="text-sm text-gray-300 font-medium">Music</p>
            <p className="text-xs text-gray-500 font-normal">{scenario.artifacts.music.length} available</p>
          </div>
          <div className="text-center">
            <FileText className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <p className="text-sm text-gray-300 font-medium">Documents</p>
            <p className="text-xs text-gray-500 font-normal">{scenario.artifacts.documents.length} available</p>
          </div>
        </div>
      </Card>

      {/* Conversation */}
      {conversation.length > 0 && (
        <Card className="p-8">
          <h3 className="text-xl font-semibold text-white mb-6 tracking-tight">Conversation History</h3>
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {conversation.map((qa) => (
              <div key={qa.id} className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-white font-medium leading-relaxed">{qa.question}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-gray-300 leading-relaxed font-normal">{qa.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Question Input */}
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about this world..."
              className="w-full px-6 py-4 bg-gray-850/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 font-medium"
              disabled={asking || loading}
            />
            <Button
              type="submit"
              className="absolute right-3 top-3 bottom-3"
              loading={asking}
              disabled={!question.trim()}
              icon={<Send className="w-4 h-4" />}
            >
              Ask
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-4 font-medium">Quick questions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {QUICK_QUESTIONS.map((quickQ, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(quickQ)}
                disabled={asking || loading}
                className="p-3 text-xs text-left bg-gray-850/50 hover:bg-gray-800/50 text-gray-400 hover:text-white rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 disabled:opacity-50 font-medium"
              >
                {quickQ}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};