import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { Globe } from 'lucide-react';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/v1');
  const [method, setMethod] = useState(data?.method || 'POST');

  return (
    <BaseNode
      id={id}
      title="API Call"
      subtitle="REST integration"
      icon={Globe}
      accentColor="#059669"
      iconBg="#CCFBF1"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-trigger`, style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: `${id}-payload`, style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <div className="node-field">
        <label className="node-label">Endpoint URL</label>
        <input type="text" className="node-input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
      </div>
      <div className="node-field">
        <label className="node-label">Method</label>
        <select className="node-select" value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </BaseNode>
  );
};
