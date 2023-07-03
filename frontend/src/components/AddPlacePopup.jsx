import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const isValidUrl = (value) => {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
};
const validators = {
  cardName: {
    required: (value) => {
      return value === "";
    },
    minLength: (value) => {
      return value?.length === 1;
    },
    maxLength: (value) => {
      return value?.length > 30;
    },
  },
  cardLink: {
    required: (value) => {
      return value === "";
    },
    isNotURL: (value) => {
      if (value) {
        return !isValidUrl(value);
      }
      return false;
    },
  },
};

function AddPlacePopup({ isOpened, onClose, onAddPlace, onLoadingState }) {
  const { values, handleChange, setValues } = useForm();
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }
  const [error, setError] = React.useState({
    cardName: {
      required: true,
      minLength: true,
      maxLength: true,
    },
    cardLink: {
      required: true,
      isNotURL: true,
    },
  });
  React.useEffect(() => {
    const { cardName, cardLink } = values;
    const cardNameValidationResult = Object.keys(validators.cardName)
      .map((errorKey) => {
        const errorResult = validators.cardName[errorKey](cardName);
        return { [errorKey]: errorResult };
      })
      .reduce((acc, el) => ({ ...acc, ...el }), {});
    const cardLinkValidationResult = Object.keys(validators.cardLink)
      .map((errorKey) => {
        const errorResult = validators.cardLink[errorKey](cardLink);
        return { [errorKey]: errorResult };
      })
      .reduce((acc, el) => ({ ...acc, ...el }), {});
    setError({
      cardName: cardNameValidationResult,
      cardLink: cardLinkValidationResult,
    });
  }, [values]);
  React.useEffect(() => {
    setValues({});
  }, [isOpened, setValues]);
  let isFormValid = false;
  if (
    !Object.values(error.cardLink).find(Boolean) &&
    !Object.values(error.cardName).find(Boolean) &&
    Object.values(values).length === 2
  ) {
    isFormValid = true;
  }
  return (
    <PopupWithForm
      isFormValid={isFormValid}
      name="create"
      title="Новое место"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoadingState={onLoadingState}
      buttonText="Создать"
      buttonTextOnLoading="Создание..."
    >
      <div className="popup__input-container">
        <input
          type="text"
          className="popup__input popup__input_type_name"
          id="popup__name"
          placeholder="Название"
          onChange={handleChange}
          value={values.cardName || ""}
          name="cardName"
          maxLength={30}
        />
        {error.cardName.required && (
          <span className="popup__text-error popup__name-error">
            Поле должно быть заполнено
          </span>
        )}
        {error.cardName.minLength && (
          <span className="popup__text-error popup__name-error">
            Минимальное число символов: 2
          </span>
        )}
        {error.cardName.maxLength && (
          <span className="popup__text-error popup__name-error">
            Максимальное число символов 30
          </span>
        )}
      </div>
      <div className="popup__input-container">
        <input
          type="text"
          className="popup__input popup__input_type_job"
          id="popup__link"
          placeholder="Ссылка на картинку"
          onChange={handleChange}
          value={values.cardLink || ""}
          name="cardLink"
        />
        {error.cardLink.required && (
          <span className="popup__text-error popup__link-error">
            Поле должно быть заполнено
          </span>
        )}
        {error.cardLink.isNotURL && (
          <span className="popup__text-error popup__link-error">
            Введите корректную ссылку
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
