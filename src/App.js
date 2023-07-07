import TypesafeI18n, { useI18nContext } from './i18n/i18n-react';
import { useEffect, useState } from 'react';

const TestComponent = () => {
  const { setLocale, locale } = useI18nContext();

  const [state, setState] = useState('en');

  // setState is safe to use as deps
  useEffect(() => {
    setState('de');
    return () => setState('en');
  }, [setState]);

  // but setLocale is not :\
  // Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
  useEffect(() => {
    setLocale('de');
    return () => setLocale('en');
  }, [setLocale]);


  return <>Current locale is {locale} <br />Current state is {state}</>;
};

function App() {

  return (
    <TypesafeI18n locale='en'>
      <TestComponent />
    </TypesafeI18n>
  );
}

export default App;
