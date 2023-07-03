import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

const validators = {
  name: {
    required: (value) => {
      return value === "";
    },
    minLength: (value) => {
      return value?.length === 1;
    },
    maxLength: (value) => {
      return value?.length > 40;
    },
  },
  about: {
    required: (value) => {
      return value === "";
    },
    minLength: (value) => {
      return value?.length === 1;
    },
    maxLength: (value) => {
      return value?.length > 200;
    },
  },
};
function EditProfilePopup({ isOpened, onClose, onUpdateUser, onLoadingState }) {
  const { values, handleChange, setValues } = useForm();
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    }
  }, [currentUser, isOpened, setValues]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }
  const [error, setError] = React.useState({
    name: {
      required: true,
      minLength: true,
      maxLength: true,
    },
    about: {
      required: true,
      minLength: true,
      maxLength: true,
    },
  });
  React.useEffect(() => {
    const { name, about } = values;
    const nameValidationResult = Object.keys(validators.name)
      .map((errorKey) => {
        const errorResult = validators.name[errorKey](name);
        return { [errorKey]: errorResult };
      })
      .reduce((acc, el) => ({ ...acc, ...el }), {});
    const aboutValidationResult = Object.keys(validators.about)
      .map((errorKey) => {
        const errorResult = validators.about[errorKey](about);
        return { [errorKey]: errorResult };
      })
      .reduce((acc, el) => ({ ...acc, ...el }), {});
    setError({
      name: nameValidationResult,
      about: aboutValidationResult,
    });
  }, [values]);
  let isFormValid = false;
  if (
    !Object.values(error.name).find(Boolean) &&
    !Object.values(error.about).find(Boolean)
  ) {
    isFormValid = true;
  }
  return (
    <PopupWithForm
      isFormValid={isFormValid}
      name="saved"
      title="Редактировать&nbsp;профиль"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoadingState={onLoadingState}
      buttonText="Сохранить"
      buttonTextOnLoading="Сохранение..."
    >
      <div className="popup__input-container">
        <input
          name="name"
          type="text"
          className="popup__input popup__input_type_name"
          id="name"
          placeholder="Имя"
          value={values.name || ""}
          onChange={handleChange}
        />
        {error.name.required && (
          <span className="popup__text-error name-error">
            Поле должно быть заполнено
          </span>
        )}
        {error.name.minLength && (
          <span className="popup__text-error name-error">
            Минимальное число символов: 2
          </span>
        )}
        {error.name.maxLength && (
          <span className="popup__text-error name-error">
            Максимальное число символов: 40
          </span>
        )}
      </div>
      <div className="popup__input-container">
        <input
          name="about"
          type="text"
          className="popup__input popup__input_type_job"
          id="about"
          placeholder="О себе"
          value={values.about || ""}
          onChange={handleChange}
        />
        {error.about.required && (
          <span className="popup__text-error name-error">
            Поле должно быть заполнено
          </span>
        )}
        {error.about.minLength && (
          <span className="popup__text-error name-error">
            Минимальное число символов: 2
          </span>
        )}
        {error.about.maxLength && (
          <span className="popup__text-error name-error">
            Максимальное число символов: 40
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
