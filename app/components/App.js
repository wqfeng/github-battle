var React = require("react");
var Popular = require("./Popular");
var ReactRouter = require("react-router-dom");
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Home = require("./Home");
var Battle = require("./Battle");
var Nav = require("./Nav");

class App extends React.Component {
    render() {
        return (
            <Router>
            
                <div className="container">
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/popular" component={Popular} />
                        <Route path="/battle" component={Battle} />
                        <Route render={() => <p>Not Found</p>} />
                    </Switch>
                    
                </div>
            </Router>
        );
    }
}

module.exports = App; 