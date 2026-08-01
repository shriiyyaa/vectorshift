import { useState } from 'react';
import { useStore } from './store';
import { CheckCircle2, XCircle, AlertCircle, Loader2, Play } from 'lucide-react';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    setIsOpen(true);

    try {
      const response = await fetch('https://vectorshift-i70c.onrender.com/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
      
      // Trigger browser alert to guarantee compliance with Part 4 instructions
      const dagMessage = data.is_dag ? 'Yes (No Cycles)' : 'No (Cycles Detected)';
      alert(`Pipeline Analysis Result:\n\n• Total Nodes: ${data.num_nodes}\n• Total Edges: ${data.num_edges}\n• Is Directed Acyclic Graph (DAG): ${dagMessage}`);
    } catch (err) {
      console.error('Error submitting pipeline:', err);
      setError(err.message || 'Failed to connect to the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="submit-btn"
        style={{ gap: '5px', minWidth: '100px', height: '36px', justifyContent: 'center' }}
        onClick={handleSubmit}
      >
        <Play size={13} fill="#FFFFFF" />
        Run Pipeline
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: '#1A1D26' }}>
              Pipeline Analysis
            </h2>

            {isLoading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 0' }}>
                <Loader2 size={28} style={{ color: '#4ADE80', animation: 'spin 1s linear infinite' }} />
                <span style={{ marginTop: '14px', fontSize: '14px', color: '#6B7280' }}>Validating graph structure...</span>
              </div>
            )}

            {error && (
              <div style={{ padding: '16px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#FB7185', marginBottom: '10px' }}>
                  <AlertCircle size={36} />
                </div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '600', color: '#1A1D26' }}>
                  Connection Error
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: '1.5' }}>
                  {error}
                </p>
              </div>
            )}

            {results && (
              <div style={{ padding: '4px 0 20px 0' }}>
                {/* DAG Status */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px',
                    borderRadius: '14px',
                    backgroundColor: results.is_dag ? '#D1FAE5' : '#FEF2F2',
                    border: results.is_dag ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)',
                    marginBottom: '20px',
                  }}
                >
                  {results.is_dag ? (
                    <>
                      <CheckCircle2 size={20} style={{ color: '#059669' }} />
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#065F46' }}>
                        Valid DAG — No Cycles
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={20} style={{ color: '#DC2626' }} />
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#991B1B' }}>
                        Invalid — Cycles Detected
                      </span>
                    </>
                  )}
                </div>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ padding: '16px', backgroundColor: 'rgba(34, 197, 94, 0.04)', borderRadius: '14px', border: '1px solid rgba(34, 197, 94, 0.08)' }}>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#141C16' }}>{results.num_nodes}</div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#4B554F', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Nodes
                    </div>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: 'rgba(34, 197, 94, 0.04)', borderRadius: '14px', border: '1px solid rgba(34, 197, 94, 0.08)' }}>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#141C16' }}>{results.num_edges}</div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#4B554F', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Edges
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="toolbar-btn"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '10px 0',
                fontSize: '14px',
                marginTop: '4px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
