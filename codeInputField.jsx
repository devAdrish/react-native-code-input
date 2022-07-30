import React, { useState, createRef, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

export const CodeInputField = ({ code, isCodeValid }) => {
  const borderColors = {
    valid: '#0F9F74',
    active: '#3366FF',
    invalid: '#E03333',
    default: 'grey',
  };

  const [inputValues, setInputValues] = useState({d1: '', d2: '', d3: '', d4: ''});
  const [inputStatus, setInputStatus] = useState({d1: 'default', d2: 'default', d3: 'default', d4: 'default'});
  const [inputFocused, setInputFocused] = useState({d1: true, d2: false, d3: false, d4: false});

  let refD1 = createRef();
  let refD2 = createRef();
  let refD3 = createRef();
  let refD4 = createRef();

  useEffect(() => {
    const value = inputValues.d1 + inputValues.d2 + inputValues.d3 + inputValues.d4;
    if(value.length !== 4) {
      setInputStatus({d1: 'default', d2: 'default', d3: 'default', d4: 'default'});
      isCodeValid(false);
    } else {
      setInputFocused({d1: false, d2: false, d3: false, d4: false });
      if(value === code) {
        setInputStatus({d1: 'valid', d2: 'valid', d3: 'valid', d4: 'valid'});
        isCodeValid(true);
      } else setInputStatus({d1: 'invalid', d2: 'invalid', d3: 'invalid', d4: 'invalid'});
    }
  }, [code, inputValues, isCodeValid]);


  return (
    <View style={ styles.codeInputBoxContainer }>
      <TextInput
        ref={ r => {refD1 = r;} }
        autoFocus
        style={{ ...styles.codeInputBox, borderColor: inputFocused.d1 ? borderColors.active
          :  borderColors[inputStatus.d1] }}
        onChangeText={ e => {
          setInputValues({...inputValues, d1: e});
          if(e !== '' && inputValues.d2 === '') refD2.focus();
        } }
        value={ inputValues.d1 }
        keyboardType='numeric'
        maxLength={ 1 }
        onFocus={ () => { setInputFocused({d1: true, d2: false, d3: false, d4: false }); } }
      />
      <TextInput
        ref={ r => {refD2 = r;} }
        style={{ ...styles.codeInputBox, borderColor: inputFocused.d2 ? borderColors.active
          :  borderColors[inputStatus.d1] }}
        onChangeText={ e => {
          setInputValues({...inputValues, d2: e}); if(e !== '') {
            if(inputValues.d3 === '') refD3.focus(); else if (inputValues.d1 === '') refD1.focus();
          }
        } }
        value={ inputValues.d2 }
        keyboardType='numeric'
        maxLength={ 1 }
        onKeyPress= { ({ nativeEvent }) => {
          if(nativeEvent.key === 'Backspace' && inputValues.d2 === '' ) refD1.focus();
        } }
        onFocus={ () => { setInputFocused({d1: false, d2: true, d3: false, d4: false }); } }
      />
      <TextInput
        ref={ r => {refD3 = r;} }
        style={{ ...styles.codeInputBox, borderColor: inputFocused.d3 ? borderColors.active
          :  borderColors[inputStatus.d1]}}
        onChangeText={ e => {
          setInputValues({...inputValues, d3: e}); if(e !== '') {
            if(inputValues.d4 === '') refD4.focus(); else if (inputValues.d2 === '') refD2.focus();
          }
        } }
        value={ inputValues.d3 }
        keyboardType='numeric'
        maxLength={ 1 }
        onKeyPress= { ({ nativeEvent }) => {
          if(nativeEvent.key === 'Backspace' && inputValues.d3 === '' ) refD2.focus();
        } }
        onFocus={ () => { setInputFocused({d1: false, d2: false, d3: true, d4: false }); } }
      />
      <TextInput
        ref={ r => {refD4 = r;} }
        style={{ ...styles.codeInputBox, borderColor: inputFocused.d4 ? borderColors.active
          :  borderColors[inputStatus.d1] }}
        onChangeText={ e => {
          setInputValues({...inputValues, d4: e});
          if(e === '') refD3.focus();
        } }
        value={ inputValues.d4 }
        keyboardType='numeric'
        maxLength={ 1 }
        onFocus={ () => { setInputFocused({d1: false, d2: false, d3: false, d4: true });  } }
      />
    </View>
  );
};
