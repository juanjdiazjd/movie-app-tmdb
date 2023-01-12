import React from "react";
import { Platform } from 'react-native';

import Toast, { BaseToast,ErrorToast, ToastType } from "react-native-toast-message";


import DeviceInfo from 'react-native-device-info';
import theme from "../theme/theme";


export const config = {
  isAndroid: Platform.OS === 'android',
  logGeneral: false,
  logNetworkMessages: false,
};


export const SUPPORT_NOTCH =
  Platform.OS === 'ios' ||
  (Platform.OS === 'android' && Platform.Version >= 23);
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const HAS_NOTCH = DeviceInfo.hasNotch();



  const showToast = (type:ToastType, text1:string, text2:string, showText?: boolean) => Toast.show({
    autoHide:false,
      type:type,
      text1: !text1 ? " " : text1,
      text2: !text2  ? " " : text2,
    });
  
  export default showToast;

  export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: theme.colors.success, height: 90}}
        contentContainerStyle={{paddingHorizontal: 10}}
        text1Style={{
          color: theme.colors.black,
          fontSize: 18,
  
          fontWeight: '400',
          paddingVertical: 5,
        }}
        text2Style={{
          color: theme.colors.black,
          fontSize: 18,
          fontWeight: '400',
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{borderLeftColor: theme.colors.error, height: 90}}
        contentContainerStyle={{paddingHorizontal: 10}}
        text1Style={{
          color: theme.colors.black,
          fontSize: 18,
          fontWeight: '400',
          paddingVertical: 5,
        }}
        text2Style={{
          color: theme.colors.black,
          fontSize: 18,
          fontWeight: '400',
          paddingVertical: 5,
        }}
      />
    ),
  };