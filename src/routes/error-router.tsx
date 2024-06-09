import { Route } from 'react-router-dom';
import { SystemError, UrlNotFound } from 'src/components/pages/error';
import { Page } from 'src/constants';

const ErrorRouter = (
  <>
    <Route path={Page.SYSTEM_ERROR.PATH} element={<SystemError />} />
    <Route path={Page.URL_NOT_FOUND.PATH} element={<UrlNotFound />} />
  </>
);

export default ErrorRouter;
