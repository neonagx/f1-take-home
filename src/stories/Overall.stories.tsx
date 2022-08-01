import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Overall from '../components/Overall';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Overall,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Overall>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Overall> = (args) => <Overall />;

export const FirstStory = Template.bind({});

FirstStory.args ={

}