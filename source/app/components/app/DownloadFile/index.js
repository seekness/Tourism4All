import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import {Toast} from '@components';
import api from '@api';
import {fileExists, getFileName, getFilePath} from '@utils';

const Index = props => {
  const {style, children, onCompleted, link} = props;
  const [percent, setPercent] = useState(0);
  const [uri, setUri] = useState();

  useEffect(() => {
    fileExists(link)
      .then(exist => {
        if (exist) {
          const fileName = getFileName(link);
          setUri(getFilePath(fileName));
        }
      })
      .catch(e => {
        Toast.show(e.message);
      });
  }, [link]);

  /**
   * on upload
   */
  const download = async () => {
    try {
      const result = await api.downloadFile(link, {
        onProgress: value => {
          setPercent(value);
        },
      });

      setUri(result);
      onCompleted(result);
    } catch (e) {
      Toast.show(e.message);
    }
  };

  /**
   * open file
   */
  const open = async () => {
    if (uri) {
      try {
        await FileViewer.open(uri);
      } catch (e) {
        Toast.show(e.message);
      }
    }
  };

  return (
    <View style={style}>
      {children?.({percent, uri, download, open}) ?? <View />}
    </View>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.func,
  onCompleted: PropTypes.func,
  link: PropTypes.string,
};

Index.defaultProps = {
  style: {},
  children: null,
  onCompleted: () => {},
  link: '',
};

export default Index;
