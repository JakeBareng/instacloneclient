const useTokens = () => {
    const api = import.meta.env.VITE_API_URL;

    const setTokens = (accessToken: string, refreshToken: string) => {
        document.cookie = `accessToken=${accessToken}; path=/;`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;
    }

    const getAccessToken = () => {
        return document.cookie.split('; ').find(row => row.startsWith('accessToken'))?.split('=')[1];
    }

    const getRefreshToken = () => {
        return document.cookie.split('; ').find(row => row.startsWith('refreshToken'))?.split('=')[1];
    }

    return {
        setTokens,
        getAccessToken,
        getRefreshToken
    }
}

export default useTokens;