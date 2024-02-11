import { Outlet } from "react-router-dom";

function App() {
  return (
    /* Main container with custom font and padding */
    <div className="font-serif p-8">
      {/* Outlet to render child components */}
      <Outlet />
    </div>
  );
}

export default App;
