export interface ISettingsState {
    currentCity: string,
    isLoggin: false,
    settingsError: string,
}

export const initialSettingsState: ISettingsState = {
      currentCity: '',
      isLoggin: false,
      settingsError: '',
};

export interface AppState {
    settings: ISettingsState,
}
