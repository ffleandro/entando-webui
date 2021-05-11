import { NextPage } from 'next';

import { SingleSpaLayout } from '../components/SingleSpaLayout';
import WCWidget from '../components/WCWidget';

interface Props {}

const mfWcApp = {
  elemName: 'x-rwc',
  mfName: '@entando/wcApp',
  mfURL: '/entando-react-app-wc-umd.js',
  customProps: {
    echo: 'my custom wc echo',
  },
};

const SpaWCExamplePage: NextPage<Props> = () => {
  return (
    <SingleSpaLayout>
      <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>
      <WCWidget {...mfWcApp} />
    </SingleSpaLayout>
  );
};

export default SpaWCExamplePage;
