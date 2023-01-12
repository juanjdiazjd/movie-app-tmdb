import * as React from 'react';
import { Image, StatusBar, Text, Touchable, TouchableOpacity, View } from 'react-native';

import styled from 'styled-components';
import auth from '@react-native-firebase/auth';

import { useState } from 'react';
import { WrapperView } from '../../components/Wrappers/SafeAreaWrapper';
import { ContentView } from '../../components/Wrappers/ContentView';
import IconAnt from 'react-native-vector-icons/AntDesign';

import { Field, Formik } from 'formik';
import { registerValidationSchema } from './utils';
import CustomInput from '../../components/Input/CustomInput';
import theme from '../../core/theme/theme';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../core/theme/colors';
import { Logo } from '../../components/common/StyledComponents';
import showToast from '../../core/configs/config';

interface FormValues {
  mail: string;
  password: string;
  name: string;
  surname: string;
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

  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;
const TextButtonRegister = styled(Text)`
  font-size: 16px;
  text-transform: uppercase;
  color: ${theme.colors.white};
`;

const TextLogin = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: ${theme.colors.white};
`;

const RegisterScreen = ({ navigation }: any) => {
  const onHandleSubmitRegister = (values: FormValues) => {
    auth()
      .createUserWithEmailAndPassword(values.mail, values.password)
      .then((response) => {
        auth().currentUser.updateProfile({
          displayName: `${values.name} ${values.surname}`
        })
        showToast('success', 'Register successful', 'Welcome');
        navigation.navigate("Login")
      })
      .catch((error) => {
        showToast('error', error.code, '');
      });
  };

  return (
    <WrapperView keyboardAvoidingView={true}>
      <ContentView fullWidth={true}>
        <StatusBar barStyle="light-content" />
        <Logo resizeMode="contain" source={require('../../assets/images/logo.png')} />
        <TextLogin>Register new account</TextLogin>
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={{
            mail: '',
            password: '',
            name: '',
            surname: ''
          }}
          onSubmit={onHandleSubmitRegister}
        >
          {({ handleSubmit, isValid, values, errors }) => (
            <>
            <CustomLabel>
                <Text style={{ color: colors.white, fontSize: 18 }}>
                  <MaterialIcon name="account-circle" size={19} color={colors.primary} /> {`Name`}
                </Text>
              </CustomLabel>
              <Field
                component={CustomInput}
                name="name"
                autoCapitalize="none"
                placeholder={'John'}
                placeholderTextColor={theme.colors.placeholderText}
                withBackground={true}
                autoCorrect={false}
              />
              <CustomLabel>
                <Text style={{ color: colors.white, fontSize: 18 }}>
                  <MaterialIcon name="account-circle" size={19} color={colors.primary} /> {`Surname`}
                </Text>
              </CustomLabel>
              <Field
                component={CustomInput}
                name="surname"
                autoCapitalize="none"
                placeholder={'Doe'}
                placeholderTextColor={theme.colors.placeholderText}
                withBackground={true}
                autoCorrect={false}
              />
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
                placeholder={`Password`}
                placeholderTextColor={theme.colors.placeholderText}
                autoCapitalize="none"
              />
              <Container>
                <LoginButton disabled={!isValid || values.mail === ''} onPress={() => handleSubmit()}>
                  <TextButtonRegister>
                    {`Register `}
                    <IconAnt name="login" size={16} color={colors.white} />
                  </TextButtonRegister>
                </LoginButton>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <TextLogin>
                    {`I have a account `}
                    <IconAnt name="login" size={16} color={colors.white} />
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

export default RegisterScreen;
