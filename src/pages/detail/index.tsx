import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BLACK, GREY2, WHITE} from 'styles/colors';
import {Toolbar} from 'components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextBold} from 'styles/text-styles';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {items} = route.params;

  return (
    <View style={styles.container}>
      <Toolbar
        prefix={
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={BLACK}
            onPress={() => navigation.goBack()}
          />
        }
        text="Detail"
      />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{paddingBottom: 10}}>
          <Image source={{uri: items?.urls?.full}} style={styles.imageItem} />
          <View style={{marginTop: 15}}>
            <View style={styles.flexRow}>
              <View style={{flex: 0.5}}>
                <TextBold style={{color: GREY2}}>Author</TextBold>
              </View>
              <View style={{flex: 1}}>
                <TextBold style={{color: BLACK}}>{items?.user?.name}</TextBold>
              </View>
            </View>
            <View style={styles.flexRow}>
              <View style={{flex: 0.5}}>
                <TextBold style={{color: GREY2}}>Likes</TextBold>
              </View>
              <View style={{flex: 1}}>
                <TextBold style={{color: BLACK}}>{items?.likes}</TextBold>
              </View>
            </View>
            <View style={styles.flexRow}>
              <View style={{flex: 0.5}}>
                <TextBold style={{color: GREY2}}>Published</TextBold>
              </View>
              <View style={{flex: 1}}>
                <TextBold style={{color: BLACK}}>
                  {moment(items?.created_at).format('YYYY-MM-DD')}
                </TextBold>
              </View>
            </View>
            <View style={styles.flexRow}>
              <View style={{flex: 0.5}}>
                <TextBold style={{color: GREY2}}>Description</TextBold>
              </View>
              <View style={{flex: 1}}>
                <TextBold style={{color: BLACK}}>
                  {items?.description === null ? '-' : items?.description}
                </TextBold>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  body: {
    flex: 1,
    padding: 8,
  },
  imageItem: {
    width: width - 16,
    height: height / 1.5,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
