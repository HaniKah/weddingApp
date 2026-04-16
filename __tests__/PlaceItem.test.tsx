import React from 'react';
import { render } from '@testing-library/react-native';
import PlaceItem from '../components/items/PlaceItem';
import { Categories, PlacesDto, SearchFilter } from '@/types/open-api';

// Mock expo-router Link to avoid requiring full navigation context
jest.mock('expo-router', () => {
  const { View } = require('react-native');
  return {
    Link: ({ children, testID, href, style, ...props }: any) => (
      <View testID={testID || 'mock-link'} {...props}>
        {children}
      </View>
    ),
  };
});

describe('PlaceItem', () => {
  const baseMockItem: PlacesDto = {
    id: 1,
    step: Categories.Catering,
    mainPhoto: 'https://example.com/photo.jpg' as unknown as SearchFilter,
    name: 'Beautiful Catering',
    formattedAddress: '123 Test St',
    picked: false,
    favourite: false,
    minPrice: '100',
    maxPrice: '200',
    currency: 'USD',
    isPromoted: false,
    label: null,
  };

  it('renders the generic place item correctly', () => {
    const { getByText } = render(<PlaceItem item={baseMockItem} />);

    expect(getByText('Beautiful Catering')).toBeTruthy();
    expect(getByText('100 - 200')).toBeTruthy();
    expect(getByText('USD')).toBeTruthy();
  });

  it('renders single price when minPrice and maxPrice are equal', () => {
    const mockItem = { ...baseMockItem, minPrice: '150', maxPrice: '150' };
    const { getByText, queryByText } = render(<PlaceItem item={mockItem} />);

    expect(getByText('150')).toBeTruthy();
    expect(queryByText('150 - 150')).toBeNull();
  });

  it('renders the promoted label when isPromoted is true', () => {
    const mockItem = { ...baseMockItem, isPromoted: true, label: 'Top Rated' };
    const { getByText } = render(<PlaceItem item={mockItem} />);

    expect(getByText('Top Rated')).toBeTruthy();
  });

  it('does not render the promoted label when isPromoted is false', () => {
    const mockItem = { ...baseMockItem, isPromoted: false, label: 'Top Rated' };
    const { queryByText } = render(<PlaceItem item={mockItem} />);

    expect(queryByText('Top Rated')).toBeNull();
  });
});
