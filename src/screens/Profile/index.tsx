import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';

import styled from 'styled-components';

import { WrapperView } from '../../components/Wrappers/SafeAreaWrapper';
import { ContentView } from '../../components/Wrappers/ContentView';

import theme from '../../core/theme/theme';
import { logout } from '../../redux/auth/slices';

import { Logo } from '../../components/common/StyledComponents';
import { useDispatch } from 'react-redux';
import { SeparatorView } from '../../components/common/SeparatorView';

const Container = styled(View)`
  padding: 60px;
  margin: 20px;
  align-items: center;
  justify-content: center;
`;

const LogoutButton = styled(TouchableOpacity)<{
  disabled: boolean;
}>`
  width: 319px;
  border-radius: 25px;
  height: 48px;
  margin: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ disabled }) => (disabled ? theme.colors.gray : theme.colors.primary)};
`;

const CustomText = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: ${theme.colors.white};
`;

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const firebaseLogout = async () => {
    await auth().signOut();

    dispatch(logout());
  };

  return (
    <WrapperView keyboardAvoidingView={true}>
      <ContentView fullWidth={true}>
        <Logo resizeMode="contain" source={require('../../assets/images/logo.png')} />
        <Container>
          <CustomText>User profile</CustomText>
          <SeparatorView width='20px' height='20px'></SeparatorView>
          <CustomText>{auth().currentUser.displayName}</CustomText>
          <CustomText>{auth().currentUser.email}</CustomText>
          <LogoutButton onPress={firebaseLogout}>
            <CustomText>{`Logout`}</CustomText>
          </LogoutButton>
        </Container>
      </ContentView>
    </WrapperView>
  );
};

export default ProfileScreen;
