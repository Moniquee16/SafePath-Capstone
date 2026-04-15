import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createStyles } from './signup_styles.js';
import { signUp } from '../../utils/firebase.js';
import { useTheme } from '../../utils/ThemeContext';

export default function Signup({ setShowSignup, setCurrentUser }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
      colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
      style={styles.Main}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
        
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
                placeholderTextColor={theme.colors.inputPlaceholder}
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
                placeholderTextColor={theme.colors.inputPlaceholder}
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
                placeholderTextColor={theme.colors.inputPlaceholder} 
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
                placeholderTextColor={theme.colors.inputPlaceholder} 
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
      </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}