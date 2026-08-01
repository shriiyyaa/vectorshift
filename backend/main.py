from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS Middleware to allow requests from frontend (usually localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def check_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    # Get all node IDs
    node_ids = {node['id'] for node in nodes}
    
    # Build adjacency list
    adj = {node_id: [] for node_id in node_ids}
    
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        # Only add valid edges between existing nodes
        if source in adj and target in adj:
            adj[source].append(target)
            
    # Track visitation status: 0 = unvisited, 1 = visiting, 2 = visited
    visited = {node_id: 0 for node_id in node_ids}
    
    def dfs(u: str) -> bool:
        visited[u] = 1 # Mark as visiting
        for v in adj[u]:
            if visited[v] == 1:
                return True # Cycle found
            elif visited[v] == 0:
                if dfs(v):
                    return True
        visited[u] = 2 # Mark as fully visited
        return False

    for node_id in node_ids:
        if visited[node_id] == 0:
            if dfs(node_id):
                return False # Cycle detected, so NOT a DAG
                
    return True # No cycles, so it is a DAG

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)
    is_dag = check_is_dag(data.nodes, data.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
