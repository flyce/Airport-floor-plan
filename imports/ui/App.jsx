import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Sidebar from './Sidebar';

import List from './List.jsx';
import Draw from './Draw.jsx';
import User from './User.jsx';

const styles = {
    wrapper: {
        // Avoid IE bug with Flexbox, see #467
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#edecec',
    },
    body: {
        marginTop: 64,
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
    },
    bodySmall: {
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: '2em',
    },
    contentSmall: {
        flex: 1,
        paddingTop: '3em',
    },
    loader: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 16,
        zIndex: 1200,
    },
};

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div style={styles.wrapper}>
                    <div style={styles.main}>
                        <Sidebar title="主页"/>
                        <div className="body" style={styles.body}>
                            <div style={styles.content}>
                                {this.props.redirect === "Draw" ? <Draw /> : null}
                                {this.props.redirect === "List" ? <List /> : null}
                                {this.props.redirect === "User" ? <User /> : null}
                            </div>
                        </div>
                        {/* 右上加载 */}
                        {/*<CircularProgress*/}
                        {/*color="#fff"*/}
                        {/*size={30}*/}
                        {/*thickness={2}*/}
                        {/*style={styles.loader}*/}
                        {/*/>*/}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

PropTypes = {
    redirect: PropTypes.string.isRequired,
};
