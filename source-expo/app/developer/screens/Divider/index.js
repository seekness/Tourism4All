import React, {useContext, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Application,
  BottomSheetView,
  Divider,
  Icon,
  IconButton,
  Image,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
} from '@components';
import {Images, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function Index({navigation, route}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const infoRef = useRef();

  const [thickness, setThickness] = useState(1);
  const [color, setColor] = useState();

  return (
    <ScreenContainer
      navigation={navigation}
      enableKeyboardAvoidingView={true}
      options={{
        headerRight: () => {
          return (
            <View style={Styles.nativeRightButton}>
              <IconButton
                onPress={() => infoRef.current?.present()}
                size="small">
                <Icon name="information-outline" />
              </IconButton>
              <SizedBox width={4} />
              <IconButton
                onPress={() => {
                  navigation.push('Code', route.params);
                }}
                size="small">
                <Icon name="file-code-outline" />
              </IconButton>
            </View>
          );
        },
      }}>
      <BottomSheetView ref={infoRef}>
        <View style={Styles.padding8}>
          <Image
            source={Images.divider}
            resizeMode="contain"
            style={styles.example}
          />
        </View>
      </BottomSheetView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[Styles.flex, {backgroundColor: theme.colors.card}]}
        contentContainerStyle={Styles.padding16}>
        <Text typography="h4" weight="bold">
          {t('interactive_demo')}
        </Text>
        <SizedBox height={24} />
        <View style={Styles.rowCenter}>
          <Divider thickness={thickness} color={color} />
        </View>
        <SizedBox height={24} />
        <Text typography="h4" weight="bold">
          {t('props')}
        </Text>
        <SizedBox height={16} />
        <TextInput
          defaultValue={`${thickness}`}
          size="small"
          label="thickness"
          placeholder="Example: 1"
          keyboardType="numeric"
          onChangeText={value => {
            const number = parseInt(value, 10);
            if (number) {
              setThickness(number);
            }
          }}
        />
        <SizedBox height={16} />
        <TextInput
          defaultValue={color}
          size="small"
          label="color"
          placeholder="Example: red"
          autoCapitalize="none"
          onChangeText={value => {
            setColor(value);
          }}
        />
        <SizedBox height={16} />
        <Text typography="h4" weight="bold">
          {t('example')}
        </Text>
        <SizedBox height={16} />
        <Divider thickness={1} />
        <SizedBox height={8} />
        <Divider thickness={2} />
        <SizedBox height={8} />
        <Divider thickness={1} color={theme.colors.text} />
        <SizedBox height={8} />
        <Divider thickness={2} color={theme.colors.text} />
        <SizedBox height={8} />
        <Divider thickness={1} color={theme.colors.primary} />
        <SizedBox height={8} />
        <Divider thickness={2} color={theme.colors.primary} />
        <SizedBox height={8} />
        <Divider thickness={1} color={theme.colors.secondary} />
        <SizedBox height={8} />
        <Divider thickness={2} color={theme.colors.secondary} />
      </ScrollView>
    </ScreenContainer>
  );
}
