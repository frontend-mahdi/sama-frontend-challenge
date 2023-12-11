import { ConfigProvider } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "router/Router";
import fallbackRender from "utils/FallbackError";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{ token: { fontFamily: "Vazirmatn" } }}
        direction="rtl"
      >
        <ErrorBoundary fallback={fallbackRender}>
          <AppRouter />
        </ErrorBoundary>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
