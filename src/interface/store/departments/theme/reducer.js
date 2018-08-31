import { initialState } from './selectors'
import {
    THEME_LAYOUT_DASHBOARD_ASIDE_ON,
    THEME_LAYOUT_DASHBOARD_ASIDE_OFF,
    THEME_LAYOUT_DASHBOARD_ASIDE_TOGGLE,
    THEME_LAYOUT_DASHBOARD_ASIDE_SMALL,
    THEME_LAYOUT_DASHBOARD_ASIDE_NORMAL,
    THEME_LAYOUT_DASHBOARD_ASIDE_LARGE,

    THEME_LAYOUT_DASHBOARD_HEADER_ON,
    THEME_LAYOUT_DASHBOARD_HEADER_OFF,
    THEME_LAYOUT_DASHBOARD_HEADER_TOGGLE,
    THEME_LAYOUT_DASHBOARD_HEADER_SMALL,
    THEME_LAYOUT_DASHBOARD_HEADER_NORMAL,
    THEME_LAYOUT_DASHBOARD_HEADER_LARGE,

    THEME_LAYOUT_DASHBOARD_FOOTER_ON,
    THEME_LAYOUT_DASHBOARD_FOOTER_OFF,
    THEME_LAYOUT_DASHBOARD_FOOTER_SMALL,
    THEME_LAYOUT_DASHBOARD_FOOTER_NORMAL,
    THEME_LAYOUT_DASHBOARD_FOOTER_LARGE,

    THEME_LAYOUT_DASHBOARD_PANELS_ON,
    THEME_LAYOUT_DASHBOARD_PANELS_OFF,
    THEME_LAYOUT_DASHBOARD_PANELS_TOGGLE,
    THEME_LAYOUT_DASHBOARD_PANEL_LEFT_TOGGLE,
    THEME_LAYOUT_DASHBOARD_PANEL_RIGHT_TOGGLE,
} from './actions'
/* --------------------------- Define Constants ----------------------------- */
// Header
const ASIDE_SMALL = [0, 60, 70]
const ASIDE_LARGE = [0, 420, 460]
const ASIDE_NORMAL = [0, 170, 310]

// Aside
const HEADER_HEIGHT_SMALL = [0, 50]
const HEADER_HEIGHT_NORMAL = [180, 80]
const HEADER_HEIGHT_LARGE = [200, 250]

// Footer 
const FOOTER_WIDTH_SMALL = [0, 50]
const FOOTER_WIDTH_NORMAL = [1, 'calc(100% - 170px)', 'calc(100% - 310px)']
const FOOTER_WIDTH_LARGE = [200, 250]

const MAIN_WIDTH_SMALL = [1, 'calc(100% - 60px)', 'calc(100% - 70px)']
const MAIN_WIDTH_NORMAL = [1, 'calc(100% - 170px)', 'calc(100% - 310px)']
const MAIN_WIDTH_LARGE = [1, 'calc(100% - 420px)', 'calc(100% - 460px)']



const MAIN_HEIGHT_HEADER_NORMAL_FOOTER_NORMAL = [1, 'calc(100% - 180px)', 'calc(100% - 250px)']
const MAIN_HEIGHT_HEADER_NORMAL_FOOTER_OFF = [1, 'calc(100% - 80px)', 'calc(100% - 150px)']


let
ASIDE_PREVIOUS,
ASIDE_SIZE_PREVIOUS,
MAIN_PREVIOUS,
MAIN_WIDTH_PREVIOUS; 

let
FOOTER_STATUS,
FOOTER_SIZE = 'normal',
HEADER_STATUS,
HEADER_SIZE = 'normal';

const mainHeightCalculator = props => {
    if(HEADER_STATUS && FOOTER_STATUS) {
        if(HEADER_SIZE === 'normal' && FOOTER_SIZE === 'normal') return MAIN_HEIGHT_HEADER_NORMAL_FOOTER_NORMAL
    }
    if(HEADER_STATUS && !FOOTER_STATUS) {
        if(HEADER_SIZE === 'normal') return MAIN_HEIGHT_HEADER_NORMAL_FOOTER_OFF
    }
}

/* ---------------------------- Define Actions ------------------------------ */
export default (state = initialState, { type, payload }) => {
    switch (type) {

        /*---* 
        
            Aside : Zone 
            
        *---*/
        case THEME_LAYOUT_DASHBOARD_ASIDE_ON:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        aside: true,
                    },
                    aside: {
                        ...state.dashboard.aside,
                        status: {
                            ...state.dashboard.aside.status,
                            state: true
                        },
                        layout: {
                            ...state.dashboard.aside.layout,
                            width: ASIDE_PREVIOUS
                        }
                    },
                    header: {
                        ...state.dashboard.header,
                        layout: {
                            ...state.dashboard.header.layout,
                            ml: ASIDE_PREVIOUS,
                            width: MAIN_WIDTH_PREVIOUS,
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            ml: ASIDE_PREVIOUS,
                            width: MAIN_WIDTH_PREVIOUS,
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_ASIDE_OFF:

            // Globals
            ASIDE_PREVIOUS = state.dashboard.main.layout.ml
            MAIN_WIDTH_PREVIOUS = state.dashboard.main.layout.width
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        aside: false,
                    },
                    aside: {
                        ...state.dashboard.aside,
                        status: {
                            ...state.dashboard.aside.status,
                            state: false
                        }
                    },
                    header: {
                        ...state.dashboard.header,
                        status: 'full',
                        layout: {
                            ...state.dashboard.header.layout,
                            ml: 0,
                            width: 1
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        status: 'full',
                        layout: {
                            ...state.dashboard.main.layout,
                            ml: 0,
                            width: 1
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_ASIDE_TOGGLE:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        aside: state.dashboard.zones.aside ? false : true ,
                    },
                    aside: {
                        ...state.dashboard.aside,
                        layout: {
                            ...state.dashboard.aside.layout,
                            width: ASIDE_SMALL
                        }
                    },
                    header: {
                        ...state.dashboard.header,
                        layout: {
                            ...state.dashboard.header.layout,
                            ml: 0,
                            width: 1
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            ml: 0,
                            width: 1
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_ASIDE_SMALL:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        aside: true,
                    },
                    aside: {
                        ...state.dashboard.aside,
                        status: {
                            ...state.dashboard.aside.status,
                            size: 'small'
                        },
                        layout: {
                            ...state.dashboard.aside.layout,
                            width: ASIDE_SMALL
                        }
                    },
                    header: {
                        ...state.dashboard.header,
                        layout: {
                            ...state.dashboard.header.layout,
                            ml: ASIDE_SMALL,
                            width: MAIN_WIDTH_SMALL
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            ml: ASIDE_SMALL,
                            width: MAIN_WIDTH_SMALL
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_ASIDE_NORMAL:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        aside: true ,
                    },
                    aside: {
                        ...state.dashboard.aside,
                        status: {
                            ...state.dashboard.aside.status,
                            size: 'normal'
                        },
                        layout: {
                            ...state.dashboard.aside.layout,
                            width: ASIDE_NORMAL
                        }
                    },
                    header: {
                        ...state.dashboard.header,
                        layout: {
                            ...state.dashboard.header.layout,
                            ml: ASIDE_NORMAL,
                            width: MAIN_WIDTH_NORMAL
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            ml: ASIDE_NORMAL,
                            width: MAIN_WIDTH_NORMAL
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_ASIDE_LARGE:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        aside: true,
                    },
                    aside: {
                        ...state.dashboard.aside,
                        status: {
                            ...state.dashboard.aside.status,
                            size: 'large'
                        },
                        layout: {
                            ...state.dashboard.aside.layout,
                            width: ASIDE_LARGE
                        }
                    },
                    header: {
                        ...state.dashboard.header,
                        layout: {
                            ...state.dashboard.header.layout,
                            ml: ASIDE_LARGE,
                            width: MAIN_WIDTH_LARGE
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            ml: ASIDE_LARGE,
                            width: MAIN_WIDTH_LARGE
                        }
                    }
                }
            }

        /*---* 
    
        Footer : Zone 
            
        *---*/
        case THEME_LAYOUT_DASHBOARD_FOOTER_ON:
            FOOTER_STATUS = true
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        footer: true,
                    },
                    footer: {
                        ...state.dashboard.footer,
                        status: {
                            ...state.dashboard.footer.status,
                            state: true
                        },
                        layout: {
                            ...state.dashboard.footer.layout,
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            height: mainHeightCalculator()
                        }
                    }
                }
            }

            
        case THEME_LAYOUT_DASHBOARD_FOOTER_OFF:
            FOOTER_STATUS = false
            // Global
            MAIN_WIDTH_PREVIOUS = state.dashboard.main.layout.width
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        footer: false,
                    },
                    footer: {
                        ...state.dashboard.footer,
                        status: {
                            ...state.dashboard.footer.status,
                            state: false
                        }
                    },
    
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            height: mainHeightCalculator()
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_FOOTER_SMALL:
            FOOTER_SIZE = 'small'
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        footer: true,
                    },
                    footer: {
                        ...state.dashboard.footer,
                        status: {
                            ...state.dashboard.footer.status,
                            size: 'small'
                        },
                        layout: {
                            ...state.dashboard.footer.layout,
                            width: FOOTER_WIDTH_SMALL
                        }
                    },
                    header: {
                        ...state.dashboard.header,
                        layout: {
                            ...state.dashboard.header.layout,
                            ml: FOOTER_WIDTH_SMALL,
                            width: MAIN_WIDTH_SMALL
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            width: MAIN_WIDTH_SMALL
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_FOOTER_NORMAL:
            FOOTER_SIZE = 'normal'
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        footer: true ,
                    },
                    footer: {
                        ...state.dashboard.footer,
                        status: {
                            ...state.dashboard.footer.status,
                            size: 'normal'
                        },
                        layout: {
                            ...state.dashboard.footer.layout,
                            width: FOOTER_WIDTH_NORMAL
                        }
                    },
                    header: {
                        ...state.dashboard.header,
                        layout: {
                            ...state.dashboard.header.layout,
                            width: MAIN_WIDTH_NORMAL
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            width: MAIN_WIDTH_NORMAL
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_FOOTER_LARGE:
            FOOTER_SIZE = 'large'
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        footer: true,
                    },
                    footer: {
                        ...state.dashboard.footer,
                        status: {
                            ...state.dashboard.footer.status,
                            size: 'large'
                        },
                        layout: {
                            ...state.dashboard.footer.layout,
                            width: FOOTER_WIDTH_LARGE
                        }
                    },
                    header: {
                        ...state.dashboard.header,
                        layout: {
                            ...state.dashboard.header.layout,
                            width: MAIN_WIDTH_LARGE
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            width: MAIN_WIDTH_LARGE
                        }
                    }
                }
            }

        /*---* 
        
            Header : Zone 
            
        *---*/
        case THEME_LAYOUT_DASHBOARD_HEADER_ON:
            HEADER_STATUS = true
            return {
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        header: true,
                    },
                    header: {
                        ...state.dashboard.header,
                        status: {
                            ...state.dashboard.header.status,
                            size: ASIDE_SIZE_PREVIOUS
                        },
                        layout: {
                            ...state.dashboard.header.layout,
                            width: MAIN_PREVIOUS
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            mt: MAIN_PREVIOUS,
                            height: '100%',
                            width: MAIN_PREVIOUS
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_HEADER_OFF:
            HEADER_STATUS = false
            // GLOBALS
            ASIDE_SIZE_PREVIOUS = state.dashboard.header.status.size
            MAIN_PREVIOUS = state.dashboard.main.layout.mt
            return {
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        header: false ,
                    },
                    main: {
                        ...state.dashboard.main,
                        status: 'full',
                        layout: {
                            ...state.dashboard.main.layout,
                            mt: 0,
                            height: '100%'
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_HEADER_TOGGLE:
            return {
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        header: state.dashboard.zones.header ? false : true ,
                    },
                    main: {
                        ...state.dashboard.main,
                        status: 'full',
                        layout: {
                            ...state.dashboard.main.layout,
                            mt: 0,
                            height: '100%'
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_HEADER_SMALL:
            HEADER_SIZE = 'small'
            return {
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        header: true ,
                    },
                    main: {
                        ...state.dashboard.main,
                        status: {
                            ...state.dashboard.header.status,
                            size: 'small'
                        },
                        layout: {
                            ...state.dashboard.main.layout,
                            mt: HEADER_HEIGHT_SMALL,
                            height: '100%'
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_HEADER_NORMAL:
            HEADER_SIZE = 'normal'
            return {
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        header: true,
                    },
                    header: {
                        ...state.dashboard.header,
                        status: {
                            ...state.dashboard.header.status,
                            size: 'normal'
                        },
                        layout: {
                            ...state.dashboard.header.layout,
                            height: HEADER_HEIGHT_NORMAL,
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        status: 'full',
                        layout: {
                            ...state.dashboard.main.layout,
                            mt: HEADER_HEIGHT_NORMAL,
                            height: '100%'
                        }
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_HEADER_LARGE:
            HEADER_SIZE = 'large'
            return {
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        header: true,
                    },
                    header: {
                        ...state.dashboard.header,
                        status: {
                            ...state.dashboard.header.status,
                            size: 'large'
                        },
                        layout: {
                            ...state.dashboard.header.layout,
                            height: HEADER_HEIGHT_LARGE,
                        }
                    },
                    main: {
                        ...state.dashboard.main,
                        layout: {
                            ...state.dashboard.main.layout,
                            mt: HEADER_HEIGHT_LARGE,
                            height: '100%'
                        }
                    }
                }
            }


        /*---* Panels : Main *---*/
        case THEME_LAYOUT_DASHBOARD_PANEL_LEFT_TOGGLE:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        panelLeft: state.dashboard.zones.panelLeft ? false : true ,
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_PANEL_RIGHT_TOGGLE:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        panelRight: state.dashboard.zones.panelRight ? false : true ,
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_PANELS_ON:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        panelLeft: true,
                        panelRight: true,
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_PANELS_OFF:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        panelLeft: false,
                        panelRight: false
                    }
                }
            }
        case THEME_LAYOUT_DASHBOARD_PANELS_TOGGLE:
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    zones: {
                        ...state.dashboard.zones,
                        panelLeft: state.dashboard.zones.panelLeft ? false : true ,
                        panelRight: state.dashboard.zones.panelRight ? false : true ,
                    }
                }
            }

    
        default:
            return state;
    }
}
