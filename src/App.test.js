import React from 'react';
import {
  mount
} from 'enzyme';
import App from './App';

// describe('LockScreen', () => {
//   let props;
//   let mountedLockScreen;

//   const lockScreen = () => {
//     if (!mountedLockScreen) {
//       mountedLockScreen = mount( <
//         App { ...props
//         }
//         />,
//       );
//     }
//     return mountedLockScreen;
//   };

//   // beforeEach(() => {
//   //   props = {
//   //     wallpaperPath: undefined,
//   //     userInfoMessage: undefined,
//   //     onUnlocked: undefined,
//   //   };
//   //   mountedLockScreen = undefined;
//   // });


//   it('always renders a div', () => {
//     const divs = lockScreen().find('div');
//     expect(divs.length).toBeGreaterThan(0);
//   });

// });