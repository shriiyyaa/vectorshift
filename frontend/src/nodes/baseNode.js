import React, { useCallback } from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store';
import { Trash2 } from 'lucide-react';

export const BaseNode = ({
  id,
  title,
  subtitle,
  icon: Icon,
  handles = [],
  children,
  style = {},
  accentColor = '#B8F3D0',
  iconBg = '#B8F3D0',
}) => {
  const handleDelete = useCallback(() => {
    useStore.getState().deleteNode(id);
  }, [id]);

  return (
    <div
      className="canvas-node"
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Handles — Custom styled, blended */}
      {handles.map((handle, idx) => {
        const isSource = handle.type === 'source';
        return (
          <Handle
            key={handle.id || idx}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            className="custom-handle"
            style={{
              background: '#FFFFFF',
              width: '12px',
              height: '12px',
              border: `2.5px solid ${isSource ? accentColor : '#D1D5DB'}`,
              borderRadius: '50%',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              zIndex: 10,
              ...handle.style,
            }}
          />
        );
      })}

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {Icon && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: iconBg,
                color: '#1A1D26',
                boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.06)',
              }}
            >
              <Icon size={17} strokeWidth={2} />
            </div>
          )}
          <div>
            <div style={{ fontWeight: '650', fontSize: '13px', color: '#1A1D26', lineHeight: '1.3' }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: '11px', color: '#9CA3AF', lineHeight: '1.2', marginTop: '1px' }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="node-delete-btn"
          title="Remove"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Body Content */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
        {children}
      </div>

      {/* Status bar - subtle bottom accent */}
      <div
        style={{
          height: '3px',
          background: `linear-gradient(90deg, ${accentColor} 0%, transparent 100%)`,
          borderRadius: '0 0 16px 16px',
          opacity: 0.6,
        }}
      />
    </div>
  );
};
