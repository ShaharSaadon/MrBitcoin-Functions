import { Route, HashRouter as Router, Routes  } from 'react-router-dom';
import { HomePage } from "./pages/HomePage";
import { ContactIndex } from './pages/ContactIndex'
import { AppHeader } from './components/AppHeader';
import { ContactDetails } from './pages/ContactDetails';
import { Signup } from './pages/Signup';
import { UserDetails } from './pages/UserDetails';
import { ContactEdit } from './pages/ContactEdit'
import { Counter } from './components/Counter';

function App() {
  return (
    <Router>
      <section className="App">
        <AppHeader />

        <main className="main-container">
          {/* MORE SPECIFIC SHOW FIRST */}
          <Routes>
          <Route path="/contact/edit/:id?" element={<ContactEdit />} />
            <Route path="/contact/:id" element={<ContactDetails/>} />
            <Route path="/user" element={<UserDetails/>} />
            <Route path="/contacts" element={<ContactIndex/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/counter" element={<Counter/>} />
            <Route path="/" element={<HomePage/>} />
            </Routes>
        </main>

        <footer>
          <section className="container">
            misterBit 2022 &copy;
          </section>
        </footer>
      </section>
    </Router>
  );
}

export default App;
