import { Component, type ReactNode } from "react";
import { Leaf, RefreshCw } from "lucide-react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error?: Error; }

// ✅ FIX: Added ErrorBoundary — prevents blank screen on unhandled render errors
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafaf7]"
          style={{ fontFamily: "'Lato', sans-serif" }}>
          <div className="text-center max-w-md px-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Something went wrong
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              We hit an unexpected error. Please refresh the page or go back to the home page.
            </p>
            {process.env.NODE_ENV !== "production" && this.state.error && (
              <pre className="text-left text-xs bg-red-50 border border-red-100 rounded-xl p-4 mb-6 text-red-600 overflow-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #1a4731, #2d6a4f)" }}>
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
              <a href="/"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-green-700 border-2 border-green-200 hover:border-green-400 transition-colors">
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;