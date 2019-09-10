/*
  @version: 0.0.1
  @author: 71117417张潇艺
  @date: 2019-9-9
*/
import React, {Component} from 'react';
import {
    ActivityIndicator,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Alert,
} from 'react-native';
import {
    Text,
    Button,
    ThemeProvider,
    Image,
    Avatar,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LocalBackHeader from '../Components/LocalBackHeader';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from "react-native-gesture-handler";
import UserInfo from '../Common/UserInfo';
import { postData } from '../Common/FetchHelper';
import ItemList from '../Common/ItemList';

const itemURL = 'http://hanyuu.top:8080/item/';
const userURL = 'http://hanyuu.top:8080/user/';
const addFavUrl = 'http://hanyuu.top:8080/fav/add';
const queryFavUrl = 'http://hanyuu.top:8080/fav/query';
const deleteFavUrl = 'http://hanyuu.top:8080/fav/delete';

var {height, width} = Dimensions.get('window');
export default class IWantDetailPage extends Component {
    private props: any;

    constructor(props) {
        super(props);
        this.state.uuid = props;
        isCustomer: true;
        isFavorite: false;
    }

    fetchData = () => {
        if(this.props.navigation.state.params.itemid==this.state.itemid){
            return;
        }else{
            // alert("rua")
            fetch(itemURL + this.props.navigation.state.params.itemid)
                .then(response => response.json())
                .then(rT => {
                    // this.setState({
                    //   itemid: rT.itemid,
                    //   // username: itemURL + this.props.navigation.state.params.itemid,
                    //   uuid: rT.uuid,
                    //   title: rT.title,
                    //   type: rT.type,
                    //   price: parseFloat(rT.price),
                    //   imgurl: rT.imgurl,
                    //   note: rT.note,
                    //   depreciatione: rT.depreciatione,
                    // });
                    fetch(userURL + rT.uuid)
                        .then(res => res.json())
                        .then(user => {
                            ItemList.getFavList().then(list => {
                                var isfav = false;
                                for (var i of list.res) {
                                    if (i.itemid == rT.itemid) {
                                        isfav = true;
                                    }
                                }
                                this.setState({
                                    username: user.username,
                                    avatorurl: "http://hanyuu.top:8080/" + user.avatarurl,
                                    itemid: rT.itemid,
                                    // username: itemURL + this.props.navigation.state.params.itemid,
                                    uuid: rT.uuid,
                                    title: rT.title,
                                    type: rT.type,
                                    price: parseFloat(rT.price),
                                    imgurl: "http://hanyuu.top:8080/" + rT.imgurl,
                                    note: rT.note,
                                    depreciatione: rT.depreciatione/10,
                                    isFavorite:isfav,
                                });
                            })
                            //  alert("http://hanyuu.top:8080/"+rT.imgurl.value);
                        })
                        .catch(e => {
                            console.log('Oops, error');
                            // Alert.alert('cnm');
                        });


                    console.log(rT);
                })
                .catch(e => {
                    console.log('Oops, error');
                    // Alert.alert('cnm');
                });
        }

    };

    componentDidMount() {
        this.fetchData()
    }

    componentWillUpdate(){
        this.fetchData()
    }


    state = {
        itemid: '',
        uuid: '',
        title:
            '快乐萌新在线摸鱼(。・ω・。)，测试超长超长超长超长的商品名，给大家表演铁锅炖自己',
        type: -1,
        price: 0.0,
        imgurl: 'https://hanyuufurude.github.io/img/covers.jpg',
        depreciatione: '',
        note:
            '《他改变了中国：江泽民传》的作者罗伯特·劳伦斯·库恩（Robert Lawrence Kuhn）自言著这本书的初衷是：用真实的故事展示中国，让世界了解真实的中国。他在中国十多年，工作、生活，和各界人士交朋友，看到许多东西正在欣欣向荣地发展着。然而美国同胞乃至西方世界的许多人还陷在对中国认识的迷雾中。美国国民知道的东西多数是国内大众传媒反复强调的事情，提起中国，他们往往会片面想到人权，完全不知道中国老百姓已经有了更多的民主和幸福的生活。西方对中国的偏见和误解有时会让作者感到沮丧和愤慨。作者认为：江泽民是他了解中国的载体，江泽民的生平体现了中国的各个历史时期情况，从日本侵华战争到中国的改革开放，有近80年跨度。于是，作者希望通过江泽民的传记向世界讲述中国的历史，并告诉世界是历史造就了中国的现状。2004年中，《他改变了中国：江泽民传》的英文稿出来后，上海世纪出版集团开始组织翻译，同时按程序报上海市新闻出版局批准。也向中共中央办公厅报审，作者称“中办审得非常细致，给的反馈非常及时”。该书中文版样书出来时，作者曾带着中、英文两个版本的书专程拜访了江泽民本人。',
        sold: 0,
        username: 'WakamiyaEve',
        avatorurl: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    };

    addFav(){
        UserInfo.get('token').then(toke=>{
            postData(addFavUrl,
                {
                    token:toke,
                    data:"["+this.state.itemid+"]"
                })
                .then(
                    // info=>alert(JSON.stringify(info))
                )
        })
    }

    deleteFav(){
        UserInfo.get('token').then(toke=>{
            postData(deleteFavUrl,
                {
                    token:toke,
                    data:"["+this.state.itemid+"]"
                })
                .then(
                    // info=>alert(JSON.stringify(info))
                )
        })
    }

    render() {
        return (
            <ScrollView style={styles.test}>
                <View style={{height: SP.HB(15)}}>
                    <LocalBackHeader navigation={this.props.navigation}/>
                </View>
                <Text style={styles.infoTitle}>求购物品名： </Text>
                <Text style={styles.title}>{this.state.title}</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('userInformation')}>
                    <View style={styles.userBanner}>
                        <View style={styles.avator}>
                            <Avatar
                                rounded
                                size="medium"
                                source={{uri: this.state.avatorurl}}
                            />
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.username}>{this.state.username}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>最高可接受价： </Text>
                    <Text style={styles.priceTag}>￥ {this.state.price.toFixed(2)}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>最低可接受商品折旧：</Text>
                    <Text style={styles.infoTitle}>{this.state.depreciatione} 成新</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>校区：</Text>
                    <Text style={styles.infoTitle}>{'九龙湖'}</Text>
                </View>
                <Text style={styles.infoTitle}>详细描述:</Text>
                <Text style={styles.note}>{this.state.note}</Text>
                {/*{this.state.isCustomer ?*/}
                <View style={styles.contractButton}>
                    <TouchableOpacity
                        style={[styles.buttonStyle, {backgroundColor: '#cc6699'}]}
                        onPress={() => {
                            //
                            //
                        }}>
                        <Text
                            style={
                                [styles.textStyle, {color: 'white'}]
                            }>
                            提供商品
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            this.props.navigation.navigate('chatP');
                            //
                        }}>
                        <Text
                            style={
                                styles.textStyle
                            }>
                            联系买家
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.favoriteStyle}
                        onPress={() => {
                            if(!this.state.isFavorite){
                                this.addFav();
                            }else{
                                this.deleteFav();
                            }
                            this.setState({isFavorite: !this.state.isFavorite})
                            //
                        }}>

                        <Icon
                            solid={this.state.isFavorite}
                            name="star"
                            color={'#cc6699'}
                            size={20}
                        />
                        <Text
                            style={
                                {
                                    fontSize: 15,
                                    color: '#cc6699',
                                    margin: 5
                                }
                            }>
                            {this.state.isFavorite === true ? "取消收藏" : "收藏"}
                        </Text>
                    </TouchableOpacity>
                </View>
                {/*:
                    <View style={styles.contractButton}>
                        <TouchableOpacity
                            style={styles.favoriteStyle}
                            onPress={() => {
                                //
                                //
                            }}>
                            <Icon
                                name="pen"
                                color={'#cc6699'}
                                size={20}
                                style={{marginLeft: 20}}
                            />
                            <Text
                                style={
                                    styles.textStyle
                                }>
                                编辑
                            </Text>
                        </TouchableOpacity>
                    </View>
                }*/}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: '#fff0f5',
    },
    img: {
        width: width - 10,
        height: width - 10,
        alignSelf: 'center',
        borderRadius: 10,
    },
    priceTag: {
        color: '#cc6699',
        fontSize: 40,
        margin: 10,
    },
    title: {
        fontSize: 25,
        marginBottom: 5,
        marginHorizontal: 10,
    },
    infoContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 10,

    },
    infoTitle:{
        fontSize:20,
        marginHorizontal:10,
        color:'#cc6699'

    },
    note: {
        fontSize: 15,
        marginVertical: 5,
        marginHorizontal: 10,

    },
    userBanner: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    avator: {
        marginRight: 20,
    },
    username: {
        fontSize: 20,
        color: '#444444',
    },
    center: {
        justifyContent: 'center',
        margin: 5,
    },
    contractButton: {
        justifyContent: 'space-evenly',
        margin: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'flex-end',
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        margin: 5,
        width: width / 3 + 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteStyle: {
        padding: 10,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textStyle: {
        color: '#cc6699',
        fontSize: 20,
        padding: 10,
        marginHorizontal: 10,
    }
});
