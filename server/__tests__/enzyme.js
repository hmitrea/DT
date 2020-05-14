import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from '../../src/components/containers/Home.js'
import Food from '../../src/components/containers/Food.js'

configure({ adapter: new Adapter() });

describe('Unit tests', () => {
  describe('Home.js', () => {
    let wrapper;
    
    beforeAll(() => {
        wrapper = shallow(<Home />)
    });

    it('Creates a left, middle, and right column inside the main child', () => {
      expect(wrapper.children().getElements()[0].props.id).toEqual('leftColumn');
      expect(wrapper.children().getElements()[1].props.id).toEqual('middleColumn');
      expect(wrapper.children().getElements()[2].props.classN).toEqual('rightColumn');
    });
  });
  describe('Food.js', () => {
    let wrapper;
    const props = {}
      recipes:[
        {
          title: 'test',
          sourceUrl: 'google.com',
          image: 'test'
        },
        {
          title: 'test2',
          sourceUrl: 'google.com',
          image: 'test2'          
        },
      ]
    
    beforeAll(() => {
        wrapper = shallow(<Food {...props}/>)
    });

    it('Creates a recipe child for each item in the recipes prop', () => {

    });
  });
});

   