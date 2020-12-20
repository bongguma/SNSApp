// import React, { Fragment } from 'react';
// import { StatusBar, SafeAreaView } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import Styled from 'styled-components/native';
// import Navigator from '..//Screen/Navigator';
// import { UserContextProvider } from '../Context/User';
// import {RandomUserDataProvider} from '../Context/RandomUserData';

// const ScrollView = Styled.ScrollView`
//   background-color: ${Colors.lighter};
// `;

// const Body = Styled.View`
//   background-color: ${Colors.white};
// `;

// const SectionContainer = Styled.View`
//   margin-top: 32px;
//   padding-horizontal: 24px;
// `;

// const SectionDescription = Styled.Text`
//   margin-top: 8px;
//   font-size: 18px;
//   font-weight: 400;
//   color: ${Colors.dark};
// `;

// const HighLight = Styled.Text`
//   font-weight: 700;
// `;

// interface Props {}

// const App = ({  }: Props) => {
//   return (
//     <RandomUserDataProvider cache={true}>
//       <UserContextProvider>
//         <StatusBar barStyle="default">
//           <Navigator />
//         </StatusBar>
//       </UserContextProvider>
//     </RandomUserDataProvider>
//   );
// };

// export default App;



import React from 'react';
import {StatusBar} from 'react-native';

import Navigator from '../Screen/Navigator';
import {UserContextProvider} from '../Context/User';
import {RandomUserDataProvider} from '..//Context/RandomUserData';

interface Props {}

const App = ({}: Props) => {
  return (
    <RandomUserDataProvider cache={true}>
      <UserContextProvider>
        <StatusBar barStyle="default" />
        <Navigator />
      </UserContextProvider>
    </RandomUserDataProvider>
  );
};
export default App;