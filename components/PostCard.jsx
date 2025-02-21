import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { theme } from '../constants/theme';
import { Image } from 'expo-image';
import { hp, wp } from '../helpers/common';
import Icon from '../assets/icons';
import { Video } from 'expo-av';
import Loading from './Loading';
import Avatar from './Avatar';

const textStyle = {
  color: theme.colors.dark,
  fontSize: hp(1.75)
};

const tagsStyles = {
  div: textStyle,
  p: textStyle,
  ol: textStyle,
  h1: {
    color: theme.colors.dark
  },
  h4: {
    color: theme.colors.dark
  },
};

const PostCard = ({
  showMoreIcon = true,
  hasShadow = true,
  showDelete = false,
  onDelete = () => {},
  onEdit = () => {}
}) => {

  
  const username = "John Doe";
  const postTime = "Feb 21, 2025";
  const likes = [1, 2, 3]; 
  const comments = [{ count: 5 }]; 
  const postBody = "<p>This is a static post body.</p>"; 
  const postImage = "https://www.example.com/image.jpg"; 
  const postVideo = "https://www.example.com/video.mp4"; 
  const liked = false; 

  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
        {/* user info and post time */}
        <View style={styles.userInfo}>
          <Avatar 
            size={hp(4.5)}
            uri={"https://www.example.com/avatar.jpg"}
            rounded={theme.radius.md}
          />
          <View style={{gap: 2}}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.postTime}>{postTime}</Text>
          </View>
        </View>

        {/* actions */}
        {showMoreIcon && (
          <TouchableOpacity onPress={() => {}}>
            <Icon name="threeDotsHorizontal" size={hp(3.4)} strokeWidth={3} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        {showDelete && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onEdit()}>
              <Icon name="edit" size={hp(2.5)} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Icon name="delete" size={hp(2.5)} color={theme.colors.rose} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* post image & body */}
      <View style={styles.content}>
        <View style={styles.postBody}>
          <RenderHtml
            contentWidth={wp(100)}
            source={{ html: postBody }}
            tagsStyles={tagsStyles}
          />
        </View>
        
        {/* post image */}
        {postImage && (
          <Image 
            source={{ uri: postImage }}
            transition={100}
            style={styles.postMedia}
            contentFit="cover"
          />
        )}

        {/* post video */}
        {postVideo && (
          <Video
            style={[styles.postMedia, { height: hp(30) }]}
            source={{ uri: postVideo }}
            useNativeControls
            resizeMode="cover"
            isLooping
          />
        )}
      </View>

      {/* like & comment */}
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="heart" fill={liked ? theme.colors.rose : 'transparent'} size={24} color={liked ? theme.colors.rose : theme.colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.count}>{likes.length}</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="comment" size={24} color={theme.colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.count}>{comments[0]?.count}</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="share" size={24} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xxl * 1.1,
    borderCurve: 'continuous',
    padding: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: '#000'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  username: {
    fontSize: hp(1.7),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.medium,
  },
  postTime: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    fontWeight: theme.fonts.medium,
  },
  content: {
    gap: 10,
  },
  postMedia: {
    height: hp(40),
    width: '100%',
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous'
  },
  postBody: {
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 15
  },
  footerButton: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center', 
    gap: 18,
  },
  count: {
    color: theme.colors.text,
    fontSize: hp(1.8)
  }
});

export default PostCard;
