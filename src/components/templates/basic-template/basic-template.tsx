import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  pageTitle: string;
}

function BasicTemplate({ pageTitle, children }: PropsWithChildren<Props>) {
  return (
    <div className="basic-template">
      <Helmet title={pageTitle} />
      {children}
    </div>
  );
}

export default BasicTemplate;
