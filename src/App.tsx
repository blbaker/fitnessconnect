import React, { useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import { useMst } from './stores/RootStore';
import i18n from './core/i18n';
import { defaultTheme } from './theme';
import Root from './components/Root/Root';

const App: React.FC = () => {
  const { configStore } = useMst();

  useEffect(() => {
    i18n.init({
      lng: configStore.currentLanguage,
      fallbackLng: configStore.fallbackLanguages,
    });

    const translations = configStore.translations;
    Object.keys(translations).forEach((language) => {
      i18n.addResourceBundle(language, 'translation', translations[language], true, true);
    });
    return;
  });

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Root></Root>
    </MuiThemeProvider>
  );
};

export default App;
