import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import KuchikomiApp, { isKuchikomiPath } from './kuchikomi/KuchikomiApp';
import reportWebVitals from './reportWebVitals';

// 心理マップ本体は Supabase 必須なので、口コミアシストの画面では読み込まない
const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {isKuchikomiPath(window.location.pathname) ? (
      <KuchikomiApp />
    ) : (
      <Suspense fallback={null}>
        <App />
      </Suspense>
    )}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
