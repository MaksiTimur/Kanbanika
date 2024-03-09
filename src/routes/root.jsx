import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Wrapper from "../components/Wrapper/Wrapper";

const Root = () => {
    return (
        <>
            <Header />
            <Wrapper>
                <Outlet />
            </Wrapper>
        </>
    );
}

export default Root;