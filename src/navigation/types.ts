import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  SplashLoading: undefined;
  SplashBrand: undefined;
  Login: undefined;
};

// Main Drawer
export type MainDrawerParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Terms: undefined;
  About: undefined;
};

// Site Stack
export type SiteStackParamList = {
  SiteDetail: { siteId: string; siteName: string };
  LiveParameters: { siteId: string; siteName: string };
  Devices: { siteId: string; siteName: string };
  AlarmManagement: { siteId: string; siteName: string };
};

// Profile Stack
export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  Deactivate: undefined;
};

// Root Stack
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainDrawerParamList>;
  Site: NavigatorScreenParams<SiteStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

// Declare global types for navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
