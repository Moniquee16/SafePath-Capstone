// Firebase configuration using REST API (works with Expo Go)
const API_KEY = 'AIzaSyCxDWnChFqVJRXtjKh7B4iH-m7IqjWcZgU';
const PROJECT_ID = 'safepath-cff44';

const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export const signUp = async (email, password, displayName) => {
  try {
    const response = await fetch(SIGN_UP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Sign up failed');
    }

    // Update display name
    if (displayName) {
      await updateProfile(data.idToken, displayName);
    }

    return {
      user: {
        uid: data.localId,
        email: data.email,
        displayName: displayName,
      },
      idToken: data.idToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await fetch(SIGN_IN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Sign in failed');
    }

    return {
      user: {
        uid: data.localId,
        email: data.email,
        displayName: data.displayName,
      },
      idToken: data.idToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (idToken, displayName) => {
  try {
    const updateUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
    
    const response = await fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken,
        displayName,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Update profile failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
