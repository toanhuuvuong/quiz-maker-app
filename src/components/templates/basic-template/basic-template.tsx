import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';
import { BasicSpinner } from 'src/components/atoms/spiner';

type Props = {
  pageTitle: string;
  isLoading?: boolean;
};

function BasicTemplate({
  pageTitle,
  isLoading,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="basic-template">
      <Helmet title={pageTitle} />
      {isLoading ? <BasicSpinner /> : children}
    </div>
  );
}

export default BasicTemplate;
