import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";
import { ThemeProvider } from "@/components/theme-provider";
function App() {
  const element = useRoutes(routes);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {element}
    </ThemeProvider>
  );
}

export default App;
