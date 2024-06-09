import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UrlNotFound from 'src/components/pages/error/url-not-found';
import { Page } from 'src/constants';
import './App.css';
import { ErrorRouter, QuizRouter } from './routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {QuizRouter}
          {ErrorRouter}
          <Route index element={<Navigate to={Page.QUIZ_MAKER.PATH} />} />
          <Route path="*" element={<UrlNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
