import React, {createContext, useState, useEffect} from 'react';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Loading from '../../Components/Loading';

interface Props {
  cache?: boolean;
  children: JSX.Element | Array<JSX.Element>;
}

interface IRnadomUserData {
  getMyFeed: (number?: number) => Array<IFeed>;
}

const RandomUserDataContext = createContext<IRnadomUserData>({
  getMyFeed: (number: number = 10) => {
    return [];
  },
});


const RandomUserDataProvider = ({cache, children}: Props) => {
  const [userList, setUserList] = useState<Array<IUserProfile>>([]);
  const [descriptionList, setDescriptionList] = useState<Array<string>>([]);
  const [imageList, setImageList] = useState<Array<string>>([]);

  // cache가 false로 설정되었거나 캐싱한 데이터가 없을 경우, 새롭게 Fetch API를 통해 데이터를 가져온다.
  // getCacheData 함수는 캐싱여부 및 캐시 데이터 존재 여부를 확인할 수 있는 함수 
  const getCacheData = async (key: string) => {
    const cacheData = await AsyncStorage.getItem(key);
    if (cache === false || cacheData === null) {
      return undefined;
    }

    const cacheList = JSON.parse(cacheData);

    if (cacheList.length !== 25) {
      return undefined;
    }

    return cacheList;
  };
  const setCachedData = (key: string, data: Array<any>) => {
    AsyncStorage.setItem(key, JSON.stringify(data));
  };

  // 유저 정보
  const setUsers = async () => {
    const cachedData = await getCacheData('UserList');
    if (cachedData) {
      setUserList(cachedData);
      return;
    }

    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/dev-yakuza/users/master/api.json',
      );
      const data = await response.json();
      setUserList(data);
      setCachedData('UserList', data);
    } catch (error) {
      console.log(error);
    }
  };

  // 피드 설명
  const setDescriptions = async () => {
    const cachedData = await getCacheData('DescriptionList');
    console.log(cachedData);
    if (cachedData) {
      setDescriptionList(cachedData);
      return;
    }

    try {
      const response = await fetch(
        'https://opinionated-quotes-api.gigalixirapp.com/v1/quotes?rand=t&n=25',
      );
      const data = await response.json();

      let text = [];
      for (const index in data.quotes) {
        text.push(data.quotes[index].quote);
      }

      setDescriptionList(text);
      setCachedData('DescriptionList', text);
    } catch (error) {
      console.log(error);
    }
  };

  // 피드 이미지
  const setImages = async () => {
    const cachedData = await getCacheData('ImageList');
    if (cachedData) {
      if (Image.queryCache) {
        Image.queryCache(cachedData);
        cachedData.map((data: string) => {
          // 이미지 캐시에서 다운로드
          Image.prefetch(data);
        });
      }
      setImageList(cachedData);
      return;
    }

    setTimeout(async () => {
      try {
        const response = await fetch('https://source.unsplash.com/random/');
        const data = response.url;
        if (imageList.indexOf(data) >= 0) {
          setImages();
          return;
        }
        setImageList([...imageList, data]);
      } catch (error) {
        console.log(error);
      }
    }, 400);
  };

  useEffect(() => {
    setUsers();
    setDescriptions();
  }, []);

  useEffect(() => {
    if (imageList.length !== 25) {
      setImages();
    } else {
      setCachedData('ImageList', imageList);
    }
  }, [imageList]);

  const getImages = (): Array<string> => {
    let images: Array<string> = [];
    const count = Math.floor(Math.random() * 4);

    for (let i = 0; i <= count; i++) {
      images.push(imageList[Math.floor(Math.random() * 24)]);
    }

    return images;
  };

  // 사용자가 업로드한 피드를 랜덤하게 가져오는 함수
  //하나의 피드에 대한 유저이름 유저프로필사진 그리고 설명 피드 이미지 리스트까지 가져온다. 
  const getMyFeed = (number: number = 10): Array<IFeed> => {
    let feeds: Array<IFeed> = [];
    for (let i = 0; i < number; i++) {
      const user = userList[Math.floor(Math.random() * 24)];
      feeds.push({
        name: user.name,
        photo: user.photo,
        description: descriptionList[Math.floor(Math.random() * 24)],
        images: getImages(),
      });
    }
    return feeds;
  };

  console.log(
    `${userList.length} / ${descriptionList.length} / ${imageList.length}`,
  );
  return (
    <RandomUserDataContext.Provider
      value={{
        getMyFeed,
      }}>
      {userList.length === 25 &&
      descriptionList.length === 25 &&
      imageList.length === 25 ? (
        children
      ) : (
        <Loading />
      )}
    </RandomUserDataContext.Provider>
  );
};

export {RandomUserDataProvider, RandomUserDataContext};