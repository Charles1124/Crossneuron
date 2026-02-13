import { StyleSheet } from 'react-native'

export const loginStyles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        maxWidth: 350,
        minWidth: 150,
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 15,
        gap: 25,
    },
    header: {
        alignItems: 'center',
        gap: 11,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        opacity: 0.4,
    },
    form: {
        gap: 20,
        alignItems: 'center',
    },
    inputContainer: {
        position: 'relative',
        width: '90%',
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    input: {
        borderRadius: 10,
        padding: 9,
        paddingRight: 50,
        borderWidth: 1,
        borderColor: '#000',
        width: '100%',
        fontSize: 16,
    },
    buttonLogin: {
        borderRadius: 9,
        padding: 9,
        alignItems: 'center',
        backgroundColor: 'rgb(34, 131, 196)',
        width: '60%',
    },
    textLogin: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '600',
    },
    divider: {
        alignItems: 'center',
        marginVertical: 5,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: 30,
        justifyContent: 'space-between'
    },
    socialButtonGmail: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        paddingHorizontal: 25,
        backgroundColor: '#fff',
        gap: 10
    },
    socialButtonApple: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        paddingHorizontal: 25,
        backgroundColor: '#000',
        gap: 10
    },
    socialIcon: {
        width: 20,
        height: 20,
    },
    socialTextGmail: {
        fontWeight: 'bold',
        opacity: 0.86,
    },
    socialTextApple: {
        color: '#fff',
        fontWeight: 'bold',
        opacity: 0.86,
    },
    links: {
        alignItems: 'center',
        gap: 15,
    }
})