import React, {createContext} from 'react';

const defaultContext = {
  theme: {
    mode: 'light',
    colors: {
      primary: '#e5634d',
      secondary: '#4a91a4',
      background: '#f9f9f9',
      card: '#ffffff',
      text: '#303233',
      textSecondary: '#727272',
      border: '#e8e8e8',
      error: '#f44336',
    },
  },
  font: 'SFProText',
  language: 'en',
};

const Index = createContext(defaultContext);

export default Index;
