import { TiChevronLeft } from 'react-icons/ti'
import { useAppDispatch } from '../redux/hooks';
import { undo } from '../redux/slices/board';

const UndoButton = () => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        dispatch(undo())
    }

    return (
        <button
            className="flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover"
            onClick={handleClick}>
            {<TiChevronLeft size={40} />}
        </button>
        
    )
}

export default UndoButton