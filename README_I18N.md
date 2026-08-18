Internationalization (i18n) — quick setup

Install required dependencies:

```
yarn add i18next react-i18next react-native-localize @react-native-async-storage/async-storage
# or
npm install i18next react-i18next react-native-localize @react-native-async-storage/async-storage
```

What was added:
- `src/i18n` — i18n initializer and locale files for en, vi, es, ja, zh, ko
- `src/components/LanguageSelector.js` — simple UI to switch language
- App entry imports `src/i18n` so translations are available everywhere
- `src/screens/DashboardScreen/index.js` updated as an example to use `useTranslation()`

How to use translations in code:

1. Import the hook:

```
import { useTranslation } from 'react-i18next';
```

2. Use it in a component:

```
const { t } = useTranslation();
Text>{t('your_translation_key')}</Text>
```

3. Add keys to the locale files under `src/i18n/locales/*.json`.

Notes:
- This setup persists the selected language in AsyncStorage.
- It only affects static strings in the app UI — not API responses.
