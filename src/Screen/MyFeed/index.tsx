import React, {useContext, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList} from 'react-native';
import Styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';

import {RandomUserDataContext} from '../../Context/RandomUserData';
import IconButton from '../../Components/IconButton';
import Feed from '../../Components/Feed';
import StoryList from './StoryList';

const HeaderRightContainer = Styled.View`
  flex-direction: row;
`;

type NavigationProp = StackNavigationProp<MyFeedTabParamList, 'MyFeed'>;

interface Props {
    navigation: NavigationProp;
}

const MyFeed = ({navigation}: Props) => {
    const {getMyFeed} = useContext(RandomUserDataContext);
    const [feedList, setFeedList] = useState<Array<IFeed>>([]);
    const [storyList, setStoryList] = useState<Array<IFeed>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <IconButton iconName="camera" />,
            headerRight: () => (
                <HeaderRightContainer>
                    <IconButton iconName="live" />
                    <IconButton iconName="send" />
                </HeaderRightContainer>
            ),
        });
    }, []);

    useEffect(() => {
        setFeedList(getMyFeed());
        setStoryList(getMyFeed());
        SplashScreen.hide();
    }, []);

    return (
        <FlatList
          data={feedList}
          keyExtractor={(item, index) => {
            return `myfeed-${index}`;
          }}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            setLoading(true);
            setTimeout(() => {
              setFeedList(getMyFeed());
              setStoryList(getMyFeed());
              setLoading(false);
            }, 2000);
          }}
          // onEndReached - 스크롤이 목록 하단에 도달 시, 수행되는 작업
          onEndReached={() => {
            setFeedList([...feedList, ...getMyFeed()]);
          }}
          // onEndReachedThreshold - 목록 마지막 아이템이 어디 높이에 도달했을 때 onEndReached 수행되어야하는 작업이 수행될 것인지 지정
          onEndReachedThreshold={0.5}
          refreshing={loading}
          // ListHeaderComponent - 데이터를 받아와서 출력하는 곳 위에 보여주는 것
          ListHeaderComponent={<StoryList storyList={storyList} />}
          renderItem={({item, index}) => (
            <Feed
              id={index}
              name={item.name}
              photo={item.photo}
              description={item.description}
              images={item.images}
            />
          )}
        />
    );
};

export default MyFeed;