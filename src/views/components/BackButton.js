import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actionNavigateTo } from '../../reduxModules/common/routes';

const propTypes = {
  fontSize: PropTypes.number,
  route: PropTypes.string
};

const defaultProps = {
  fontSize: 16,
  route: ''
};

const BackLink = styled('a')(({ theme, fontSize }) => ({
  fontSize,
  cursor: 'pointer',
  display: 'block',
  fontWeight: 600,
  color: theme.primaryColor
}));

const BackButton = ({
  actionNavigateTo,
  route,
  fontSize,
  children
}) => {
  const onLinkClick = () => {
    if (route === '' || !route) {
      window.history.back();
    }

    actionNavigateTo(route);
  };

  return (
    <Fragment>
      <BackLink
        fontSize={fontSize}
        onClick={onLinkClick}
      >
        {`< ${children}`}
      </BackLink>
    </Fragment>
  );
};

BackButton.propTypes = propTypes;
BackButton.defaultProps = defaultProps;

export default connect(state => ({

}), { actionNavigateTo })(BackButton);
