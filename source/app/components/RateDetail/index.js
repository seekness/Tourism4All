import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Icon} from '@components';
import {BaseColor, useTheme} from '@config';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function RateDetail(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {style, point, maxPoint, totalRating, data} = props;
  const one = (data[1] / totalRating) * 100;
  const two = (data[2] / totalRating) * 100;
  const three = (data[3] / totalRating) * 100;
  const four = (data[4] / totalRating) * 100;
  const five = (data[5] / totalRating) * 100;
  return (
    <View style={[styles.contain, style]}>
      <View style={styles.contentLeft}>
        <Text primaryColor style={{fontSize: 48}}>
          {point}
        </Text>
        <Text subhead grayColor semibold>
          {t('out_of')} {maxPoint}
        </Text>
      </View>
      <View style={styles.containRight}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.starLeft}>
            <View style={styles.lineStar}>
              {[1, 2, 3, 4, 5].map((icon, index) => {
                return (
                  <Icon
                    key={`star5` + index}
                    name="star"
                    color={BaseColor.grayColor}
                    solid
                    size={8}
                  />
                );
              })}
            </View>
            <View style={styles.lineStar}>
              {[1, 2, 3, 4].map((icon, index) => {
                return (
                  <Icon
                    key={`star4` + index}
                    name="star"
                    color={BaseColor.grayColor}
                    solid
                    size={8}
                  />
                );
              })}
            </View>
            <View style={styles.lineStar}>
              {[1, 2, 3].map((icon, index) => {
                return (
                  <Icon
                    key={`star3` + index}
                    name="star"
                    color={BaseColor.grayColor}
                    solid
                    size={8}
                  />
                );
              })}
            </View>
            <View style={styles.lineStar}>
              {[1, 2].map((icon, index) => {
                return (
                  <Icon
                    key={`star2` + index}
                    name="star"
                    color={BaseColor.grayColor}
                    solid
                    size={8}
                  />
                );
              })}
            </View>
            <View style={styles.lineStar}>
              <Icon name="star" color={BaseColor.grayColor} solid size={8} />
            </View>
          </View>
          <View style={styles.containStatus}>
            <View style={styles.contentLineStatus}>
              <View style={styles.lineStatusGray} />
              <View
                style={[
                  styles.lineStatusPrimary,
                  {width: `${five}%`, backgroundColor: colors.primary},
                ]}
              />
            </View>
            <View style={styles.contentLineStatus}>
              <View style={styles.lineStatusGray} />
              <View
                style={[
                  styles.lineStatusPrimary,
                  {width: `${four}%`, backgroundColor: colors.primary},
                ]}
              />
            </View>
            <View style={styles.contentLineStatus}>
              <View style={styles.lineStatusGray} />
              <View
                style={[
                  styles.lineStatusPrimary,
                  {width: `${three}%`, backgroundColor: colors.primary},
                ]}
              />
            </View>
            <View style={styles.contentLineStatus}>
              <View style={styles.lineStatusGray} />
              <View
                style={[
                  styles.lineStatusPrimary,
                  {width: `${two}%`, backgroundColor: colors.primary},
                ]}
              />
            </View>
            <View style={styles.contentLineStatus}>
              <View style={styles.lineStatusGray} />
              <View
                style={[
                  styles.lineStatusPrimary,
                  {width: `${one}%`, backgroundColor: colors.primary},
                ]}
              />
            </View>
          </View>
        </View>
        <Text body2 semibold>
          {totalRating} {t('ratings')}
        </Text>
      </View>
    </View>
  );
}

RateDetail.propTypes = {
  style: PropTypes.object,
  point: PropTypes.number,
  maxPoint: PropTypes.number,
  totalRating: PropTypes.number,
  data: PropTypes.object,
};

RateDetail.defaultProps = {
  style: {},
  point: 0,
  maxPoint: 5,
  totalRating: 0,
  data: {},
};
