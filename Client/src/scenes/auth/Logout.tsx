import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';

export const Logout = ({ logout }: any) => {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout
