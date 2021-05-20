import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import {
  SCROLL_THUMB_COLOR,
  SCROLL_TRACK_COLOR
} from '../../styles/constants/scrollbar';

import {
  actionStartScroll,
  actionStopScroll
} from '../../reduxModules/common/scroll';

const ScrollbarsComponent = ({
  children,
  trackIfMobile,
  trackVerticalInfoPage,
  autoHeight,
  autoHeightMin,
  autoHeightMax,
  hideHorizontalScrollBar,
  actionStartScroll,
  actionStopScroll,
  ...otherProps
}) => {
  const [trackVerticalStyle, setTrackVerticalStyle] = useState({
    position: 'absolute',
    width: 3,
    transition: 'height 0.4s, width 0.3s, opacity 0.2s',
    opacity: '0',
    right: 2,
    bottom: 2,
    top: 2,
    borderRadius: 3
  });
  const [trackVerticalThumbStyle, setTrackVerticalThumbStyle] = useState({
    position: 'relative',
    display: 'block',
    width: '100 %',
    cursor: 'pointer',
    borderRadius: 3
  });

  const trackVerticalHover = e => {
    let targetHeight = '0px';

    // this is to check if it has a height of thumb-vertical
    if (e.target.className === 'thumb-vertical') {
      targetHeight = e.target.style.height;
    } else if (e.target.getElementsByClassName('thumb-vertical')[0]) {
      targetHeight = e.target.getElementsByClassName('thumb-vertical')[0].style.height;
    }

    const trackVerticalhoverValues = {
      ...trackVerticalStyle,
      width: 8,
      backgroundColor: targetHeight === '0px' ? 'transparent' : SCROLL_TRACK_COLOR,
      borderRadius: 6
    };

    setTrackVerticalStyle(trackVerticalhoverValues);
  };

  const trackVerticalOut = () => {
    const trackVerticalhoverValues = {
      ...trackVerticalStyle,
      width: 3,
      backgroundColor: 'transparent',
      borderRadius: 3
    };

    setTrackVerticalStyle(trackVerticalhoverValues);
  };

  const handleScrollStart = () => {
    actionStartScroll();
  };

  const handleScrollStop = () => {
    actionStopScroll();
  };

  return (
    <Scrollbars
      autoHeight={autoHeight}
      autoHeightMin={autoHeightMin}
      autoHeightMax={autoHeightMax || 200}
      onScrollStart={handleScrollStart}
      onScrollStop={handleScrollStop}
      renderView={({ style, ...props }) => (
        <div
          className="scroll-view"
          id="scroll-view"
          tabIndex="-1"
          {...props}
          style={{
            ...style,
            ...trackIfMobile,
            overflowX: hideHorizontalScrollBar ? 'hidden' : 'scroll'
          }}
        />
      )}
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          className="scroll-view-track-vertical"
          style={{
            ...style,
            ...trackVerticalStyle,
            ...trackVerticalInfoPage
          }}
          onMouseOver={e => trackVerticalHover(e)}
          onMouseOut={trackVerticalOut}
          onFocus={e => trackVerticalHover(e)}
          onBlur={trackVerticalOut}
        />
      )}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          className="thumb-vertical"
          style={{
            ...style,
            ...trackVerticalThumbStyle,
            backgroundColor: SCROLL_THUMB_COLOR
          }}
        />
      )}
      renderTrackHorizontal={({ style, ...props }) => <div {...props} style={{ ...style, marginBottom: '-18px' }} />}
      autoHide
      {...otherProps}
    >
      {children}
    </Scrollbars>
  );
};

ScrollbarsComponent.propTypes = {
  children: PropTypes.node.isRequired,
  trackIfMobile: PropTypes.shape({
    marginRight: PropTypes.number,
    marginLeft: PropTypes.number
  }),
  trackVerticalInfoPage: PropTypes.shape({
    bottom: PropTypes.number
  }),
  autoHeight: PropTypes.bool,
  autoHeightMin: PropTypes.number,
  autoHeightMax: PropTypes.number,
  hideHorizontalScrollBar: PropTypes.bool,
  actionStartScroll: PropTypes.func,
  actionStopScroll: PropTypes.func
};

ScrollbarsComponent.defaultProps = {
  trackIfMobile: {},
  trackVerticalInfoPage: {},
  autoHeight: false,
  autoHeightMin: 0,
  autoHeightMax: 0,
  hideHorizontalScrollBar: false,
  actionStartScroll: () => {},
  actionStopScroll: () => {}
};

export default connect(() => ({
}), { actionStartScroll, actionStopScroll })(ScrollbarsComponent);
