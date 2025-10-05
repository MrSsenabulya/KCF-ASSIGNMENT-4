import React from 'react';
import { Container, Title, Text, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container size="lg" style={{ paddingTop: '2rem' }}>
          <Alert icon={<IconAlertCircle />} title="Something went wrong" color="red">
            <Title order={3}>Application Error</Title>
            <Text mt="md">
              The application encountered an error. Please check the browser console for more details.
            </Text>
            {this.state.error && (
              <details style={{ marginTop: '1rem' }}>
                <summary>Error Details</summary>
                <pre style={{ fontSize: '12px', marginTop: '0.5rem' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button 
              onClick={() => window.location.reload()} 
              style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
            >
              Reload Page
            </button>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
