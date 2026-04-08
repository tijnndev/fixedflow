import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { biometricService } from '../services/biometric';

interface BiometricLockProps {
  children: React.ReactNode;
}

export const BiometricLock: React.FC<BiometricLockProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [biometricType, setBiometricType] = useState('Biometric');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkBiometric();
  }, []);

  const checkBiometric = async () => {
    try {
      const enabled = await biometricService.isEnabled();
      
      if (!enabled) {
        // Biometric not enabled, allow access
        setIsAuthenticated(true);
        setIsChecking(false);
        return;
      }

      const available = await biometricService.isAvailable();
      if (!available) {
        // Biometric was enabled but not available anymore
        setIsAuthenticated(true);
        setIsChecking(false);
        return;
      }

      const type = await biometricService.getBiometricTypeName();
      setBiometricType(type);
      
      // Prompt for authentication
      await authenticate();
    } catch (error) {
      console.error('Error checking biometric:', error);
      setIsAuthenticated(true);
      setIsChecking(false);
    }
  };

  const authenticate = async () => {
    try {
      setError(null);
      const success = await biometricService.authenticate(
        `Unlock FixedFlow with ${biometricType}`
      );
      
      if (success) {
        setIsAuthenticated(true);
      } else {
        setError('Authentication failed');
      }
      setIsChecking(false);
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication error occurred');
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.text}>Checking authentication...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Ionicons name="lock-closed" size={80} color="#2563eb" />
        <Text style={styles.title}>FixedFlow is Locked</Text>
        <Text style={styles.subtitle}>Authenticate to continue</Text>
        
        {error && <Text style={styles.error}>{error}</Text>}
        
        <TouchableOpacity style={styles.button} onPress={authenticate}>
          <Ionicons name="finger-print" size={24} color="#fff" />
          <Text style={styles.buttonText}>Authenticate with {biometricType}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  error: {
    fontSize: 14,
    color: '#dc2626',
    marginTop: 16,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
