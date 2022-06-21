export interface UserState {
  user?: ThriveUser;
  googleProfile?: GoogleProfile;
}

export interface ThriveUser {
  name: string;
  google_id?: string;
  id: string;
  email: string;
}

export interface GoogleProfile {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
}

export interface LocalStorageUser {
  user: ThriveUser;
  google?: GoogleProfile;
}

export interface AuthProviderContents {
  user: LocalStorageUser;
  isLoggedIn: boolean;
}
