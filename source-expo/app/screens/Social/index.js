import React, {useContext, useRef, useState} from 'react';
import {
  Application,
  Button,
  ScreenContainer,
  SizedBox,
  TextInput,
} from '@components';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';

export default function Index({navigation, route}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const facebookRef = useRef();
  const twitterRef = useRef();
  const instagramRef = useRef();
  const googleRef = useRef();
  const linkedInRef = useRef();
  const youtubeRef = useRef();
  const tumblrRef = useRef();
  const flickrRef = useRef();
  const pinterestRef = useRef();

  const {onResult, item} = route.params;
  const [facebook, setFaceBook] = useState(item?.facebook ?? '');
  const [twitter, setTwitter] = useState(item?.twitter ?? '');
  const [instagram, setInstagram] = useState(item?.instagram ?? '');
  const [google, setGoogle] = useState(item?.google ?? '');
  const [linkedIn, setLinkedIn] = useState(item?.linkedIn ?? '');
  const [youtube, setYoutube] = useState(item?.youtube ?? '');
  const [tumblr, setTumblr] = useState(item?.tumblr ?? '');
  const [flickr, setFlickr] = useState(item?.flickr ?? '');
  const [pinterest, setPinterest] = useState(item?.pinterest ?? '');

  /**
   * on apply social
   */
  const onApply = () => {
    onResult?.({
      facebook,
      twitter,
      instagram,
      google_plus: google,
      linkedIn,
      youtube,
      tumblr,
      flickr,
      pinterest,
    });
    navigation.goBack();
  };

  return (
    <ScreenContainer
      navigation={navigation}
      enableKeyboardAvoidingView={true}
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
      <ScrollView
        style={Styles.flex}
        contentContainerStyle={[
          Styles.padding16,
          {backgroundColor: theme.colors.card},
        ]}>
        <TextInput
          ref={facebookRef}
          defaultValue={facebook}
          label={t('facebook')}
          placeholder={t('input_facebook')}
          onChangeText={setFaceBook}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={twitterRef}
          defaultValue={twitter}
          label={t('twitter')}
          placeholder={t('input_twitter')}
          onChangeText={setTwitter}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={instagramRef}
          defaultValue={instagram}
          label={t('instagram')}
          placeholder={t('input_instagram')}
          onChangeText={setInstagram}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={googleRef}
          defaultValue={google}
          label={t('google')}
          placeholder={t('input_google')}
          onChangeText={setGoogle}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={linkedInRef}
          defaultValue={linkedIn}
          label={t('linkedin')}
          placeholder={t('input_linkedin')}
          onChangeText={setLinkedIn}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={youtubeRef}
          defaultValue={youtube}
          label={t('youtube')}
          placeholder={t('input_youtube')}
          onChangeText={setYoutube}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={tumblrRef}
          defaultValue={tumblr}
          label={t('tumblr')}
          placeholder={t('input_tumblr')}
          onChangeText={setTumblr}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={flickrRef}
          defaultValue={flickr}
          label={t('flickr')}
          placeholder={t('input_flickr')}
          onChangeText={setFlickr}
          size="small"
        />
        <SizedBox height={16} />
        <TextInput
          ref={pinterestRef}
          defaultValue={pinterest}
          label={t('pinterest')}
          placeholder={t('input_pinterest')}
          onChangeText={setPinterest}
          size="small"
        />
      </ScrollView>
    </ScreenContainer>
  );
}
