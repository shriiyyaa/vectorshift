import { useState } from 'react';
import { DraggableNode } from './draggableNode';
import { Search, Layers, Sparkles, Code2, Cable, X } from 'lucide-react';

const NODES_DATA = [
  { type: 'customInput', label: 'Input', category: 'triggers' },
  { type: 'customOutput', label: 'Output', category: 'triggers' },
  { type: 'llm', label: 'LLM Engine', category: 'intelligence' },
  { type: 'prompt', label: 'Prompt Template', category: 'intelligence' },
  { type: 'text', label: 'Text Editor', category: 'logic' },
  { type: 'code', label: 'Code Block', category: 'logic' },
  { type: 'api', label: 'API Call', category: 'data' },
  { type: 'database', label: 'Database', category: 'data' },
  { type: 'slack', label: 'Slack Alert', category: 'data' },
];

const CATEGORY_LABELS = {
  triggers: { label: 'Triggers', color: '#4ADE80', icon: Layers },
  intelligence: { label: 'Intelligence', color: '#4ADE80', icon: Sparkles },
  logic: { label: 'Logic & Code', color: '#4ADE80', icon: Code2 },
  data: { label: 'Data & Integrations', color: '#4ADE80', icon: Cable },
};

export const PipelineToolbar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNodes = NODES_DATA.filter((node) =>
    node.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['triggers', 'intelligence', 'logic', 'data'];

  return (
    <aside
      className={`floating-sidebar ${isOpen ? 'open' : ''}`}
      style={{
        position: 'absolute',
        top: '25px',
        left: '84px',
        width: '280px',
        height: 'calc(100vh - 50px)',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1.5px solid rgba(34, 197, 94, 0.22)',
        boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.05)', // clean ambient outline ring instead of inner shadow
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',   /* clips scrollbar inside pill radius */
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        zIndex: 50,
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          padding: '18px 18px 14px 18px',
          borderBottom: '1px solid rgba(34, 197, 94, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#141C16', letterSpacing: '-0.02em' }}>
              Components
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#8F9E94' }}>
              Drag blocks onto the canvas
            </p>
          </div>
          {/* Mobile close button */}
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close components list">
            <X size={16} />
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '100%' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '11px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#B2C0B6',
            }}
          />
          <input
            type="text"
            className="sidebar-search"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Node Categories — inner scroll area with margin-right and no-scrollbar class */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '20px', marginRight: '4px' }}>
        {categories.map((cat) => {
          const nodes = filteredNodes.filter((n) => n.category === cat);
          if (nodes.length === 0) return null;
          const catConfig = CATEGORY_LABELS[cat];
          const CatIcon = catConfig.icon;

          return (
            <div key={cat}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '10px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#8F9E94',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                <CatIcon size={12} style={{ color: catConfig.color }} />
                <span>{catConfig.label}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {nodes.map((n) => (
                  <DraggableNode key={n.type} type={n.type} label={n.label} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
