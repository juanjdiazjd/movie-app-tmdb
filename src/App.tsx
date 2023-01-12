import * as React from 'react';
import 'react-native-gesture-handler';
import relativeTime from 'dayjs/plugin/relativeTime';
import RNBootSplash from 'react-native-bootsplash';

import dayjs from 'dayjs';
import styled from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GradientProvider } from './core/context/GradientContext';
import NavContainer from './navigation';

const GestureHandlerRootViewFlex = styled(GestureHandlerRootView)`
  flex: 1;
`;

dayjs.extend(relativeTime);

const App = () => {

  RNBootSplash.hide();

  return (
    <GestureHandlerRootViewFlex>
      <GradientProvider>{NavContainer()}</GradientProvider>
    </GestureHandlerRootViewFlex>
  );
};

export default App;
