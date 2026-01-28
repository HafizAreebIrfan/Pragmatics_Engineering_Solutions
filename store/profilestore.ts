import {create} from 'zustand';
import { ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { Alert } from 'react-native';

export type ProfileStore = {
    profileImageUri: string | null;
    setProfileImage: (uri: string | null) => void;
    handleImagePickerResponse: (response: ImagePickerResponse) => void;
};

export const UserprofileStore = create<ProfileStore>((set) => ({
    profileImageUri: null,

  setProfileImage: (uri) =>
    set({ profileImageUri: uri }),

  handleImagePickerResponse: (response) => {
    if (response.didCancel) {
      return;
    }
    if (response.errorCode) {
      console.log('ImagePicker Error:', response.errorMessage);
      return;
    }
    const asset = response.assets?.[0];
    if (asset?.uri) {
      set({ profileImageUri: asset.uri });
      Alert.alert('Image uploaded');
    }
  },
}));

export const imagePickerOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.8,
    includeBase64: false,
    selectionLimit: 1,
    saveToPhotos: true,
}

