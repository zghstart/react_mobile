// import { Button } from 'antd-mobile'
import './App.less'
import './utils/rem'
import routes from './config/routes'
import {Route, Switch} from "react-router-dom";

function App() {


    return (
        <div>
            <Switch>
                {
                    routes.map(routeObj => <Route key={routeObj.path} {...routeObj}/>)
                }
            </Switch>
        </div>
    );
}

export default App;
