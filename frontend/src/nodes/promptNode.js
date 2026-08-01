import { useState, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { Braces } from 'lucide-react';

export const PromptNode = ({ id, data }) => {
  const [template, setTemplate] = useState(data?.template || 'Translate {{text}} to {{language}}');

  const handleTemplateChange = (e) => {
    setTemplate(e.target.value);
  };

  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(template)) !== null) {
      matches.push(match[1]);
    }
    return [...new Set(matches)];
  }, [template]);

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
    { type: 'source', position: Position.Right, id: `${id}-prompt` },
  ];

  const lineCount = template.split('\n').length;

  return (
    <BaseNode
      id={id}
      title="Prompt Template"
      subtitle="Dynamic variable prompt"
      icon={Braces}
      accentColor="#4ADE80"
      iconBg="#DCFCE7"
      handles={allHandles}
      style={{
        width: '280px',
        height: 'auto',
      }}
    >
      <div className="node-field">
        <label className="node-label">
          Prompt Structure <span style={{ fontWeight: '400', color: '#B2C0B6' }}>— use {"{{var}}"}</span>
        </label>
        <textarea
          className="node-textarea"
          value={template}
          onChange={handleTemplateChange}
          placeholder="Type {{var}} to add variables..."
          rows={Math.max(2, Math.min(8, lineCount))}
          style={{
            width: '100%',
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
