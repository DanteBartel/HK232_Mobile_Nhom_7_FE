export interface InputField {
  value: string;
  error: string;
}

export interface RootState {
  auth: {
    token: string;
  };
  theme: {
    theme: string;
    darkMode: boolean;
  };
}
