// import React, { Component, PropTypes } from 'react';
// import {  Link } from 'react-router-dom';
// import { createContainer } from 'meteor/react-meteor-data';
// import SnackBar from './Component/SnackBar';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Toggle from 'material-ui/Toggle';
//
// export default class Test extends Component {
//     constructor(props) {
//         super(props);
//         this.state= ({
//             snackBarOpen: false,
//             snackBarInfo: '',
//         });
//     }
//
//     handleOpenSnackbar(info) {
//         this.setState({
//             snackBarOpen: true,
//             snackBarInfo: info,
//         });
//     }
//
//     handleToggle(event, toggled) {
//         if(toggled) {
//             this.handleOpenSnackbar("测试");
//         }
//     }
//
//     render() {
//         return (
//             <MuiThemeProvider>
//                 <div>
//                     <Toggle
//                         name="test"
//                         label="Simple"
//                         style={{marginBottom: 16}}
//                         onToggle={this.handleToggle.bind(this)}
//                     />
//                     <div style={{textAlign: 'center', color: "rgb(0, 188, 212)"}}>
//                         {/*{this.test()}*/}
//                         本页面用于测试数据库的 CURD<br />
//                         <Link  to="/" style={{color: "#ffffff"}}>回到主页</Link>
//                         <SnackBar open={this.state.snackBarOpen} info={this.state.snackBarInfo}/>
//                     </div>
//                 </div>
//
//             </MuiThemeProvider>
//         );
//     }
// }

