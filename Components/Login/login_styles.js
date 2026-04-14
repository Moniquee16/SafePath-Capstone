import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scaleFont = size => Math.round(size * (width / 375));

export const createStyles = (theme) => StyleSheet.create({
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
    marginTop: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: theme.colors.surface,
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
    color: theme.colors.surface,
    marginBottom: 6,
  },
  taglineSubtext: {
    fontSize: scaleFont(13),
    color: theme.colors.textSecondary,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: scaleFont(36),
    fontWeight: 'bold',
    color: theme.colors.surface,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: scaleFont(12),
    color: theme.colors.textSecondary,
    marginTop: 6,
  },
  loginCard: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 16,
    padding: 24,
    ...theme.shadow.lg,
  },
  loginTitle: {
    fontSize: scaleFont(24),
    fontWeight: '800',
    color: theme.colors.text,
    textAlign: 'left',
    marginBottom: 4,
  },
  loginSubtitle: {
    fontSize: scaleFont(13),
    color: theme.colors.textSecondary,
    textAlign: 'left',
    marginBottom: 16,
  },
  inputWrapper: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: scaleFont(11),
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  inputContainer: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
  },
  inputIcon: {
    marginRight: 8,
    color: theme.colors.inputPlaceholder,
  },
  input: {
    flex: 1,
    fontSize: scaleFont(15),
    color: theme.colors.text,
    padding: 0,
  },
  eyeButton: {
    padding: 4,
  },
  showText: {
    color: theme.colors.primary,
    fontSize: scaleFont(12),
    fontWeight: '600',
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 14,
  },
  forgotText: {
    color: '#f59e0b',
    fontSize: scaleFont(13),
    fontWeight: '600',
  },
  loginButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#1e40af',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: '700',
  },
  adminButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fcd34d',
  },
  adminButtonText: {
    color: '#92400e',
    fontSize: scaleFont(14),
    fontWeight: '600',
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