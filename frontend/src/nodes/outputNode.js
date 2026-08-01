import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { LogOut } from 'lucide-react';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      subtitle="Pipeline result"
      icon={LogOut}
      accentColor="#86EFAC"
      iconBg="#F0FDF4"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-value` },
      ]}
    >
      <div className="node-field">
        <label className="node-label">Field Name</label>
        <input type="text" className="node-input" value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </div>
      <div className="node-field">
        <label className="node-label">Output Format</label>
        <select className="node-select" value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
