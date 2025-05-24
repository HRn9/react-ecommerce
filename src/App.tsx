import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Home from './pages/home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { setUser, setLoading } from './store/slices/authSlice';
import { onAuthStateChange } from './services/firebase';
import GlobalStyles from './styles/GlobalStyles';
import Loading from './components/ui/Loading';
import AppWrapper from './components/layout/AppWrapper';
import './App.css';
import { ensureDemoUserExists } from './utils/createDemoUser';

// Pages will be imported here
// import Order from './pages/order/Order';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const lastLocationRef = useRef<string>('');

  useEffect(() => {
    // Логируем только при изменении пути, чтобы избежать дублирования
    if (location.pathname !== lastLocationRef.current) {
      console.log(`Access attempt to ${location.pathname}`, {
        isAuthenticated,
        requireAuth,
        timestamp: new Date().toISOString()
      });
      lastLocationRef.current = location.pathname;
    }
  }, [location.pathname, isAuthenticated, requireAuth]);

  if (loading) {
    return <Loading />;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/menu"
        element={
          <ProtectedRoute requireAuth={false}>
            <MenuPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute requireAuth={false}>
            <AboutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute requireAuth={false}>
            <ContactPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute requireAuth={false}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      // Преобразуем пользователя в сериализуемый объект
      const serializedUser = user ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      } : null;
      
      dispatch(setUser(serializedUser));
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Создаем демо-пользователя при запуске приложения (опционально)
  useEffect(() => {
    const initializeDemoUser = async () => {
      try {
        await ensureDemoUserExists();
      } catch (error) {
        console.log('Demo user initialization skipped:', error);
      }
    };

    // Раскомментируйте следующую строку, если хотите автоматически создавать демо-пользователя
    // initializeDemoUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <AppRoutes />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <AppWrapper>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppContent />
        </Router>
      </AppWrapper>
    </Provider>
  );
};

export default App;
