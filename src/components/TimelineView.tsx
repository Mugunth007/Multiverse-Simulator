import React from 'react';
import { Calendar, Zap, TrendingUp, AlertTriangle, Star } from 'lucide-react';
import { TimelineEvent } from '../types';
import { Card } from './common/Card';

interface TimelineViewProps {
  timeline: TimelineEvent[];
  title: string;
}

const IMPACT_STYLES = {
  low: { color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-500/30', icon: TrendingUp },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-500/30', icon: Zap },
  high: { color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-500/30', icon: AlertTriangle },
  critical: { color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-500/30', icon: Star }
};

const CATEGORY_COLORS = {
  political: 'text-purple-400',
  technological: 'text-blue-400',
  cultural: 'text-pink-400',
  military: 'text-red-400',
  economic: 'text-green-400',
  natural: 'text-amber-400'
};

export const TimelineView: React.FC<TimelineViewProps> = ({ timeline, title }) => {
  const sortedTimeline = [...timeline].sort((a, b) => a.year - b.year);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3 flex items-center justify-center tracking-tight">
          <Calendar className="w-7 h-7 mr-3 text-blue-500" />
          Timeline: {title}
        </h2>
        <p className="text-gray-500 font-medium">
          Key events that shaped this alternate reality
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500"></div>
        
        <div className="space-y-8">
          {sortedTimeline.map((event, index) => {
            const impact = IMPACT_STYLES[event.impact];
            const IconComponent = impact.icon;
            
            return (
              <div key={event.id} className="relative flex items-start">
                {/* Timeline dot */}
                <div className={`relative z-10 flex items-center justify-center w-10 h-10 ${impact.bg} ${impact.border} border-2 rounded-full mr-6 shadow-apple`}>
                  <IconComponent className={`w-4 h-4 ${impact.color}`} />
                </div>

                {/* Event card */}
                <Card className="flex-1 p-6" hover>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-white tracking-tight">{event.year}</span>
                      <span className={`px-3 py-1 text-xs rounded-full ${impact.bg} ${impact.color} border ${impact.border} font-medium`}>
                        {event.impact.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 text-xs rounded-full bg-gray-850/50 ${CATEGORY_COLORS[event.category]} border border-gray-700/50 font-medium`}>
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed font-normal">
                    {event.description}
                  </p>

                  {/* Animation for visual appeal */}
                  <div className="mt-4 flex items-center justify-end">
                    <div className={`w-2 h-2 ${impact.bg} rounded-full animate-pulse`}></div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {timeline.length === 0 && (
        <Card className="p-8">
          <div className="text-center text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p>No timeline events generated yet.</p>
          </div>
        </Card>
      )}
    </div>
  );
};