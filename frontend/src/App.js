// App.js — VectorFlow Premium AI Workflow Builder & Landing Page
import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';
import {
  Sparkles,
  Undo2,
  Redo2,
  CheckCircle2,
  Check,
  X,
  ArrowRight,
  Layers,
  Link,
  Settings2,
  Play,
  Send,
  PartyPopper,
  Zap,
} from 'lucide-react';

// ─── Animated Landing Page Component ──────────────────────────────────────────
const LandingPage = ({ onEnterStudio }) => {
  return (
    <div
      className="landing-grid"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Vertically center the entire page content
        backgroundColor: '#F7FAF7',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        padding: '20px 0',
      }}
    >
      {/* Decorative top ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          width: '60vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74, 222, 128, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 1. Header / Brand — perfectly centered via text-align */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          zIndex: 10,
          marginBottom: '20px',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            background: '#F0FDF4',
            border: '1.5px solid rgba(22, 163, 74, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(21, 128, 61, 0.12)',
            flexShrink: 0,
          }}
        >
          <Sparkles size={18} style={{ color: '#15803D' }} />
        </div>
        <span style={{ fontSize: '15px', fontWeight: '800', color: '#141C16', letterSpacing: '-0.02em' }}>
          VectorFlow
        </span>
      </div>

      {/* 2. Hero Content */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '640px',
          zIndex: 10,
          padding: '0 24px',
        }}
      >
        <h1
          style={{
            fontSize: '34px',
            fontWeight: '850',
            color: '#141C16',
            lineHeight: '1.15',
            letterSpacing: '-0.04em',
            margin: '0 0 10px 0',
          }}
        >
          Build AI Pipelines.
          <br />
          <span style={{ color: '#22C55E' }}>Visually, Animatedly.</span>
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: '#4B554F',
            lineHeight: '1.6',
            margin: '0 auto 22px auto',
            maxWidth: '480px',
          }}
        >
          Drag component blocks onto an infinite canvas to create powerful AI agents.
          Compile and validate topology in real-time with FastAPI.
        </p>

        <button className="landing-button-3d" onClick={onEnterStudio}>
          Enter Studio
          <ArrowRight size={16} style={{ display: 'inline', marginLeft: '8px', strokeWidth: '2.5px' }} />
        </button>
      </div>

      {/* Equal spacer between button and pipeline */}
      <div style={{ height: '40px' }} />

      {/* 3. Perfect Grid/Flex convergence workspace */}
      <div
        className="landing-pipeline-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 5,
          paddingBottom: '64px', // Space for the floating FastAPI badge below
        }}
      >
        {/* Node 1: Input Node (Flies in from LEFT screen edge) */}
        <div
          className="landing-card"
          style={{
            animation: 'flyFromLeftScreen 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            opacity: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#86EFAC' }} />
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#141C16', textTransform: 'uppercase' }}>
              Input
            </span>
          </div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#4B554F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            customer_query.txt
          </div>
        </div>

        {/* Connector 1: Horizontal Line (Left -> Center) */}
        <svg width="80" height="20" style={{ overflow: 'visible', margin: '0 4px', flexShrink: 0 }}>
          <path
            d="M 0 10 L 80 10"
            stroke="#86EFAC"
            strokeWidth="3.5"
            fill="none"
            strokeDasharray="80"
            strokeDashoffset="80"
            style={{
              animation: 'drawLine 0.8s ease-in-out forwards',
              animationDelay: '1.0s',
            }}
          />
          {/* Glowing pulse */}
          <circle r="4.5" fill="#059669" style={{ opacity: 0, animation: 'pulseLeftRight 3s linear infinite', animationDelay: '2.5s' }} />
        </svg>

        {/* Center Vertical Stack (Prompt Template, LLM Engine, Database) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {/* Node 2: Prompt Template Node (Flies in from TOP screen edge) */}
          <div
            className="landing-card"
            style={{
              animation: 'flyFromTopScreen 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '1.2s',
              opacity: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80' }} />
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#141C16', textTransform: 'uppercase' }}>
                Prompt template
              </span>
            </div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#4B554F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              system_prompt.md
            </div>
          </div>

          {/* Connector 2: Vertical Line (Top -> Center) */}
          <svg width="20" height="40" style={{ overflow: 'visible', margin: '4px 0', flexShrink: 0 }}>
            <path
              d="M 10 0 L 10 40"
              stroke="#86EFAC"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="40"
              strokeDashoffset="40"
              style={{
                animation: 'drawLine 0.6s ease-in-out forwards',
                animationDelay: '1.8s',
              }}
            />
            {/* Glowing pulse */}
            <circle r="4.5" fill="#059669" style={{ opacity: 0, animation: 'pulseTopBottom 3s linear infinite', animationDelay: '2.7s' }} />
          </svg>

          {/* Node 4: LLM Engine (Center - Fades & scales in) */}
          <div
            className="landing-card"
            style={{
              animation: 'centerPopIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '2.8s',
              opacity: 0,
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#141C16', textTransform: 'uppercase' }}>
                LLM Engine
              </span>
            </div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#4B554F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              claude-3.5-sonnet
            </div>
          </div>

          {/* Connector 3: Vertical Line (Bottom -> Center) */}
          <svg width="20" height="40" style={{ overflow: 'visible', margin: '4px 0', flexShrink: 0 }}>
            <path
              d="M 10 40 L 10 0"
              stroke="#86EFAC"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="40"
              strokeDashoffset="40"
              style={{
                animation: 'drawLine 0.6s ease-in-out forwards',
                animationDelay: '2.6s',
              }}
            />
            {/* Glowing pulse */}
            <circle r="4.5" fill="#059669" style={{ opacity: 0, animation: 'pulseBottomTop 3s linear infinite', animationDelay: '2.9s' }} />
          </svg>

          {/* Node 3: Database Node (Flies in from BOTTOM screen edge) */}
          <div
            className="landing-card"
            style={{
              animation: 'flyFromBottomScreen 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '2.0s',
              opacity: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} />
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#141C16', textTransform: 'uppercase' }}>
                Database
              </span>
            </div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#4B554F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              user_context_db
            </div>
          </div>
        </div>

        {/* Connector 4: Horizontal Line (Center -> Right) */}
        <svg width="80" height="20" style={{ overflow: 'visible', margin: '0 4px', flexShrink: 0 }}>
          <path
            d="M 0 10 L 80 10"
            stroke="#10B981"
            strokeWidth="3.5"
            fill="none"
            strokeDasharray="80"
            strokeDashoffset="80"
            style={{
              animation: 'drawLine 0.8s ease-in-out forwards',
              animationDelay: '3.6s',
            }}
          />
          {/* Glowing pulse */}
          <circle r="4.5" fill="#059669" style={{ opacity: 0, animation: 'pulseLeftRight 3s linear infinite', animationDelay: '3.9s' }} />
        </svg>

        {/* Node 5: Output Node (Flies in from RIGHT screen edge) */}
        <div
          className="landing-card"
          style={{
            animation: 'flyFromRightScreen 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            animationDelay: '3.2s',
            opacity: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }} />
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#141C16', textTransform: 'uppercase' }}>
              Output
            </span>
          </div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#4B554F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            email_response.json
          </div>
        </div>

        {/* FastAPI Success Badge (Fades in at the end) — sits below with proper gap */}
        <div
          style={{
            position: 'absolute',
            bottom: '-48px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            backgroundColor: '#D1FAE5',
            border: '1.5px solid rgba(34, 197, 94, 0.25)',
            borderRadius: '50px',
            fontSize: '11px',
            fontWeight: '700',
            color: '#065F46',
            opacity: 0,
            animation: 'fadeIn 0.6s ease-out forwards',
            animationDelay: '4.5s',
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
        >
          <Zap size={12} fill="#22C55E" style={{ color: '#22C55E' }} />
          FastAPI validation complete: DAG valid!
        </div>
      </div>

      {/* Animation Style Overrides — Targeting full viewport boundaries */}
      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes flyFromLeftScreen {
          from { opacity: 0; transform: translateX(-100vw); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes flyFromTopScreen {
          from { opacity: 0; transform: translateY(-100vh); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flyFromBottomScreen {
          from { opacity: 0; transform: translateY(100vh); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flyFromRightScreen {
          from { opacity: 0; transform: translateX(100vw); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes centerPopIn {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        /* Modular path flow dot animations */
        @keyframes pulseLeftRight {
          0% { cx: 0; cy: 10; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cx: 80; cy: 10; opacity: 0; }
        }
        @keyframes pulseTopBottom {
          0% { cx: 10; cy: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cx: 10; cy: 40; opacity: 0; }
        }
        @keyframes pulseBottomTop {
          0% { cx: 10; cy: 40; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cx: 10; cy: 0; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// ─── Welcome Overlay ──────────────────────────────────────────────────────────
const WelcomeOverlay = () => {
  const dismissWelcome = useStore((state) => state.dismissWelcome);

  return (
    <div className="welcome-overlay">
      <div className="welcome-card">
        <div style={{ fontSize: '44px', marginBottom: '16px' }}>👋</div>

        <h1
          style={{
            margin: '0 0 10px 0',
            fontSize: '22px',
            fontWeight: '800',
            color: '#141C16',
            letterSpacing: '-0.03em',
          }}
        >
          Welcome to VectorFlow
        </h1>
        <p
          style={{
            margin: '0 0 28px 0',
            fontSize: '15px',
            color: '#4B554F',
            lineHeight: '1.6',
          }}
        >
          Let's build your first AI workflow together.
          <br />
          Start by dragging a block from the left onto the canvas.
        </p>

        {/* Hint callout */}
        <div
          style={{
            background: '#D1FAE5',
            borderRadius: '14px',
            padding: '14px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'left',
            border: '1px solid rgba(16, 185, 129, 0.15)',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Layers size={18} style={{ color: '#FFFFFF' }} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#065F46' }}>
              Drag this onto the canvas
            </div>
            <div style={{ fontSize: '12px', color: '#047857', marginTop: '2px' }}>
              Every block in the sidebar is draggable ↗
            </div>
          </div>
        </div>

        <button
          onClick={dismissWelcome}
          className="submit-btn"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '14px',
            justifyContent: 'center',
            borderRadius: '12px !important',
          }}
        >
          Let's go
          <ArrowRight size={16} />
        </button>

        <button
          onClick={dismissWelcome}
          style={{
            marginTop: '12px',
            background: 'transparent',
            border: '1.5px solid #D1D5DB',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#6B7280',
            cursor: 'pointer',
            padding: '8px 20px',
            width: '100%',
            transition: 'all 120ms ease',
          }}
          onMouseEnter={e => { e.target.style.borderColor = '#9CA3AF'; e.target.style.color = '#4B5563'; }}
          onMouseLeave={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.color = '#6B7280'; }}
        >
          Skip intro
        </button>
      </div>
    </div>
  );
};

// ─── Tutorial Dock ─────────────────────────────────────────────────────────────
const TUTORIAL_STEPS = [
  { icon: Layers, label: 'Add Blocks' },
  { icon: Link, label: 'Connect' },
  { icon: Settings2, label: 'Configure' },
  { icon: Play, label: 'Run & Test' },
  { icon: Send, label: 'Publish' },
  { icon: PartyPopper, label: "You're Ready!" },
];

const TutorialDock = () => {
  const tutorialStep = useStore((state) => state.tutorialStep);
  const dismissTutorial = useStore((state) => state.dismissTutorial);

  return (
    <div className="tutorial-dock">
      {TUTORIAL_STEPS.map((step, idx) => {
        const StepIcon = step.icon;
        const isActive = idx === tutorialStep;
        const isCompleted = idx < tutorialStep;

        return (
          <div
            key={idx}
            className={`tutorial-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
          >
            {isCompleted ? (
              <Check size={13} />
            ) : (
              <StepIcon size={13} style={{ opacity: isActive ? 1 : 0.45 }} />
            )}
            <span style={{ opacity: isActive ? 1 : isCompleted ? 0.75 : 0.45 }}>
              {step.label}
            </span>
          </div>
        );
      })}

      <div
        style={{
          width: '1px',
          height: '20px',
          background: 'rgba(34, 197, 94, 0.15)',
          margin: '0 6px',
        }}
      />

      <button className="tutorial-skip" onClick={dismissTutorial}>
        <X size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '2px' }} />
        Skip
      </button>
    </div>
  );
};

// ─── Top Floating Pill Navbar ──────────────────────────────────────────────────
const FloatingNavbar = ({ onBackToHome }) => {
  const nodes = useStore((state) => state.nodes);

  return (
    <header
      style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '1000px',
        height: '56px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(34, 197, 94, 0.18)',
        borderRadius: '20px',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px 0 20px',
        fontFamily: 'Inter, system-ui, sans-serif',
        zIndex: 100,
      }}
    >
      {/* Left: Logo + Workflow Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          onClick={onBackToHome}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: '#F0FDF4',
            border: '1.5px solid rgba(22, 163, 74, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(21, 128, 61, 0.12)',
          }}
          title="Back to Landing Page"
        >
          <Sparkles size={16} style={{ color: '#15803D' }} />
        </div>

        <div>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#141C16', letterSpacing: '-0.02em' }}>
            VectorFlow
          </div>
          <div style={{ fontSize: '10px', color: '#8F9E94', marginTop: '-1px' }}>
            Untitled Pipeline
          </div>
        </div>

        <div style={{ width: '1px', height: '20px', background: 'rgba(34, 197, 94, 0.15)', margin: '0 4px' }} className="navbar-undoredo" />

        {/* 3D Toolbar Undo/Redo */}
        <div className="navbar-undoredo" style={{ display: 'flex', gap: '4px' }}>
          <button className="toolbar-btn" style={{ padding: '6px 10px' }} title="Undo">
            <Undo2 size={13} />
          </button>
          <button className="toolbar-btn" style={{ padding: '6px 10px' }} title="Redo">
            <Redo2 size={13} />
          </button>
        </div>
      </div>

      {/* Center: Node Counter Badge */}
      <div
        className="navbar-counter"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          background: 'rgba(34, 197, 94, 0.08)',
          border: '1.5px solid rgba(34, 197, 94, 0.12)',
          borderRadius: '15px',
          fontSize: '11px',
          color: '#15803D',
          fontWeight: '600',
        }}
      >
        <span>{nodes.length} {nodes.length === 1 ? 'node' : 'nodes'}</span>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Status Pill */}
        <div
          className="navbar-status"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '5px 10px',
            background: '#DCFCE7',
            border: '1.5px solid rgba(34, 197, 94, 0.12)',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700',
            color: '#15803D',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
          FastAPI Live
        </div>

        <button
          className="toolbar-btn"
          style={{ gap: '5px', minWidth: '100px', height: '36px', justifyContent: 'center' }}
          title="Publish"
        >
          <CheckCircle2 size={13} />
          Publish
        </button>

        <SubmitButton />
      </div>
    </header>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [view, setView] = useState('landing'); // 'landing' or 'studio'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile drawer toggle state
  const showWelcome = useStore((state) => state.showWelcome);
  const showTutorial = useStore((state) => state.showTutorial);

  if (view === 'landing') {
    return <LandingPage onEnterStudio={() => setView('studio')} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#EFF4EF',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* Welcome overlay */}
      {showWelcome && <WelcomeOverlay />}

      {/* Full-bleed canvas fills entire screen */}
      <PipelineUI />

      {/* Floating Navbar pill — top center, overlaid on canvas */}
      <FloatingNavbar onBackToHome={() => setView('landing')} />

      {/* Floating Sidebar pill — left side, overlaid on canvas (responsive drawer) */}
      <PipelineToolbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Sidebar Toggle Button (Floating) — only visible on mobile (replaces hidden sidebar) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sidebar-toggle-btn"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '20px',
          zIndex: 60,
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(34, 197, 94, 0.22)',
          borderRadius: '12px',
          padding: '10px 16px',
          fontSize: '12px',
          fontWeight: '700',
          color: '#15803D',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(22, 101, 52, 0.08), 0 1px 3px rgba(22, 101, 52, 0.04)',
          display: 'none', // hidden on desktop, shown via CSS query on mobile
          outline: 'none',
        }}
      >
        Blocks
      </button>

      {/* Empty state hint */}
      <EmptyCanvasHint />

      {/* Bottom Floating Tutorial Dock */}
      {showTutorial && <TutorialDock />}
    </div>
  );
}

// ─── Empty Canvas Hint ────────────────────────────────────────────────────────
const EmptyCanvasHint = () => {
  const nodes = useStore((state) => state.nodes);
  const showWelcome = useStore((state) => state.showWelcome);

  if (nodes.length > 0 || showWelcome) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <div
        style={{
          fontSize: '44px',
          marginBottom: '12px',
          animation: 'bounceLeft 1.5s ease-in-out infinite',
          color: '#22C55E',
        }}
      >
        ←
      </div>
      <p
        style={{
          fontSize: '15px',
          fontWeight: '700',
          color: '#4B554F',
          margin: '0 0 4px 0',
          letterSpacing: '-0.01em',
        }}
      >
        Drag a block to get started
      </p>
      <p style={{ fontSize: '12px', color: '#8F9E94', margin: 0 }}>
        Select any component from the sidebar and drop it here
      </p>

      <style>{`
        @keyframes bounceLeft {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-8px); }
        }
      `}</style>
    </div>
  );
};

export default App;
