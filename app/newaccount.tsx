import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const NewAccount: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    // Ελέγχει αν υπάρχουν δεδομένα σε όνομα και κωδικό και ενεργοποιεί το κουμπί
    setIsSubmitDisabled(!(username && password));
  }, [username, password]);

  const showForm = (service: string) => {
    setCurrentForm(service);
    setUsername('');
    setPassword('');
    setResultMessage(null);
  };

  const submitForm = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password.');
      return;
    }

    try {
      setResultMessage('Loading...');
      const response = await axios.post('http://192.168.1.84:8081/api/save', {
        service: currentForm,
        username,
        password,
      });

      if (response.data.status === 'success') {
        setResultMessage(`Data saved successfully for ${currentForm}`);
      } else {
        setResultMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      setResultMessage(`Error: ${(error as Error).message}`);
    } finally {
      // Καθαρίζει τη φόρμα
      setUsername('');
      setPassword('');
      setIsSubmitDisabled(true); // Απενεργοποιεί ξανά το κουμπί
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Επιλογή Παρόχου:</Text>
      <View style={styles.menu}>
        <TouchableOpacity style={[styles.serviceButton, styles.cosmoteButton]} onPress={() => showForm('cosmote')}>
          <Text style={styles.buttonText}>Cosmote</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.serviceButton, styles.deiButton]} onPress={() => showForm('dei')}>
          <Text style={styles.buttonText}>ΔΕΗ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.serviceButton, styles.deyapButton]} onPress={() => showForm('deyap')}>
          <Text style={styles.buttonText}>ΔΕΥΑΠ</Text>
        </TouchableOpacity>
      </View>

      {currentForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Login to {currentForm === 'cosmote' ? 'Cosmote' : currentForm === 'dei' ? 'ΔΕΗ' : 'ΔΕΥΑΠ'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={[styles.submitButton, isSubmitDisabled && styles.disabledButton]}
            onPress={submitForm}
            disabled={isSubmitDisabled}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {resultMessage && <Text style={styles.resultMessage}>{resultMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  menu: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  serviceButton: { padding: 15, borderRadius: 25, alignItems: 'center', flex: 1, marginHorizontal: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cosmoteButton: { backgroundColor: '#78be20' },
  deiButton: { backgroundColor: '#003366' },
  deyapButton: { backgroundColor: '#0072bc' },
  formContainer: { marginBottom: 20, padding: 20, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },
  formTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10, marginBottom: 20, backgroundColor: '#f9f9f9' },
  resultMessage: { marginTop: 20, fontSize: 16, color: '#333' },
  submitButton: { marginTop: 20, alignSelf: 'center', alignItems: 'center', width: 200, padding: 15, backgroundColor: '#37B7C3', borderRadius: 25 },
  disabledButton: { backgroundColor: '#cccccc' },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default NewAccount;