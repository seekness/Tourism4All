import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ProductItem, SizedBox, Text} from '@components';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

export default function Recent(props) {
  const {t} = useTranslation();
  const {data, onPress} = props;

  /**
   * render content
   * @returns {unknown[]}
   */
  const renderContent = () => {
    return data.map((item, index) => {
      return (
        <ProductItem
          key={(item?.id ?? index).toString()}
          item={item}
          style={styles.item}
          onPress={() => onPress(item)}
          type="small"
        />
      );
    });
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text typography="h4" weight="bold">
          {t('recent_location')}
        </Text>
        <SizedBox height={2} />
        <Text typography="subtitle" type="secondary">
          {t('let_find_most_interesting')}
        </Text>
      </View>
      <View style={styles.contentList}>{renderContent()}</View>
    </>
  );
}

Recent.propTypes = {
  data: PropTypes.array,
  onPress: PropTypes.func,
};

Recent.defaultProps = {
  data: Array.from({length: 10}, () => {
    return {};
  }),
  onPress: () => {},
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
  },
  item: {marginBottom: 16},
  contentList: {paddingHorizontal: 16, paddingVertical: 8},
});
