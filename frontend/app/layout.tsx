import { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import './layout.css'

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <html>
                <body>
                    <main>
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
                </body>
            </html>
        </>
    );
};

export default RootLayout;