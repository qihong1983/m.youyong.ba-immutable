import React, { Component } from 'react'
import Link from 'next/link'
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import NProgress from 'nprogress';
import { connect } from 'react-redux';
// import * as actionCreators from '../../actions/About/index';


import Head from '../components/head';
import { Map,Marker,MouseTool, InfoWindow,ToolBar,Scale} from 'react-amap';
const mapKey = "2f3edc37997b0b5fd688915d6d617e50";
var newMap = null;//保存地图create中返回到实例
let queryAll  = {};//保存传参

class Test extends Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    if (isServer == false) {
      NProgress.start();
    }
    // queryAll = query;
    // let params = {
    //   limit: 10,
    //   offset: 1
    // }
    // await store.dispatch(actionCreators.getTables(params));
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      minHeight: '300px',
      zoom:16,//放大倍数
      longitude: 0,//经度
      latitude: 0,//纬度
      areaPage:1,//地图点击联想附近建筑
      areaList:[],//点击地图，获得的地区
      refreshing:false,
      isData:true, //false显示无数据样式
      areaIdx:0,
    }
  }
  componentWillMount() {

  }
  componentDidMount() {
    if (document != undefined) {
      NProgress.done();
    }


    let query = this.props.router.query;
    queryAll.lat = query.lat;
    queryAll.lng = query.lng;
  }
  checkLi(idx){
    let location = this.state.areaList[idx];
    let that = this;
    this.setState({
      areaIdx:idx,
      longitude: location.longitude,
      latitude: location.latitude,
    },function(){
      that.confirm();
      //地图上标点定位
      // newMap.setCenter([location.longitude,location.latitude]);
    })
  }
  renderUl(){
    var arr = [];
    if(this.state.isData){
      this.state.areaList.map(function(val,idx){
        arr.push(
          <li className="area_ul_li" key={idx} onClick={this.checkLi.bind(this,idx)}>  
            <div className="area_ul_li_left">
              <p className="area_ul_li_left_name">{val.areaName}</p>
              <p className={`area_ul_li_left_address ${val.addr ? '' : 'area_ul_li_left_noAddress' }`}>{val.addr}</p>
            </div>
            {/* 留着 */}
            {/* <div className="area_ul_li_right">
              <div className={`${this.state.areaIdx===idx ? 'area_ul_li_right_circle' : '' }`}></div>
            </div> */}
          </li>
        )
      }.bind(this))
    }else{
      arr.push(
        <li className="area_ul_liNo" key="noData">  
          <div className="area_ul_li_noData">暂无数据</div>
        </li>
      )
    }
    return arr;
  }
  //拿cookie
  getCookie(cookie_name){ 
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度
    // 如果找到了索引，就代表cookie存在，
    // 反之，就说明不存在。
    if (cookie_pos != -1)
    {
      // 把cookie_pos放在值的开始，只要给值加1即可。
      cookie_pos += cookie_name.length + 1;    
      var cookie_end = allcookies.indexOf(";", cookie_pos);
      if (cookie_end == -1)
      {
          cookie_end = allcookies.length;
      }
      var value = unescape(allcookies.substring(cookie_pos, cookie_end));
    }
    return value;
  }
  //点击地图获取周围地名
  getArea(that,lat,lng,pageIdx,isFresh){ //isFresh:true是下拉刷新，undefined是点击地图获取
    AMap.plugin('AMap.Geocoder', function() {
      var geocoder = new AMap.Geocoder({
        extensions: "all",
        radius: 2000,
        pageIndex:1
      })
      geocoder.getAddress([lng,lat], function(status, result) {
        let isData = false;
        let areaList = [];
        if (status === 'complete' && result.info === 'OK') {
          console.log(result)
          let pois = result.regeocode.pois;
          let addressCompos = result.regeocode.addressComponent
          areaList = pois.map((val,idx)=>{
              var obj={};
              obj.addr = val.address;
              obj.area_code = addressCompos.adcode;
              obj.city = addressCompos.city ? addressCompos.city : addressCompos.province;
              obj.county = addressCompos.district;
              obj.latitude = val.location.lat;
              obj.longitude = val.location.lng;
              obj.name = addressCompos.township+addressCompos.street+addressCompos.streetNumber;
              obj.province = addressCompos.province;
              obj.areaName = val.name;
              return obj;
            })
          isData = true;
        }
        that.setState({
          areaList:areaList,
          isData:isData,
          areaPage:1,
        })
      })
    })
  }
  async confirm(){ //地图获取信息完成
    var data = this.state;  
    var msg = data.areaList[data.areaIdx];
    var urlProps= this.props.router.query;
    var  type = urlProps.type;
    var id = urlProps.id;
    await this.props.actionMaps.setMaps(msg);//存地图信息
    if (type == "custormer") {
      if(id != "undefined") {
        this.props.router.push(`/crmCustormer/createCustormer?id=${id}&custormerid=${urlProps.custormerid}&name=${urlProps.name}`);//编辑客户
      } else {
        this.props.router.push(`/crmCustormer/createCustormer?custormerid=${urlProps.custormerid}&name=${urlProps.name}`);  //新建客户                      
      }
    }else if(type == "contact"){
      if(id != "undefined") {
        this.props.router.push(`/crmCustormer/createContact?id=${id}&custormerid=${urlProps.custormerid}&name=${urlProps.name}`); //编辑联系人
      } else {
        this.props.router.push(`/crmCustormer/createContact?custormerid=${urlProps.custormerid}&name=${urlProps.name}`);//新建联系人
      }
    }
  }
  render() {
    var that = this;
    let plugins = [
      {
        name: 'ToolBar',
        options: {
          visible: true,  // 不设置该属性默认就是 true
          locate:true,
          noIpLocate: true,
          autoPosition: true,
          onCreated() {
          }
        },
      }
    ]
    let mapEvent={
      click(e){
        let lat = e.lnglat.lat;
        let lng = e.lnglat.lng;
        
        that.getArea.call(null,that,lat,lng,1); //this指向，that,经度，纬度，page
        that.setState({ 
          longitude: lng,
          latitude: lat,
          areaIdx:0,
        },function(){ 
          newMap.setCenter([that.state.longitude, that.state.latitude]);
        })
      },
      created(instance){
        newMap = instance;
        instance.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 100,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            extensions:'all'
          });
          // Map.addControl(geolocation);
          geolocation.getCurrentPosition(function(status,result){
            //如果url参数有，就显示参数定定位置
            if(queryAll.lat){
              that.setState({ 
                longitude: queryAll.lng,
                latitude: queryAll.lat,
              },function(){
                //地图加zoom cneter
                instance.setZoom(that.state.zoom);
                instance.setCenter([queryAll.lng, queryAll.lat]);
              })
              //搜索
              that.getArea(that,queryAll.lat,queryAll.lng,1);
              return;
            }
            //参数没有，获取
            if(status=='complete'){
              var lng = result.position.getLng();
              var lat = result.position.getLat();
              that.setState({ 
                longitude: lng,
                latitude: lat,
              },function(){
                //地图加zoom cneter
                instance.setZoom(that.state.zoom);
                instance.setCenter([that.state.longitude, that.state.latitude]);
              })
              //搜索
              that.getArea(that,lat,lng,1);
            }else{
              that.setState({
                isData:false,
                }
              )
            }
          });
        });
      }
    }
    return (
      <div className="Maps" >
        <Head  />
        <div className="mapDiv" id="mapId">
          <Map 
            id="mapDom"
            amapkey={mapKey} 
            // zoom={this.state.zoom} 
            // center={[this.state.longitude, this.state.latitude]}
            events={mapEvent} //绑定事件
            plugins={plugins} //加控件
          >
            <Marker position={[this.state.longitude,this.state.latitude]} ></Marker>
            <MouseTool />
          </Map>
        </div>
        <div className="area">
          <ul className="area_ul">
              {this.renderUl()}
          </ul>
        </div>
        <style global jsx>{`
          html,body,#__next,.Maps{
            height:100%;
          }
          // 地图样式重制
          .amap-logo{
            display:none !important;
          }
          .amap-copyright{
            display:none !important;
          }
          //列表
          .area_ul{
            padding: 0 1.6rem;
            overflow-y:auto;
          } 
          .area_ul_li{
            padding:1.2rem 0;
            display:flex;
            align-items:center;
          }
          .area_ul_liNo{
            padding:1.2rem 0;
          }
          .area_ul_li_left{
            flex:1;
            word-wrap: break-word;
            max-width: 100%;
          }
          .area_ul_li_right{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            border: .1rem solid #3BC0A6;
            margin-left: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .area_ul_li_right_circle{
            width: .6rem;
            height: .6rem;
            background-color: #3BC0A6;
            border-radius: 50%;
          }
          .area_ul_li_left_name{
            color: #383842;
            font-size:1.6rem;
            font-weight:bold;
            line-height:1.6rem;
          }
          .area_ul_li_left_address{
            color: #929292;
            font-size: 1.4rem;
            line-height:1.4rem;
            padding-top:.6rem;
          }
          .area_ul_li_left_noAddress{
            padding-top:0;
          }
          .area_ul_li_noData{
            font-size:1.6rem;
            text-align:center;
          }
          .area{
            height:calc(100% - 28rem);
            overflow-y:auto;
          }
        `}</style>
        <style jsx>{`
          .Maps{
            display:flex;
            flex-direction:column;
          }
          .nav{
            height:4rem;
            line-height:4rem;
            background-color:#fff;
            display:flex;
            justify-content:center;
            align-items:center;
          }
          .nav_span{
            flex:1;
            color:blue;
            text-align:center;
          }
          .mapDiv{
            height:28rem;
          }
        `}</style>
      </div>
    )
  }
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
    return {
    //   Maps: state.get('Maps')
    }
  };
  
  //将action的所有方法绑定到props上
  const mapDispatchToProps = (dispatch, ownProps) => {
    //全量
    // return bindActionCreators(actionCreators, dispatch);
    // return { actionMaps: bindActionCreators(actionMaps, dispatch) }
  };
  // Home = connect()(Home);
  Test = connect(mapStateToProps, mapDispatchToProps)(Test);
  export default withRouter(Test);