import SpacerSmall from './SpacerSmall';
import { Fragment } from 'react';

export default function HistoryResults({ results }) {
  return (
    <>
      <h4>Recent Results</h4>
      <div className="flex horizontal centered">
        {results && (
          <>
            <SpacerSmall />
            {Array.from(results).map((result, index) => (
              <Fragment key={index}>
                <span className={result.toUpperCase()}>
                  {result.toUpperCase()}
                </span>
                <SpacerSmall />
              </Fragment>
            ))}
          </>
        )}
      </div>
    </>
  );
}
