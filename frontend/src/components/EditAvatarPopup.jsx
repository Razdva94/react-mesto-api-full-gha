import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const isValidUrl = (value) => {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
};

const validators = {
  avatarUrl: {
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

function EditAvatarPopup({
  isOpened,
  onClose,
  onUpdateAvatar,
  onLoadingState,
}) {
  const { values, handleChange, setValues } = useForm();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }
  React.useEffect(() => {
    setValues({});
  }, [isOpened, setValues]);

  const [error, setError] = React.useState({
    avatarUrl: {
      required: true,
      isNotURL: true,
    },
  });
  React.useEffect(() => {
    const { avatarUrl } = values;
    const avatarUrlValidationResult = Object.keys(validators.avatarUrl)
      .map((errorKey) => {
        const errorResult = validators.avatarUrl[errorKey](avatarUrl);
        return { [errorKey]: errorResult };
      })
      .reduce((acc, el) => ({ ...acc, ...el }), {});
    setError({
      avatarUrl: avatarUrlValidationResult,
    });
  }, [values]);
  let isFormValid = false;
  if (
    !Object.values(error.avatarUrl).find(Boolean) &&
    Object.values(values).length === 1
  ) {
    isFormValid = true;
  }
  return (
    <PopupWithForm
      isFormValid={isFormValid}
      name="update-avatar"
      title="Обновить аватар"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoadingState={onLoadingState}
      buttonText="Сохранить"
      buttonTextOnLoading="Сохранение..."
    >
      <div className="popup__input-container">
        <input
          required
          name="avatarUrl"
          type="url"
          className="popup__input"
          id="popup__url"
          placeholder="Ссылка на картинку"
          onChange={handleChange}
          value={values.avatarUrl || ""}
        />
        {error.avatarUrl.required && (
          <span className="popup__text-error popup__link-error">
            Поле должно быть заполнено
          </span>
        )}
        {error.avatarUrl.isNotURL && (
          <span className="popup__text-error popup__link-error">
            Введите корректную ссылку
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
