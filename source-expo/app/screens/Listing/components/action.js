import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Styles} from '@configs';
import {Divider, Icon, IconButton, Text} from '@components';
import PropTypes from 'prop-types';

export default function Action(props) {
  const {t} = useTranslation();
  const {style, sort, modeView, onSort, onView, onFilter} = props;

  /**
   * export icon mode view
   */
  const iconModeView = () => {
    switch (modeView) {
      case 'list':
        return 'view-grid-outline';
      case 'block':
        return 'view-column-outline';
      case 'grid':
        return 'format-list-bulleted';
      default:
        return 'format-list-bulleted';
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={Styles.flex}>
        <View style={Styles.row}>
          <IconButton onPress={onSort}>
            <Icon name="swap-vertical" />
          </IconButton>
          <Text typography="title" weight="bold">
            {t(sort?.title)}
          </Text>
        </View>
      </View>
      <View style={[Styles.row, Styles.paddingHorizontal16]}>
        <IconButton onPress={onView}>
          <Icon name={iconModeView()} />
        </IconButton>
        <View style={Styles.paddingVertical8}>
          <Divider direction="vertical" />
        </View>
        <View style={Styles.row}>
          <IconButton onPress={onFilter}>
            <Icon name="filter-outline" />
          </IconButton>
          <Text typography="title" weight="bold">
            {t('filter')}
          </Text>
        </View>
      </View>
    </View>
  );
}

Action.propTypes = {
  style: PropTypes.object,
  modeView: PropTypes.string,
  sort: PropTypes.object,
  onView: PropTypes.func,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
};

Action.defaultProps = {
  style: {},
  modeView: 'list',
  sort: null,
  onView: () => {},
  onSort: () => {},
  onFilter: () => {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: 48,
  },
});
