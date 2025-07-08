import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";
import { AppProviders } from "./providers/AppProviders";
function App() {
  const element = useRoutes(routes);
  return <AppProviders>{element}</AppProviders>;
}

export default App;
