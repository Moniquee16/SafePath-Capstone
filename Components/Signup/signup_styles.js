import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scaleFont = size => Math.round(size * (width / 375));

export const styles = StyleSheet.create({
  Main: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#fff',
  },
  officialBadge: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: 'center',
  },
  officialText: {
    fontSize: scaleFont(10),
    fontWeight: '700',
    color: '#92400e',
  },
  taglineContainer: {
    marginBottom: 20,
  },
  taglineMain: {
    fontSize: scaleFont(32),
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  taglineSubtext: {
    fontSize: scaleFont(13),
    color: '#e3f2fd',
  },
  signupCard: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  signupTitle: {
    fontSize: scaleFont(24),
    fontWeight: '800',
    color: '#1f2937',
    textAlign: 'left',
    marginBottom: 4,
  },
  signupSubtitle: {
    fontSize: scaleFont(13),
    color: '#6b7280',
    textAlign: 'left',
    marginBottom: 16,
  },
  inputWrapper: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: scaleFont(11),
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  inputContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputIcon: {
    marginRight: 8,
    color: '#9ca3af',
  },
  input: {
    flex: 1,
    fontSize: scaleFont(15),
    color: '#1f2937',
    padding: 0,
  },
  eyeButton: {
    padding: 4,
  },
  showText: {
    color: '#1e40af',
    fontSize: scaleFont(12),
    fontWeight: '600',
  },
  signupButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#1e40af',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: '700',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#6b7280',
    fontSize: scaleFont(13),
  },
  signupLink: {
    color: '#1e40af',
    fontSize: scaleFont(13),
    fontWeight: '700',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});