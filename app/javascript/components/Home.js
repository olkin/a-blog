import React, {useContext} from 'react';
import userContext from "./userContext";
import Events from "./events/Events";

function Home() {
    const userInfo = useContext(userContext);

    return (
        <div className="grid-x">
            <div className="cell large-8">
                {/*{userInfo.user.email*/}
                {/*    ?*/}
                {/*    <Link to="/posts/new" className="button">*/}
                {/*        New Post*/}
                {/*    </Link>*/}
                {/*    : <></>*/}
                {/*}*/}

                <Events/>
            </div>
            <div className="cell large-4">
            </div>
        </div>
    );
}

export default Home;