import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Icon, Text, Button} from '@components';
import PropTypes from 'prop-types';
import {BaseColor, useTheme} from '@config';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';

export default function FilterSort(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [sortOption, setSortOption] = useState(
    props.sortOption.map(item => {
      if (
        item.value === props.sortSelected?.value &&
        item.field === props.sortSelected?.field
      ) {
        return {
          ...item,
          checked: true,
        };
      }
      return {
        ...item,
        checked: false,
      };
    }),
  );
  const [sortSelected, setSortSelected] = useState(props.sortSelected);
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * select sort option
   * @param {*} selected
   */
  const onSelectFilter = selected => {
    setSortOption(
      sortOption.map(item => {
        if (item.value === selected?.value && item.field === selected?.field) {
          return {
            ...item,
            checked: true,
          };
        }
        return {
          ...item,
          checked: false,
        };
      }),
    );
  };

  /**
   * on Apply change sort
   */
  const onApply = () => {
    const {onChangeSort} = props;
    const sorted = sortOption.find(item => item.checked);
    if (sorted) {
      setSortSelected(sorted);
      onChangeSort(sorted);
    }
    setModalVisible(false);
  };

  /**
   * export modeview
   * @param {*} modeView
   * @returns
   */
  const iconModeView = modeView => {
    switch (modeView) {
      case 'block':
        return 'square';
      case 'grid':
        return 'th-large';
      case 'list':
        return 'th-list';
      default:
        return 'th-list';
    }
  };

  const {style, modeView, onFilter, onChangeView} = props;

  return (
    <View style={[styles.contain, {backgroundColor: colors.background}, style]}>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
          setSortOption(props.sortOption);
        }}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View
          style={[styles.contentFilterBottom, {backgroundColor: colors.card}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          {sortOption.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.contentActionModalBottom,
                {borderBottomColor: colors.border},
              ]}
              key={item.langKey}
              onPress={() => onSelectFilter(item)}>
              <Text body2 semibold primaryColor={item.checked}>
                {t(item.langKey)}
              </Text>
              {item.checked && (
                <Icon name="check" size={14} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
          <Button full style={styles.applyContent} onPress={() => onApply()}>
            {t('apply')}
          </Button>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.sortContent}
        onPress={() => setModalVisible(true)}>
        <Icon
          name="sort-amount-up"
          size={16}
          color={BaseColor.grayColor}
          solid
        />
        <Text headline grayColor style={styles.marginLeft5}>
          {t(sortSelected?.langKey ?? 'sort')}
        </Text>
      </TouchableOpacity>
      <View style={styles.modeViewContent}>
        <TouchableOpacity onPress={onChangeView} style={styles.contentModeView}>
          <Icon
            name={iconModeView(modeView)}
            size={16}
            color={BaseColor.grayColor}
            solid
          />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={onFilter} style={styles.contentFilter}>
          <Icon name="filter" size={16} color={BaseColor.grayColor} solid />
          <Text headline grayColor style={styles.marginLeft5}>
            {t('filter')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

FilterSort.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  sortOption: PropTypes.array,
  sortSelected: PropTypes.object,
  modeView: PropTypes.string,
  onChangeSort: PropTypes.func,
  onChangeView: PropTypes.func,
  onFilter: PropTypes.func,
};

FilterSort.defaultProps = {
  style: {},
  sortOption: [],
  sortSelected: null,
  modeView: '',
  onChangeSort: () => {},
  onChangeView: () => {},
  onFilter: () => {},
};
