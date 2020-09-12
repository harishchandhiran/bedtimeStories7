import React from 'react'
import { View, 
        TextInput, 
        TouchableOpacity, 
        Text, 
        Image, 
        Alert, 
        ScrollView } from 'react-native'
import { Header } from 'react-native-elements'
import db from '../config';

export default class ReadScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            inputSearch: '',
            search: '',
            searchedTitle: '',
            searchedAuthor: '',
            searchedStory: '',
            allStories: [],
        }
    }

    SearchFilter = async () => {
        this.setState({ search: this.state.inputSearch })
        const storyRef = db.collection("stories").where("title","==",this.state.search).get();
        var story = "";
        if(storyRef.docs.length===0){
            Alert.alert("","There is no such story with that title");
        }
    }

    componentDidMount = async () => {
        const query = await db.collection("stories").get()
        query.docs.map((doc) => {
            this.setState({ 
                allStories: [ ...this.state.allStories,doc.data() ]
            })
        })
    }

    render(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
        dd = '0' + dd;
        }
        if (mm < 10) {
        mm = '0' + mm;
        }
        today = dd + '-' + mm + '-' + yyyy;
        return (
            <View>
                <Header
                    backgroundColor={'orange'}
                    centerComponent={{
                        text: 'Bedtime Stories',
                        style: { color: 'white', 
                                fontSize: 20 },
                    }}
                    leftComponent={{
                        text: today,
                        style: { color: 'white', 
                                fontSize: 13 },
                    }}
                />
                <View style={{ flexDirection: 'row',marginTop: 5 }}>
                    <TextInput style={{ width: '87%',
                                        height: 50,
                                        backgroundColor: 'white',
                                        borderWidth: 5,
                                        borderColor: 'orange',
                                        color: 'black',
                                        paddingLeft: 20,
                                        fontSize: 18 }}
                                placeholder="Search Here"
                                onChangeText={text=>
                                this.setState({ inputSearch: text })} />
                    <TouchableOpacity onPress={async()=>{this.SearchFilter()}}>
                    <Image
                    source={require("../assets/search.jpg")}
                    style={{width:50, height: 50}}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ backgroundColor: '#e75480' }}>
                    { 
                    this.state.allStories.map((stories) => {
                        //Return a view which contains one item in a list.
                        return (
                        <View style={{ borderBottomWidth: 2,
                                    marginTop: 15,
                                    borderTopWidth: 2,
                                    backgroundColor: '#fed8b1' }}>
                            <Text style={{paddingLeft: 25}}>
                                {"Title: " + stories.title }
                            </Text>
                            <Text style={{paddingLeft: 25}}>
                                {"Author: " + stories.author}
                            </Text>
                        </View>
                        );
                    })
                    }
                </ScrollView>
            </View>
        )
    }
}

