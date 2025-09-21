import Toast from './components/ui/Toast';
import HomePage from './pages/HomePage';
import { ProductSelectionProvider, ToastProvider } from './contexts';

function AppContent() {
  return (
    <>
      <ProductSelectionProvider>
        <HomePage />
      </ProductSelectionProvider>
      <Toast />
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
