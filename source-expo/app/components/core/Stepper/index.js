import React, {useContext} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Application, Divider, Icon, SizedBox, Text} from '@components';
import styles from './styles';
import {Colors, Styles} from '@configs';

const Index = props => {
  const {theme} = useContext(Application);
  const {style, steps, step} = props;

  return (
    <View style={[styles.container, style]}>
      {steps.map((item, index) => {
        let backgroundColor = theme.colors.border;
        let color;
        if (index <= step) {
          backgroundColor = theme.colors.primary;
          color = Colors.white;
        }
        return (
          <View style={styles.item} key={item.title}>
            <Text typography="caption" weight="bold">
              {item.title}
            </Text>
            <SizedBox height={4} />
            <View style={Styles.rowCenter}>
              <View style={Styles.flex}>
                <Divider
                  color={
                    index === 0
                      ? 'transparent'
                      : index <= step
                      ? theme.colors.primary
                      : null
                  }
                />
              </View>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor,
                  },
                ]}>
                <Icon name={item.icon} size={14} color={color} />
              </View>
              <View style={Styles.flex}>
                <Divider
                  color={
                    index === steps.length - 1
                      ? 'transparent'
                      : index < step
                      ? theme.colors.primary
                      : null
                  }
                />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  steps: PropTypes.array,
  step: PropTypes.number,
};

Index.defaultProps = {
  style: {},
  steps: [
    {title: 'Details', icon: 'calendar'},
    {title: 'Contact', icon: 'account-box-outline'},
    {title: 'Payment', icon: 'credit-card-outline'},
    {title: 'Completed', icon: 'check'},
  ],
  step: 0,
};

export default Index;
