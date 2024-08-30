import { useEffect, useState } from "react";


const useTokens = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken'))?.split('=')[1];
        const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken'))?.split('=')[1];

        if (accessToken && refreshToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
        }
    },)

    const setTokens = (accessToken: string, refreshToken: string) => {
        document.cookie = `accessToken=${accessToken}; path=/;`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    }

    return {
        accessToken,
        refreshToken,
        setTokens
    }
}

export default useTokens;