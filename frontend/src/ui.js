// ui.js — Premium Infinite Canvas with ReactFlow and provider wrappers

import { useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  ReactFlowProvider,
  Panel,
  useViewport,
  useReactFlow,
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
    <div ref={reactFlowWrapper} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <ReactFlow
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
        connectionLineType="smoothstep"
        connectionLineStyle={{
          stroke: '#22C55E',
          strokeWidth: 3,
        }}
        defaultEdgeOptions={{
          type: 'smoothstep',
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
    </div>
  );
};

// Main Export wrapping inside the required ReactFlowProvider:
export const PipelineUI = () => (
  <ReactFlowProvider>
    <InnerPipelineUI />
  </ReactFlowProvider>
);
