import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-5 text-[var(--text-primary)] bg-[var(--bg-primary)] min-h-[100dvh]">
          <h2 className="text-lg font-semibold text-[var(--error)] mb-3">Something went wrong</h2>
          <pre className="text-xs text-[var(--text-secondary)] overflow-auto whitespace-pre-wrap mb-4">
            {this.state.error?.stack || this.state.error?.message}
          </pre>
          <button
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
            className="px-4 py-2.5 bg-[var(--accent)] rounded-lg text-sm font-medium text-white"
          >
            Clear cache & reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
