import { useCallback, useReducer } from "react";

type Inputs = {
  value:
    | string
    | number
    | boolean
    | string[]
    | Record<string, string>[]
    | undefined;
  isValid: boolean;
};
type State = {
  inputs: Record<string, Inputs>;
  isValid: boolean;
};

type SetFormAction = {
  type: "SET_DATA";
  inputs: Record<string, Inputs>;
  formIsValid: boolean;
};

type InputChangeActions = {
  type: "INPUT_CHANGE";
  value: string | number | boolean | string[];
  inputId: string;
  isValid: boolean;
};

type Action = SetFormAction | InputChangeActions;

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && (action.isValid || false);
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    }
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: Record<string, Inputs>,
  initialFormValidity: boolean
): [
  State,
  (id: string, value: string | number | boolean, isValid: boolean) => void,
  (inputData: Record<string, Inputs>, formValidity: boolean) => void
] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string | number | boolean, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback(
    (inputData: Record<string, Inputs>, formValidity: boolean) => {
      dispatch({
        type: "SET_DATA",
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
};
