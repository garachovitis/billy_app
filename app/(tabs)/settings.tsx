import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import axios from 'axios';

const NewAccount: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  useEffect(() => {
    setIsSubmitDisabled(!(username && password && termsAccepted));
  }, [username, password, termsAccepted]);

  const showForm = (service: string) => {
    setCurrentForm(service);
    setUsername('');
    setPassword('');
    setResultMessage(null);
  };

  const openTermsAndConditions = async () => {
    const fileUri = `${FileSystem.documentDirectory}TermsAndConditions.pdf`;

    try {
      // Ελέγχουμε αν το αρχείο υπάρχει τοπικά, αλλιώς το κατεβάζουμε
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        await FileSystem.copyAsync({
          from: require('./TermsAndConditions.pdf'), // Ανοίγουμε από τον τοπικό φάκελο
          to: fileUri,
        });
      }

      // Άνοιγμα του PDF με το Linking API
      await Linking.openURL(fileUri);
    } catch (error) {
      Alert.alert("Error", "Could not open Terms and Conditions.");
    }
  };

  const submitForm = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password.');
      return;
    }

    try {
      setResultMessage('Loading...');
      const response = await axios.post('http://localhost:8082/api/save', {
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
      setUsername('');
      setPassword('');
      setIsSubmitDisabled(true);
      setTermsAccepted(false);
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

          {/* Checkbox για Αποδοχή Όρων */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)} style={styles.checkbox}>
              {termsAccepted && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={openTermsAndConditions}>
              <Text style={styles.termsText}>Αποδοχή όρων χρήσης</Text>
            </TouchableOpacity>
          </View>

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
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: '#333', alignItems: 'center', justifyContent: 'center', marginRight: 10, borderRadius: 10 },
  checkmark: { fontSize: 14, color: '#007bff' },
  termsText: { color: '#007bff', textDecorationLine: 'underline' },
});

export default NewAccount;