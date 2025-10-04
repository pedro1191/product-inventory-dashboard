import TopNav from './components/business/TopNav';
import Toast from './components/ui/Toast';
import { ProductSelectionProvider, ThemeProvider, ToastProvider } from './contexts';
import HomePage from './pages/HomePage';

function AppContent() {
  return (
    <div className="flex flex-col m-2 rounded-xl shadow-md border-1 border-brand-border">
      <header>
        <TopNav />
      </header>
      <main>
        <ProductSelectionProvider>
          <HomePage />
        </ProductSelectionProvider>
      </main>
      <Toast />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
