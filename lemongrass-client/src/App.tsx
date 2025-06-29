import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";
import { ThemeProvider } from "@/components/theme-provider";
import { FeedProvider } from "./contexts/feedContext";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  const element = useRoutes(routes);
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <FeedProvider>{element}</FeedProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
