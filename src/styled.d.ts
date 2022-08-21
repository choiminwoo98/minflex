import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      ligther: string;
    };
    white: {
      lighter: string;
      darker: string;
    };
  }
}
