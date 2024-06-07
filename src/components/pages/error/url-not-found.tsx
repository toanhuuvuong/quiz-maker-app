import ErrorTemplate from 'src/components/templates/error-template/error-template';
import { Error, Page } from 'src/constants';

function UrlNotFound() {
  return (
    <ErrorTemplate
      pageTitle={Page.URL_NOT_FOUND.NAME}
      heading={Error.URL_NOT_FOUND.HEADDING}
      message={Error.URL_NOT_FOUND.MESSAGE}
    />
  );
}

export default UrlNotFound;
