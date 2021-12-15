import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../views/dashboard';
import  CryptoDetail from '../views/crypto-detail';
import DefaultLayout from '../layouts/DefaultLayout';

describe('<Render de los componentes y layouts/>', () => {
  const layout = shallow(<DefaultLayout />);
  const dashboard = shallow(<Dashboard />);
  const cryptoDetail = shallow(<CryptoDetail />);
  test('Render del componente DefaultLayout', () => {
    expect(layout.length).toEqual(1);
  });
  test('Render del componente Dashboard', () => {
    expect(dashboard.length).toEqual(1);
  });
  test('Render del componente CryptoDetail', () => {
    expect(cryptoDetail.length).toEqual(1);
  });  
});