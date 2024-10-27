import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const categories = [
    { name: 'Οικία', icon: '🏠' },
    { name: 'Γραφείο', icon: '💼' },
    { name: 'Ξενοδοχείο', icon: '🏨' },
    { name: 'Εξοχική κατοικία', icon: '🏡' },
    { name: 'Αυτοκίνητο', icon: '🚗' },
    { name: 'Φοιτητικό Σπίτι', icon: '🏢' },

];

const Categories = () => {
    return (
        <View style={styles.container}>
            {categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryBox}>
                    <Text style={styles.icon}>{category.icon}</Text>
                    <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Ομοιόμορφη κατανομή χώρου μεταξύ των κουτιών
        padding: 10,
    },
    categoryBox: {
        width: '48%', // Δύο κουτάκια ανά σειρά
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    icon: {
        fontSize: 40,
        marginBottom: 10,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});

export default Categories;