import React, {useContext} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Application, Icon, SizedBox, Text} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {Styles} from '@configs';

export default function Index(props) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const {style, data} = props;

  if (data) {
    return (
      <View style={[Styles.row, style]}>
        <View style={styles.contentLeft}>
          <Text typography="h1" color="primary" style={styles.rateText}>
            {data.avg}
          </Text>
          <Text typography="h4" weight="bold">
            {t('out_of')} 5
          </Text>
        </View>
        <SizedBox width={16} />
        <View style={styles.containRight}>
          <View style={Styles.row}>
            <View style={styles.starLeft}>
              <View style={Styles.row}>
                {[1, 2, 3, 4, 5].map((icon, index) => {
                  return <Icon key={'star5' + index} name="star" size={10} />;
                })}
              </View>
              <View style={Styles.row}>
                {[1, 2, 3, 4].map((icon, index) => {
                  return <Icon key={'star4' + index} name="star" size={10} />;
                })}
              </View>
              <View style={Styles.row}>
                {[1, 2, 3].map((icon, index) => {
                  return <Icon key={'star3' + index} name="star" size={10} />;
                })}
              </View>
              <View style={Styles.row}>
                {[1, 2].map((icon, index) => {
                  return <Icon key={'star2' + index} name="star" size={10} />;
                })}
              </View>
              <View style={Styles.row}>
                <Icon name="star" size={10} />
              </View>
            </View>
            <SizedBox width={8} />
            <View style={styles.containStatus}>
              <View style={styles.contentLineStatus}>
                <View style={styles.lineStatusGray} />
                <View
                  style={[
                    styles.lineStatusPrimary,
                    {
                      width: `${data.five}%`,
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                />
              </View>
              <View style={styles.contentLineStatus}>
                <View style={styles.lineStatusGray} />
                <View
                  style={[
                    styles.lineStatusPrimary,
                    {
                      width: `${data.four}%`,
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                />
              </View>
              <View style={styles.contentLineStatus}>
                <View style={styles.lineStatusGray} />
                <View
                  style={[
                    styles.lineStatusPrimary,
                    {
                      width: `${data.three}%`,
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                />
              </View>
              <View style={styles.contentLineStatus}>
                <View style={styles.lineStatusGray} />
                <View
                  style={[
                    styles.lineStatusPrimary,
                    {
                      width: `${data.two}%`,
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                />
              </View>
              <View style={styles.contentLineStatus}>
                <View style={styles.lineStatusGray} />
                <View
                  style={[
                    styles.lineStatusPrimary,
                    {
                      width: `${data.one}%`,
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
          <SizedBox height={4} />
          <Text typography="subtitle" weight="bold">
            {data.total} {t('ratings')}
          </Text>
        </View>
      </View>
    );
  }
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.object,
};

Index.defaultProps = {
  style: {},
  data: null,
};
