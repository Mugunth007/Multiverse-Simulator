import React, { useState } from 'react';
import { Sparkles, Clock, Users, Globe, ArrowLeft } from 'lucide-react';
import { MultiverseScenario, Character, WorldQuestion } from './types';
import { AIService } from './services/aiService';
import { PromptInput } from './components/PromptInput';
import { TimelineView } from './components/TimelineView';
import { CharacterView } from './components/CharacterView';
import { WorldExplorer } from './components/WorldExplorer';
import { Button } from './components/common/Button';
import { Loading } from './components/common/Loading';

type View = 'input' | 'timeline' | 'characters' | 'world';

function App() {
  const [currentScenario, setCurrentScenario] = useState<MultiverseScenario | null>(null);
  const [currentView, setCurrentView] = useState<View>('input');
  const [loading, setLoading] = useState(false);
  
  const aiService = AIService.getInstance();

  const handlePromptSubmit = async (prompt: string) => {
    setLoading(true);
    try {
      const scenario = await aiService.generateScenario(prompt);
      setCurrentScenario(scenario);
      setCurrentView('timeline');
    } catch (error) {
      console.error('Failed to generate scenario:', error);
      // TODO: Add error handling UI
    } finally {
      setLoading(false);
    }
  };

  const handleEvolveCharacter = async (character: Character) => {
    if (!currentScenario) return;
    
    try {
      const evolvedCharacter = await aiService.generateCharacterEvolution(character, currentScenario);
      const updatedCharacters = currentScenario.characters.map(c => 
        c.id === character.id ? evolvedCharacter : c
      );
      setCurrentScenario({
        ...currentScenario,
        characters: updatedCharacters
      });
    } catch (error) {
      console.error('Failed to evolve character:', error);
    }
  };

  const handleAskQuestion = async (question: string): Promise<WorldQuestion> => {
    if (!currentScenario) throw new Error('No scenario available');
    return await aiService.answerWorldQuestion(question, currentScenario);
  };

  const handleNewScenario = () => {
    setCurrentScenario(null);
    setCurrentView('input');
  };

  const renderNavigation = () => {
    if (!currentScenario) return null;

    const navItems = [
      { id: 'timeline' as View, label: 'Timeline', icon: Clock },
      { id: 'characters' as View, label: 'Characters', icon: Users },
      { id: 'world' as View, label: 'Explore', icon: Globe },
    ];

    return (
      <div className="bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNewScenario}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                New Scenario
              </Button>
              <div className="h-6 w-px bg-gray-700/50"></div>
              <h1 className="text-lg font-semibold text-white truncate max-w-md tracking-tight">
                {currentScenario.title}
              </h1>
            </div>

            <nav className="flex space-x-1">
              {navItems.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={currentView === id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView(id)}
                  icon={<Icon className="w-4 h-4" />}
                >
                  {label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Loading text="Generating alternate reality..." size="lg" />
        </div>
      );
    }

    if (!currentScenario) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/20 to-gray-950 flex items-center justify-center p-4">
          <PromptInput onSubmit={handlePromptSubmit} loading={loading} />
        </div>
      );
    }

    const contentMap = {
      timeline: (
        <TimelineView 
          timeline={currentScenario.timeline} 
          title={currentScenario.title}
        />
      ),
      characters: (
        <CharacterView 
          characters={currentScenario.characters}
          onEvolveCharacter={handleEvolveCharacter}
          loading={loading}
        />
      ),
      world: (
        <WorldExplorer 
          scenario={currentScenario}
          onAskQuestion={handleAskQuestion}
          loading={loading}
        />
      )
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {contentMap[currentView]}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-blue-950/10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
      
      {renderNavigation()}
      {renderContent()}
      
      {/* Footer */}
      {currentScenario && (
        <footer className="bg-gray-950/50 border-t border-gray-800/50 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Powered by AI • Generated on {currentScenario.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;