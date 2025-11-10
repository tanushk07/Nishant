'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import { Button } from '../atoms/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
  if (this.state.hasError) {
    return (
      this.props.fallback ?? (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400 mb-4">{this.state.error?.message}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      )
    );
  }

  return this.props.children;
}
}
