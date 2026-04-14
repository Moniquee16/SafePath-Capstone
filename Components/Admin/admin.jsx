import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './admin_styles.js';

export default function Admin({ setShowAdmin }) {
  return (
    <LinearGradient
      colors={['#0d47a1', '#1565C0', '#1e88e5']}
      style={styles.Main}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>SafePath</Text>
          <Text style={styles.tagline}>Barangay Marulas</Text>
        </View>

        {/* Admin Login Card */}
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>Admin Login</Text>
          <Text style={styles.loginSubtitle}>Restricted Access</Text>

          {/* Admin ID */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Admin ID</Text>
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter admin ID"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />
            </View>
          </View>

          {/* Login Button */}
          <LinearGradient
            colors={['#1e88e5', '#1565C0']}
            style={styles.loginButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </LinearGradient>

          {/* Back to User Login */}
          <View style={styles.signupRow}>
            <TouchableOpacity onPress={() => setShowAdmin(false)}>
              <Text style={styles.signupLink}>Back to User Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}