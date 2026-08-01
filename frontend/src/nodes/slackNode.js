import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { MessageSquare } from 'lucide-react';

export const SlackNode = ({ id, data }) => {
  const [webhookUrl, setWebhookUrl] = useState(data?.webhookUrl || '');
  const [channel, setChannel] = useState(data?.channel || '#general');

  return (
    <BaseNode
      id={id}
      title="Slack Alert"
      subtitle="Notification"
      icon={MessageSquare}
      accentColor="#059669"
      iconBg="#CCFBF1"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-message` },
        { type: 'source', position: Position.Right, id: `${id}-status` },
      ]}
    >
      <div className="node-field">
        <label className="node-label">Webhook URL</label>
        <input type="text" className="node-input" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="https://hooks.slack.com/..." />
      </div>
      <div className="node-field">
        <label className="node-label">Channel</label>
        <input type="text" className="node-input" value={channel} onChange={(e) => setChannel(e.target.value)} placeholder="#general" />
      </div>
    </BaseNode>
  );
};
