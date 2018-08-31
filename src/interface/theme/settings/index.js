const theme = {
  breakpoints: [40, 52, 64, 76, 88, 100],
  borderImage: {
    turqoise: 'linear-gradient(to right,#54a0c4,#42c68f)',
    crimson: 'linear-gradient(to right, #642B73, #C6426E)',
    colorWheel: 'linear-gradient(to right, #F4D03F,  #16A085, #e35d5b)',
  },
  fonts: {
    body: "Roboto,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
    heading: "Akrobat,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
    button: "Roboto,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif"
  },
  fontSizes: [
    11, 13, 16, 18, 24, 36, 48, 72, 92, 118
  ],
  colors: {
    blue:'#006ecc',
    charcoal: '#4a4a4a',
    grayLight: '#f6f6f6',
    gray: '#9E9E9E',
    red: '#bb3636',
    facebook: '#3b5999',
    twitter: '#55acee',
    google: '#dd4b39',
    github: '#131418',
  },
  gradient: {
    black: ['#232526', '#414345'],
    charcoal: ['#283048', '#859398'],
    cherry: ['#de6262', '#ffb88c'],
    gray: ['#e7dfdf', '#f3f8fa'],
    white: ['#065dad','#2583b0'],
  },
  textShadows: {
    0: [
      '1px 2px 1px rgba(93, 93, 93, 0.35)',
      '2px 1px 9px rgba(0,0,0, 0.0125)',
      '1px 2px 5px rgba(0,0,0, 0.05)', 
      '2px 2px 1px rgba(93,93,93, 0.15)'
    ],
    light:[
      '0 4px 6px rgba(50,50,93, .08)', 
      '0 1px 3px rgba(0,0,0, .20)',
      '0 1px 5px rgba(93,93,93, .1)'
    ],
    lightHazy: [
      '0px 2px 7px rgba(50,50 , 93, 0.08)',
      '0px 1px 9px rgba(0,0,0, 0.05)',
      '1px 2px 5px rgba(0,0,0, 0.15)', 
      '0px 2px 0px rgba(93,93,93, 0.15)'
    ],
    1:[
      '1px 2px 1px rgba(93', '93', '93', '0.35)', '2px 1px 4px rgba(0,0,0', '0.05)',
      '1px 2px 4px rgba(0,0,0', '0.05)', '2px 2px 1px rgba(20,20,20', '0.15)',
      '1px 1px 0px rgba(0', '0', '0', '0.05)', '1px 1px 2px rgba(93,93,93', '0.25)'
    ],
    dark:[
      '0 4px 6px rgba(50,50,93, .14)', 
      '0 1px 3px rgba(0,0,0, .275)',
      '1px 1px 2px rgba(0,0,0, .275)',
      '0 1px 5px rgba(93,93,93, .15)'
    ],
    darkHazy: [
      '0px 2px 7px rgba(50,50 , 93, 0.15)',
      '2px 1px 12px rgba(0,0,0, 0.15)',
      '1px 2px 7px rgba(0,0,0, 0.175)', 
      '0px 2px 0px rgba(93,93,93, 0.15)'
    ],
    darkPurple:[
      '0 4px 6px rgba(13, 13, 150, 0.068)',
      '0 1px 3px rgba(87, 28, 173, 0.25)', 
      '0 1px 5px rgba(72, 20, 222, 0.45)'
    ],
    
  },
  shadows: {
    0:[
      '0 1px 3px rgba(0,0,0,0.12)', 
      '0 1px 2px rgba(0,0,0,0.24)'
    ],
    1:[
      '0 2px 4px rgba(0,0,0,0.14)', 
      '0 2px 3px rgba(0,0,0,0.20)'
    ],
    2: [
      '0 3px 6px rgba(0,0,0,0.16)',
      '0 3px 6px rgba(0,0,0,0.23)'
      ],
    3: [
      '0 10px 20px rgba(0,0,0,0.19)',
      ' 0 6px 6px rgba(0,0,0,0.23)'
      ],
    4: [
      '0 14px 28px rgba(0,0,0,0.25)',
      '0 10px 10px rgba(0,0,0,0.22)'
    ],

    // Inset
    insetBottom: [
      'inset 0 -15px 15px -15px rgba(0,0,0,0.45)',
      'inset 0 -15px 15px -15px rgba(0,0,0,0.375)'
    ],
    insetBottomLight: [
      'inset 0 -10px 10px -10px rgba(0,0,0,0.19)',
      'inset 0 -10px 10px -10px rgba(0,0,0,0.23)'
    ],
    insetBottomHeavy: [
      'inset 0 -15px 15px -15px rgba(0,0,0,0.79)',
      'inset 0 -15px 15px -15px rgba(0,0,0,0.73)'
    ],
    insetTop: [
      'inset 0 15px 15px -15px rgba(0,0,0,0.45)',
      'inset 0 15px 15px -15px rgba(0,0,0,0.375)'
    ],
    insetTopLight: [
      'inset 0 15px 15px -15px rgba(0,0,0,0.19)',
      'inset 0 15px 15px -15px rgba(0,0,0,0.23)'
    ],
    insetTopHeavy: [
      'inset 0 15px 15px -15px rgba(0,0,0,0.79)',
      'inset 0 15px 15px -15px rgba(0,0,0,0.73)'
    ],

    // Material 3
    5: [
      '0 10px 20px rgba(0,0,0,0.19)',
      '0 6px 6px rgba(0,0,0,0.23)'
    ],
    // Material 4
    6: [
      '0 14px 28px rgba(0,0,0,0.25)',
      '0 10px 10px rgba(0,0,0,0.22)'
    ],
    7: // Material 5
    [
      '0 19px 38px rgba(0,0,0,0.30)',
      '0 15px 12px rgba(0,0,0,0.22)'
    ]
  }
}

export default theme
