import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error boundary component to catch React errors
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: unknown): Partial<State> {
    // Convertir l'erreur en Error si ce n'est pas déjà le cas
    const errorObj = error instanceof Error ? error : new Error(String(error))
    return { hasError: true, error: errorObj }
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    // Logger l'erreur pour le débogage
    const errorObj = error instanceof Error ? error : new Error(String(error))
    console.error('Error caught by boundary:', errorObj, errorInfo)
    
    // Ici, vous pourriez envoyer l'erreur à un service de logging (Sentry, etc.)
    // logErrorToService(errorObj, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-error-500" size={24} />
                <CardTitle>Une erreur s'est produite</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                {this.state.error?.message ||
                  "Une erreur inattendue s'est produite. Veuillez réessayer."}
              </p>
              <div className="flex gap-2">
                <Button onClick={this.handleReset} variant="primary">
                  Réessayer
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                >
                  Recharger la page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

