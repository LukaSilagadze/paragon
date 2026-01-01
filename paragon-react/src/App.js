import logo from './logo.svg';
import './App.css';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
