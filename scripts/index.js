let profile = document.querySelector('.profile')
let editbutton = profile.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closebutton = popup.querySelector('.popup__close-button')
let authorinfo = profile.querySelector('.profile__info')
let author = authorinfo.querySelector('.profile__author')
let profilename = author.querySelector('.profile__author-name') 
let popupname = popup.querySelector('.popup__text_name')
let info = author.querySelector('.profile__author-info')
let popupinfo = popup.querySelector('.popup__text_info')
editbutton.addEventListener('click', popupOpen)
closebutton.addEventListener('click', popupClose)

function popupOpen() {
    popupname.value = profilename.textContent;
    popupinfo.value = info.textContent;
    popup.classList.add('popup__opened'); 
}

function popupClose() {
    popup.classList.remove('popup__opened')
}

// Находим форму в DOM
let formElement = popup.querySelector('.popup__fields')// Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault();
    profilename.textContent = popupname.value;
    info.textContent = popupinfo.value;
    popupClose(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 