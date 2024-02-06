export interface IPhoto {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: IAlbum;
}

export interface IAlbum {
  id: number;
  title: string;
  user: IUser;
}

export interface IUser {
  id: number;
  name: string;
  usermane: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
