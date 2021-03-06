/*
  @version: 0.1
  @author: 71117103 张潇艺
  @date: 2019-8-29
*/
import React, {Component} from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
  Picker,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import LocalBackHeader from '../Components/LocalBackHeader';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../Components/Loading';
import {postData} from '../Common/FetchHelper';
import {uploadImage} from '../Common/UplodeImageTool';
import ItemList from '../Common/ItemList';
import ImagePicker from 'react-native-image-picker';
import * as SP from '../Common/ScreenProperty';
import {sha1} from '../Common/SHA-1Encryptor';
import UserInfo from '../Common/UserInfo';

var photoOptions = {
  //底部弹出框选项
  title: '请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: '东大杂货铺',
  },
};

const commonURL = 'http://inari.ml:8080/';
var {height, width} = Dimensions.get('window');

const majorNum = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '21',
  '22',
  '24',
  '25',
  '26',
  '29',
  '30',
  '31',
  '33',
  '41',
  '42',
  '43',
  '44',
  '57',
  '61',
  '66',
  '71',
  '75',
  'D1',
  'D2',
  'G1',
  'G2',
  'G3',
  'GS',
  'JS',
  'LK',
  'TJ',
];

export default class ReleaseIWantPage extends Component {
  private state: any;
  private Loading: any;

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      password2: '',
      idcard: '',
      major: '',
      detail: '',
      campus: 'T',
      imgURL: '',
      left: 0,
    };
    UserInfo.get('username').then(data => {
      this.setState({userName: data});
    });
    UserInfo.get('idcard').then(data => {
      this.setState({idcard: data});
    });
    UserInfo.get('studentid').then(data => {
      this.setState({major: data});
    });
    UserInfo.get('info').then(data => {
      this.setState({detail: data});
    });
    UserInfo.get('avatarurl').then(data => {
      this.setState({imgURL: data});
    });
    UserInfo.get('address').then(data => {
      this.setState({campus: data});
    });
  }

  /*updateState = (data) => {
          this.setState(data);
      }
  */
  checkUserName = () => {
    if (this.state.userName == '') {
      alert('请输入昵称！');
      return false;
    }
    return true;
  };

  checkPassWord = () => {
    let pass1 = String(this.state.password);
    let pass2 = String(this.state.password2);
    if (pass1 == '' || pass1 != pass2) {
      alert('请正确输入密码和确认密码！');
      return false;
    }
    return true;
  };

  checkMajor = () => {
    let ma = String(this.state.major);
    if (majorNum.indexOf(ma) == -1) {
      alert('请输入正确的院系编号');
      return false;
    }
    return true;
  };

  checkInput = async () => {
    // if (this.checkUserName() && this.checkPassWord() && this.checkMajor()) {
    if (this.checkUserName() && this.checkMajor()) {
      this.Loading.show();
      await this.uploadUserData();
      this.Loading.close();
      alert('修改成功');
      return true;
    }
    return false;
  };

  changePassword = async () => {
    if (this.checkUserName() && this.checkMajor() && this.checkPassWord()) {
      this.Loading.show();
      const [uid, token] = await ItemList.getIdAndToken();

      let data = {
        token: token,
        username: this.state.userName,
        idcard: this.state.idcard,
        studentid: this.state.major,
        address: this.state.campus,
        info: this.state.detail,
        password: sha1(this.state.password),
      };
      // console.log(data);
      const commonURL = 'http://inari.ml:8080/';
      const modifyURL = commonURL + 'user/modify';
      // alert(data);

      await postData(modifyURL, data)
        .then(response => {
          // Loading.close();
          alert('发布成功');
        })
        .catch(err => {
          console.error(err);
          // Loading.close();
          alert('上传数据失败');
        });
      this.Loading.close();
    }
  };

  uploadUserData = async () => {
    // var Loading = new Loading();
    // Loading.show();
    const [uid, token] = await ItemList.getIdAndToken();

    let data = {
      token: token,
      username: this.state.userName,
      idcard: this.state.idcard,
      studentid: this.state.major,
      address: this.state.campus,
      info: this.state.detail,
    };
    // console.log(data);
    const commonURL = 'http://inari.ml:8080/';
    const modifyURL = commonURL + 'user/modify';
    // alert(data);

    postData(modifyURL, data)
      .then(response => {
        // Loading.close();
        alert('发布成功');
      })
      .catch(err => {
        console.error(err);
        // Loading.close();
        alert('上传数据失败');
      });
  };

  cameraAction = () => {
    ImagePicker.showImagePicker(photoOptions, async response => {
      console.log('response' + response);
      if (response.didCancel) {
        return;
      }
      this.setState({
        imgURL: {uri: response.uri},
        avatarChanged: true,
      });
      this.Loading.show();
      const [uid, token] = await ItemList.getIdAndToken();
      let uploadAvatarURL = commonURL + 'user/avatar';
      let paras = {
        token: token,
        path: this.state.imgURL.uri,
      };
      uploadImage(uploadAvatarURL, paras)
        .then(response => {
          if (response.status == 'success') {
            alert('头像上传成功');
            this.Loading.close();
          } else {
            alert('头像上传失败');
            this.Loading.close();
          }
        })
        .catch(err => {
          alert('头像上传失败');
          this.Loading.close();
        });
    });
  };

  render() {
    return (
      <View style={styles.baseContainer}>
        <ScrollView style={styles.test}>
          <LocalBackHeader navigation={this.props.navigation} />
          <View style={styles.viewUserTop}>
            <Avatar size={120} rounded source={{uri: this.state.imgURL}} />
            <TouchableOpacity
              onPress={this.cameraAction}
              activeOpacity={0.2}
              focusedOpacity={0.5}>
              <View style={styles.txtArea}>
                <View style={styles.viewEdit}>
                  <Icon
                    name="pencil-square-o"
                    style={{color: 'white'}}
                    size={15}
                  />
                  <Text style={styles.txtEdit}>上传头像</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{left: this.state.left, flexDirection: 'row'}}>
            <View style={{width: SP.WB(100)}}>
              <View style={styles.container_row}>
                <Text style={styles.h4}>昵称：</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={'请输入昵称'}
                    value={this.state.userName}
                    editable={true}
                    onChangeText={userName => this.setState({userName})}
                    maxLength={15}
                    style={styles.h4}
                  />
                </View>
              </View>

              <View style={styles.container_row}>
                <Text style={styles.h4}>地址：</Text>
                <View style={styles.inputContainer}>
                  <Picker
                    selectedValue={this.state.campus}
                    style={{width: width * 0.7, fontSize: 20}}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({campus: itemValue});
                    }}>
                    <Picker.Item label="九龙湖校区桃园" value="T" />
                    <Picker.Item label="九龙湖校区梅园" value="M" />
                    <Picker.Item label="九龙湖校区橘园" value="J" />
                    <Picker.Item label="四牌楼校区" value="S" />
                    <Picker.Item label="丁家桥校区" value="D" />
                  </Picker>
                </View>
              </View>
              <View style={styles.container_row}>
                <Text style={styles.h4}>院系：</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={'院系编号'}
                    value={this.state.major}
                    editable={true}
                    onChangeText={major => this.setState({major})}
                    keyboardType={'numeric'}
                    maxLength={2}
                    style={styles.h4}
                  />
                  <Text style={styles.h4}>系</Text>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <TextInput
                  style={styles.detail}
                  onChangeText={detail => this.setState({detail})}
                  value={this.state.detail}
                  placeholder={'个人简介……'}
                  multiline={true}
                  maxLength={50}
                />
                <Text style={{alignSelf: 'flex-end', margin: 10}}>
                  {50 - this.state.detail.length}/50
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.buttonContainer}>
                  <Button
                    title="修改密码"
                    type="clear"
                    color={'#cc6699'}
                    onPress={() => {
                      this.setState({left: -SP.WB(100)});
                    }}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title="确认提交"
                    type="clear"
                    color={'#cc6699'}
                    onPress={() => {
                      return this.checkInput();
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={{width: SP.WB(100), alignItems: 'center'}}>
              <View>
                <View style={styles.container_row}>
                  <Text style={styles.h4}>新密码 ：</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder={'请输入要更改的密码'}
                      value={this.state.password}
                      editable={true}
                      onChangeText={password => this.setState({password})}
                      style={styles.h4}
                      secureTextEntry={true}
                    />
                  </View>
                </View>

                <View style={styles.container_row}>
                  <Text style={styles.h4}>确认密码：</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder={'请再次输入密码'}
                      value={this.state.password2}
                      editable={true}
                      onChangeText={password2 => this.setState({password2})}
                      style={styles.h4}
                      secureTextEntry={true}
                    />
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <View style={styles.buttonContainer}>
                    <Button
                      title="返回修改个人信息"
                      type="clear"
                      color={'#cc6699'}
                      onPress={() => {
                        this.setState({left: 0});
                      }}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      title="确认修改密码"
                      type="clear"
                      color={'#cc6699'}
                      onPress={() => {
                        this.changePassword();
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Loading
            ref={r => {
              this.Loading = r;
            }}
            hide={true}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#FFF0F5',
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    width: width * 0.5,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  viewUserTop: {
    marginBottom: 5,
    height: SP.HB(20),
    backgroundColor: '#cc6699',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  txtArea: {
    justifyContent: 'center',
    margin: 20,
  },
  detailContainer: {
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    justifyContent: 'space-between',
  },
  detail: {
    fontSize: 15,
    /*borderTopColor:'white',
            borderTopWidth:0.5,*/
  },

  inputContainer: {
    //margin:1,
    width: SP.WB(70),
    backgroundColor: 'white',
    borderRadius: 10,
    // flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },

  container_row: {
    flexDirection: 'row',
    //justifyContent: 'center',
    justifyContent: 'space-around',
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,

    //flex: 1,
  },
  h4Container: {
    width: SP.WB(15),
    margin: 5,
    alignItems: 'center',
  },
  h4: {
    alignSelf: 'center',
    fontSize: 15,
    margin: 5,
  },
  value: {
    color: '#cc6699',
    fontSize: 30,
    fontWeight: 'bold',
  },
  viewEdit: {
    width: 90,
    //marginTop: 10,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEdit: {
    marginLeft: 3,
    alignSelf: 'center',
    color: 'white',
    fontSize: 12,
  },
});
