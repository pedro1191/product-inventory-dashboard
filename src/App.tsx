import './App.css'
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import { ProductSelectionProvider, ToastProvider, useToastContext } from './contexts';

function AppContent() {
  const { isVisible } = useToastContext();

  return (
    <>
      <ProductSelectionProvider>
        <HomePage />
      </ProductSelectionProvider>
      {isVisible && <Toast />}
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}

export default App
