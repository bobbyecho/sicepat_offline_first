import React from 'react';
import { RecoilRoot } from 'recoil';
import { Pokemon } from './modules/pokemon/presentation/screens/Pokemon';
 
const App = () => {
  return (
    <RecoilRoot>
      <Pokemon />
    </RecoilRoot>
  )
};

export default App;
 