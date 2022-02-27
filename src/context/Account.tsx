import React, { createContext, useEffect, useState } from "react";

interface User {
    id: number
    email: string
    name: string
    image: string
    cls: any
}

interface Wallet {
    tokens: any,
    coins: any
}

interface AccountContext {
    user: User | null,
    wallet: Wallet | null,
    setUser: (account: User) => void,
    setWallet: (wallet: Wallet) => void,
}

export const AccountContext = createContext<AccountContext>({
    user: null,
    wallet: {
        tokens: [],
        coins: []
    },
    setUser: () => { },
    setWallet: () => { }
});

interface AccountStateProps {
    children?: React.ReactNode;
}

export const AccountState = ({ children }: AccountStateProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [wallet, setWallet] = useState<Wallet | null>(null);

    const value: AccountContext = {
        user,
        wallet,
        setUser,
        setWallet,
    }

    useEffect(() => {
        const session = window.sessionStorage;        
        if (user) {
            const userJson = JSON.stringify({ ...user, cls: null });
            session.setItem("user", userJson);
        }
    }, [user]);

    useEffect(() => {
        const session = window.sessionStorage;
        const userJson = session.getItem("user");
        if (userJson) {
            const user = JSON.parse(userJson);
            setUser(user);
        }
    }, [])

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );
}