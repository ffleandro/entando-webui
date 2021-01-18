import React from 'react';

import Menu from '../components/widgets/Menu/index.jsx';
import { PRODUCT_CATEGORIES } from '../utils/mocks';

export default {
  title: 'Widgets/Menu',
  component: Menu,
};

const Template = (args) => <Menu {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  categories: PRODUCT_CATEGORIES,
};
