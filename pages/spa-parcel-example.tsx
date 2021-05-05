import { NextPage } from 'next';
import { mountRootParcel } from 'single-spa';
import Parcel from 'single-spa-react/parcel';

import { MyParcel } from '../components/parcels/entando-mf-recipes-sspa-parcel-recipe';
import { SingleSpaLayout } from '../components/SingleSpaLayout';

interface Props {
  importMaps?: string[];
}

const SpaParcelExamplePage: NextPage<Props> = () => {
  return (
    <SingleSpaLayout>
      <Parcel config={MyParcel} wrapWith="div" mountParcel={mountRootParcel} name="Filipe" />
      <Parcel config={MyParcel} wrapWith="div" mountParcel={mountRootParcel} name="Germano" />
    </SingleSpaLayout>
  );
};

/*SpaPage.getInitialProps = async () => {
  const importMaps: string[] = ['test1', 'test2']; //TODO process import maps

  return {
    props: {
      importMaps,
    },
  };
};*/

export default SpaParcelExamplePage;
