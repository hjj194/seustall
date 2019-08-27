/*
  @version: 0.5
  @author: 71117133张睦婕,71117103张潇艺
  @date: 2019-8-27
*/

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  NativeModules,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

// @ts-ignore
let Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let leftStartPoint = totalWidth * 0.15;
let componentWidth = totalWidth * 0.7;
let heading = totalHeight * 0.1;

const state1 = {
  stateNum: 1,
  inputedPW: '',
  PWInputWidth: componentWidth,
  idButtonAlpha: 0,
  sendIDText: '',
  bigButtonText: '登    录',
  registerAlpha: 1,
  register: '验证码登录 / 注册',
  PWplacehold: ' 请输入密码',
  PWIcon: 'lock',
  PWVisible: false,
};

const state2 = {
  stateNum: 2,
  inputedPW: '',
  PWInputWidth: componentWidth * 0.6,
  idButtonAlpha: 1,
  sendIDText: '发送验证码',
  bigButtonText: '登  录   /   注  册',
  registerAlpha: 0,
  register: '密码登录',
  PWplacehold: '请输入验证码',
  PWIcon: 'message-processing',
  PWVisible: true,
};

export default class SignInUI extends Component {
  private state: any;
  constructor(props) {
    super(props);
    this.state = Object.assign({inputedNum: ''}, state1);
    //下面两条语句将两个回调函数和成员方法绑定
    this.updateNum = this.updateNum.bind(this);
    this.updatePW = this.updatePW.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
  }
  updateNum(newText) {
    this.setState(state => {
      return {
        inputedNum: newText,
      };
    });
  }
  updatePW(newText) {
    this.setState(state => {
      return {
        inputedPW: newText,
      };
    });
  }
  buttonPressed() {
    this.setState(state => {
      return {
        inputedPW: '',
      };
    });
  }
  identifyingCodeLoginButton = () => {
    LayoutAnimation.spring();
    this.setState(state => {
      if (this.state.stateNum == 1) {
        return state2;
      }
      if (this.state.stateNum == 2) {
        return state1;
      }
    });
  };

  render() {
    return (
      //background
      <ImageBackground
        source={require('../Common/img/loginBackground.png')}
        style={styles.background}>
        {/*//三个条形框*/}
        <View style={styles.container}>
          {/*//手机号输入*/}
          <View style={[styles.inputStyle, styles.numberInputStyle]}>
            <Icon
              name={'phone-square'}
              type={'font-awesome'}
              color={'#772850'}
            />

            <TextInput
              onChangeText={newText => this.updateNum({newText})}
              placeholder={'请输入手机号'}
              placeholderTextColor={'#772850'}
              style={{width: componentWidth}}
              value={this.state.inputedNum}
              aitoFocus={true}
              maxLength={11}
              keyboardType={'numeric'}
            />
          </View>
          {/*//密码输入*/}
          <View style={styles.container_row}>
            <View
              style={[
                styles.inputStyle,
                styles.passwordInputStyle,
                {width: this.state.PWInputWidth},
              ]}>
              <Icon
                name={this.state.PWIcon}
                type={'material-community'}
                color={'#772850'}
              />
              <TextInput
                onChangeText={newText => this.updatePW({newText})}
                password={true}
                placeholder={this.state.PWplacehold}
                placeholderTextColor={'#772850'}
                style={{width: this.state.PWInputWidth}}
                secureTextEntry={!this.state.PWVisible}
                value={this.state.inputedPW}
              />
            </View>
            {/*//发送验证码*/}
            <View
              style={[styles.idButton, {opacity: this.state.idButtonAlpha}]}>
              <Text style={{color: '#cc6699', size: 30}}>
                {this.state.sendIDText}
              </Text>
            </View>
          </View>
          {/*//登录按钮*/}
          <TouchableOpacity
            onPress={this.buttonPressed}
            style={styles.bigButton}>
            <Text style={styles.bigTextPrompt}>{this.state.bigButtonText}</Text>
          </TouchableOpacity>
          {/*//切换状态的按键*/}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={this.identifyingCodeLoginButton}>
            {/*<View style={{backgroundColor:'#cc9966', top:heading+90}}>*/}
            <Text style={styles.registerText}>{this.state.register}</Text>
            {/*</View>*/}
          </TouchableOpacity>
          {/*<View style={{backgroundColor:'red',width:this.state.PWInputWidth,height:50}}></View>*/}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#F5FCFF',
  },
  container_row: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  numberInputStyle: {
    top: heading + 20,
    left: leftStartPoint,
    width: componentWidth,
    backgroundColor: 'white',
    borderColor: '#cc6699',
    fontSize: 20,
  },
  passwordInputStyle: {
    top: heading + 50,
    left: leftStartPoint,
    // width: componentWidth,
    // backgroundColor:'#cc6699',
    fontSize: 20,
    backgroundColor: 'white',
    borderColor: '#cc6699',
  },
  bigButton: {
    top: heading + 70,
    backgroundColor: 'white',
    left: leftStartPoint,
    width: componentWidth,
    borderRadius: 50,
    padding: 10,
  },
  bigTextPrompt: {
    color: '#cc6699',
    fontSize: 25,
    textAlign: 'center',
  },
  registerText: {
    // width:componentWidth*0.46,
    color: 'white',
    fontSize: 16,
    // fontStyle:'italic',//斜体
    textDecorationLine: 'underline',
  },
  registerButton: {
    top: heading + 90,
    left: leftStartPoint,
    width: componentWidth * 0.46,
  },
  inputStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    opacity: 0.7,
    borderWidth: 1,
    borderRadius: 50,
  },
  idButton: {
    top: heading + 50,
    backgroundColor: 'white',
    // color:'#cc6699'
    textAlign: 'center',
    fontSize: 30,
    borderRadius: 50,
    padding: 15,
    // left:totalWidth*0.15,
    marginLeft: totalWidth * 0.2,
  },
});
