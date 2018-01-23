import React from 'react';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount(){
        this.refs.message.focus();
    }

    sendMessage() {
        if (this.props.onChange) {
            this.props.onChange(this.refs.message.value);
            this.refs.message.value = '';
        }
    }

    logout(e) {
        console.log(e);
        if (this.props.logout) {
            this.props.logout();
        }
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    }

    render() {
        console.log(this.props);
        return (
            <div className="container">
                <div className="chat-box">
                    {
                        this.props.messages.constructor === Array &&
                        this.props.messages.map(message => {
                            if (message.isServer) {
                                return (
                                    <p key={message.key} className="info-message">
                                        { message.time + ' *** ' } <span>{ message.text }</span>
                                    </p>
                                )
                            }
                            return (
                                <p key={message.key}>
                                    { message.time + ' <' + message.author + '> ' } <span>{ message.text }</span>
                                </p>
                            );
                        })
                    }
                </div>
                <div className="control-box">
                    <input name="message"
                           type="text"
                           ref="message"
                           onKeyPress={ e => { this.onKeyPress(e) } }/>
                    <button className="button raised-button" onClick={ e => this.sendMessage() }>Send</button>
                    <button className="button raised-button" onClick={ e => this.logout() }>Log out</button>
                </div>
            </div>
        );
    }
}