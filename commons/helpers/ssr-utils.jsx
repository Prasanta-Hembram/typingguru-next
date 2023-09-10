export const SafeHydrate = ({ children }) => (
  <div suppressHydrationWarning>
    {typeof window === 'undefined' ? null : children}
  </div>
);
