import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { Database } from 'lucide-react';

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'PostgreSQL');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM users LIMIT 10;');

  return (
    <BaseNode
      id={id}
      title="Database"
      subtitle="SQL / NoSQL query"
      icon={Database}
      accentColor="#059669"
      iconBg="#CCFBF1"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-params` },
        { type: 'source', position: Position.Right, id: `${id}-results` },
      ]}
    >
      <div className="node-field">
        <label className="node-label">Connection</label>
        <select className="node-select" value={dbType} onChange={(e) => setDbType(e.target.value)}>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MongoDB">MongoDB</option>
          <option value="MySQL">MySQL</option>
          <option value="Redis">Redis</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-label">Query</label>
        <textarea className="node-textarea" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="SELECT * FROM..." style={{ width: '100%', height: '55px', resize: 'none', border: '1px solid rgba(34, 197, 94, 0.1)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#141C16', backgroundColor: 'rgba(255, 255, 255, 0.7)', outline: 'none', fontFamily: 'monospace' }} />
      </div>
    </BaseNode>
  );
};
