import React, {useContext, useRef, useState} from 'react';
import {
  Application,
  Button,
  Divider,
  Icon,
  ListItem,
  ScreenContainer,
  SizedBox,
  TextInput,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import resource from '../../assets/resource.json';
import {convertIcon} from '@utils';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const {onResult} = route.params;

  const searchRef = useRef();
  const [icon, setIcon] = useState(route.params?.item);
  const [keyword, setKeyword] = useState('');

  /**
   * on apply gallery
   */
  const onApply = () => {
    onResult?.(icon);
    navigation.goBack();
  };

  const data = resource.icon.filter(item => item.includes(keyword));

  return (
    <ScreenContainer
      navigation={navigation}
      style={{backgroundColor: theme.colors.card}}
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
      }}>
      <SizedBox height={16} />
      <View style={Styles.paddingHorizontal16}>
        <TextInput
          ref={searchRef}
          value={keyword}
          label={t('search')}
          placeholder={t('input_search')}
          onChangeText={setKeyword}
          size="small"
        />
      </View>
      <SizedBox height={8} />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ListItem
            leading={
              <Icon {...convertIcon(item)} size={18} type="FontAwesome5" />
            }
            trailing={
              item === icon && (
                <Icon name="check" color={theme.colors.primary} />
              )
            }
            title={item}
            onPress={() => setIcon(item)}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={item => item}
        style={Styles.flex}
        contentContainerStyle={[Styles.padding16, Styles.paddingVertical8]}
      />
    </ScreenContainer>
  );
}
