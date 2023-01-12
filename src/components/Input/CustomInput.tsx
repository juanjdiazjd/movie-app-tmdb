import { FieldProps } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { Text, TextInput, StyleSheet, KeyboardTypeOptions, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import theme from '../../core/theme/theme';


const Container = styled(View)`
  align-items: center;
  justify-content: center;
  padding-horizontal: 12px;
`;

const InputContainer = styled(View)<{
  hasError: boolean;
  withBackground: boolean;
  width?: number;
  margin: number;
  isValid: boolean;
  isValidating: boolean;
  value: string;
}>`
  flex-direction: row;
  align-items: center;

  border-radius: 50px;
  border: 1px solid #ffffff;
  width: ${({ width }) => width || 319}px;
  height: 48px;
  margin: ${({ margin }) => margin || 2}% auto;
  top: ${({ margin }) => margin || 2}%;

  border-color: ${({ hasError,  value }) => (
    hasError ? theme.colors.error
    : value === '' ? theme.colors.white
    : theme.colors.success)};
  background-color: ${({ withBackground }) => (withBackground ? theme.colors.darkGray : theme.colors.transparent)};
`;

const CustomTextInput = styled(TextInput)<{
  withBackground: boolean;
}>`
  padding: 14px;
  width: 90%;
  color: ${({ withBackground }) => (withBackground ? theme.colors.white : theme.colors.white)};
`;

const TextFlag = styled(Text)`
  align-items: center;
  text-align: center;
  padding-left: 10px;
  color: ${theme.colors.white};
`;

interface CustomInputComponent {
  keyboardType?: KeyboardTypeOptions | undefined;
  customWidth?: number;
  customMargin: number;
  maxLength: number;
  defaultValue: string;
  setModalDateOpen: () => void;
  withBackground: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  disabled: boolean;
  onHandleFocus?: () => void;
}

const CustomInput: FC<CustomInputComponent & FieldProps> = ({
  field: { name, onBlur, onChange, value },
  form: { errors, touched, setFieldTouched, isValid, isValidating },
  keyboardType,
  customWidth,
  customMargin,
  maxLength,
  defaultValue,
  setModalDateOpen,
  withBackground,
  autoCapitalize,
  disabled,
  onHandleFocus,
  ...inputProps
}): JSX.Element => {
  const [visible, setVisibility] = useState(false);
  const hasError: boolean = !!errors[name] && !!touched[name];
  useEffect(() => {
    if (name === 'confirmPassword') {
      setVisibility(true);
    }
    if (name === 'password') {
      setVisibility(true);
    }
  }, [name]);
  return (
    <Container>
      <InputContainer value={value} isValidating={isValidating} withBackground={withBackground} margin={customMargin} width={customWidth} hasError={hasError} isValid={isValid}>
        {name === 'phone' && <TextFlag>🇦🇷 +549</TextFlag>}
        <CustomTextInput
          withBackground={withBackground}
          defaultValue={defaultValue}
          onFocus={onHandleFocus}
          maxLength={maxLength}
          editable={disabled}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType || 'default'}
          value={value}
          placeholderTextColor={theme.colors.white}
          onChangeText={(text: string) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          secureTextEntry={visible}
          {...inputProps}
        />
        {(name === 'confirmPassword' || name === 'password') && (
          <Pressable onPress={() => setVisibility(!visible)}>
            <Icon
              name={visible ? 'eye-slash' : 'eye'}
              color={withBackground ? theme.colors.white : theme.colors.white}
              size={20}
            />
          </Pressable>
        )}
      </InputContainer>
      {hasError && <Text style={styles.errorText}>{errors[name]?.toString()}</Text>}
    </Container>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    padding: 5,
    maxWidth: 250,
    alignSelf: 'center',
    color: theme.colors.error,
    textAlign: 'center',
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
});

export default CustomInput;
