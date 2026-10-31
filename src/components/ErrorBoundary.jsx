import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled React Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d0714',
          color: '#f8fafc',
          padding: '2rem',
          fontFamily: 'Outfit, system-ui, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            background: 'rgba(28, 12, 45, 0.85)',
            border: '1px solid rgba(192, 38, 211, 0.4)',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}>
            <h1 style={{ color: '#ec4899', fontSize: '1.8rem', marginBottom: '1rem' }}>
              Something went wrong while rendering
            </h1>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            {this.state.error?.stack && (
              <pre style={{
                textAlign: 'left',
                background: 'rgba(0,0,0,0.5)',
                color: '#f43f5e',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                overflowX: 'auto',
                marginBottom: '1.5rem',
                maxHeight: '200px'
              }}>
                {this.state.error.stack}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              style={{
                background: 'linear-gradient(135deg, #c026d3, #7928ca)',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              Reload Spoon & Beyond
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
