import { Platform } from 'react-native';
import Constants from 'expo-constants';

export type ApiAvailability = {
  available: boolean;
  checkedAt: string;
  status?: number;
  error?: string;
};

// Determine the base API URL dynamically depending on platform and environment
const getApiBaseUrl = (): string => {
  // If running in development, resolve host machine IP from Expo Constants
  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoGo?.developer?.tool;
    if (hostUri) {
      const ip = hostUri.split(':')[0];
      if (ip && !ip.includes('localhost') && !ip.includes('127.0.0.1')) {
        return `http://${ip}:3000/api/h8`;
      }
    }
  }
  
  // Default emulator host bridges
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api/h8';
  }
  return 'http://localhost:3000/api/h8';
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Perform a fast check to see if the local Next.js API server is running and reachable.
 */
export async function getServerAvailability(timeoutMs = 1200): Promise<ApiAvailability> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE_URL}/catalog/plans`, {
      method: 'GET',
      signal: controller.signal,
      headers: { 'Cache-Control': 'no-cache' },
    });
    clearTimeout(timeoutId);
    return {
      available: res.ok,
      checkedAt: new Date().toISOString(),
      status: res.status,
      error: res.ok ? undefined : `Health check failed with status: ${res.status}`,
    };
  } catch (e) {
    clearTimeout(timeoutId);
    const error = e instanceof Error ? e.message : 'Unknown network error';
    console.log(`[API Client] H8 Server unreachable at ${API_BASE_URL}.`);
    return {
      available: false,
      checkedAt: new Date().toISOString(),
      error,
    };
  }
}

export async function checkServerHealth(timeoutMs = 1200): Promise<boolean> {
  const availability = await getServerAvailability(timeoutMs);
  return availability.available;
}

/**
 * Standard HTTP GET wrapper with a built-in timeout.
 */
export async function getFromApi<T>(endpoint: string, timeoutMs = 2500): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
    method: 'GET',
    signal: controller.signal,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });

  clearTimeout(timeoutId);
  if (!response.ok) {
    throw new Error(`API GET request failed with status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Standard HTTP POST wrapper with a built-in timeout.
 */
export async function postToApi<T>(endpoint: string, body: any, timeoutMs = 3000): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal: controller.signal,
  });

  clearTimeout(timeoutId);
  if (!response.ok) {
    throw new Error(`API POST request failed with status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
