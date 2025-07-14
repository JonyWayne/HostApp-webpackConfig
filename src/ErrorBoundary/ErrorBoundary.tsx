import React, { ReactNode, useState } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <>{fallback}</>;
  }

  return (
    <ErrorBoundaryInner hasError={hasError} setHasError={setHasError}>
      {children}
    </ErrorBoundaryInner>
  );
};

// Внутренний компонент с классовой реализацией для componentDidCatch
class ErrorBoundaryInner extends React.Component<{
  hasError: boolean;
  setHasError: (hasError: boolean) => void;
  children: ReactNode;
}> {
  componentDidCatch() {
    this.props.setHasError(true);
  }

  render() {
    return this.props.children;
  }
}
