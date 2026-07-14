import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import FloatingProfileButton from './components/FloatingProfileButton';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import FloatingIndicator from './components/FloatingIndicator';

const NeuralBackground = lazy(() => import('./components/NeuralBackground'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <CustomCursor />
        <Suspense fallback={null}>
          <NeuralBackground />
        </Suspense>
        <Navbar />
        <Suspense fallback={<LoadingScreen />}>
          <Home />
        </Suspense>
        <Footer />
        <FloatingProfileButton />
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
