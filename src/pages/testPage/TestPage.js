import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Uploader, Alert, Loader, Icon } from 'rsuite';
import loggedInAxios from '../../helpers/loggedInAxios';
import './TestPage.css';

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const styles = {
  width: 150,
  height: 150,
};

const TestPage = () => {
  const [uploading, setUploading] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState(null);
  const history = useHistory();
  // useEffect(() => {
  //   loggedInAxios(history)
  //     .get('/users/info?email=joelmathewkoshy@gmail.com')
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err.response));
  // }, [history]);
  return (
    <h1>
      <Uploader
        fileListVisible={false}
        listType='picture'
        onUpload={(file) => {
          setUploading(true);
          previewFile(file.blobFile, (value) => {
            setFileInfo(value);
          });
        }}
        onSuccess={(response, file) => {
          console.log(file);
          setUploading(false);
          Alert.success('Uploaded successfully');
          console.log(response);
        }}
        onError={() => {
          setFileInfo(null);
          setUploading(false);
          Alert.error('Upload failed');
        }}
      >
        <button style={styles}>
          {uploading && <Loader backdrop center />}
          {fileInfo ? (
            <img alt='asd' src={fileInfo} width='100%' height='100%' />
          ) : (
            <Icon icon='avatar' size='5x' />
          )}
        </button>
      </Uploader>
    </h1>
  );
};

export default TestPage;
