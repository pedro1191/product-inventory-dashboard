import { useThemeContext } from '../../contexts/themeContext';

export function Logo() {
  const { isDark } = useThemeContext();

  return (
    <div className="flex items-center">
      <img 
        src={isDark ? '/logo-dark.svg' : '/logo-light.svg'}
        alt="Inventory Dashboard Logo"
        className="w-10 h-10"
      />
    </div>
  );
}
