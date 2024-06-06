import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { CircularButton } from '@/Components'
import { faCartShopping, faUtensils, faPhone, faMoneyBill, faSackDollar, faBellConcierge } from '@/Components'

export type RootStackParamList = {
    Home: undefined
    Settings: undefined
    NumberInputModal: { category: string, type: string }
    AddRecord: undefined
};
  
export type AddRecordScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddRecord'
>

export const AddRecordScreen = () => {
    const [isExpense, setIsExpense] = useState(true)
    const navigation = useNavigation<AddRecordScreenNavigationProp>()

    const handleNavigation = (category: string) => {
        navigation.navigate('NumberInputModal', { category: category, type: (isExpense ? 'out' : 'in') })
    }

    const expenseButtons = (
        <View style={styles.row}>
            <CircularButton 
                icon={faCartShopping}
                label="Shopping"
                onPress={() => handleNavigation("Shopping")}
            />
            <CircularButton 
                icon={faUtensils}
                label="Food"
                onPress={() => handleNavigation("Food")}
            />
            <CircularButton 
                icon={faPhone}
                label="Telephone"
                onPress={() => handleNavigation("Telephone")}
            />
        </View>
    )

    const incomeButtons = (
        <View style={styles.row}>
            <CircularButton 
                icon={faMoneyBill}
                label="Salary"
                onPress={() => handleNavigation("Salary")}
            />
            <CircularButton 
                icon={faSackDollar}
                label="Investments"
                onPress={() => handleNavigation("Investments")}
            />
            <CircularButton 
                icon={faBellConcierge}
                label="Part-time"
                onPress={() => handleNavigation("Part-time")}
            />
        </View>
    )

    return (
        <View style={styles.container}>
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                style={[styles.toggleButton, isExpense && styles.activeButton]}
                onPress={() => setIsExpense(true)}
                >
                <Text style={[styles.toggleButtonText, isExpense && styles.activeButtonText]}>Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.toggleButton, !isExpense && styles.activeButton]}
                onPress={() => setIsExpense(false)}
                >
                <Text style={[styles.toggleButtonText, !isExpense && styles.activeButtonText]}>Income</Text>
                </TouchableOpacity>
            </View>
            {isExpense ? expenseButtons : incomeButtons}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    toggleButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    activeButton: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    toggleButtonText: {
        fontSize: 16,
        color: '#000',
    },
    activeButtonText: {
        color: '#fff',
    },
});