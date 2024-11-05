import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const spending = [
    {
        where: "NTUC",
        amt: 10
    },
    {
        where: "Food",
        amt: 8.30
    },
    {
        where: "Games",
        amt: 53.98
    }
]

function App() {
    const [count, setCount] = useState(false);
    const onPressMoneyCount = () => setCount(count + 1);

    var items = []
    for (var i = 0; i < spending.length; i++) {
        items.push(
            <View style={styles.item}>
                <Text style={{fontSize: 25}}>{spending[i].where}</Text>
                <Text style={{fontSize: 20, textAlign: 'right', flex:1}}>${spending[i].amt}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Today's Spending</Text>
            <TouchableOpacity onPress={onPressMoneyCount}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>${count || 0}</Text>
                </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginHorizontal: '3%', alignItems:'center'}}>
                <Text style={{fontSize: 50, flex: 5}}>Latest Spending</Text>
                <TouchableOpacity style={{textAlign: 'right', flex: 1, fontSize:20, padding: 20}}>
                    <Text style={{textAlign: 'right', fontSize:20}}>See More</Text>
                </TouchableOpacity>
            </View>
            {items}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#ECE2D0',
        padding: '1%',
        marginHorizontal: '3%',
        marginVertical: '0.5%',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems:'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#CEBEBE',
        // justifyContent: 'center',
    },
    button: {
        // alignItems: 'center',
        backgroundColor: '#ECE2D0',
        padding: 50,
        borderRadius: 16,
        marginHorizontal: '3%',
        marginVertical: '1%',
    },
    buttonText: {
        fontSize: 50,
    },
    alignRight: {
        alignSelf: 'flex-end'
    },  
    title: {
        fontSize: 65,
        marginHorizontal: '3%',
        marginTop: '1%',
    }
});

export default App;