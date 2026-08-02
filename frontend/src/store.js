// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    tutorialStep: 0,       // 0-6 for the 7-step onboarding
    showWelcome: true,      // first-time welcome overlay
    showTutorial: true,     // bottom dock visible

    setTutorialStep: (step) => set({ tutorialStep: step }),
    dismissWelcome: () => set({ showWelcome: false }),
    dismissTutorial: () => set({ showTutorial: false }),
    advanceTutorial: () => set((state) => ({ tutorialStep: Math.min(state.tutorialStep + 1, 6) })),
    
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            if (node.data && node.data[fieldName] === fieldValue) {
              return node;
            }
            return {
              ...node,
              data: { ...node.data, [fieldName]: fieldValue },
            };
          }
          return node;
        }),
      });
    },
    deleteNode: (nodeId) => {
      set({
        nodes: get().nodes.filter((node) => node.id !== nodeId),
        edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      });
    },
  }));
