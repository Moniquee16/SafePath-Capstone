import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './signup_styles.js';
import { signUp } from '../../utils/firebase.js';

export default function Signup({ setShowSignup, setCurrentUser }) {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const signUpHandler = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      alert('Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(email, password, fullName);
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setCurrentUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || fullName,
        isAdmin: false,
      });
    } catch (e) {
      alert('Registration failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={['#1e3a8a', '#1e40af', '#3b82f6']}
      style={styles.Main}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.scrollContainer}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View style={styles.brandContainer}>
              <View style={styles.brandIcon}>
                <Text style={{ fontSize: 16 }}>🛡️</Text>
              </View>
              <Text style={styles.brandText}>SafePaths</Text>
            </View>
            <View style={styles.officialBadge}>
              <Text style={styles.officialText}>OFFICIAL</Text>
            </View>
          </View>

          <View style={styles.taglineContainer}>
            <Text style={styles.taglineMain}>Ligtas ang{'\n'}Marulas 🚨</Text>
            <Text style={styles.taglineSubtext}>Your community flood safety guide</Text>
          </View>
        </View>

        {/* Signup Card */}
        <View style={styles.signupCard}>
          <Text style={styles.signupTitle}>Create Account</Text>
          <Text style={styles.signupSubtitle}>Join SafePath community</Text>

          {/* Full Name Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Feather name="user" size={16} color="#9ca3af" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="John Doe" 
                placeholderTextColor="#d1d5db"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={16} color="#9ca3af" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="you@email.com" 
                placeholderTextColor="#d1d5db"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={16} color="#9ca3af" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="••••••••" 
                placeholderTextColor="#d1d5db" 
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Text style={styles.showText}>Show</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={16} color="#9ca3af" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="••••••••" 
                placeholderTextColor="#d1d5db" 
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
                <Text style={styles.showText}>Show</Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator size="small" color="#1e40af" style={styles.loadingIndicator} />
          ) : (
            <>
              {/* Create Account Button */}
              <TouchableOpacity onPress={signUpHandler}>
                <View style={styles.signupButton}>
                  <Text style={styles.signupButtonText}>Create Account</Text>
                </View>
              </TouchableOpacity>

              {/* Back to Login Link */}
              <View style={styles.signupRow}>
                <Text style={styles.signupText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => setShowSignup(false)}>
                  <Text style={styles.signupLink}>Login →</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}