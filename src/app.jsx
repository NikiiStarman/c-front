import React from 'react';
import Login from "./components/login";
import Chat from "./components/chat";
import '../scss/chat.scss';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { user: null, connected:false, messages: [] };
        this.startConnection();
        console.log(this);
    }

    startConnection(message) {
        this.connection = new WebSocket('ws://127.0.0.1:1337');
        this.connection.onopen = e => {
            console.log('connection.onopen');
            this.setState({connected: true});
            if(message) {
                this.sendMessage(message);
            }
        };
        this.connection.onclose = e => {
            console.log('connection.onclose');
            this.setState({connected: false});
        };
        this.connection.onmessage = message => {
            console.log(message);
            this.onMessage(JSON.parse(message.data))
        };
    }

    sendMessage(message) {
        if (!this.state.connected) {
            return this.startConnection(message);
        }
        console.log(this.connection);
        this.connection.send(message);
    }

    disconnect() {
        console.log('logout logout logout logout logout logout logout logout logout logout logout logout ');
        this.connection.close();
        this.setState({user: null, messages: []});
    }

    onMessage(data) {
        console.log(data);
        console.log(data.type);
        switch (data.type) {
            case 'message':
                this.updateMessages({
                    author: data.data.author,
                    text: data.data.text,
                    time: App.formattedTime(data.data.time)
                });
                break;
            case 'info':
                this.updateMessages({
                    isServer: true,
                    text: data.data.text,
                    time: App.formattedTime(data.data.time)
                });
                break;
            case 'user':
                this.setState({user: data.data});
                break;
            default:
                console.log('unknown');
        }
        console.log('app.jsx state ', this.state)
    }

    updateMessages(message) {
        this.setState({messages: [message].concat(this.state.messages)});
    }

    static formattedTime(time) {
        let date = new Date(time);
        let hours = date.getHours();
        let minutes = '0' + date.getMinutes();
        let seconds = '0' + date.getSeconds();
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }

    render() {
        console.log('app render');
        if(!this.state.user) {
            return (
                <Login onChange={(e) => this.sendMessage(e) }/>
            );
        }
        return (
            <Chat onChange={(e) => this.sendMessage(e) }
                  messages={this.state.messages}
                  logout={() => this.disconnect()}/>
        );
    }

}
