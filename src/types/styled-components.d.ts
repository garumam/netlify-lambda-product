import 'styled-components';
import { ThemeInterface } from '../global/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {}
}
