import React, {useContext} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  Application,
  Divider,
  Icon,
  IconButton,
  SizedBox,
  Text,
} from '@components';
import {Styles} from '@configs';
import PropTypes from 'prop-types';

export default function Index(props) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const {onSearch, onScan, style} = props;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.row,
          styles.shadow,
          {
            backgroundColor: theme.colors.card,
          },
        ]}>
        <Pressable style={[Styles.flex, Styles.row]} onPress={onSearch}>
          <SizedBox width={4} />
          <Icon name="magnify" size={24} />
          <Text style={Styles.paddingHorizontal4}>{t('search_location')}</Text>
        </Pressable>
        <View style={Styles.padding8}>
          <Divider direction="vertical" />
        </View>
        <IconButton type="secondary" size="small" onPress={onScan}>
          <Icon name="qrcode-scan" size={24} color={theme.colors.primary} />
        </IconButton>
      </View>
    </View>
  );
}

Index.propTypes = {
  onSearch: PropTypes.func,
  onScan: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Index.defaultProps = {
  onSearch: () => {},
  onScan: () => {},
  style: {},
};

const styles = StyleSheet.create({
  container: {},
  row: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
  },
  shadow: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
