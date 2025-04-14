'use client';

import React from 'react';

export type ModelOption = {
  id: string;
  name: string;
  description: string;
  provider: 'anthropic' | 'openai';
};

export const AI_MODELS: ModelOption[] = [
  {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    description: 'Fast & efficient, good for quick ideas',
    provider: 'anthropic',
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast, versatile, good for various tasks',
    provider: 'openai',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Advanced capabilities, highest quality',
    provider: 'openai',
  },
];

type ModelSelectorProps = {
  selectedModel: string;
  onChange: (model: string) => void;
  className?: string;
};

const ModelSelector = ({
  selectedModel,
  onChange,
  className = '',
}: ModelSelectorProps) => {
  return (
    <div className={`w-full ${className}`}>
      <p className="block text-sm font-medium mb-3">AI Model (affects quality & creativity)</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {AI_MODELS.map((model) => (
          <div 
            key={model.id}
            className={`relative border rounded-lg transition-all cursor-pointer p-4 ${
              selectedModel === model.id
                ? 'border-foreground bg-foreground/5'
                : 'border-gray-300 dark:border-gray-700 hover:border-foreground hover:bg-foreground/5'
            }`}
            onClick={() => onChange(model.id)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onChange(model.id);
              }
            }}
            aria-label={`Select ${model.name} model`}
          >
            <div className="absolute top-0 right-0 text-xs font-medium px-2 py-0.5 rounded-tr-lg rounded-bl-lg"
                style={{
                  backgroundColor: model.provider === 'anthropic' ? '#5436DA' : '#19C37D',
                  color: 'white'
                }}>
              {model.provider === 'anthropic' ? 'Claude' : 'OpenAI'}
            </div>
            <div className="text-sm font-medium mb-1 mt-4">{model.name}</div>
            <div className="text-xs text-foreground/70">{model.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector; 