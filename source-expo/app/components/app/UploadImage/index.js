import React, {useState} from 'react';
import PropTypes from 'prop-types';
import api from '@api';
import {View} from 'react-native';
import {ImageModel} from '@models';
import {Toast} from '@components';
import {getFileName} from '@utils';

const Index = props => {
  const {style, children, onCompleted} = props;
  const [percent, setPercent] = useState(0);
  const [uri, setUri] = useState();
  const [processing, setProcessing] = useState(false);

  /**
   * on upload
   */
  const upload = async file => {
    const formData = new FormData();
    formData.append('file', {...file, name: getFileName(file.uri)});
    setProcessing(true);
    try {
      const response = await api.uploadMedia(formData, value => {
        setPercent(value);
      });
      const image = ImageModel.fromJsonUpload(response);
      setUri(image.full);
      onCompleted?.(image);
    } catch (e) {
      Toast.show(e.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={style}>
      {children?.({percent, uri, processing, upload}) ?? <View />}
    </View>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.func,
  onCompleted: PropTypes.func,
};

Index.defaultProps = {
  style: {},
  children: null,
  onCompleted: () => {},
};

export default Index;
