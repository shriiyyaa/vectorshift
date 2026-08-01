import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { Brain } from 'lucide-react';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM Engine"
      subtitle="AI text completion"
      icon={Brain}
      accentColor="#4ADE80"
      iconBg="#DCFCE7"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <div style={{ fontSize: '12px', color: '#4B554F', lineHeight: '1.5', padding: '2px 0' }}>
        Generates completions from system instructions and prompt inputs.
      </div>
    </BaseNode>
  );
};
