import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { Code } from 'lucide-react';

export const CodeNode = ({ id, data }) => {
  const [language, setLanguage] = useState(data?.language || 'JavaScript');
  const [code, setCode] = useState(data?.code || 'function main(input) {\n  return input.trim();\n}');

  return (
    <BaseNode
      id={id}
      title="Code Block"
      subtitle="Custom script"
      icon={Code}
      accentColor="#10B981"
      iconBg="#D1FAE5"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <div className="node-field">
        <label className="node-label">Runtime</label>
        <select className="node-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="JavaScript">JavaScript (Node.js)</option>
          <option value="Python">Python 3</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-label">Script</label>
        <textarea className="node-textarea" value={code} onChange={(e) => setCode(e.target.value)} style={{ width: '100%', height: '60px', resize: 'none', border: '1px solid rgba(34, 197, 94, 0.1)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#141C16', backgroundColor: 'rgba(255, 255, 255, 0.7)', outline: 'none', fontFamily: 'monospace' }} />
      </div>
    </BaseNode>
  );
};
