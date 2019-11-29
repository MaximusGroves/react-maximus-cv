import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { withCookies } from 'react-cookie';

import buildTheme from 'theme/defaultTheme';
import schoolSpirit from 'theme/schoolSpirit';
import nightGame from 'theme/nightGame';
import edgeLord from 'theme/edgeLord';

const ThemeContext = React.createContext();




class ThemePickerProvider extends React.PureComponent {

  constructor (props) {
    super(props);

    this.allThemes = [
      { name: "School Spirit - Light Theme", shortName: "schoolSpirit", content: schoolSpirit },
      { name: "Night Game - Dark Theme", shortName: "nightGame", content: nightGame },
      { name: "Edge Lord - Villain Theme", shortName: "edgeLord", content: edgeLord }
    ];

    const cookieTheme = this.allThemes.find(theme => theme.shortName === (this.props.cookies.get('theme'))) ;

    this.state = {
      selectedTheme: cookieTheme || this.allThemes[0]
    };
  }

  setTheme = (val) => {
    const selectedTheme = this.allThemes.find(theme => theme.shortName === val);
    this.props.cookies.set('theme', selectedTheme.shortName);
    this.setState({ selectedTheme });
  }

  render () {
    const {
      children
    } = this.props;

    const {
      selectedTheme
    } = this.state;

    return (
      <MuiThemeProvider theme={buildTheme(selectedTheme.content)}>
        <ThemeContext.Provider value={{
          setTheme: this.setTheme,
          allThemes: this.allThemes,
          selectedTheme: selectedTheme.shortName
        }}>
          {children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    );
  }
}

const withThemePicker = Component => props => (
  <ThemeContext.Consumer>
    {context => <Component {...props} themeContext={context} />}
  </ThemeContext.Consumer>
);


export default withCookies(ThemePickerProvider);
export { withThemePicker };
