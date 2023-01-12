import React, {useContext, useRef, useState} from 'react';
import {
  Application,
  Button,
  Chip,
  Icon,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {listingActions} from '@actions';
import styles from './styles';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const searchRef = useRef();
  const debounceRef = useRef();
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState((route.params?.item ?? []).join(','));
  const [suggestion, setSuggestion] = useState([]);
  const [searching, setSearching] = useState(false);

  /**
   * on apply data
   */
  const onApply = () => {
    if (keyword) {
      route.params?.onResult?.(keyword.split(','));
      navigation.goBack();
    }
  };

  /**
   * on change search
   * @param value
   */
  const onChangeSearch = value => {
    setSearching(true);
    setKeyword(value);
    clearTimeout(debounceRef.current);
    if (value) {
      debounceRef.current = setTimeout(() => {
        setSearching(false);
        const arrList = value.split(',');
        dispatch(
          listingActions.loadTags(
            arrList[arrList.length - 1],
            ({data, success}) => {
              if (success) {
                setSuggestion(data);
              }
            },
          ),
        );
      }, 500);
    } else {
      setSuggestion([]);
      setSearching(false);
    }
  };

  /**
   * on select
   * @param item
   */
  const onSelectSuggestion = item => {
    const arrList = keyword.split(',');
    arrList[arrList.length - 1] = item.name;
    setKeyword(arrList.join(','));
  };

  /**
   * on remove
   */
  const onRemove = item => {
    const arrList = keyword.split(',');
    const list = arrList.filter(i => i !== item);
    setKeyword(list.join(','));
  };

  /**
   * render suggestion
   * @returns {JSX.Element}
   */
  const renderSuggestion = () => {
    return (
      <View style={styles.selectionContent}>
        {suggestion?.map?.(item => {
          return (
            <View style={Styles.padding4} key={item.id}>
              <Chip
                leading={<Icon name="plus-circle-outline" size={18} />}
                onPress={() => onSelectSuggestion(item)}>
                {item.name}
              </Chip>
            </View>
          );
        })}
      </View>
    );
  };

  /**
   * render suggestion
   * @returns {JSX.Element}
   */
  const renderSelected = () => {
    const data = keyword.split(',');
    if (keyword && data.length > 0) {
      return (
        <View style={styles.selectionContent}>
          {data.map?.(item => {
            return (
              <View style={Styles.padding4} key={item}>
                <Chip
                  leading={<Icon name="close" size={18} />}
                  onPress={() => onRemove(item)}>
                  {item}
                </Chip>
              </View>
            );
          })}
        </View>
      );
    }
  };

  return (
    <ScreenContainer
      navigation={navigation}
      options={{
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <Button
                onPress={onApply}
                type="text"
                size="small"
                full={false}
                textStyle={{color: theme.colors.primary}}>
                {t('apply')}
              </Button>
            </View>
          );
        },
      }}
      style={{backgroundColor: theme.colors.card}}>
      <SizedBox height={16} />
      <View style={Styles.paddingHorizontal16}>
        <TextInput
          ref={searchRef}
          value={keyword}
          label={t('search')}
          placeholder={t('input_search')}
          trailing={
            searching ? (
              <ActivityIndicator size={12} color={theme.colors.primary} />
            ) : null
          }
          onChangeText={onChangeSearch}
          size="small"
        />
        <SizedBox height={4} />
        <Text typography="caption" type="secondary">
          {t('tags_tutorial')}
        </Text>
      </View>
      <SizedBox height={8} />
      {renderSelected()}
      <ScrollView style={Styles.flex}>{renderSuggestion()}</ScrollView>
    </ScreenContainer>
  );
}
