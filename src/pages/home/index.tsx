import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BLACK, GREY1, GREY2, WHITE} from 'styles/colors';
import {Button, Input, Modals} from 'components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getSearchPhotos} from 'services/handler/photosHandler';
import {TextBold} from 'styles/text-styles';
import {PhotoState, reducerPhoto} from 'services/redux/reducers/photos';
import {useAppDispatch, useAppSelector} from 'services/redux/hooks';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

interface listProps {
  results: Array<any>;
  total: number;
  total_pages: number;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(state => state.photos);
  console.log('photos', photos);

  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [list, setList] = useState<listProps>({
    results: [],
    total: 0,
    total_pages: 0,
  });

  const getPhotos = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getSearchPhotos(searchText, page);
      if (page === 1) {
        setList({
          results: response.results,
          total: response.total,
          total_pages: response.total_pages,
        });
      } else {
        setList({
          results: [...list.results, ...response.results],
          total: response.total,
          total_pages: response.total_pages,
        });
      }
      console.log('response', response);
      setIsLoading(false);
      return response;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return error;
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [items, setItems] = useState<PhotoState>({
    description: '',
    urls: '',
    user: {
      name: '',
      username: '',
      profile_image: '',
    },
    likes: 0,
    alt_description: 'string',
  });

  const onItemClick = (item: any) => {
    console.log(item);
    setIsModalVisible(true);
    setItems(item);

    dispatch(
      reducerPhoto({
        alt_description: item.alt_description,
        description: item.description,
        likes: item.likes,
        urls: item.urls.full,
        user: {
          name: item.user.name,
          profile_image: item.user.profile_image.medium,
          username: item.user.username,
        },
      }),
    );
  };

  const renderItem = ({item}: any) => {
    return (
      <Pressable style={styles.itemContainer} onPress={() => onItemClick(item)}>
        <Image source={{uri: item?.urls?.thumb}} style={styles.imageItem} />
      </Pressable>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color={GREY1} />
      </View>
    ) : null;
  };

  const renderEmpty = () => {
    return (
      <View style={styles.listEmpty}>
        <TextBold>No Images</TextBold>
      </View>
    );
  };

  const loadMoreItem = () => {
    if (currentPage < list.total_pages) {
      setCurrentPage(currentPage + 1);
      getPhotos(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      <View style={styles.body}>
        <View style={styles.logoContainer}>
          <Image
            source={require('assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
        <Input
          placeholder="Search any photos..."
          placeholderTextColor={GREY2}
          iconLeft={<Ionicons name="search" color={BLACK} size={24} />}
          iconRight={
            searchText.length > 0 ? (
              <Ionicons
                name="close"
                color={BLACK}
                size={24}
                onPress={() => {
                  setSearchText('');
                  setList({
                    results: [],
                    total: 0,
                    total_pages: 0,
                  });
                }}
              />
            ) : null
          }
          onChangeText={(text: string) => setSearchText(text)}
          value={searchText}
        />
        <View style={styles.spaceVertical} />
        {searchText.length > 0 && (
          <Button
            width={width * 0.6}
            text="Search"
            onPress={() => getPhotos(1)}
          />
        )}
        <View style={styles.spaceVertical} />
        <View style={styles.containerFlatlist}>
          <FlatList
            data={list?.results}
            keyExtractor={(item: any) => item?.id}
            horizontal={false}
            numColumns={2}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderLoader}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onEndReached={() => list.results.length > 5 && loadMoreItem()}
            onEndReachedThreshold={0.3}
            contentContainerStyle={styles.fg1}
          />
        </View>
      </View>
      <Modals
        isVisible={isModalVisible}
        onBackButtonPress={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}
        children={
          <ImageBackground
            source={{uri: items?.urls?.full}}
            style={styles.imgModal}>
            <View style={styles.bgOverlay}>
              <Ionicons
                name="close-circle"
                color={WHITE}
                size={32}
                onPress={() => {
                  setIsModalVisible(false);
                }}
                style={styles.closeCircle}
              />
              <View style={styles.shortProfile}>
                <Image
                  source={{uri: items?.user?.profile_image?.medium}}
                  style={styles.imgProfile}
                />
                <View style={{flex: 1, marginLeft: 10}}>
                  <TextBold style={{color: WHITE}}>
                    {items?.user?.username}
                  </TextBold>
                  <TextBold style={{color: WHITE}}>
                    {items?.alt_description}
                  </TextBold>
                </View>
              </View>
              <Pressable
                style={styles.clickDetail}
                onPress={() => {
                  setIsModalVisible(false);
                  navigation.navigate('Detail', {items: items});
                }}>
                <TextBold style={{color: WHITE}}>Click to Detail</TextBold>
              </Pressable>
            </View>
          </ImageBackground>
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  body: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    width: width - 16,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: 100,
    resizeMode: 'cover',
  },
  itemContainer: {
    flex: 1 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  imageItem: {
    width: width / 2 - 32,
    height: height * 0.4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  loaderStyle: {
    marginVertical: 10,
    alignItems: 'center',
  },
  listEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceVertical: {
    marginVertical: 10,
  },
  containerFlatlist: {flex: 1, width: '100%'},
  fg1: {flexGrow: 1},
  bgOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'},
  imgModal: {width: '100%', height: '100%'},
  imgProfile: {width: 60, height: 60, borderRadius: 30},
  shortProfile: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeCircle: {position: 'absolute', right: 10, top: 10},
  clickDetail: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
