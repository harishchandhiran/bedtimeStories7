import React from 'react'
import { KeyboardAvoidingView, 
        Image, 
        Text, 
        TextInput, 
        StyleSheet, 
        TouchableOpacity, 
        Alert } from 'react-native'
import * as firebase from 'firebase'

export default class LoginScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    Login = async(email,password) => {
        if(email && password){
            try{
                console.log("Login")
                const response = await firebase.auth()
                    .signInWithEmailAndPassword(email,password);
                if(response){
                    this.props.navigation.navigate('TabNavigator');
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        Alert.alert("","User not found");
                    console.log("doesn't exists");
                break;
                case 'auth/invalid-user':
                        Alert.alert("","Incorrect Email or password");
                    console.log("Invalid");
                }
            }
        }
        else {
            Alert.alert("Enter Email and password");
        }
    }

    render(){
        return (
            <KeyboardAvoidingView>
                <Image 
                    source = {require('../assets/bookIcon3.jpg')}
                    style={{width: 250,height:200,marginTop:50,alignSelf: 'center' }}/>
                <Text style={{ textAlign: 'center',fontSize: 30 }}>
                    Bedtime Stories
                </Text>
                <TextInput style={ styles.inputBox }
                     placeholder="Email Id" 
                     keyboardType="email-address"
                     onChangeText={(text)=>{this.setState({ email: text })}} 
                     value={this.state.email} />
                <TextInput style={ styles.inputBox } 
                     placeholder="password" 
                     keyboardType="visible-password"
                     securedTextEntry={true} 
                     onChangeText={(text)=>{this.setState({ password: text })}} 
                     value={this.state.password} />
                <TouchableOpacity onPress={async()=> {this.Login(this.state.email,this.state.password)}}
                                style={{ alignSelf: 'center', 
                                    alignItems: 'center',
                                    backgroundColor: 'limegreen',
                                    width: '50%',
                                    height: 30,
                                    paddingTop: 1,
                                    marginTop: 50, }}>
                    <Text style={{ color: 'white', fontSize: 20,fontWeight: 'bold' }}>
                        Log In
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        borderWidth: 3,
        marginTop: 30,
        width: '80%',
        alignSelf: 'center',
        paddingLeft: 5
    }
})