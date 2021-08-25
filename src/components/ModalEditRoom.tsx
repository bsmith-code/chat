import FormEditRoom from './FormEditRoom'

type IProps = {
  toggleEditRoom: () => void
}

const ModalEditRoom = ({ toggleEditRoom }: IProps): JSX.Element => {
  return (
    <section className="modal">
      <article className="modal__container">
        <header className="modal__header">
          <h1 className="modal__title">Edit Room</h1>
          <button
            id="close-modal"
            className="modal__close"
            onClick={() => toggleEditRoom()}
          >
            Close
          </button>
        </header>
        <main className="modal__main">
          <FormEditRoom toggleEditRoom={toggleEditRoom} />
        </main>
      </article>
    </section>
  )
}

export default ModalEditRoom
