import { StatusBar } from 'expo-status-bar';
import { SafeAreaView , Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Modal, Alert, Switch } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createStyles } from './admin_styles.js';
import { streets as initialStreets, getStatusColor, getStatusLabel } from '../../utils/streetData.js';
import { useTheme } from '../../utils/ThemeContext';

export default function AdminDashboard({ admin, setShowAdmin, setCurrentUser }) {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const styles = createStyles(theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [streetsList, setStreetsList] = useState(initialStreets);
  const [filteredStreets, setFilteredStreets] = useState(initialStreets);
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredStreets(streetsList);
    } else {
      const filtered = streetsList.filter(street =>
        street.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStreets(filtered);
    }
  };

  const handleUpdateStatus = (newStatus) => {
    if (!selectedStreet) return;

    const updatedStreets = streetsList.map(street =>
      street.id === selectedStreet.id
        ? { ...street, status: newStatus }
        : street
    );

    setStreetsList(updatedStreets);
    setFilteredStreets(
      updatedStreets.filter(street =>
        street.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setShowStatusModal(false);
    setSelectedStreet(null);
    Alert.alert('Success', `${selectedStreet.name} updated to ${getStatusLabel(newStatus)}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowAdmin(false);
  };

  const StreetCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedStreet(item);
        setShowStatusModal(true);
      }}
      style={styles.streetCard}
    >
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
    </TouchableOpacity>
  );

  const StatusOption = ({ status, label }) => (
    <TouchableOpacity
      onPress={() => handleUpdateStatus(status)}
      style={[
        styles.statusOption,
        { borderColor: getStatusColor(status) },
      ]}
    >
      <View style={[styles.statusDot, { backgroundColor: getStatusColor(status) }]} />
      <Text style={styles.statusOptionText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientMiddle, theme.colors.gradientEnd]}
      style={styles.Main}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar style={theme.isDark ? "light" : "dark"} backgroundColor="transparent" translucent />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
      <View style={styles.topBar}>
        {/* Admin Avatar */}
        <TouchableOpacity
          style={styles.profileAvatar}
          onPress={() => setShowSettings(true)}
        >
          <Text style={styles.avatarText}>
            {admin?.displayName?.charAt(0).toUpperCase() || 'A'}
          </Text>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search street..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
          </View>

          {/* Welcome Message */}
          <View style={styles.welcomeSection}>
            <View style={styles.adminBadge}>
              <Feather name="shield" size={14} color="#fff" />
              <Text style={styles.adminBadgeText}>BARANGAY ADMIN</Text>
            </View>
            <Text style={styles.welcomeTitle}>Welcome, {admin?.displayName || 'Admin'}!</Text>
            <Text style={styles.welcomeSubtitle}>Manage Road Status for Marulas</Text>
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

        {/* Road Status List*/}
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Road Management</Text>
            <Text style={styles.streetCount}>{filteredStreets.length} roads</Text>
          </View>
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

      {/* Status Update */}
      <Modal
        visible={showStatusModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Street Status</Text>
              <TouchableOpacity onPress={() => setShowStatusModal(false)}>
                <Feather name="x" size={24} color="#1f2937" />
              </TouchableOpacity>
            </View>

            {selectedStreet && (
              <>
                <Text style={styles.currentStreetName}>{selectedStreet.name}</Text>
                <Text style={styles.currentStatusLabel}>Current Status</Text>
                <View
                  style={[
                    styles.currentStatusBadge,
                    { backgroundColor: getStatusColor(selectedStreet.status) },
                  ]}
                >
                  <Text style={styles.currentStatusText}>
                    {getStatusLabel(selectedStreet.status)}
                  </Text>
                </View>

                <Text style={styles.selectStatusLabel}>Select New Status</Text>

                <StatusOption status="green" label="✓ Passable" />
                <StatusOption status="yellow" label="⚠ Medium Vehicles Only" />
                <StatusOption status="red" label="✗ Impassable" />

                <TouchableOpacity
                  onPress={() => setShowStatusModal(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Settings */}
      <Modal
        visible={showSettings}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSettings(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSettings(false)}
        >
          <TouchableOpacity
            style={styles.settingsModal}
            activeOpacity={1}
            onPress={() => {}}
          >
            {/* Settings Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Feather name="x" size={24} color="#1f2937" />
              </TouchableOpacity>
            </View>

            {/* Settings Content */}
            <ScrollView style={styles.settingsContent} showsVerticalScrollIndicator={false}>
              {/* User Info Section */}
              <View style={styles.userInfo}>
                <View style={styles.settingsAvatar}>
                  <Text style={styles.settingsAvatarText}>
                    {admin?.displayName?.charAt(0).toUpperCase() || 'A'}
                  </Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{admin?.displayName || 'Admin'}</Text>
                  <Text style={styles.userEmail}>Barangay Administrator</Text>
                </View>
              </View>

              {/* Appearance toggle */}
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

              {/* Notifications Section */}
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
                    trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                    thumbColor={notificationsEnabled ? '#1e40af' : '#f9fafb'}
                  />
                </View>
              </View>

              {/* Language */}
              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Language</Text>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Feather name="globe" size={20} color="#6b7280" />
                    <Text style={styles.settingLabel}>App Language</Text>
                  </View>
                  <View style={styles.languageSelector}>
                    <Text style={styles.languageText}>{language}</Text>
                    <Feather name="chevron-right" size={20} color="#6b7280" />
                  </View>
                </TouchableOpacity>
              </View>

              {/* Support */}
              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Support</Text>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Feather name="help-circle" size={20} color="#6b7280" />
                    <Text style={styles.settingLabel}>Help & Support</Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Feather name="info" size={20} color="#6b7280" />
                    <Text style={styles.settingLabel}>About SafePath</Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>

              {/* Logout Button */}
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Logout',
                    'Are you sure you want to logout?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Logout',
                        style: 'destructive',
                        onPress: () => {
                          setShowSettings(false);
                          handleLogout();
                        }
                      }
                    ]
                  );
                }}
                style={styles.logoutButton}
              >
                <Feather name="log-out" size={20} color="#ef4444" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
}
