import React from 'react';
import {View} from 'react-native';
import {Images, BaseColor, useTheme} from '@config';
import {Text, Image, StarRating} from '@components';
import PropTypes from 'prop-types';
import styles from './styles';

export default function CommentItem(props) {
  const {colors} = useTheme();
  const cardColor = colors.card;
  const {style, image, name, rate, date, comment} = props;
  return (
    <View style={[styles.contain, {backgroundColor: cardColor}, style]}>
      <View style={styles.starRow}>
        <View style={styles.contentLeft}>
          <Image source={{uri: image}} style={styles.thumb} />
          <View>
            <Text headline semibold numberOfLines={1}>
              {name}
            </Text>
            <View style={styles.contentRate}>
              <StarRating
                disabled={true}
                starSize={14}
                maxStars={5}
                rating={parseFloat(rate)}
                selectedStar={rating => {}}
                fullStarColor={BaseColor.yellowColor}
              />
            </View>
          </View>
        </View>
        <View style={styles.contentRight}>
          <Text caption2 grayColor numberOfLines={1}>
            {date}
          </Text>
        </View>
      </View>
      <Text body2 grayColor>
        {comment}
      </Text>
    </View>
  );
}

CommentItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  rate: PropTypes.number,
  date: PropTypes.string,
  comment: PropTypes.string,
};

CommentItem.defaultProps = {
  style: {},
  image: Images.profile2,
  name: '',
  rate: 0,
  date: '',
  comment: '',
};
