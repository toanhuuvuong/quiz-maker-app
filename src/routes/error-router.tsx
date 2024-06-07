import { Route } from 'react-router-dom';
import SystemError from 'src/components/pages/error/system-error';
import UrlNotFound from 'src/components/pages/error/url-not-found';
import { Page } from 'src/constants';

const ErrorRouter = (
  <>
    <Route path={Page.SYSTEM_ERROR.PATH} element={<SystemError />} />
    <Route path={Page.URL_NOT_FOUND.PATH} element={<UrlNotFound />} />
  </>
);

export default ErrorRouter;
