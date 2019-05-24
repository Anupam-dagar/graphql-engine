import React, { useState } from 'react';
import AceEditor from 'react-ace';

const styles = require('./JsonInput.scss');

const NORMALKEY = 'normal';
const JSONKEY = 'json';

const parseJSONData = data => {
  try {
    return typeof data === 'object'
      ? JSON.stringify(data)
      : JSON.stringify(JSON.parse(data));
  } catch (e) {
    return data;
  }
};

const createInitialState = data => {
  const initialState = {
    showEditorType: NORMALKEY,
    data: parseJSONData(data),
  };
  return initialState;
};

const JsonInput = props => {
  const { standardProps, placeholderProp } = props;
  const { defaultValue, onChange } = standardProps;
  const allProps = { ...standardProps };
  delete allProps.defaultValue;
  const [state, updateState] = useState(createInitialState(defaultValue));
  const { showEditorType, data } = state;

  const updateData = (newData, currentState) => {
    return {
      ...currentState,
      data: newData,
    };
  };

  const toggleEditorType = currentState => {
    return {
      ...currentState,
      showEditorType:
        currentState.showEditorType === JSONKEY ? NORMALKEY : JSONKEY,
    };
  };

  const handleKeyUpEvent = e => {
    if ((e.ctrlKey || event.metaKey) && e.which === 32) {
      updateState(toggleEditorType);
    }
  };

  const handleEditorExec = () => {
    updateState(toggleEditorType);
  };

  const handleInputChangeAndPropagate = e => {
    const val = e.target.value;
    updateState(currentState => updateData(val, currentState));
    if (onChange) {
      onChange(e);
    }
  };

  const handleTextAreaChangeAndPropagate = (value, e) => {
    const val = value;
    updateState(currentState => updateData(val, currentState));
    if (onChange) {
      onChange(e, value);
    }
  };

  const getJsonEditor = () => {
    return (
      <AceEditor
        key="ace_json_editor"
        {...allProps}
        mode="json"
        theme="github"
        name="jsontoggler"
        minLines={10}
        maxLines={100}
        width="100%"
        value={data}
        showPrintMargin={false}
        onChange={handleTextAreaChangeAndPropagate}
        showGutter={false}
        focus
        commands={[
          {
            name: 'toggleEditor',
            bindKey: { win: 'Ctrl-Space', mac: 'Command-Space' },
            exec: handleEditorExec,
          },
        ]}
      />
    );
  };

  const getNormalEditor = () => {
    return (
      <input
        key="input_json_editor"
        {...allProps}
        placeholder={`${placeholderProp} (Ctrl + Space to toggle)`}
        value={data}
        onChange={handleInputChangeAndPropagate}
        onKeyUp={handleKeyUpEvent}
        className={allProps.className + ' ' + styles.jsonNormalInput}
      />
    );
  };

  const editor =
    showEditorType === JSONKEY ? getJsonEditor() : getNormalEditor();

  return (
    <span className="json_input_editor">
      <label>{editor}</label>
      <i
        key="icon_json_editor"
        className={
          'fa ' +
          styles.jsonToggleButton +
          (showEditorType === JSONKEY ? ' fa-compress' : ' fa-expand')
        }
        onClick={() => updateState(toggleEditorType)}
      />
    </span>
  );
};
export default JsonInput;
