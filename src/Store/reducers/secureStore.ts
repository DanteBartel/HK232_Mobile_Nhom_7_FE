import * as SecureStore from 'expo-secure-store'

export async function saveAccessToken(token: string) {
    await SecureStore.setItemAsync('access_token', token)
}

export async function getAccessToken(): Promise<string | null> {
    return await SecureStore.getItemAsync('access_token')
}

export async function deleteAccessToken() {
    await SecureStore.deleteItemAsync('access_token')
}