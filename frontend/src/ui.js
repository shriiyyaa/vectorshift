// ui.js — Premium Infinite Canvas with ReactFlow and provider wrappers

import { useRef, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  ReactFlowProvider,
  Panel,
  useViewport,
  useReactFlow,
  MarkerType,
} from 'reactflow';
import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { PromptNode } from './nodes/promptNode';
import { ApiNode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';
import { CodeNode } from './nodes/codeNode';
import { SlackNode } from './nodes/slackNode';

import 'reactflow/dist/style.css';

const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  prompt: PromptNode,
  api: ApiNode,
  database: DatabaseNode,
  code: CodeNode,
  slack: SlackNode,
};

// ─── Floating Zoom HUD ─────────────────────────────────────────────────────────
const FloatingZoomHUD = () => {
  const { zoom } = useViewport();
  const { zoomTo, fitView } = useReactFlow();
  const percentage = Math.round(zoom * 100);

  const handleResetZoom = () => {
    zoomTo(1);
    fitView({ duration: 300 });
  };

  return (
    <Panel position="top-right" style={{ marginTop: '90px', marginRight: '20px' }}>
      <button
        onClick={handleResetZoom}
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(34, 197, 94, 0.15)',
          borderRadius: '12px',
          padding: '8px 14px',
          fontSize: '12px',
          fontWeight: '700',
          color: '#15803D',
          boxShadow: '0 8px 24px rgba(22, 101, 52, 0.06)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          userSelect: 'none',
          outline: 'none',
          transition: 'all 120ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(22, 101, 52, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 101, 52, 0.06)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(1px)';
        }}
      >
        <span>🔍 {percentage}%</span>
        <span style={{ fontSize: '10px', color: '#8F9E94', fontWeight: '400' }}>Reset</span>
      </button>
    </Panel>
  );
};

// ─── Inner Canvas UI ──────────────────────────────────────────────────────────
const InnerPipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const { project } = useReactFlow();

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
  const advanceTutorial = useStore((state) => state.advanceTutorial);
  const tutorialStep = useStore((state) => state.tutorialStep);
  const [quickInsert, setQuickInsert] = useState(null);
  const [quickQuery, setQuickQuery] = useState('');
  const quickInsertRef = useRef(null);
  const quickOptions = [
    { type: 'text', label: 'Text Editor', keywords: 'text variables' },
    { type: 'llm', label: 'LLM Engine', keywords: 'llm ai completion' },
    { type: 'api', label: 'API Call', keywords: 'api rest integration' },
    { type: 'prompt', label: 'Prompt Template', keywords: 'prompt template' },
    { type: 'customInput', label: 'Input', keywords: 'input trigger' },
    { type: 'customOutput', label: 'Output', keywords: 'output result' },
  ];
  const filteredQuickOptions = quickOptions.filter((option) => `${option.label} ${option.keywords}`.toLowerCase().includes(quickQuery.toLowerCase()));

  useEffect(() => {
    if (!quickInsert) return undefined;
    quickInsertRef.current?.focus();
    const closeOnEscape = (event) => { if (event.key === 'Escape') setQuickInsert(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [quickInsert]);

  useEffect(() => {
    const cancelConnection = (event) => {
      if (event.key !== 'Escape') return;
      window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
      window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    };
    window.addEventListener('keydown', cancelConnection, true);
    return () => window.removeEventListener('keydown', cancelConnection, true);
  }, []);
  const openQuickInsert = useCallback((event) => {
    if (event.target.closest('.react-flow__node')) return;
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    setQuickQuery('');
    setQuickInsert({ x, y, position: project({ x, y }) });
  }, [project]);

  useEffect(() => {
    const openFromShortcut = (event) => {
      if ((event.key !== '/' && event.key !== '?' && event.code !== 'Slash') || event.target.closest?.('input, textarea')) return;
      event.preventDefault();
      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!bounds) return;
      const x = bounds.width / 2;
      const y = bounds.height / 2;
      setQuickQuery('');
      setQuickInsert({ x, y, position: project({ x, y }) });
    };
    window.addEventListener('keydown', openFromShortcut);
    return () => window.removeEventListener('keydown', openFromShortcut);
  }, [project]);

  const insertQuickNode = (option) => {
    const nodeID = getNodeID(option.type);
    addNode({ id: nodeID, type: option.type, position: quickInsert.position, data: getInitNodeData(nodeID, option.type) });
    if (tutorialStep === 4) advanceTutorial();
    setQuickInsert(null);
  };

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: `${type}`,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) return;

        const rawPosition = project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        // Prevent drops directly under the floating center navbar:
        // Clamp dropped y-coordinate to at least 90px (clear of navbar)
        const position = {
          x: rawPosition.x,
          y: Math.max(90, rawPosition.y),
        };

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);

        if (tutorialStep === 0) {
          advanceTutorial();
        }
      }
    },
    [project, addNode, getNodeID, advanceTutorial, tutorialStep]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleConnect = useCallback(
    (connection) => {
      onConnect(connection);
      if (tutorialStep === 1) {
        advanceTutorial();
      }
    },
    [onConnect, advanceTutorial, tutorialStep]
  );

  // 🛑 Live Client-Side Cycle & Self-Loop Validation
  const isValidConnection = useCallback(
    (connection) => {
      if (connection.source === connection.target) return false;

      // DFS validation algorithm
      const visited = new Set();
      const checkCycle = (currentNodeId) => {
        if (currentNodeId === connection.source) return true;
        if (visited.has(currentNodeId)) return false;
        visited.add(currentNodeId);

        const outgoingEdges = edges.filter((e) => e.source === currentNodeId);
        for (const edge of outgoingEdges) {
          if (checkCycle(edge.target)) return true;
        }
        return false;
      };

      const willCreateCycle = checkCycle(connection.target);
      return !willCreateCycle;
    },
    [edges]
  );

  return (
    <div ref={reactFlowWrapper} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); event.currentTarget.blur(); } }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <ReactFlow
        onDoubleClick={openQuickInsert}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[16, 16]}
        snapToGrid
        isValidConnection={isValidConnection}
        connectionLineType="straight"
        connectionLineStyle={{
          stroke: '#22C55E',
          strokeWidth: 3,
        }}
        defaultEdgeOptions={{
          type: 'straight',
          markerEnd: { type: MarkerType.ArrowClosed, color: '#22C55E' },
          animated: true,
          style: { stroke: '#22C55E', strokeWidth: 3 },
        }}
        minZoom={0.25}
        maxZoom={2.0}
        fitViewOptions={{ padding: 0.25 }}
        style={{ background: '#EFF4EF' }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="rgba(34, 197, 94, 0.28)"
          gap={24}
          size={2}
        />
        <Controls />
        <MiniMap
          nodeColor={() => '#22C55E'}
          maskColor="rgba(239, 244, 239, 0.7)"
          style={{
            bottom: '32px',
            right: '20px',
          }}
        />
        <FloatingZoomHUD />
      </ReactFlow>
      {quickInsert && (
        <div className="quick-insert-menu" style={{ left: quickInsert.x, top: quickInsert.y }} onClick={(event) => event.stopPropagation()}>
          <input ref={quickInsertRef} value={quickQuery} onChange={(event) => setQuickQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && filteredQuickOptions[0]) insertQuickNode(filteredQuickOptions[0]); if (event.key === 'Escape') setQuickInsert(null); }} placeholder="Insert a component..." aria-label="Quick insert component" />
          <div className="quick-insert-hint">Type a component and press Enter</div>
          {filteredQuickOptions.slice(0, 5).map((option) => (
            <button key={option.type} type="button" onClick={() => insertQuickNode(option)}><span>{option.label}</span><kbd>{option.type.toUpperCase()}</kbd></button>
          ))}
          {filteredQuickOptions.length === 0 && <div className="quick-insert-empty">No matching components</div>}
        </div>
      )}    </div>
  );
};

// Main Export wrapping inside the required ReactFlowProvider:
export const PipelineUI = () => (
  <ReactFlowProvider>
    <InnerPipelineUI />
  </ReactFlowProvider>
);
