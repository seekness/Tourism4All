import React, {useContext, useState} from 'react';
import {
  Application,
  Button,
  Image,
  Rating,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
  Toast,
} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {ScrollView, View} from 'react-native';
import {Styles} from '@configs';
import {validate} from '@utils';
import {useDispatch} from 'react-redux';
import {reviewActions} from '@actions';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const item = route.params?.item;

  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [rate, setRate] = useState(item.rate);
  const [error, setError] = useState();

  /**
   * on change content
   * @param value
   */
  const onChangeContent = value => {
    const valid = validate(value, {empty: false});
    setError(valid);
    setContent(value);
  };

  /**
   * on feedback
   */
  const onFeedback = () => {
    dispatch(
      reviewActions.onAdd(
        {
          post: item.id,
          content,
          rating: rate,
        },
        ({success, message}) => {
          if (success) {
            route.params?.onResult();
            navigation.goBack();
          }
          Toast.show(t(message));
        },
      ),
    );
  };

  /**
   * check disable feedback
   */
  const disableFeedback = () => {
    const validContent = validate(content, {empty: false});
    if (validContent) {
      return true;
    }
  };

  return (
    <ScreenContainer navigation={navigation} enableKeyboardAvoidingView={true}>
      <ScrollView
        style={Styles.flex}
        contentContainerStyle={[
          styles.container,
          {backgroundColor: theme.colors.card},
        ]}>
        <Image style={styles.userImage} source={{uri: item?.author.image}} />
        <SizedBox height={8} />
        <Rating rate={item.rate} size={24} onFinishRating={setRate} />
        <SizedBox height={4} />
        <Text typography="subtitle" type="secondary">
          {t('tap_to_rate')}
        </Text>
        <SizedBox height={24} />
        <TextInput
          numberOfLines={5}
          defaultValue={content}
          label={t('feedback')}
          placeholder={t('input_feedback')}
          onChangeText={onChangeContent}
          onFocus={() => {
            setError(null);
          }}
          onBlur={() => setContent(content)}
          error={t(error)}
          size="small"
        />
      </ScrollView>
      <View style={Styles.buttonContent}>
        <Button onPress={onFeedback} disabled={disableFeedback()}>
          {t('feedback')}
        </Button>
      </View>
    </ScreenContainer>
  );
}
