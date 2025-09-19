'use client';

import { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import Header from "../components/header/Header";
import './layout.css'
import '../styles/form/form.css'


const RootLayout = ({ children }: { children: ReactNode }) => {



    return (
        <div className="main">
            <Header />
            <main style={{ width: "100%" }}>
                {children}
            </main>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    );
};


export default RootLayout;