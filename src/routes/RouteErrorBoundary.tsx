import React from 'react'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'

/**
 * Route-level Error Boundary fallback for React Router.
 * Handles failed chunk loads, routing exceptions, and uncaught page errors.
 */
export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError()

  let errorMessage = 'An unexpected routing error occurred.'
  let errorStatus = 500

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || errorMessage
    errorStatus = error.status
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 bg-white border border-[#E5E7EB] text-center shadow-md">
        <div className="w-10 h-10 rounded-full bg-[#FEE2E2] text-[#DC2626] mx-auto flex items-center justify-center font-mono font-bold text-sm mb-3">
          !
        </div>
        <span className="font-mono text-xs font-bold text-[#166534] uppercase tracking-wider block mb-1">
          Navigation State [{errorStatus}]
        </span>
        <h2 className="font-heading font-extrabold text-xl text-[#111827]">
          Routing Notice
        </h2>
        <p className="text-sm text-[#4B5563] mt-2 leading-relaxed">
          {errorMessage}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md">
              Return Home
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="md"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E5E7EB] text-xs font-mono text-[#6B7280]">
          <a href="./cv.html" className="text-[#166534] hover:underline">
            View Static Resume (cv.html)
          </a>
        </div>
      </Card>
    </div>
  )
}

export default RouteErrorBoundary
