import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Square from "./square.component";
import { connect } from 'react-redux';

function GameBoard(props) {

    let time = 60;
    const [timeLeft, setTimeLeft] = useState(time);

    useEffect(() => {
        if (!timeLeft) return
        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000) // every 1 second

        return () => clearInterval(timerId)
    }, [timeLeft])

    return (
        <View style={styles.container}>
            <Text>raiesbo's first APP!</Text>
            <Text>{timeLeft}</Text>
            <Text>{props.score}</Text>
            <View style={styles.game}>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    game: {
        flexDirection: "row",
        flexWrap: 'wrap',
        width: 300,
    }
});


const mapStateToProps = state => {
    return {
        score: state.score
    }
}

export default connect(mapStateToProps)(GameBoard)