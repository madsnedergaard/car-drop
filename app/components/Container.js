const Container = props => {
    return (
        <View style={styles.container}>
            <Title h2>{props.title}</Title>
            <Button title="Go to Details" onPress={() => this.props.navigation.navigate('Settings')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch'
    }
});
