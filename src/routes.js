import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ExploreList from './Home/explore_list/exploreList';
import Home from './Home/home';
import ExplorePostExtended from './ExplorePostExtended/expostext';
import NearMe from './near_me/nearme';
import Feed from './feed/feed';
function Routes() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/near_me' component={NearMe}/>
        <Route path='/feed' component={Feed}/>
        <Route path='/post/:id' component={ExplorePostExtended}/>
      </Switch>
    </main>
  );
}

export default Routes;
