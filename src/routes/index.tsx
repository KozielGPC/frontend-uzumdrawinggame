// import Home from './pages/Home';
// import UserLogin from './pages/UserLogin';
// import Instructions from './pages/Instructions';

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import UserLogin from "../pages/UserLogin";

export default function Routes(){

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={UserLogin} />
                {/* <Route path="/home" exact component={Home} />
                <Route path="/instructions" exact component={Instructions} /> */}
                <Route path="*"> 
                    <Redirect to="/" />
                </Route>
            </Switch>
        </BrowserRouter>
    )

}