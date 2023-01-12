import * as React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';

import styled from 'styled-components';
import auth from '@react-native-firebase/auth';

import { useState } from 'react';
import { WrapperView } from '../../components/Wrappers/SafeAreaWrapper';
import { ContentView } from '../../components/Wrappers/ContentView';
import IconAnt from 'react-native-vector-icons/AntDesign';

import { Field, Formik } from 'formik';
import { loginValidationSchema } from './utils';
import CustomInput from '../../components/Input/CustomInput';
import theme from '../../core/theme/theme';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../core/theme/colors';
import { Logo } from '../../components/common/StyledComponents';
import showToast from '../../core/configs/config';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/slices';

interface FormValues {
  mail: string;
  password: string;
}

const LoginButton = styled(TouchableOpacity)<{
  disabled: boolean;
}>`
  width: 319px;
  border-radius: 25px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: ${({ disabled }) => (disabled ? theme.colors.gray : theme.colors.primary)};
`;

const CustomLabel = styled(View)`
  padding-top: 20px;
  flex-direction: row;
  align-items: flex-start;
  margin-left: 30px;
`;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;
const TextButtonLogin = styled(Text)`
  font-size: 16px;
  text-transform: uppercase;
  color: ${theme.colors.white};
`;

const TextLogin = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: ${theme.colors.white};
`;


const LoginScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();


  const onHandleSubmitLogin = async (values:FormValues) => {
    auth()
      .signInWithEmailAndPassword(values.mail, values.password)
      .then(async (response) => {
        showToast("success", "Login successful", "Welcome")
        dispatch(
          login({token: auth().currentUser.getIdToken()})
        )
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          showToast("warning", "That email address is already in use!", "")
        }

        if (error.code === 'auth/invalid-email') {
          showToast("warning", "That email address is already in use!", "")
        }

        console.error(error);
      });
  };

  return (
    <WrapperView keyboardAvoidingView={true}>
      <ContentView fullWidth={true}>
        <StatusBar  barStyle="light-content"/>
      <Logo resizeMode="contain" source={require('../../assets/images/logo.png')} />
      <TextLogin>Login</TextLogin>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            mail: '',
            password: '',
          }}
          onSubmit={onHandleSubmitLogin}
        >
          {({ handleSubmit, isValid, values, errors }) => (
            <>
              <CustomLabel>
                <Text style={{ color: colors.white, fontSize: 18 }}>
                  <MaterialIcon name="mail" size={19} color={colors.primary} /> {`Email`}
                </Text>
              </CustomLabel>
              <Field
                component={CustomInput}
                name="mail"
                autoCapitalize="none"
                placeholder={'test@test.com'}
                placeholderTextColor={theme.colors.placeholderText}
                withBackground={true}
                autoCorrect={false}
              />
              <CustomLabel>
                <Text style={{ color: colors.white, fontSize: 18 }}>
                  <MaterialCommunityIcon name="form-textbox-password" size={19} color={colors.primary} /> {`Password`}
                </Text>
              </CustomLabel>
              <Field
                component={CustomInput}
                name="password"
                withBackground={true}
                placeholder={`Contraseña`}
                placeholderTextColor={theme.colors.placeholderText}
                autoCapitalize="none"
              />
              <Container>
                <LoginButton disabled={!isValid || values.mail === ''} onPress={() => handleSubmit()}>
                  <TextButtonLogin>
                    {`Login `}
                    <IconAnt name="login" size={16} color={colors.white} />
                  </TextButtonLogin>
                </LoginButton>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <TextLogin>
                    {`Sign up `}
               
                  </TextLogin>
                </TouchableOpacity>
              </Container>
            </>
          )}
        </Formik>
      </ContentView>
    </WrapperView>
  );
};

export default LoginScreen;
