import { useEffect, useState } from "react";
import PreLoader from "./utils/PreLoader";
import Menu from "./Common/CommonMenu";
import Search from "./Common/CommonSearch";
import { Outlet } from "react-router-dom";

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 3000);
    }, []);

    return (
        <>
            {
                isLoaded ? (
                    <div className="flex gap-2 w-full">
                        <Menu />
                        <div className="flex flex-col gap-2 w-full">
                            <Search />
                            <Outlet />
                        </div>
                    </div>
                ) : <PreLoader />
            }
        </>
    );
}

export default Home;
