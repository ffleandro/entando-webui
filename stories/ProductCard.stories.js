import React from 'react';

import ProductCard from '../components/widgets/ProductCard/index.jsx';

export default {
  title: 'Widgets/ProductCard',
  component: ProductCard,
};

const Template = (args) => <ProductCard {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  category: 'Watch',
  price: '150',
  title: 'Apple Watch Series 3 38mm Spacial Gray',
  images: [
    'http://quickstart-release-e6-3-0.apps.rd.entando.org/entando-de-app/cmsresources/cms/images/watch01_d3.jpg',
  ],
};
