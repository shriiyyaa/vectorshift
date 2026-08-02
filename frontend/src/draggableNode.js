import React, { useState } from 'react';
import {
  LogIn,
  LogOut,
  Brain,
  FileText,
  Braces,
  Globe,
  Database,
  Code,
  MessageSquare,
  GripVertical,
} from 'lucide-react';

const NODE_CONFIGS = {
  // Triggers
  customInput:  { icon: LogIn,          bg: '#4ADE80', tint: 'rgba(220, 252, 231, 0.8)', border: 'rgba(74, 222, 128, 0.4)',  label: 'Input',           desc: 'Entry data source' },
  customOutput: { icon: LogOut,         bg: '#4ADE80', tint: 'rgba(220, 252, 231, 0.8)', border: 'rgba(74, 222, 128, 0.4)',  label: 'Output',          desc: 'Pipeline result' },
  
  // Intelligence
  llm:          { icon: Brain,          bg: '#4ADE80', tint: 'rgba(220, 252, 231, 0.8)', border: 'rgba(74, 222, 128, 0.4)', label: 'LLM Engine',      desc: 'AI completion' },
  prompt:       { icon: Braces,         bg: '#4ADE80', tint: 'rgba(220, 252, 231, 0.8)', border: 'rgba(74, 222, 128, 0.4)', label: 'Prompt Template', desc: 'Variable prompt' },
  
  // Logic & Code
  text:         { icon: FileText,       bg: '#4ADE80', tint: 'rgba(220, 252, 231, 0.8)', border: 'rgba(74, 222, 128, 0.4)',  label: 'Text Editor',     desc: 'Text & variables' },
  code:         { icon: Code,           bg: '#4ADE80', tint: 'rgba(220, 252, 231, 0.8)', border: 'rgba(74, 222, 128, 0.4)',  label: 'Code Block',      desc: 'JS / Python script' },
  
  // Data & Integrations
  api:          { icon: Globe,          bg: '#4ADE80', tint: 'rgba(220, 252, 231, 0.8)', border: 'rgba(74, 222, 128, 0.4)',  label: 'API Call',        desc: 'REST integration' },
  database:     { icon: Database,       bg: '#4ADE80', tint: 'rgba(220, 252, 231, 0.8)', border: 'rgba(74, 222, 128, 0.4)',  label: 'Database',        desc: 'SQL / NoSQL query' },
  slack:        { icon: MessageSquare,  bg: '#4ADE80', tint: 'rgba(220, 252, 231, 0.8)', border: 'rgba(74, 222, 128, 0.4)',  label: 'Slack Alert',     desc: 'Notification' },
};

export const DraggableNode = ({ type, label }) => {
  const [isDragging, setIsDragging] = useState(false);
  const config = NODE_CONFIGS[type] || { icon: FileText, bg: '#86EFAC', tint: 'rgba(240,253,244,0.8)', border: 'rgba(134,239,172,0.4)', desc: '' };
  const IconComponent = config.icon;

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={(event) => { setIsDragging(true); onDragStart(event, type); }}
      onDragEnd={() => setIsDragging(false)}
      aria-label={`Drag ${label} onto the canvas`}
      draggable
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        padding: '9px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '12px',
        background: config.tint,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1.5px solid ${config.border}`,
        boxShadow: isDragging ? '0 10px 24px rgba(22, 101, 52, 0.18)' : 'none',
        transition: 'transform 150ms cubic-bezier(0.16,1,0.3,1), box-shadow 150ms cubic-bezier(0.16,1,0.3,1), border-color 150ms ease',
        position: 'relative',
        userSelect: 'none',
        opacity: isDragging ? 0.72 : 1,
        transform: isDragging ? 'scale(0.98)' : undefined,
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.0) 60%), linear-gradient(180deg, ${config.tint}, ${config.tint})`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 6px 16px rgba(22, 101, 52, 0.08)`;
        e.currentTarget.style.borderColor = '#10B981';
        e.currentTarget.style.cursor = 'grab';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = config.border;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.cursor = 'grabbing';
        e.currentTarget.style.transform = 'translateY(-1px) scale(0.99)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.cursor = 'grab';
      }}
    >
      {/* Icon Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '9px',
          backgroundColor: config.bg,
          color: '#FFFFFF',
          flexShrink: 0,
        }}
      >
        <IconComponent size={15} strokeWidth={2.2} />
      </div>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
        <span style={{ color: '#141C16', fontSize: '12px', fontWeight: '650', lineHeight: '1.3' }}>
          {label}
        </span>
        <span style={{ color: '#4B554F', fontSize: '10.5px', lineHeight: '1.3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {config.desc}
        </span>
      </div>

      {/* Grab Indicator */}
      <GripVertical size={16} style={{ color: 'rgba(0,0,0,0.18)', flexShrink: 0 }} />
    </div>
  );
};