import React from "react";
import {useMainContext} from "../Components/App";

const Home = () => {
    const context = useMainContext()

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;
