import React, { useState } from 'react';
import { Users, Crown, Heart, Target, RefreshCw } from 'lucide-react';
import { Character } from '../types';
import { Card } from './common/Card';
import { Button } from './common/Button';

interface CharacterViewProps {
  characters: Character[];
  onEvolveCharacter: (character: Character) => void;
  loading: boolean;
}

const STATUS_STYLES = {
  alive: { color: 'text-green-400', bg: 'bg-green-900/20' },
  dead: { color: 'text-red-400', bg: 'bg-red-900/20' },
  legendary: { color: 'text-purple-400', bg: 'bg-purple-900/20' },
  unknown: { color: 'text-gray-400', bg: 'bg-gray-900/20' }
};

export const CharacterView: React.FC<CharacterViewProps> = ({ 
  characters, 
  onEvolveCharacter, 
  loading 
}) => {
  const [evolvingId, setEvolvingId] = useState<string | null>(null);

  const handleEvolve = async (character: Character) => {
    setEvolvingId(character.id);
    await onEvolveCharacter(character);
    setEvolvingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3 flex items-center justify-center tracking-tight">
          <Users className="w-7 h-7 mr-3 text-blue-500" />
          Key Characters
        </h2>
        <p className="text-gray-500 font-medium">
          Important figures who shape this alternate reality
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {characters.map((character) => {
          const status = STATUS_STYLES[character.status];
          const isEvolving = evolvingId === character.id;

          return (
            <Card key={character.id} className="p-6 space-y-5" hover gradient>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{character.name}</h3>
                  <p className="text-sm text-blue-400 flex items-center font-medium">
                    <Crown className="w-4 h-4 mr-1" />
                    {character.title}
                  </p>
                </div>
                <div className={`px-3 py-1 text-xs rounded-full ${status.bg} ${status.color} border border-current/30 font-medium`}>
                  {character.status}
                </div>
              </div>

              {/* Character image placeholder */}
              <div className="w-full h-32 bg-gradient-to-br from-gray-850 to-gray-800 rounded-xl flex items-center justify-center shadow-inner">
                <Users className="w-8 h-8 text-gray-500" />
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed font-normal">
                {character.description}
              </p>

              {/* Personality traits */}
              <div>
                <p className="text-xs font-semibold text-gray-300 mb-3 flex items-center tracking-wide uppercase">
                  <Heart className="w-3 h-3 mr-1" />
                  Personality
                </p>
                <div className="flex flex-wrap gap-1">
                  {character.personality.map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-850/50 text-gray-300 rounded-lg border border-gray-700/50 font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div>
                <p className="text-xs font-semibold text-gray-300 mb-3 flex items-center tracking-wide uppercase">
                  <Target className="w-3 h-3 mr-1" />
                  Current Goals
                </p>
                <ul className="space-y-1">
                  {character.goals.slice(0, 2).map((goal, index) => (
                    <li key={index} className="text-xs text-gray-400 flex items-start font-normal">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evolution button */}
              <Button
                size="sm"
                variant="secondary"
                className="w-full"
                loading={isEvolving}
                disabled={loading}
                onClick={() => handleEvolve(character)}
                icon={<RefreshCw className="w-3 h-3" />}
              >
                Evolve Character
              </Button>
            </Card>
          );
        })}
      </div>

      {characters.length === 0 && (
        <Card className="p-8">
          <div className="text-center text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p>No characters generated yet.</p>
          </div>
        </Card>
      )}
    </div>
  );
};