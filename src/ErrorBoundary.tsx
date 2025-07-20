import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError (error) {
    return { hasError: true, error }
  }

  componentDidCatch (error, errorInfo) {
    console.error('Caught by error boundary:', error, errorInfo)
  }

  render () {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      )
    }

    return this.props.children
  }
}
