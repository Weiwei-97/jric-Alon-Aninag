import React, { ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Alon Aninag application error:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F5F2] text-[#2D3436] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-white p-8 rounded-2xl shadow-lg border border-stone-200">
            <div className="w-14 h-14 bg-teal-50 text-[#006D77] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🌊
            </div>
            <h1 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              Alon Aninag Beach Resort
            </h1>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              We encountered a slight hiccup loading the resort experience. Please refresh to continue your tropical getaway.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-[#006D77] hover:bg-[#00555d] text-white rounded-md text-xs uppercase tracking-widest font-bold transition shadow-sm cursor-pointer"
            >
              Reload Experience
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
