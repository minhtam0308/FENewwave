import { Children, createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const [token, setToken] = useState("");

export default function MyApp() {
    return (
        <AuthContext value={{ token, setToken }}>
            {Children}
        </AuthContext>
    )
}
