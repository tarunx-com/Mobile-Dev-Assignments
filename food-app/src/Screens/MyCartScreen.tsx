import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../theme/theme';
import { useCart } from '../data/CartData';
import { restaurants } from '../data/Restaurants';

const allItemsMap: Record<string, { id: string; name: string; price: number; image: string; description?: string }> = {};
restaurants.forEach(r => {
    r.items.forEach(item => {
        allItemsMap[item.id] = item;
    });
});


const MyCartScreen = () => {
    const { inUseTheme, isDark } = useTheme();
    const { cartItems, handleIncrement, handleDecrement,resetCart } = useCart();
    const { width, height } = useWindowDimensions();

    const isTablet = width >= 768 && height >= 768;
    const isLandscape = width > height;

    const cartEntries = Object.entries(cartItems).filter(([, qty]) => qty > 0);

    const totalItems = cartEntries.reduce((sum, [, qty]) => sum + qty, 0);

    const subtotal = cartEntries.reduce((sum, [id, qty]) => {
        const item = allItemsMap[id];
        return sum + (item ? item.price * qty : 0);
    }, 0);

    const deliveryFee=subtotal < 500 ? 50 : 0;

    const total = subtotal + deliveryFee;

    const horizontalPad = isTablet ? 28 : isLandscape ? 24 : 16;
    const imgSize = isTablet ? 100 : isLandscape ? 90 : 80;
    const titleFontSize = isTablet ? 32 : 26;
    const bodyFont = isTablet ? 16 : 14;

    const renderCartItem = ({ item: [id, qty] }: { item: [string, number] }) => {
        const product = allItemsMap[id];
        if (!product) return null;

        return (
            <View style={[styles.cartCard, {
                backgroundColor: isDark ? '#1C1C1E' : inUseTheme.card,
                borderColor: isDark ? '#2C2C2E' : inUseTheme.border,
                marginHorizontal: horizontalPad,
                marginBottom: 12,
                padding: isTablet ? 18 : 14,
            }]}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Image
                        source={{ uri: product.image }}
                        style={[styles.itemImage, { width: imgSize, height: imgSize }]}
                        resizeMode="cover"
                    />

                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Text style={[styles.itemName, { fontSize: isTablet ? 18 : 16, color: inUseTheme.text, flex: 1, marginRight: 8 }]}>
                                {product.name}
                            </Text>
                            <Text style={[styles.itemPrice, { fontSize: isTablet ? 18 : 16 }]}>
                                ₹{(product.price * qty)}
                            </Text>
                        </View>

                        {product.description ? (
                            <Text
                                style={[styles.itemDesc, { fontSize: isTablet ? 13 : 12, color: inUseTheme.subtext }]}
                                numberOfLines={2}
                            >
                                {product.description}
                            </Text>
                        ) : null}
                    </View>
                </View>

                <View style={[styles.qtyRow, { marginTop: isTablet ? 14 : 10 }]}>
                    <View style={[styles.qtyControl, {
                        backgroundColor: isDark ? '#2A2A2C' : inUseTheme.backgroundColor,
                        borderColor: isDark ? '#3A3A3C' : inUseTheme.border,
                    }]}>
                        <Pressable
                            onPress={() => handleDecrement(id)}
                            style={styles.qtyBtn}
                        >
                            <Ionicons name="remove" size={isTablet ? 20 : 18} color={inUseTheme.text} />
                        </Pressable>

                        <Text style={[styles.qtyText, { fontSize: isTablet ? 17 : 15, color: inUseTheme.text }]}>
                            {qty}
                        </Text>

                        <Pressable
                            onPress={() => handleIncrement(id)}
                            style={styles.qtyBtn}
                        >
                            <Ionicons name="add" size={isTablet ? 20 : 18} color={inUseTheme.text} />
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={() => {
                            for (let i = 0; i < qty; i++) handleDecrement(id);
                        }}
                        style={styles.deleteBtn}
                    >
                        <Ionicons name="trash-outline" size={isTablet ? 22 : 20} color="#888" />
                    </Pressable>
                </View>
            </View>
        );
    };

    const ListHeader = () => totalItems>0 && (

        <View style={[styles.listHeader, { paddingHorizontal: horizontalPad, paddingTop: isTablet ? 24 : 16 }]}>
            <View>
                <Text style={[styles.pageTitle, { fontSize: titleFontSize, color: inUseTheme.text }]}>
                    Your Cart
                </Text>
                <Text style={[styles.pageSubtitle, { fontSize: bodyFont, color: inUseTheme.subtext }]}>
                    Review your midnight feast
                </Text>
            </View>

            {totalItems > 0 && (
                <View style={[styles.itemsBadge, { backgroundColor: isDark ? '#2C2C2E' : inUseTheme.card }]}>
                    <Text style={[styles.badgeCount, { fontSize: isTablet ? 22 : 18, color: inUseTheme.text }]}>
                        {totalItems}
                    </Text>
                    <Text style={[styles.badgeLabel, { fontSize: isTablet ? 12 : 11, color: inUseTheme.subtext }]}>
                        ITEMS
                    </Text>
                </View>
            )}
        </View>
    );

    // ── Footer (address + summary + checkout) ─────────────────────
    const ListFooter = () => {
        if (cartEntries.length === 0) return null;

        return (
            <View style={{ paddingHorizontal: horizontalPad, paddingBottom: 40 }}>
                <View style={[styles.addressCard, {
                    backgroundColor: isDark ? '#1C1C1E' : inUseTheme.card,
                    borderColor: isDark ? '#2C2C2E' : inUseTheme.border,
                    padding: isTablet ? 18 : 14,
                    marginBottom: 12,
                }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <View style={[styles.addressIcon, { backgroundColor: isDark ? '#2A2A2C' : inUseTheme.backgroundColor }]}>
                            <Ionicons name="location" size={isTablet ? 22 : 18} color={inUseTheme.accent} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={[styles.addressLabel, { fontSize: isTablet ? 11 : 10, color: inUseTheme.subtext }]}>
                                DELIVERY ADDRESS
                            </Text>
                            <Text style={[styles.addressMain, { fontSize: bodyFont, color: inUseTheme.text }]}>
                                India
                            </Text>
                        </View>
                        <Pressable onPress={()=>alert('loaction will be added here!')}>
                            <Text style={[styles.changeText, { fontSize: isTablet ? 14 : 12, color: inUseTheme.accent }]}>
                                CHANGE
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Price Summary */}
                <View style={[styles.summaryCard, {
                    backgroundColor: isDark ? '#1C1C1E' : inUseTheme.card,
                    borderColor: isDark ? '#2C2C2E' : inUseTheme.border,
                    padding: isTablet ? 20 : 16,
                    marginBottom: 20,
                }]}>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { fontSize: bodyFont, color: inUseTheme.subtext }]}>
                            Subtotal
                        </Text>
                        <Text style={[styles.summaryValue, { fontSize: bodyFont, color: inUseTheme.text }]}>
                            ₹{subtotal.toLocaleString()}
                        </Text>
                    </View>

                    <View style={[styles.summaryRow, { marginTop: 10 }]}>
                        <Text style={[styles.summaryLabel, { fontSize: bodyFont, color: inUseTheme.subtext }]}>
                            Delivery Fee
                        </Text>
                        <Text style={[styles.summaryValue, { fontSize: bodyFont, color: inUseTheme.text }]}>
                            ₹{deliveryFee}
                        </Text>
                    </View>

                    <View style={[styles.divider, { backgroundColor: isDark ? '#2C2C2E' : inUseTheme.border, marginVertical: 14 }]} />

                    <View style={styles.summaryRow}>
                        <Text style={[styles.totalLabel, { fontSize: isTablet ? 20 : 16, color: inUseTheme.text }]}>
                            Total
                        </Text>
                        <Text style={[styles.totalValue, { fontSize: isTablet ? 28 : 24 }]}>
                            ₹{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>
                    </View>
                </View>

                {/* Checkout Button */}
                <Pressable
                    style={({ pressed }) => [
                        styles.checkoutBtn,
                        {
                            backgroundColor: inUseTheme.accent,
                            opacity: pressed ? 0.85 : 1,
                            paddingVertical: isTablet ? 18 : 16,
                            borderRadius: isTablet ? 18 : 14,
                        },
                    ]}
                    onPress={() => [alert('Order Succefull'),resetCart()]}
                >
                    <Text style={[styles.checkoutText, { fontSize: isTablet ? 18 : 16 }]}>
                        Checkout
                    </Text>
                    <Ionicons name="arrow-forward" size={isTablet ? 22 : 20} color="#fff" style={{ marginLeft: 8 }} />
                </Pressable>
            </View>
        );
    };

    const EmptyCart = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={isTablet ? 80 : 64} color={inUseTheme.subtext} />
            <Text style={[styles.emptyTitle, { fontSize: isTablet ? 22 : 18, color: inUseTheme.text, marginTop: 16 }]}>
                Your cart is empty
            </Text>
            <Text style={[styles.emptySub, { fontSize: bodyFont, color: inUseTheme.subtext }]}>
                Add some items to get started
            </Text>
        </View>
    );

    return (
        <View style={[styles.screen, { backgroundColor: inUseTheme.backgroundColor}]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />

            <FlatList
                data={cartEntries as [string, number][]}
                keyExtractor={([id]) => id}
                renderItem={renderCartItem}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={ListFooter}
                ListEmptyComponent={EmptyCart}
                contentContainerStyle={[
                    styles.listContent,
                    cartEntries.length === 0 && styles.emptyListContent,
                    { paddingTop: isTablet ? 16 : 12 },
                ]}
                showsVerticalScrollIndicator={false}
                // Two-column grid on tablet landscape
                numColumns={isTablet && isLandscape ? 2 : 1}
                key={isTablet && isLandscape ? 'two-col' : 'one-col'}
            />
        </View>
    );
};

export default MyCartScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 24,
    },
    emptyListContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },

    // Header
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    pageTitle: {
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    pageSubtitle: {
        marginTop: 2,
    },
    itemsBadge: {
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 8,
        alignItems: 'center',
    },
    badgeCount: {
        fontWeight: '700',
    },
    badgeLabel: {
        fontWeight: '600',
        letterSpacing: 1,
    },

    // Cart card
    cartCard: {
        borderRadius: 16,
        borderWidth: 1,
    },
    itemImage: {
        borderRadius: 12,
    },
    itemName: {
        fontWeight: '600',
        lineHeight: 22,
    },
    itemPrice: {
        fontWeight: '700',
        color: '#E8834A',
    },
    itemDesc: {
        marginTop: 4,
        lineHeight: 17,
    },

    // Qty row
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    qtyControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        overflow: 'hidden',
    },
    qtyBtn: {
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    qtyText: {
        fontWeight: '600',
        minWidth: 28,
        textAlign: 'center',
    },
    deleteBtn: {
        padding: 8,
    },

    // Address card
    addressCard: {
        borderRadius: 16,
        borderWidth: 1,
    },
    addressIcon: {
        width: 42,
        height: 42,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressLabel: {
        fontWeight: '600',
        letterSpacing: 0.8,
        marginBottom: 2,
    },
    addressMain: {
        fontWeight: '600',
    },
    addressSub: {
        marginTop: 1,
    },
    changeText: {
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // Summary card
    summaryCard: {
        borderRadius: 16,
        borderWidth: 1,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: {},
    summaryValue: {
        fontWeight: '500',
    },
    divider: {
        height: 1,
    },
    totalLabel: {
        fontWeight: '700',
    },
    totalValue: {
        fontWeight: '800',
        color: '#E8834A',
    },

    // Checkout button
    checkoutBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutText: {
        fontWeight: '700',
        color: '#fff',
    },

    // Empty state
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontWeight: '700',
    },
    emptySub: {
        marginTop: 6,
    },
});