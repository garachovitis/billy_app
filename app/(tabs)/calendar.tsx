import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Λήψη διαστάσεων οθόνης
const { width } = Dimensions.get('window');

export default function App() {
  const onDayPress = (day: { dateString: string; day: number; month: number; year: number }) => {
    console.log('Selected day:', day);
  };

  return (
    <View style={styles.container}>
      <Calendar
        // Αρχικές ρυθμίσεις του ημερολογίου
        onDayPress={onDayPress}
        // Προσαρμογή για κάποια επιλεγμένη ημερομηνία
        markedDates={{
          '2024-10-15': { selected: true, marked: true, selectedColor: '#37B7C3' },
        }}
        // Θέμα για το ημερολόγιο σύμφωνα με την χρωματική παλέτα
        theme={{
          selectedDayBackgroundColor: '#37B7C3',
          todayTextColor: '#3b8193',
          dayTextColor: '#071952',
          arrowColor: '#3b8193',
          monthTextColor: '#071952',
          indicatorColor: '#37B7C3',
          textSectionTitleColor: '#3b8193',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        // Style για να ταιριάζει στην οθόνη του κινητού
        style={styles.calendar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  calendar: {
    width: width * 0.9, // Προσαρμογή στο 90% του πλάτους της οθόνης
    borderRadius: 10,   // Προσθήκη γωνιών για πιο όμορφη εμφάνιση
    elevation: 3,       // Σκίαση για καλύτερη οπτική (Android)
    shadowColor: '#000', // Σκίαση (iOS)
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});