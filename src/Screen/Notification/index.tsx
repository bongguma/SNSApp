import React, {useContext, useState, useEffect, createRef} from 'react';
import { Dimensions, NativeSyntheticEvent, NativeScrollEvent, ScrollView } from 'react-native';

import Styled from 'styled-components/native';

import {RandomUserDataContext} from '~/Context/RandomUserData';
import Tab from '~/Components/Tab';
import NotificationList from './NotificationList';

const ProfileTabContainer = Styled.SafeAreaView`
  flex-direction: row;
  background-color: #FEFFFF;
`;

const TabContainer = Styled.View`
  width: 100%;
  height: ${Dimensions.get('window').height}px;
`;

interface Props {}

const Notification = ({}: Props) => {
    const {getMyFeed} = useContext(RandomUserDataContext);
    const [followingList, setFollowingList] = useState<Array<IFeed>>([]);
    const [myNotification, setMyNotification] = useState<Array<IFeed>>([]);
    const [tableIndex, setTableIndex] = useState<number>(1);
    const width = Dimensions.get('window').width;
    const tabs = ['팔로잉', '내 소식'];
    const refScrollView = createRef<ScrollView>();

    useEffect(() =>{
        setFollowingList(getMyFeed(24));
        setMyNotification(getMyFeed(24));
    }, []);

    return (
        <TabContainer>
            <ProfileTabContainer>
                {tabs.map((label: string, index: number) => (
                  <Tab
                    key={`tab-${index}`}
                    selected={tableIndex === index}
                    label={label}
                    onPress={() => {
                        setTableIndex(index);
                        const node = refScrollView.current;
                        if (node) {
                            node.scrollTo({x: width * index, y: 0, animated: true});
                        }
                    }}  
                 />
                ))}
            </ProfileTabContainer>
            <ScrollView
                ref={refScrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                pagingEnabled={true}
                stickyHeaderIndices={[0]}
                onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                    const index = event.nativeEvent.contentOffset.x / width;
                    setTableIndex(index);
                }}
                contentOffset={{x: width, y: 0}}>
                <NotificationList
                    id={0}
                    width={width}
                    data={followingList}
                    onEndReached={() => {
                        setFollowingList([...followingList, ...getMyFeed(24)]);
                    }}
                />
                <NotificationList
                    id={1}
                    width={width}
                    data={myNotification}
                    onEndReached={() => {
                        setFollowingList([...followingList, ...getMyFeed(24)]);
                    }}
                />
                </ScrollView>
        </TabContainer>
    );
};

export default Notification;