import { NextPage } from 'next';

import FigmaExampleComponent from 'components/FigmaExampleComponent';

interface Props {}

const WebBuilderHomePage: NextPage<Props> = () => {
  return (
    <>
      <FigmaExampleComponent />;
    </>
  );
};

export default WebBuilderHomePage;
