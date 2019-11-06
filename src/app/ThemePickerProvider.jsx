import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import buildTheme from '../theme/defaultTheme';
import schoolSpirit from '../theme/schoolSpirit';
import nightGame from '../theme/nightGame';
import edgeLord from '../theme/edgeLord';

const ThemeContext = React.createContext();

class ThemePickerProvider extends React.PureComponent {
  constructor (props) {
    super(props);

    this.allThemes = [
      { name: "School Spirit", shortName: "schoolSpirit", content: schoolSpirit },
      { name: "Night Game", shortName: "nightGame", content: nightGame },
      { name: "Edge Lord", shortName: "edgeLord", content: edgeLord }
    ];

    this.state = {
      selectedTheme: this.allThemes[0]
    };
  }

  setTheme = (val) => {
    const selectedTheme = this.allThemes.find(theme => theme.shortName === val);
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


export default ThemePickerProvider;
export { withThemePicker };


