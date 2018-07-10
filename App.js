
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput, TouchableOpacity, ScrollView,
  Text,
  View
} from 'react-native';
import { RSA, RSAKeychain } from 'react-native-rsa-native';// used library for encry and decryp.

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialMessage: '',
      sentMessage: '',
      decryptedMessage: '',
      encryptedMessage: '',
      publicKey: '',
      privateKey: ''
    }
  }

  sendMessage() {
    this.setState({
      sentMessage: this.state.initialMessage
    },()=>{
      // after setting state we are calling the function
      RSA.generate()
        .then(keys => {
          console.log(keys.private) // the private key
          console.log(keys.public) // the public key
          RSA.encrypt(this.state.sentMessage, keys.public)
            .then(encodedMessage => {
              this.setState({
                encryptedMessage: encodedMessage,
                publicKey: keys.public,
                privateKey: keys.public
  
              })
              RSA.decrypt(encodedMessage, keys.private)
                .then(message => {
                  console.log(message);
                  this.setState({
                    decryptedMessage: message
                  })
                })
            })
        })
    })
    }
//view function
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            onChangeText={(input) => { this.setState({ initialMessage: input }) }}
            underlineColorAndroid='transparent'
            style={{ borderWidth: 1, width: 300, marginLeft: 10, marginTop: 30 }}
          />
          <TouchableOpacity onPress={this.sendMessage.bind(this)}>
            <Text style={styles.text}>Send Message</Text>
          </TouchableOpacity>
          {/* <Text style={{ marginTop: 10 }}>Public Key : {this.state.publicKey}</Text>
          <Text style={{ marginTop: 10 }}>Private Key : {this.state.privateKey}</Text> */}
          <Text style={{ marginTop: 10, fontSize: 15 }}>Sent Message : {this.state.sentMessage}</Text>
          <Text style={{ marginTop: 10 }}>Encrypted Message : {this.state.encryptedMessage}</Text>
          <Text style={{ marginTop: 10, fontSize: 15 }}>Decrypted Message : {this.state.decryptedMessage}</Text>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    marginTop: 20,
    paddingVertical: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'blue'
  }
});
