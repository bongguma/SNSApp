// 유저 정보 데이터를 가지고 있는 인터페이스
interface IUserProfile {
    name: string;
    photo: string;
}

// 유저 정보 데이터를 상속 받아서 피드 데이터까지 작업주는 인터페이스
interface IFeed extends IUserProfile {
    images: Array<string>;
    description: string;
}