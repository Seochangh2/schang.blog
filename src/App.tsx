import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Post from "./pages/Post";
import Write from "./pages/Write";
import Edit from "./pages/Edit";
function App() {
  return (
    <div className="App">
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/write" element={<Write />} />
          <Route path="/write/:id" element={<Edit />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
