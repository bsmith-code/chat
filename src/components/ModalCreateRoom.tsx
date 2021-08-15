import FormCreateRoom from './FormCreateRoom'

type IProps = {
  toggleCreateRoom: () => void
}

const ModalCreateRoom = ({ toggleCreateRoom }: IProps): JSX.Element => {
  return (
    <section className="modal">
      <article className="modal__container">
        <header className="modal__header">
          <h1 className="modal__title">Create Room</h1>
          <button
            id="close-modal"
            className="modal__close"
            onClick={() => toggleCreateRoom()}
          >
            Close
          </button>
        </header>
        <main className="modal__main">
          <FormCreateRoom />
        </main>
      </article>
    </section>
  )
}

export default ModalCreateRoom
