import React from 'react';

import Banner from '../components/widgets/Banner/index.jsx';
import { BANNERS } from '../utils/mocks';

export default {
  title: 'Widgets/Banner',
  component: Banner,
};

const Template = (args) => <Banner {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  banners: BANNERS,
};
