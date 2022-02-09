import { StyleSheet, View, Text } from "react-native-web";

export default function EachClient({name, phone, company, email}) {
    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text>{phone}</Text>
            <Text>{company}</Text>
            <Text>{email}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 0
    }
})