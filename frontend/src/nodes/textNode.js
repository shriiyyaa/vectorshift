import { useState, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';
import { FileText } from 'lucide-react';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleTextChange = (e) => {
    const nextText = e.target.value;
    setCurrText(nextText);
    updateNodeField(id, 'text', nextText);
  };

  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      matches.push(match[1]);
    }
    return [...new Set(matches)];
  }, [currText]);

  const lines = currText.split('\n');
  const maxLineLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
  
  // Calculate dynamic dimensions based on text length and line counts:
  const calculatedWidth = Math.max(280, Math.min(500, maxLineLength * 7.8 + 36));
  const calculatedHeight = Math.max(110, Math.min(360, lines.length * 19 + 82));

  const varHandles = variables.map((varName, idx) => {
    const topPercentage = (idx + 1) * (100 / (variables.length + 1));
    return {
      type: 'target',
      position: Position.Left,
      id: `${id}-${varName}`,
      style: { top: `${topPercentage}%` },
    };
  });

  const allHandles = [
    ...varHandles,
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode
      id={id}
      title="Text Editor"
      subtitle="Text & variable inputs"
      icon={FileText}
      accentColor="#10B981"
      iconBg="#D1FAE5"
      handles={allHandles}
      style={{
        width: `${calculatedWidth}px`,
        height: `${calculatedHeight}px`,
      }}
    >
      <div className="node-field" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <label className="node-label">
          Content <span style={{ fontWeight: '400', color: '#B2C0B6' }}>— use {"{{var}}"} for inputs</span>
        </label>
        <textarea
          className="node-textarea"
          value={currText}
          onChange={handleTextChange}
          placeholder="Type {{variable}} to create handles..."
          style={{
            width: '100%',
            flexGrow: 1,
            height: 'calc(100% - 24px)',
            resize: 'none',
            border: '1px solid rgba(34, 197, 94, 0.1)',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '13px',
            color: '#141C16',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            outline: 'none',
            fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
            lineHeight: '1.5',
            overflow: 'hidden',
          }}
        />
      </div>
    </BaseNode>
  );
};
