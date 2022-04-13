import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { MetamaskStateProvider } from 'use-metamask';

import App from './App';
import theme from './theme';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
// @ts-ignore
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MetamaskStateProvider>
      <App />
    </MetamaskStateProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
