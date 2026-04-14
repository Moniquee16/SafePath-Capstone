import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Modal, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createStyles } from './user_styles.js';
import { streets, getStatusColor, getStatusLabel } from '../../utils/streetData.js';
import { useTheme } from '../../utils/ThemeContext';

export default function UserDashboard({ user, setShowSignup, setCurrentUser }) {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const styles = createStyles(theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStreets, setFilteredStreets] = useState(streets);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('Filipino');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredStreets(streets);
    } else {
      const filtered = streets.filter(street =>
        street.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStreets(filtered);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowSignup(false);
  };

  const StreetCard = ({ item }) => (
    <View style={styles.streetCard}>
      <View style={styles.streetContent}>
        <Text style={styles.streetName}>{item.name}</Text>
        <Text style={styles.floodRiskText}>{item.floodRisk} Risk</Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) },
        ]}
      >
        <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
      style={styles.Main}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.topBar}>
            {/* Profile Avatar */}
            <TouchableOpacity 
              style={styles.profileAvatar}
              onPress={() => setShowSettings(true)}
            >
              <Text style={styles.avatarText}>
                {user?.displayName?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </TouchableOpacity>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Feather name="search" size={18} color="#9ca3af" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search street..."
                placeholderTextColor="#d1d5db"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
          </View>

          {/* Welcome Message */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome, {user?.displayName || 'User'}!</Text>
            <Text style={styles.welcomeSubtitle}>Road Status in Marulas</Text>
          </View>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <LinearGradient
            colors={['#e0e7ff', '#c7d2fe']}
            style={styles.mapPlaceholder}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Feather name="map" size={48} color="#6366f1" />
            <Text style={styles.mapPlaceholderText}>Google Maps Integration</Text>
            <Text style={styles.mapPlaceholderSubtext}>Dummy Map Placeholder</Text>
          </LinearGradient>
        </View>

        {/* Status Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
            <Text style={styles.legendText}>Passable</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
            <Text style={styles.legendText}>Medium Vehicles</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
            <Text style={styles.legendText}>Impassable</Text>
          </View>
        </View>

        {/* Streets List */}
        <View style={styles.streetsSection}>
          <Text style={styles.sectionTitle}>Road Status</Text>
          {filteredStreets.length > 0 ? (
            <FlatList
              data={filteredStreets}
              renderItem={({ item }) => <StreetCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Feather name="search" size={32} color="#9ca3af" />
              <Text style={styles.emptyStateText}>No streets found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.settingsModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Feather name="x" size={24} color="#1f2937" />
              </TouchableOpacity>
            </View>

            <View style={styles.settingsContent}>
              {/* User Info */}
              <View style={styles.userInfo}>
                <View style={styles.settingsAvatar}>
                  <Text style={styles.settingsAvatarText}>
                    {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{user?.displayName || 'User'}</Text>
                  <Text style={styles.userEmail}>{user?.email}</Text>
                </View>
              </View>

              {/* Settings Options */}
              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Appearance</Text>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Feather name="moon" size={20} color={theme.colors.textSecondary} />
                    <Text style={styles.settingLabel}>Dark Mode</Text>
                  </View>
                  <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                    thumbColor={isDarkMode ? theme.colors.surface : theme.colors.surfaceSecondary}
                  />
                </View>
              </View>

              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Feather name="bell" size={20} color="#6b7280" />
                    <Text style={styles.settingLabel}>Flood Alerts</Text>
                  </View>
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: '#d1d5db', true: '#10b981' }}
                    thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
                  />
                </View>
              </View>

              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Language</Text>
                
                <TouchableOpacity 
                  style={styles.settingItem}
                  onPress={() => {
                    setLanguage(language === 'Filipino' ? 'English' : 'Filipino');
                  }}
                >
                  <View style={styles.settingInfo}>
                    <Feather name="globe" size={20} color="#6b7280" />
                    <Text style={styles.settingLabel}>Language</Text>
                  </View>
                  <View style={styles.languageSelector}>
                    <Text style={styles.languageText}>{language}</Text>
                    <Feather name="chevron-right" size={16} color="#9ca3af" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Support</Text>
                
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Feather name="help-circle" size={20} color="#6b7280" />
                    <Text style={styles.settingLabel}>Help & Support</Text>
                  </View>
                  <Feather name="chevron-right" size={16} color="#9ca3af" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Feather name="info" size={20} color="#6b7280" />
                    <Text style={styles.settingLabel}>About SafePath</Text>
                  </View>
                  <Feather name="chevron-right" size={16} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              {/* Logout Button */}
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  setShowSettings(false);
                  Alert.alert(
                    'Logout',
                    'Are you sure you want to logout?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Logout', onPress: handleLogout, style: 'destructive' }
                    ]
                  );
                }}
              >
                <Feather name="log-out" size={20} color="#ef4444" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
