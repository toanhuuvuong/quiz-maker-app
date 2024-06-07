import { PropsWithChildren } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UrlNotFound from 'src/components/pages/error/url-not-found';
import { Page } from 'src/constants';

function BaseRouter({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <Routes>
        {children}
        <Route index element={<Navigate to={Page.QUIZ_MAKER.PATH} />} />
        <Route path="*" element={<UrlNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default BaseRouter;
