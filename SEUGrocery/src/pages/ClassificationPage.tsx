/*
  @version: 0.1
  @author: 71117103张潇艺
  @date: 2019-9-4
*/

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import * as SP from '../Common/ScreenProperty';
//import { Image,Text} from 'react-native-elements';
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LocalBackHeader from '../Components/LocalBackHeader';
import {ListItem} from 'react-native-elements';
import ItemList from '../Common/ItemList';
import Good from '../Common/ItemBlock';
import UserInfo from '../Common/UserInfo';
const {width} = Dimensions.get('window');
const Goods = [
  {
    itemid: '1',
    title: '米色针织开衫+牛仔裤带吊牌',
    imgurl: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    sold: 1,
    depreciatione: '10',
    price: '100',
    campus: '九龙湖校区',
    classify: '服饰鞋包',
    name: 'name1',
  },
];

export default class ClassificationPage extends Component {
  private props: any;
  state: any;
  constructor(props) {
    super(props);
    this.state = {
      uuid: '',
      goodsList: [],
      showWay: '0',
      typeid: '',
      itemRange: 1,
      isRefreshing: false,
    };
  }
  async componentDidMount() {
    let uuid = await UserInfo.get('uuid');
    this.setState({uuid: uuid});
    let typeid = this.props.navigation.state.params.type;
    this.setState({typeid: typeid, itemRange: 1});
    if (typeid != this.state.typeid) {
      this.setState({goodsList: []});
      await this.getSomeItems();
      return;
    }
  }

  getSomeItems = () => {
    for (let i = this.state.itemRange; i < this.state.itemRange + 30; i++) {
      fetch('http://hanyuu.top:8080/item/' + i)
        .then(res => res.json())
        .then(item => {
          // console.log('item',item);
          if (
            item.status == 'success' &&
            item.type == this.state.typeid &&
            item.sold == 1
          ) {
            let newList = this.state.goodsList;
            newList.push(item);
            this.setState({goodsList: newList});
          }
        });
    }
  };
  async componentDidUpdate() {
    let typeid = this.props.navigation.state.params.type;
    if (typeid != this.state.typeid) {
      // console.log(typeid);
      this.setState({typeid: typeid, itemRange: 1});
      this.setState({goodsList: []});
      await this.getSomeItems();
      return;
      // alert('update');
    }
    // ItemList.getItemList().then(list => {
    //     let newList=[];
    //     for (let item of list){
    //         if(item.type==typeid && item.sold==1){
    //             newList.push(item);
    //         }
    //     }
    //     this.setState({goodsList: newList});
    // });
  }

  _onRefresh = async () => {
    let range = this.state.itemRange + 29;
    this.setState({itemRange: range});
    console.log('range', this.state.itemRange);
    await this.getSomeItems();
    this.setState({isRefreshing: false});
  };

  render() {
    return (
      <ScrollView
        style={styles.baseContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor={'#ff0000'}
            title="Loading..."
            titleColor={'#00ff00'}
            colors={['#cc6699', '#6699cc', '#99cc66']}
            progressBackgroundColor={'#fff'}
          />
        }>
        <LocalBackHeader navigation={this.props.navigation} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {this.props.navigation.state.params.classification}
          </Text>
        </View>
        <View style={styles.selectContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({showWay: '0'});
            }}
            activeOpacity={0.2}
            focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}>
              <Text style={{color: '#cc6699'}}>历史发布</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({showWay: '1'});
            }}
            activeOpacity={0.2}
            focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}>
              <Text style={{color: '#cc6699'}}>最新发布</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.goodsList}>
          {this.state.goodsList.map((i, j) => (
            <Good
              itemid={i.itemid}
              image={{uri: 'http://hanyuu.top:8080/' + i.imgurl.split('++')[0]}}
              name={i.title}
              price={i.price}
              //text={i.info}
              campus={i.campus}
              navigation={this.props.navigation}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#fff0f5',
  },
  block: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: width / 2 - 20,
    height: SP.HB(35),
    alignItems: 'center',
    margin: 10,
    padding: 10,
    flexDirection: 'column',
  },
  goodsList: {
    //flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: SP.WB(3),
  },
  price: {
    fontSize: 20,
    color: '#cc6699',
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    color: '#cc6699',
    //alignSelf:'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textdes: {
    fontSize: 12,
    color: '#000',
    flex: 1,
  },
  name: {
    fontSize: 28,
    color: '#cc6699',
    flex: 1,
  },
  selectContainer: {
    height: SP.HB(3),
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  selectText: {
    color: '#cc6699',
  },
});
