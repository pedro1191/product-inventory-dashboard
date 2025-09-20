import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import { ProductSelectionProvider, ToastProvider, useToastContext } from './contexts';

function AppContent() {
  const { isVisible } = useToastContext();

  return (
    <div className="bg-brand-background">
      <ProductSelectionProvider>
        <HomePage />
      </ProductSelectionProvider>
      {isVisible && <Toast />}
    </div>
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
