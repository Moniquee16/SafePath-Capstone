import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createStyles } from './login_styles.js';
import { signIn } from '../../utils/firebase.js';
import { useTheme } from '../../utils/ThemeContext';

export default function Login({ setShowSignup, setShowAdmin, setCurrentUser, isAdminLogin = false }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const signInHandler = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const result = await signIn(email, password);
      setEmail('');
      setPassword('');

      setCurrentUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || 'User',
        isAdmin: isAdminLogin,
      });
    } catch (e) {
      alert('Sign-in failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Login Card */}
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>Welcome back!</Text>
          <Text style={styles.loginSubtitle}>Sign in to stay updated on road conditions</Text>

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
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}  
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Text style={styles.showText}>Show</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <View style={styles.forgotContainer}>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="small" color="#1e40af" style={styles.loadingIndicator} />
          ) : (
            <>
              {/* Sign In Button */}
              <TouchableOpacity onPress={signInHandler}>
                <View style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Sign In →</Text>
                </View>
              </TouchableOpacity>

              {/* Admin Button */}
              <TouchableOpacity 
                onPress={() => setCurrentUser({
                  uid: 'admin-user-001',
                  email: 'admin@marulas.gov',
                  displayName: 'Barangay Admin',
                  isAdmin: true,
                })}
              >
                <View style={styles.adminButton}>
                  <Text style={styles.adminButtonText}>🔐 Barangay Admin Login</Text>
                </View>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={styles.signupRow}>
                <Text style={styles.signupText}>Bagong residente? </Text>
                <TouchableOpacity onPress={() => setShowSignup(true)}>
                  <Text style={styles.signupLink}>Mag-register →</Text>
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