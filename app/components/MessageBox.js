 
'use strict';  
import React, { Component } from 'react';  
import {  
  View,  
  Text,  
  Image,  
  Modal,  
  Navigator,  
  TextInput,  
  ScrollView,  
  StyleSheet,  
  Dimensions,  
  TouchableHighlight,  
} from 'react-native'; 

import TipDataDao from '../dao/TipDataDao';
import UserDataDao from '../dao/UserDataDao'

var { width, height, scale } = Dimensions.get('window');  
// 类  
export default class MessageBox extends Component {  
  // 构造函数  
  constructor(props) {  
    super(props);  
    this.state = {  
      show:false,
      tiplist:null,
      tipTitle:'',
      tipContent:'',
      idx:0,
      nextBtnTitle:'下一个',
      tipId:null,
    };  
  }  
  
  // 加载完成  
  componentDidMount(){  
   	this.getUserInfor();
  }
  
  getUserInfor(){
    UserDataDao.getUser().then((res)=> {
    	if(res){
    		this.getMyTip(res.id);
    	}
    }).catch((error)=> {
    });
  }
  
  getMyTip(userId){
	TipDataDao.getTip(userId).then((res)=> {	 	
	 	if(res&&res.list2&&res.list2.length>0){
	 		var nextBtnTtitle = res.list2.length==1?'确定':'下一个';
	    	this.setState({
				show: true,
				tiplist: res.list2,
				tipTitle:res.list2[0].title,
				tipContent:res.list2[0].content,
				nextBtnTitle:nextBtnTtitle,
				tipId:res.list2[0].id,
			});
	    }
   	}).catch((error)=> {       	
    });
  }
  
  // view卸载  
  componentWillUnmount(){  
    //  
  }  
  
  // 自定义方法区域  
  // your method  
  _leftButtonClick() {  
  
  }  
  _rightButtonClick() {
  	this._updateTipRead(this.state.tipId);
  	
  	var currentIdx = this.state.idx;
  	var tiplist = this.state.tiplist;
   	if(currentIdx+1==tiplist.length){
    	this._setModalVisible();  
    	return;
   	}
   	
   	var nextTip = tiplist[currentIdx+1];
   	var nextBtnTtitle = currentIdx+2==tiplist.length?'确定':'下一个';
   	this.setState({
		show: true,
		idx: currentIdx+1,
		tipTitle:nextTip.title,
		tipContent:nextTip.content,
		nextBtnTitle:nextBtnTtitle,
		tipId:nextTip.id,
	});
  }
  
  _updateTipRead(id){
  	TipDataDao.readTip(id).then((res)=> {
   	}).catch((error)=> {       	
    });
  }
  
  // 显示/隐藏 modal  
  _setModalVisible() {  
    let isShow = this.state.show;  
    this.setState({  
      show:!isShow,  
    });  
  }  
  
  // 绘制View  
  render() {  
     return (     
         <Modal  
           animationType={'fade'}
           transparent={true}  
           visible={this.state.show}  
           onShow={() => {}}  
           onRequestClose={() => {}} >  
           <View style={styles.modalStyle}>  
             <View style={styles.subView}>  
               <Text style={styles.titleText}>  
                 {this.state.tipTitle}  
               </Text>  
               <Text style={styles.contentText}>  
                 {this.state.tipContent}  
               </Text>  
               <View style={styles.horizontalLine} />  
               <View style={styles.buttonView}>  
                 <View style={styles.verticalLine} />  
                 <TouchableHighlight underlayColor='transparent'  
                   style={styles.buttonStyle}  
                   onPress={this._rightButtonClick.bind(this)}>  
                   <Text style={styles.buttonText}>  
                     {this.state.nextBtnTitle}  
                   </Text>  
                 </TouchableHighlight>  
               </View>  
             </View>  
           </View>  
        </Modal>
     );  
  }  
}

// Modal属性  
// 1.animationType bool  控制是否带有动画效果  
// 2.onRequestClose  Platform.OS==='android'? PropTypes.func.isRequired : PropTypes.func  
// 3.onShow function方法  
// 4.transparent bool  控制是否带有透明效果  
// 5.visible  bool 控制是否显示  

// css样式  
var styles = StyleSheet.create({  
  container:{  
    flex:1,  
    backgroundColor: '#ECECF0',  
  },  
  // modal的样式  
  modalStyle: {  
    // backgroundColor:'#ccc',  
    alignItems: 'center',  
    justifyContent:'center',  
    flex:1,  
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },  
  // modal上子View的样式  
  subView:{  
    marginLeft:60,  
    marginRight:60,  
    backgroundColor:'#fff',  
    alignSelf: 'stretch',  
    justifyContent:'center',  
    borderRadius: 10,  
    borderWidth: 0.5,  
    borderColor:'#ccc',  
  },  
  // 标题  
  titleText:{  
    marginTop:10,  
    marginBottom:5,  
    fontSize:16,  
    fontWeight:'bold',  
    textAlign:'center',  
  },  
  // 内容  
  contentText:{  
    margin:8,  
    fontSize:14,  
    textAlign:'center',  
  },  
  // 水平的分割线  
  horizontalLine:{  
    marginTop:5,  
    height:0.5,  
    backgroundColor:'#ccc',  
  },  
  // 按钮  
  buttonView:{  
    flexDirection: 'row',  
    alignItems: 'center',  
  },  
  buttonStyle:{  
    flex:1,  
    height:44,  
    alignItems: 'center',  
    justifyContent:'center',  
  },  
  // 竖直的分割线  
  verticalLine:{  
    width:0.5,  
    height:44,  
    backgroundColor:'#ccc',  
  },  
  buttonText:{  
    fontSize:16,  
    color:'#3393F2',  
    textAlign:'center',  
  },  
});  