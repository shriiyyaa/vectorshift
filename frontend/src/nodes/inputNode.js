import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { LogIn } from 'lucide-react';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      subtitle="Entry data source"
      icon={LogIn}
      accentColor="#86EFAC"
      iconBg="#F0FDF4"
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    >
      <div className="node-field">
        <label className="node-label">Variable Name</label>
        <input type="text" className="node-input" value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </div>
      <div className="node-field">
        <label className="node-label">Type</label>
        <select className="node-select" value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
