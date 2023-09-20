import { For, useObservable } from '@legendapp/state/react';
import { useCallback } from 'react';
import { ErrorBoundary as ErrorBoundaryComp } from 'react-error-boundary';

interface ErrorData {
	component: string;
	script: string;
	line: string;
	chr: string;
}

const parseError = (componentStack: string): ErrorData[] => {
  const lines = componentStack.trim().split('\n');
  const errors = lines.map((line: string, i: number) => {
    const match = line.match(/(.*@)(.*):(\d+):(\d+)/);
    if (match) {
      const fullPath = match[2].split('?')[0];
      const pathArray = fullPath.split('/');
      const fileName = pathArray[pathArray.length - 1];
      const path = pathArray.slice(3, pathArray.length - 1).join('/');
      // Filter out chunks and other unnecessary details
      return {
        component: match[1].replace('@', ''),
        fileName,
        path,
        line: match[3],
        chr: match[4],
        // Adding extra info: the full matched line
        fullLine: line,
        // Adding extra info: the index of the line in the stack trace
        lineIndex: i
      };
    }
    return null;
  });

  const filteredErrors = errors
    .slice(errors.findIndex((e) => e?.component === 'ErrorBoundary') + 3)
    .slice(0, -1); // just remove the last bugged item for now

  return filteredErrors;
}

export const ErrorOutput = ({ error, error$ }: { error: Error, error$: any }) => {
  return (
    <div className="bg-red-1 text-orange-11 p-6 text-sm w-full h-full font-mono">

      <div className="text-lg mb-2">
        <span className="font-bold">{error$.name.use()}</span> <span>{error$.message.use()}</span>
      </div>

      <For each={error$.stack}>
        {(data, index) => (
          <div key={index} className="mb-1">
              <span className="font-bold text-gray-11">{data.component}</span>
              <span> - </span>
              <span>{data.fileName}:{data.line}</span>
              <br />
              <span className="text-xs text-red-12/50">{data.path}</span>
              {/* <div className="text-xs text-gray-500">Line: {data.line}, Character: {data.chr}</div> */}
              {/* <div className="text-xs text-gray-400">{data.fullLine}</div> */}
          </div>
          )}
      </For>
    </div>
  );
}

const ErrorBoundary = ({ children }: Props) => {
  const error$ = useObservable([]);

  const logError = useCallback((error: Error, info: { componentStack: string }) => {
    error$.set({ name: error.name, message: error.message, stack: parseError(info.componentStack) });
  }, []);

  const DefaultFallback = () => <div>Something went wrong.</div>;

  return (
    <ErrorBoundaryComp FallbackComponent={(props) => <ErrorOutput {...props} error$={error$} />} onError={logError}>
      {children}
    </ErrorBoundaryComp>
  );
};

type HOC<P> = (Component: React.ComponentType<P>) => React.ComponentType<P>;

export const withErrorBoundary: HOC<any> = (Component) => {
  return (props: any) => {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

export default ErrorBoundary;
