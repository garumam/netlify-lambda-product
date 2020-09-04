export interface ThemeInterface {
  bgPrimaryColor: string;
  bgSecondaryColor: string;
  bgSCRGB: string;
  textColor: string;
  textColorTitles: string;
  extraColorLight: string;
  paddingDefault: string;
  headerHeightMobile: string;
}

export const theme: ThemeInterface = {
  bgPrimaryColor: '#382d3b',
  bgSecondaryColor: '#d84361',
  bgSCRGB: '216,67,97',
  textColor: '#eedeab',
  textColorTitles: '#d84361',
  extraColorLight: '#c6ce9d',
  paddingDefault: '0.7rem',
  headerHeightMobile: '100px',
};
