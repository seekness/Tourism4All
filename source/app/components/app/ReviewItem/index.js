import React, {useContext} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Application, Image, Rating, SizedBox, Text} from '@components';
import styles from './styles';
import {Styles} from '@configs';

const Index = props => {
  const {theme} = useContext(Application);
  const {style, item, showPostName} = props;

  return (
    <View
      style={[
        styles.reviewItem,
        Styles.card,
        {
          backgroundColor: theme.colors.card,
        },
        style,
      ]}>
      <View style={Styles.row}>
        <Image style={styles.userImage} source={{uri: item.user?.image}} />
        <SizedBox width={8} />
        <View style={Styles.flex}>
          <View style={Styles.rowSpace}>
            <Text typography="title" weight="bold">
              {item.user?.name}
            </Text>
            <Text typography="caption" type="secondary">
              {item.createDate?.format?.('YYYY-MM-DD hh:mm')}
            </Text>
          </View>
          <SizedBox height={4} />
          <Rating
            rate={item?.rate}
            size={12}
            disabled={true}
            style={styles.rateContent}
          />
        </View>
      </View>
      {showPostName && (
        <>
          <SizedBox height={8} />
          <Text typography="title" weight="bold">
            {item.postName}
          </Text>
        </>
      )}
      <SizedBox height={8} />
      <Text typography="subtitle">{item.content}</Text>
    </View>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  showPostName: PropTypes.bool,
  item: PropTypes.object,
};

Index.defaultProps = {
  style: {},
  showPostName: false,
  user: {},
};

export default Index;
