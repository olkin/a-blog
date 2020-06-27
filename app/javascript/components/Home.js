import React, {useContext} from 'react';
import userContext from "./userContext";
import Events from "./events/Events";

function Home() {
    const userInfo = useContext(userContext);

    return (
    <>
                {/*{userInfo.user.email*/}
                {/*    ?*/}
                {/*    <Link to="/posts/new" className="button">*/}
                {/*        New Post*/}
                {/*    </Link>*/}
                {/*    : <></>*/}
                {/*}*/}

                <Events/>
</>
    );
}

export default Home;