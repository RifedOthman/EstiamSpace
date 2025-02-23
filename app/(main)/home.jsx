import { View, Text, Pressable, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons';
import { hp, wp } from '../../helpers/common';
import { useRouter } from 'expo-router';
import { fetchPosts } from '../../services/postService';
import PostCard from '../../components/PostCard';
import Loading from '../../components/Loading';
import Avatar from '../../components/Avatar';

var limit = 0;

const HomeScreen = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [notificationCount, setNotificationCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false); // État pour le refresh

    const getPosts = async (isRefreshing = false) => {
        if (!hasMore && !isRefreshing) return;
        
        if (isRefreshing) {
            limit = 10; // Remettre la limite à 10 lors du rafraîchissement
        } else {
            limit += 10; // Charger plus de posts
        }

        console.log('fetching posts: ', limit);
        let res = await fetchPosts(limit);
        if (res.success) {
            if (isRefreshing) {
                setPosts(res.data);
            } else {
                if (posts.length === res.data.length) setHasMore(false);
                setPosts(res.data);
            }
        }
        
        if (isRefreshing) setRefreshing(false); // Désactiver l'animation de rafraîchissement
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getPosts(true);
    }, []);

    return (
        <ScreenWrapper bg="white">
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable>
                        <Text style={styles.title}>Estiam Space</Text>
                    </Pressable>
                    <View style={styles.icons}>
                        <Pressable onPress={() => {
                            setNotificationCount(0);
                            router.push('notifications');
                        }}>
                            <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
                            {notificationCount > 0 && (
                                <View style={styles.pill}>
                                    <Text style={styles.pillText}>{notificationCount}</Text>
                                </View>
                            )}
                        </Pressable>
                        <Pressable onPress={() => router.push('newPost')}>
                            <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
                        </Pressable>
                        <Pressable onPress={() => router.push('profile')}>
                            <Avatar uri={user?.image} size={hp(4.3)} rounded={theme.radius.sm} style={{ borderWidth: 2 }} />
                        </Pressable>
                    </View>
                </View>

                {/* Posts */}
                <FlatList
                    data={posts}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listStyle}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => <PostCard item={item} currentUser={user} router={router} />}
                    onEndReached={() => {
                        getPosts();
                        console.log('got to the end');
                    }}
                    onEndReachedThreshold={0}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
                    }
                    ListFooterComponent={
                        hasMore ? (
                            <View style={{ marginVertical: posts.length == 0 ? 200 : 30 }}>
                                <Loading />
                            </View>
                        ) : (
                            <View style={{ marginVertical: 30 }}>
                                <Text style={styles.noPosts}>No more posts</Text>
                            </View>
                        )
                    }
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = {
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: wp(4),
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(3.2),
        fontWeight: theme.fonts.bold,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18,
    },
    listStyle: {
        paddingTop: 20,
        paddingHorizontal: wp(4),
    },
    noPosts: {
        fontSize: hp(2),
        textAlign: 'center',
        color: theme.colors.text,
    },
    pill: {
        position: 'absolute',
        right: -10,
        top: -4,
        height: hp(2.2),
        width: hp(2.2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: theme.colors.roseLight,
    },
    pillText: {
        color: 'white',
        fontSize: hp(1.2),
        fontWeight: theme.fonts.bold,
    },
};

export default HomeScreen;
