import React from 'react';
import {IconEnter} from "./svg/enter";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount(){
        this.refs.nickname.focus();
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.login();
        }
    }

    login() {
        if (this.props.onChange) {
            this.props.onChange(this.refs.nickname.value);
        }
    }

    render() {
        return (
            <div className="control-box">
                <input name="nickname"
                       type="text"
                       ref="nickname"
                       placeholder="Enter your nickname"
                       maxLength="10"
                       onKeyPress={ e => { this.onKeyPress(e) } }/>
                <button onClick={ e => this.login() }>
                    <span>Join</span>
                    <IconEnter/>
                </button>
                { this.props.error && <div className="error">{ this.props.error }</div> }
            </div>
        );
    }
}