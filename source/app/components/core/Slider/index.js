import React, {useCallback} from 'react';
import Slider from 'rn-range-slider';
import PropTypes from 'prop-types';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Notch from './Notch';
import Label from './Label';

export default function Index(props) {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(
    () => <Rail color={props.color} />,
    [props.color],
  );
  const renderRailSelected = useCallback(
    () => <RailSelected color={props.selectionColor} />,
    [props.selectionColor],
  );
  const renderLabel = useCallback(
    value => <Label text={value} color={props.selectionColor} />,
    [props.selectionColor],
  );
  const renderNotch = useCallback(
    () => <Notch color={props.selectionColor} />,
    [props.selectionColor],
  );

  return (
    <Slider
      {...props}
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      renderLabel={renderLabel}
      renderNotch={renderNotch}
    />
  );
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  step: PropTypes.number,
};

Index.defaultProps = {
  style: {},
  step: 1,
};
