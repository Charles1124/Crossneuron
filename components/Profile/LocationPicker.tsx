import { useState } from 'react';
import {
    View, Text, TouchableOpacity, Modal, FlatList,
    TextInput, StyleSheet, SafeAreaView,
} from 'react-native';
import { MapPin, ChevronRight, Search, X, ChevronLeft } from 'lucide-react-native';
import { COUNTRIES, Country } from '../../data/locations';

interface LocationPickerProps {
    country: string;
    city: string;
    onSelect: (country: string, city: string) => void;
}

type Step = 'country' | 'city';

export function LocationPicker({ country, city, onSelect }: LocationPickerProps) {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState<Step>('country');
    const [search, setSearch] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
        COUNTRIES.find(c => c.name === country) ?? null
    );

    const displayText = country && city
        ? `${city}, ${country}`
        : country
        ? country
        : null;

    function openPicker() {
        setStep('country');
        setSearch('');
        setVisible(true);
    }

    function handleSelectCountry(c: Country) {
        setSelectedCountry(c);
        setSearch('');
        setStep('city');
    }

    function handleSelectCity(cityName: string) {
        onSelect(selectedCountry!.name, cityName);
        setVisible(false);
        setSearch('');
    }

    function handleBack() {
        setStep('country');
        setSearch('');
    }

    function handleClose() {
        setVisible(false);
        setSearch('');
    }

    const filteredCountries = COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredCities = selectedCountry
        ? selectedCountry.cities.filter(c =>
            c.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <>
            {/* Trigger button */}
            <TouchableOpacity style={styles.trigger} onPress={openPicker} activeOpacity={0.7}>
                <View style={styles.triggerIcon}>
                    <MapPin size={18} color="#22c55e" />
                </View>
                <Text style={[styles.triggerText, !displayText && styles.triggerPlaceholder]} numberOfLines={1}>
                    {displayText ?? 'Seleccionar ubicación'}
                </Text>
                <ChevronRight size={16} color="#9ca3af" />
            </TouchableOpacity>

            {/* Modal */}
            <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
                <SafeAreaView style={styles.modal}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                        {step === 'city' ? (
                            <TouchableOpacity onPress={handleBack} style={styles.headerBtn}>
                                <ChevronLeft size={22} color="hsl(221, 83%, 53%)" />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.headerBtn} />
                        )}
                        <Text style={styles.modalTitle}>
                            {step === 'country' ? 'Selecciona un país' : selectedCountry?.flag + ' ' + selectedCountry?.name}
                        </Text>
                        <TouchableOpacity onPress={handleClose} style={styles.headerBtn}>
                            <X size={22} color="#6b7280" />
                        </TouchableOpacity>
                    </View>

                    {/* Search */}
                    <View style={styles.searchWrapper}>
                        <Search size={16} color="#9ca3af" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder={step === 'country' ? 'Buscar país...' : 'Buscar ciudad...'}
                            placeholderTextColor="#9ca3af"
                            value={search}
                            onChangeText={setSearch}
                            autoFocus
                        />
                        {search.length > 0 && (
                            <TouchableOpacity onPress={() => setSearch('')}>
                                <X size={16} color="#9ca3af" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Country list */}
                    {step === 'country' && (
                        <FlatList
                            data={filteredCountries}
                            keyExtractor={item => item.name}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() => handleSelectCountry(item)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.listItemFlag}>{item.flag}</Text>
                                    <Text style={styles.listItemText}>{item.name}</Text>
                                    <ChevronRight size={16} color="#d1d5db" />
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    )}

                    {/* City list */}
                    {step === 'city' && (
                        <FlatList
                            data={filteredCities}
                            keyExtractor={item => item}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() => handleSelectCity(item)}
                                    activeOpacity={0.7}
                                >
                                    <MapPin size={16} color="#d1d5db" style={{ marginRight: 4 }} />
                                    <Text style={styles.listItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    )}
                </SafeAreaView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    triggerIcon: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#f0fdf4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    triggerText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: 'hsl(222, 47%, 11%)',
    },
    triggerPlaceholder: {
        color: '#9ca3af',
        fontWeight: '400',
    },

    modal: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    headerBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: 'hsl(222, 47%, 11%)',
    },

    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 16,
        marginVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: 'hsl(222, 47%, 11%)',
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 14,
        gap: 12,
    },
    listItemFlag: {
        fontSize: 22,
    },
    listItemText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: 'hsl(222, 47%, 11%)',
    },
    separator: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginLeft: 18,
    },
});
