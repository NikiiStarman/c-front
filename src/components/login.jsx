import React from 'react';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
    };

    login() {
        if (this.props.onChange) {
            this.props.onChange(this.refs.nickname.value);
        }
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.login();
        }
    }

    render() {
        return (
            <div className="control-box">
                <input name="nickname"
                       type="text"
                       ref="nickname"
                       placeholder="Enter your nickname"
                       onKeyPress={ e => { this.onKeyPress(e) } }/>
                <button className="button raised-button" onClick={ e => this.login() }>Join</button>

            </div>
        );
    }
}