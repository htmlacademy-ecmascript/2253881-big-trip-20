import EventWithContent from '../view/EventWithContent';
import EventWithoutContent from '../view/EventWithoutContent';
import { replace, render } from '../framework/render';

const ESC = 'Escape';

export default class OneWayPointPresenter {
  #evtWithContent = null;
  #evtWithOutContent = null;
  #placeToRenderElem = document.querySelector('.trip-events__list');

  constructor(data) {
    this.#evtWithContent = new EventWithContent({
      data,
      onClickSubmit: () => {
        this.replaceWithContentToNoContent();
        document.removeEventListener(
          'keydown',
          this.#escKeyDownHandlerWithContent
        );
      },
      onClickArrow: () => {
        this.replaceWithContentToNoContent();
        document.removeEventListener(
          'keydown',
          this.#escKeyDownHandlerWithContent
        );
      },
    });

    this.#evtWithOutContent = new EventWithoutContent({
      data,
      onClickArrow: () => {
        this.replaceNoContentToWithContent();
        document.addEventListener(
          'keydown',
          this.#escKeyDownHandlerWithContent
        );
      },
    });
  }

  replaceWithContentToNoContent() {
    replace(this.#evtWithOutContent, this.#evtWithContent);
  }

  replaceNoContentToWithContent() {
    replace(this.#evtWithContent, this.#evtWithOutContent);
  }

  #escKeyDownHandlerWithContent(evt) {
    evt.preventDefault();
    if (evt.key === ESC && document.querySelector('.event--edit')) {
      this.replaceWithContentToNoContent();
      document.removeEventListener(
        'keydown',
        this.#escKeyDownHandlerWithContent
      );
    }
  }

  #onClickSubmitWithContent() {
    this.replaceWithContentToNoContent();
    document.removeEventListener('keydown', this.#escKeyDownHandlerWithContent);
  }

  #onClickArrowWithContent() {
    this.replaceWithContentToNoContent();
    document.removeEventListener('keydown', this.#escKeyDownHandlerWithContent);
  }

  #onClickWithOutContent() {
    this.replaceNoContentToWithContent();
    document.addEventListener('keydown', this.#escKeyDownHandlerWithContent);
  }

  init() {
    render(this.#evtWithOutContent, this.#placeToRenderElem);
  }
}
