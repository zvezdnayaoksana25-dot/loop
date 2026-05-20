import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import { ErrorBoundary } from './components/shared/ErrorBoundary';

function renderApp() {
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}

window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding:20px;color:#F1F5F9;background:#0F172A;min-height:100dvh;font-family:system-ui;">
      <h2 style="color:#FB464C;">Error</h2>
      <pre style="font-size:12px;overflow:auto;white-space:pre-wrap;color:#94A3B8;">${e.error?.stack || e.message}</pre>
      <button onclick="localStorage.clear();location.reload();" style="margin-top:16px;padding:10px 20px;background:#A882FF;color:white;border:none;border-radius:8px;">Clear cache & reload</button>
    </div>`;
  }
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled rejection:', e.reason);
});

renderApp();
