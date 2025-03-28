export const AUTH_PROVIDERS = {
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  FACEBOOK: "FACEBOOK",
  EMAIL: "EMAIL",
} as const;

export type AuthProviderType = keyof typeof AUTH_PROVIDERS;
