import React, {
  forwardRef,
  memo,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {Application, Icon, Image, SearchInput, Text} from '@components';
import {Images, Opacity, Styles} from '@configs';
import styles from './styles';

/**
 * Search Input
 */
const Input = memo(({value, onChangeText}) => {
  const [keyword, setKeyword] = useState(value);
  return (
    <SearchInput
      type="bottomsheet"
      value={keyword}
      onChangeText={val => {
        setKeyword(val);
        onChangeText(val);
      }}
    />
  );
});

/**
 * List
 */
const List = memo(
  forwardRef((props, ref) => {
    const {theme} = useContext(Application);
    const [list, setList] = useState(props.data);
    const [selected, setSelected] = useState(props.selected);

    useImperativeHandle(ref, () => ({
      onChangeText: value => {
        if (value) {
          setList(
            props.data.filter(item =>
              item.title?.toUpperCase().includes(value.toUpperCase()),
            ),
          );
        } else {
          setList(props.data);
        }
      },
      selected,
    }));

    /**
     * render item
     * @param {*} {item}
     * @return {*}
     */
    const renderItem = ({item}) => {
      let style = {};
      let trailing;
      if (selected?.value && item.value === selected?.value) {
        style = {
          backgroundColor: theme.colors.primary + Opacity[10],
        };
        trailing = <Icon name="check" color={theme.colors.primary} />;
      }
      return (
        <TouchableOpacity
          style={[styles.item, style]}
          onPress={() => setSelected(item)}>
          {item.icon && (
            <Image
              style={styles.icon}
              source={item.icon}
              resizeMode="contain"
            />
          )}
          <Text typography="h4" style={Styles.flex}>
            {item.title}
          </Text>
          {trailing}
        </TouchableOpacity>
      );
    };
    return (
      <BottomSheetFlatList
        contentContainerStyle={[
          Styles.paddingVertical8,
          list.length === 0 && Styles.flexCenter,
        ]}
        data={list}
        keyExtractor={(item, index) => `${item?.id}${index}`}
        renderItem={renderItem}
        ListEmptyComponent={
          <Image style={styles.empty} source={Images.empty} />
        }
      />
    );
  }),
);

const Index = forwardRef((props, ref) => {
  const insets = useSafeAreaInsets();
  const {theme} = useContext(Application);
  const bottomSheetRef = useRef();
  const listRef = useRef();
  const {t} = useTranslation();

  useImperativeHandle(ref, () => bottomSheetRef.current);

  const {search, title, data, initHeight, selected, onSelect} = props;

  const snapPoints = useMemo(() => [initHeight, '100%'], [initHeight]);

  /**
   * on change search
   */
  const onChangeText = value => {
    listRef.current?.onChangeText(value);
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backgroundStyle={styles.container}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="none"
      android_keyboardInputMode="adjustResize"
      stackBehavior="push"
      handleComponent={() => (
        <View
          style={[
            styles.handle,
            {backgroundColor: theme.colors.card, marginTop: insets.top + 12},
          ]}>
          <View style={styles.indicatorContainer}>
            <View
              style={[styles.indicator, {backgroundColor: theme.colors.card}]}
            />
          </View>
          <View
            style={[
              styles.contentTitle,
              {borderBottomColor: theme.colors.border},
            ]}>
            <TouchableOpacity onPress={() => bottomSheetRef.current?.dismiss()}>
              <Text typography="title" weight="bold" style={styles.textButton}>
                {t('cancel')}
              </Text>
            </TouchableOpacity>
            <Text typography="h4" weight="bold" style={styles.titleText}>
              {title}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (listRef.current?.selected) {
                  onSelect(listRef.current?.selected);
                  bottomSheetRef.current?.dismiss();
                }
              }}>
              <Text
                typography="title"
                weight="bold"
                color="primary"
                style={styles.textButton}>
                {t('save')}
              </Text>
            </TouchableOpacity>
          </View>
          {search && (
            <View style={styles.searchContent}>
              <Input type="bottomsheet" onChangeText={onChangeText} />
            </View>
          )}
        </View>
      )}
      backdropComponent={backdropProps => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...backdropProps}
        />
      )}
      enablePanDownToClose={true}>
      <View style={[Styles.flex, {backgroundColor: theme.colors.card}]}>
        <List ref={listRef} data={data} selected={selected} />
      </View>
    </BottomSheetModal>
  );
});

Index.propTypes = {
  search: PropTypes.bool,
  title: PropTypes.string,
  data: PropTypes.array,
  initHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.object,
  onSelect: PropTypes.func,
};

Index.defaultProps = {
  search: true,
  title: 'Chọn ngôn ngữ',
  data: [
    {
      value: 'vi',
      title: 'Việt Nam',
      icon: Images.vi,
    },
    {
      value: 'en',
      title: 'English',
      icon: Images.en,
    },
  ],
  initHeight: '50%',
  selected: null,
  onSelect: () => {},
};

export default Index;
