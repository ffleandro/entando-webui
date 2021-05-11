import { NextPage } from 'next';

import { SingleSpaLayout } from '../components/SingleSpaLayout';
import SSPAWidget, { createImportMapFragment } from '../components/SSPAWidget';

interface Props {}

const importMaps = `{
    "imports": {
    "react": "https://cdn.jsdelivr.net/npm/react@17.0.1/umd/react.production.min.js",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.production.min.js",
    "single-spa": "https://cdn.jsdelivr.net/npm/single-spa/lib/system/single-spa.dev.js"
    }                        }`;

const mfApp2 = {
  mfName: '@entando/app2',
  mfURL: '/entando-app2.js',
  customProps: {
    echo: 'this is an echo',
  },
};

const SpaRemoteParcelExamplePage: NextPage<Props> = () => {
  return (
    <SingleSpaLayout>
      <script type="systemjs-importmap" dangerouslySetInnerHTML={{ __html: importMaps }}></script>
      <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>
      <script
        type="systemjs-importmap"
        dangerouslySetInnerHTML={{ __html: createImportMapFragment({ ...mfApp2 }) }}
      ></script>
      <SSPAWidget {...mfApp2} />
    </SingleSpaLayout>
  );
};

export default SpaRemoteParcelExamplePage;
