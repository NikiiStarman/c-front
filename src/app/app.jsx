import React from 'react';
import Login from "./components/login";
import Chat from "./components/chat";

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { user: null, connected: false, messages: [], error: null };
        this.messageCount = 0;
        this.startConnection();
        console.log(this);
    }

    startConnection(message) {
        this.connection = new WebSocket('ws://127.0.0.1:1337');
        this.connection.onopen = e => {
            console.log('connection.onopen');
            this.setState({connected: true, error: null});
            if(message) {
                this.sendMessage(message);
            }
        };
        this.connection.onclose = e => {
            console.log('connection.onclose');
            console.log(e);
            let errorMessage = 'Disconnected';
            switch (e.code) {
                case 1006:
                    errorMessage = 'Server unavailable';
                    break;
                case 4000:
                    errorMessage = 'Disconnected by the server due to inactivity';
                    break;
            }

            this.setState({ user: null, connected: false, messages: [], error: errorMessage });
        };
        this.connection.onmessage = message => {
            console.log(message);
            this.onMessage(message.data);
        };
        this.connection.onerror = error => {
            console.log(error);
            this.setState({ user: null, connected: false, messages: [], error: 'Connection error' });
        };
        console.log('app.jsx state ', this.state)
    }

    sendMessage(message) {
        if (!this.state.connected) {
            return this.startConnection(message);
        }
        console.log(this.connection);
        this.setState({error: null});
        this.connection.send(message);
    }

    disconnect() {
        this.connection.close();
        this.setState({user: null, messages: [], error: null});
    }

    onMessage(json) {
        console.log(json);
        let data;
        if(json) {
            try {
                data = JSON.parse(json);
            } catch(e) {
                console.log(e);
                return;
            }
        }
        console.log(data.type);
        switch (data.type) {
            case 'message':
                this.updateMessages({
                    key:    (this.messageCount++).toString(),
                    author: data.data.author,
                    text:   data.data.text,
                    time:   App.formattedTime(data.data.time)
                });
                break;
            case 'info':
                this.updateMessages({
                    key:        (this.messageCount++).toString(),
                    isServer:   true,
                    text:       data.data.text,
                    time:       App.formattedTime(data.data.time)
                });
                break;
            case 'user':
                this.setState({user: data.data, error: null});
                break;
            case 'error':
                this.setState({error: data.text});
                break;
            default:
                console.log('unknown');
        }
        console.log('message count', this.messageCount);
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
        if (this.state.error) {

        }
        if(!this.state.user) {
            return (
                <Login onChange={(e) => this.sendMessage(e) }
                       error={ this.state.error }/>
            );
        }
        return (
            <Chat onChange={(e) => this.sendMessage(e) }
                  messages={this.state.messages}
                  error={ this.state.error }
                  logout={() => this.disconnect()}/>
        );
    }

}
