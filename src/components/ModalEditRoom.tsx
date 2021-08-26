import FormEditRoom from './FormEditRoom'
import { IMember, IRoom } from '../types'
interface IProps {
  roomDetails: {
    id?: string
    name?: string
    accepted: IMember[]
    pending: IMember[]
  }
  toggleEditRoom: () => void
}

const ModalEditRoom = ({
  roomDetails,
  toggleEditRoom
}: IProps): JSX.Element => {
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
          <FormEditRoom
            roomDetails={roomDetails}
            toggleEditRoom={toggleEditRoom}
          />
        </main>
      </article>
    </section>
  )
}

export default ModalEditRoom
