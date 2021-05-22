import { NextPage } from 'next';

import { Layout } from 'components/Layout';
import FigmaExampleComponent from 'components/FigmaExampleComponent';

interface Props {}

const WebBuilderHomePage: NextPage<Props> = () => {
  return (
    <Layout title='Entando WebUI | Figma Example'>
      <FigmaExampleComponent />
    </Layout>
  );
};

export default WebBuilderHomePage;
