import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Users } from '../api/users.js';

class Test extends Component {
    test() {
        console.log(this.props.users);

    }
    render() {
        return (
            <div>
                {this.test()}
                {console.log("hello")}
            </div>
        );
    }
}

Test.propTypes = {
    users: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        users: Users.find().fetch(),
    };
}, Test);

