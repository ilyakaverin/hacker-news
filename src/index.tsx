import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import App from './App';
import NewsPage from './routes/NewsPage/NewsPage';
import NotFound from './components/NotFound/NotFound';
import store from './store';

const app = document.getElementById('app');
const root = createRoot(app!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<App />} />
        <Route path="/story" element={<NewsPage />}>
          <Route path=":storyId" element={<NewsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
