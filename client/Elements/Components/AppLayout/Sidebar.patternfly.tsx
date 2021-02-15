/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import { Nav, NavItem, NavList, PageSidebar } from '@patternfly/react-core';
import React from 'react';

export const SideBar: React.FC = () => {

  const getActiveRoute = (index: number): boolean => {
    const routes = [
      "/",
      "/topics"
    ];

    if(routes[index] === window.location.hash.split("#")[1]) {
      return true;
    }
    return false;
  }

  const PageNav = (
    <Nav aria-label='side-navigation-bar'>
      <NavList>
        <NavItem
          itemId={0}
          isActive={getActiveRoute(0)}
          to='/'> Home
        </NavItem>
        <NavItem itemId={1} isActive={getActiveRoute(1)} to='/#/topics'> Topics </NavItem>
        <NavItem itemId={2} isActive={false}> Consumer groups </NavItem>
        <NavItem itemId={3} isActive={false}> Cluster configuration </NavItem>
      </NavList>
    </Nav>
  );

  return <PageSidebar isNavOpen={false} nav={PageNav} />;
};
