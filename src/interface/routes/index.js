import FrontHeader from 'views/header/Front'
import FrontMain from 'views/main/Front'


import AboutHeader from 'views/header/About'
import AboutMain from 'views/main/About'
import HowItWorksMain from 'views/main/HowItWorks'
import ProfileMain from 'views/main/Profile'
import ProfileEditMain from 'views/main/ProfileEdit'
import SettingsMain from 'views/main/Settings'

export default [
  {
    path: "/",
    header: FrontHeader,
    main: FrontMain,
    meta: {
      exact: true,
    }
  },  
  {
    path: "/profile",
    main: ProfileMain,
    meta: {
      exact: true,
    }
  },  
  {
    path: "/profile/edit",
    main: ProfileEditMain,
    meta: {
      exact: true,
    }
  },  
  {
    path: "/settings",
    main: SettingsMain,
    meta: {
      exact: true,
    }
  },  
  {
    path: "/about",
    header: AboutHeader,
    main: AboutMain,
    meta: {
      exact: true,
    }
  },  
  {
    path: "/how-it-works",
    // header: FrontHeader,
    main: HowItWorksMain,
    meta: {
      exact: true,
    }
  },  
]