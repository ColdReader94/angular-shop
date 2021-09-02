export interface ISettingsState {
    currentCity: string,
    isLoggin: false,
    settingsError: Error | null,
}

export const initialSettingsState: ISettingsState = {
      currentCity: '',
      isLoggin: false,
      settingsError: null,
};

export interface AppState {
    settings: ISettingsState,
}
