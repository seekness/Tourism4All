import React, {useContext, useEffect, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {
  Application,
  CategoryItem,
  Divider,
  Empty,
  Icon,
  IconButton,
  ScreenContainer,
  SizedBox,
  TextInput,
} from '@components';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {Styles} from '@configs';
import {useDispatch} from 'react-redux';
import {categoryActions} from '@actions';
import styles from './styles';
import {enableExperimental} from '@utils';

export default function Index({navigation, route}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();

  const [modeView, setModeView] = useState('full');
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch(
      categoryActions.onLoad(route.params?.item, '', ({success, data}) => {
        if (success) {
          setData(data);
        }
      }),
    );
  }, [dispatch, route.params?.item]);

  /**
   * on change view
   */
  const onChangeView = () => {
    enableExperimental();
    setModeView(modeView === 'full' ? 'icon' : 'full');
  };

  /**
   * handle searching
   * @param value
   */
  const onChangeText = value => {
    setKeyword(value);
    dispatch(
      categoryActions.onLoad(route.params?.item, value, ({success, data}) => {
        if (success) {
          setData(data);
        }
      }),
    );
  };

  /**
   * onPress category
   * @param item
   */
  const onCategory = item => {
    if (item?.hasChild) {
      navigation.push('CategoryList', {item});
    } else {
      navigation.navigate('Listing', {item});
    }
  };

  /**
   * export icon view
   * @returns {string}
   */
  const iconView = () => {
    switch (modeView) {
      case 'full':
        return 'view-agenda-outline';
      case 'icon':
        return 'view-headline';
      default:
        return 'help';
    }
  };

  /**
   * render item list
   * @param item
   * @returns {JSX.Element}
   */
  const renderItem = ({item}) => {
    return <CategoryItem item={item} type={modeView} onPress={onCategory} />;
  };

  return (
    <ScreenContainer
      navigation={navigation}
      style={{backgroundColor: theme.colors.card}}
      options={{
        title: route.params?.item?.title ?? t('category'),
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <IconButton onPress={onChangeView} size="small">
                <Icon name={iconView()} />
              </IconButton>
            </View>
          );
        },
      }}>
      <SizedBox height={16} />
      <TextInput
        defaultValue={keyword}
        label={t('search')}
        placeholder={t('input_search')}
        onChangeText={onChangeText}
        size="small"
        style={Styles.paddingHorizontal16}
      />
      <SizedBox height={8} />
      <FlatList
        data={
          data ??
          Array.from({length: 10}, () => {
            return {};
          })
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty
            style={[Styles.flex, {marginBottom: headerHeight * 2}]}
            title={t('not_found_matching')}
            message={t('please_check_keyword_again')}
          />
        }
        ItemSeparatorComponent={() => (
          <View style={Styles.paddingVertical8}>
            <Divider />
          </View>
        )}
        keyExtractor={(item, index) => `${item?.id}${index}`}
        style={Styles.flex}
        contentContainerStyle={styles.listContainer}
      />
    </ScreenContainer>
  );
}
