import React, {useEffect} from 'react';
import './App.css';
import {createRouter, defineRoute} from "type-route";

const {routes, RouteProvider, useRoute} = createRouter({
    home: defineRoute('/'),
    login: defineRoute('/login')
});

function LoginPage() {
    return <div>Login page</div>;
}

function HomePage() {
    return <div>Home page</div>;
}

function requiresRedirectToLogin(route, isLoggedIn) {
    return route.name === 'home' && !isLoggedIn;
}

function Routing({isLoggedIn}) {
    const route = useRoute();

    useEffect(() => {
        if (requiresRedirectToLogin(route, isLoggedIn)) {
            routes
                .login()
                .replace();
        }
    }, [route]);

    if (requiresRedirectToLogin(route, isLoggedIn)) {
        return <div>Redirecting...</div>;
    }

    if (route.name === 'home') {
        return <HomePage />;
    } else if (route.name === 'login') {
        return <LoginPage />;
    }
    return <div>Not found</div>;
}

function App() {
    return <RouteProvider>
        <Routing isLoggedIn={false}/>
    </RouteProvider>;

}

export default App;
