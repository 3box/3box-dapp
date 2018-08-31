const
ASIDE_WIDTH_NORMAL = [0, 170, 310],
HEADER_HEIGHT_NORMAL = [180, 80],
MAIN_NORMAL = [1, 'calc(100% - 170px)', 'calc(100% - 80px)']

export const initialState = {
/*--* Dashboard *---*/
dashboard: {
  zones: {
    aside: true,
    footer: false,
    header: true,
    main: true,
    mainContent: true,
    panelLeft: true,
    panelRight: true,
  },
  regions: {
    tabs: false,
    tray: false,
  },

/*--- Header : Dashboard ---*/
header: {
  status: {
    size: 'normal',
  },
  layout: {
    height: HEADER_HEIGHT_NORMAL,
    mt: [0],
    ml:ASIDE_WIDTH_NORMAL,
  },
},

/*--- Aside : Dashboard ---*/
aside: {
  status: {
    size: 'normal',
  },
  layout: {
    bg: 'blueAlge',
    color: ['white'],
    mt: 0,
    w: ASIDE_WIDTH_NORMAL,
  },
  meta: {
    mr: 0
  }
},
/*--- Footer : Dashboard ---*/
footer: {
  status: {
    size: 'normal',
  },
  layout: {
    bg: 'grayBlue',
    gradient: 'blue',
    br: ['0 15px 0 0'],
    color: ['white'],
    height: [0, 80, 100],
    ml: [0, 170, 310],
    w: [0.8],
    z: 20,
  },
  meta: {
    mr: 0
  }
},
/*--- Main ---*/
main: {
  layout: {
    bg: 'grayLight',
    height: MAIN_NORMAL,
    mt: [180, 80],
    mb: [0],
    ml: ASIDE_WIDTH_NORMAL,
    p: [0],
    w: [1, 1, 'calc(100% - 310px)']
  },
  regions: {
    /*--- Tabs ---*/
    tabs: {
      layout: {
        p: ['5px 10px', '10px 15px']
      },
      meta: {
        height: [40,80],
        mb: [0, 20]
      }
    },
    /*--- Panel Left ---*/
    panelLeft: {
      layout: {
        gradient: 'gray',
        height: 1,
        mt: [0],
        mb:[0],
        flex: ['0 0 auto'],
        // w: [0, 120, 180]
      },
      meta: {
        mr: [0]
      }
    },
    /*--- Panel Right ---*/
    panelRight: {
      layout: {
        color: 'white',
        gradient: 'blue',
        height: 1,
        mt: [0],
        mb:[0],
        flex: ['0 0 auto'],
        // w: [0, 120, 180]
      },
      meta: {
        mr: [0]
      }
    },
    /*--- Content ---*/
    content: {
      layout: {
        bs: 0,
        height: 1,
        mt: [0],
        mb: [0],
        // ml: [180],
        // mr: [220],
        flex: ['3 5 auto'],
        // w: ['calc(100% - 360px)'],
      }
    },
  }
}
},
// End Dashboard
entityProfileLayout: {
absoluteLeft:{
  bottom: true,
  top: true,
  left: true,
  bg:'white',
  pos:['relative !important', 'relative !important', 'absolute !important'],
  height:[1],
  w:[1,1, 0.77],
},
absoluteRight: {
  top: true,
  right: true,
  gradient:'gray',
  pos:['relative !important', 'relative !important', 'absolute !important'],
  bs:[3],
  height:[1],
  w:[1,1, 0.23],
  z:15,
}
},


zones: {
  header: true,
  sidebar: true,
  footer: true,
  main: true,
},
regions: {
  tabs: false,
  tray: false,
  panelLeft: true,
  panelRight: true,
},
/*--- Header ---*/
header: {
  layout: {
    ml: [0],
    mt: [0],
    p: [0]
  },
  meta: {
    height: [120, 80],
    mb: [20, 40]
  }
},
/*--- Sidebar ---*/
footer: {
  layout: {
  
  },
  meta: {
    mr: 0
  }
},
/*--- Sidebar ---*/
sidebar: {
  layout: {
    mt: [140, 120],
    w: [0, 170, 250]
  },
  meta: {
    mr: 0
  }
},
/*--- Main ---*/
main: {
  layout: {
    bg: 'white',
    mt: [0],
    mb: [0],
    ml: [0]
  },
  regions: {
    /*--- Tabs ---*/
    tabs: {
      layout: {
        p: ['5px 10px', '10px 15px']
      },
      meta: {
        height: [40,80],
        mb: [0, 20]
      }
    },
    /*--- Tray ---*/
    tray: {
      layout: {
        mt: [40, 100],
        mb:[20, 40],
        w: [0, 120, 180]
      },
      meta: {
        mr: [0, 40, 40]
      }
    },
    /*--- Content ---*/
    content: {
      layout: {
        mt: [0],
        mb: [0],
        ml: [0],
        mr: [220],
        p: [20],
        w: ['calc(100%)'],
      },
      areas: {
        left: {
          enabled: true,
          layout: {
            flex: ["2 1 25%"],
            p: [10, 25]
          }
        },
        center: {
          enabled: true,
          layout: {
            flex: ["4 1 55%"],
            p: [30]
          }
        },
        right: {
          enabled: true,
          layout: {
            flex: ["1 1 20%"],
            p: [10, 25]
          }
        }
      }
    },
  }
}
}


export const getDelta =  (state, delta) => state[delta]  || {}

/**
 * @function getZones
 * 
 * @param {Object} state
 * @param {String} zone
 */
export const getZones = (state) => {
return state.theme
}

/**
 * @function getZones
 * 
 * @param {Object} state
 * @param {String} zone
 */
export const getZonesDashboard = (state) => {
return state.theme.dashboard
}

/**
 * @function getZone
 * 
 * @param {Object} state
 * @param {String} zone
 */
export const getZone = (state, zone) => {
return state.theme[zone]
}

/**
 * @function getZoneDashboard
 * 
 * @param {Object} state
 * @param {String} zone
 */
export const getZoneDashboard = (state, zone) => {
return state.theme.dashboard[zone]
}

/**
 * @function getZoneLayout
 * 
 * @param {Object} state
 * @param {String} zone
 */
export const getZoneLayout = (state, zone) => {
return state.theme[zone].layout
}
/**
 * @function getZoneLayout
 * 
 * @param {Object} state
 * @param {String} zone
 */
export const getZoneDashboardLayout = (state, zone) => {
return state.theme.dashboard[zone].layout
}

/**
 * @function getZoneRegions
 * 
 * @param {Object} state
 * @param {String} zone
 */
export const getZoneRegions = (state, zone) => {
return state.theme[zone].regions
}
