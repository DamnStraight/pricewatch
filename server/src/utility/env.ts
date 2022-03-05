export const env = (name: keyof ProjectEnv, fallback?: string): string => {
    const val = process.env[name];
  
    if (!val) {
      if (fallback) {
        return fallback;
      }
  
      throw new Error(`Missing environment variable [${name}]`);
    }
  
    return val;
  };