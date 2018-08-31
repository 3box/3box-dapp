/* --------------------------- Define Constants ----------------------------- */
export const THEME_SETTING_TOGGLE = 'THEME_SETTING_TOGGLE';

export const THEME_LAYOUT_DASHBOARD_ASIDE_ON = 'THEME_LAYOUT_DASHBOARD_ASIDE_ON';
export const THEME_LAYOUT_DASHBOARD_ASIDE_OFF = 'THEME_LAYOUT_DASHBOARD_ASIDE_OFF';
export const THEME_LAYOUT_DASHBOARD_ASIDE_TOGGLE = 'THEME_LAYOUT_DASHBOARD_ASIDE_TOGGLE';
export const THEME_LAYOUT_DASHBOARD_ASIDE_SMALL = 'THEME_LAYOUT_DASHBOARD_ASIDE_SMALL';
export const THEME_LAYOUT_DASHBOARD_ASIDE_NORMAL = 'THEME_LAYOUT_DASHBOARD_ASIDE_NORMAL';
export const THEME_LAYOUT_DASHBOARD_ASIDE_LARGE = 'THEME_LAYOUT_DASHBOARD_ASIDE_LARGE';

export const THEME_LAYOUT_DASHBOARD_FOOTER_ON = 'THEME_LAYOUT_DASHBOARD_FOOTER_ON';
export const THEME_LAYOUT_DASHBOARD_FOOTER_OFF = 'THEME_LAYOUT_DASHBOARD_FOOTER_OFF';
export const THEME_LAYOUT_DASHBOARD_FOOTER_TOGGLE = 'THEME_LAYOUT_DASHBOARD_FOOTER_TOGGLE';
export const THEME_LAYOUT_DASHBOARD_FOOTER_SMALL = 'THEME_LAYOUT_DASHBOARD_FOOTER_SMALL';
export const THEME_LAYOUT_DASHBOARD_FOOTER_NORMAL = 'THEME_LAYOUT_DASHBOARD_FOOTER_NORMAL';
export const THEME_LAYOUT_DASHBOARD_FOOTER_LARGE = 'THEME_LAYOUT_DASHBOARD_FOOTER_LARGE';

export const THEME_LAYOUT_DASHBOARD_HEADER_ON = 'THEME_LAYOUT_DASHBOARD_HEADER_ON';
export const THEME_LAYOUT_DASHBOARD_HEADER_OFF = 'THEME_LAYOUT_DASHBOARD_HEADER_OFF';
export const THEME_LAYOUT_DASHBOARD_HEADER_TOGGLE = 'THEME_LAYOUT_DASHBOARD_HEADER_TOGGLE';
export const THEME_LAYOUT_DASHBOARD_HEADER_SMALL = 'THEME_LAYOUT_DASHBOARD_HEADER_SMALL';
export const THEME_LAYOUT_DASHBOARD_HEADER_NORMAL = 'THEME_LAYOUT_DASHBOARD_HEADER_NORMAL';
export const THEME_LAYOUT_DASHBOARD_HEADER_LARGE = 'THEME_LAYOUT_DASHBOARD_HEADER_LARGE';

export const THEME_LAYOUT_DASHBOARD_PANELS_ON = 'THEME_LAYOUT_DASHBOARD_PANELS_ON';
export const THEME_LAYOUT_DASHBOARD_PANELS_OFF = 'THEME_LAYOUT_DASHBOARD_PANELS_OFF';
export const THEME_LAYOUT_DASHBOARD_PANELS_TOGGLE = 'THEME_LAYOUT_DASHBOARD_PANELS_TOGGLE';
export const THEME_LAYOUT_DASHBOARD_PANEL_LEFT_TOGGLE = 'THEME_LAYOUT_DASHBOARD_PANEL_LEFT_TOGGLE';
export const THEME_LAYOUT_DASHBOARD_PANEL_RIGHT_TOGGLE = 'THEME_LAYOUT_DASHBOARD_PANEL_RIGHT_TOGGLE';

export const THEME_LAYOUT_DASHBOARD_MAIN_BACKGROUND = 'THEME_LAYOUT_DASHBOARD_MAIN_BACKGROUND';

/* ---------------------------- Define Actions ------------------------------ */
export const themeSettingToggle = ({payload}) => ({
  type: THEME_SETTING_TOGGLE,
  payload,
})


/*---* Aside *---*/
export const themeLayoutDashboardAsideOn = () => ({
  type: THEME_LAYOUT_DASHBOARD_ASIDE_ON
})
export const themeLayoutDashboardAsideOff = () => ({
  type: THEME_LAYOUT_DASHBOARD_ASIDE_OFF
})
export const themeLayoutDashboardAsideToggle = () => ({
  type: THEME_LAYOUT_DASHBOARD_ASIDE_TOGGLE
})
export const themeLayoutDashboardAsideSmall = () => ({
  type: THEME_LAYOUT_DASHBOARD_ASIDE_SMALL
})
export const themeLayoutDashboardAsideNormal = () => ({
  type: THEME_LAYOUT_DASHBOARD_ASIDE_NORMAL
})
export const themeLayoutDashboardAsideLarge = () => ({
  type: THEME_LAYOUT_DASHBOARD_ASIDE_LARGE
})

/*---* Footer *---*/
export const themeLayoutDashboardFooterOn = () => ({
  type: THEME_LAYOUT_DASHBOARD_FOOTER_ON
})
export const themeLayoutDashboardFooterOff = () => ({
  type: THEME_LAYOUT_DASHBOARD_FOOTER_OFF
})
export const themeLayoutDashboardFooterToggle = () => ({
  type: THEME_LAYOUT_DASHBOARD_FOOTER_TOGGLE
})
export const themeLayoutDashboardFooterSmall = () => ({
  type: THEME_LAYOUT_DASHBOARD_FOOTER_SMALL
})
export const themeLayoutDashboardFooterNormal = () => ({
  type: THEME_LAYOUT_DASHBOARD_FOOTER_NORMAL
})
export const themeLayoutDashboardFooterLarge = () => ({
  type: THEME_LAYOUT_DASHBOARD_FOOTER_LARGE
})

/*---* HEADER *---*/
export const themeLayoutDashboardHeaderOn = () => ({
  type: THEME_LAYOUT_DASHBOARD_HEADER_ON
})
export const themeLayoutDashboardHeaderOff = () => ({
  type: THEME_LAYOUT_DASHBOARD_HEADER_OFF
})
export const themeLayoutDashboardHeaderToggle = () => ({
  type: THEME_LAYOUT_DASHBOARD_HEADER_TOGGLE
})
export const themeLayoutDashboardHeaderSmall = () => ({
  type: THEME_LAYOUT_DASHBOARD_HEADER_SMALL
})
export const themeLayoutDashboardHeaderNormal = () => ({
  type: THEME_LAYOUT_DASHBOARD_HEADER_NORMAL
})
export const themeLayoutDashboardHeaderLarge = () => ({
  type: THEME_LAYOUT_DASHBOARD_HEADER_LARGE
})


/*---* Panels *---*/
export const themeLayoutPanelsToggle = () => ({
  type: THEME_LAYOUT_DASHBOARD_PANELS_TOGGLE
})

export const themeLayoutPanelsOn = () => ({
  type: THEME_LAYOUT_DASHBOARD_PANELS_ON
})
export const themeLayoutPanelsOff = () => ({
  type: THEME_LAYOUT_DASHBOARD_PANELS_OFF
})

export const themeLayoutPanelLeftToggle = () => ({
  type: THEME_LAYOUT_DASHBOARD_PANEL_LEFT_TOGGLE
})

export const themeLayoutPanelRightToggle = () => ({
  type: THEME_LAYOUT_DASHBOARD_PANEL_RIGHT_TOGGLE
})