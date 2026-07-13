import { StyleSheet } from "react-native";

export const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    header: {
        paddingTop: 32,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: '800',
        color: 'hsl(222, 47%, 11%)',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: 'hsl(215, 16%, 47%)',
    },

    // Avatar
    avatarSection: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    avatarWrapper: {
        position: 'relative',
        width: 110,
        height: 110,
    },
    avatarImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#e0e7ff',
    },
    avatarPlaceholder: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#e0e7ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarEditBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'hsl(221, 83%, 53%)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },

    // Card sections
    card: {
        marginHorizontal: 20,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 18,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: 'hsl(215, 16%, 47%)',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        marginBottom: 14,
    },

    // Email row
    emailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    emailIconWrapper: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#eff6ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'hsl(222, 47%, 11%)',
        flex: 1,
    },

    // Form fields
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
    },
    fieldIconWrapper: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#f0fdf4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fieldInput: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: 'hsl(222, 47%, 11%)',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingVertical: 6,
    },
    fieldInputFocused: {
        borderBottomColor: 'hsl(221, 83%, 53%)',
    },
    lastFieldRow: {
        marginBottom: 0,
    },

    // Save button
    saveButton: {
        marginHorizontal: 20,
        marginBottom: 12,
        backgroundColor: 'hsl(221, 83%, 53%)',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: 'hsl(221, 83%, 53%)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    saveButtonDisabled: {
        opacity: 0.6,
    },

    // Feedback toast
    toastSuccess: {
        marginHorizontal: 20,
        marginBottom: 12,
        backgroundColor: '#dcfce7',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    toastError: {
        marginHorizontal: 20,
        marginBottom: 12,
        backgroundColor: '#fee2e2',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    toastText: {
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    toastTextSuccess: {
        color: '#166534',
    },
    toastTextError: {
        color: '#991b1b',
    },

    // Logout button
    logoutButton: {
        marginHorizontal: 20,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1.5,
        borderColor: '#fecaca',
    },
    logoutButtonText: {
        color: '#ef4444',
        fontSize: 16,
        fontWeight: '700',
    },
});
