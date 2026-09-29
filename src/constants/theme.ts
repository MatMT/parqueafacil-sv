export const THEME_COLORS = {
  primary: '#001F5D',
  primaryHover: '#001745',
  primaryLight: '#002B82',
  secondary: '#7C9FE7',
  secondaryLight: '#EBF1FC',
  secondaryDark: '#5A81D2',
  accent: '#ECD700',
  accentHover: '#D9C600',
  accentLight: '#FFF9B8',
  textPrimary: '#000000',
  textSecondary: '#59667B',
  border: '#E2E8F0',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  success: '#10B981',
  successLight: '#ECFDF5',
} as const;

export const APP_CONFIG = {
  appName: 'ParqueaFácilSV',
  countryBadge: 'SV',
  commissionRate: 0.15, // 15% de comisión del modelo colaborativo
  currencySymbol: '$',
  defaultHours: 2,
  minHours: 1,
  maxHours: 12,
  averageStreetSaving: 4.5,
  phoneDimensions: {
    width: 390,
    height: 844,
  },
} as const;
