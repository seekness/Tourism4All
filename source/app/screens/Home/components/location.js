import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CategoryItem, SizedBox, Text} from '@components';
import PropTypes from 'prop-types';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';

export default function Locations(props) {
  const {t} = useTranslation();
  const {data, onPress} = props;

  /**
   * render item location
   * @param item
   * @returns {JSX.Element}
   */
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <CategoryItem item={item} type="card" onPress={() => onPress(item)} />
    </View>
  );

  return (
    <>
      <View style={styles.titleContainer}>
        <Text typography="h4" weight="bold">
          {t('popular_location')}
        </Text>
        <SizedBox height={2} />
        <Text typography="subtitle" type="secondary">
          {t('let_find_most_interesting')}
        </Text>
      </View>
      <FlatList
        data={data}
        contentContainerStyle={Styles.padding8}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item?.id}${index}`}
      />
    </>
  );
}

Locations.propTypes = {
  data: PropTypes.array,
  onPress: PropTypes.func,
};

Locations.defaultProps = {
  data: Array(10),
  onPress: () => {},
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
  },
  item: {width: 130, height: 160, paddingHorizontal: 8},
});
