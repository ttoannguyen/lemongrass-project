// // App.tsx
// import { useRoutes } from "react-router-dom";
// import routes from "@/routes/routes";

// export default function App() {
//   const element = useRoutes(routes);
//   return element;
// }

import Navbar from "@/components/NavBar";

function App() {
  return (
    <div className="min-h-[200vh] bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4">
        <h1 className="text-3xl font-bold">Chào mừng bạn đến MyApp!</h1>
        <p className="mt-4 text-gray-700">
          Cuộn xuống để thấy hiệu ứng scroll...
        </p>
      </main>
    </div>
  );
}

export default App;
