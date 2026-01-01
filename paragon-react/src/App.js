import "./App.css";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import { Routes, Route } from "react-router-dom";
import { routes } from "./constants/routes";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={routes.Home} element={<Home />} />
        <Route path={routes.About} element={<About />} />
        <Route path={routes.Portfolio} element={<Portfolio />} />
        <Route path={routes.Services} element={<Services />} />
        <Route path={routes.Blog} element={<Blog />} />
        <Route path={routes.Contact} element={<Contact />} />
        <Route path={routes.NotFound} element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
