import { TiChevronRight } from 'react-icons/ti'
import { useAppDispatch } from '../redux/hooks';
import { redo } from '../redux/slices/board';

const RedoButton = () => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        dispatch(redo());
    }

    return (
        <button
            className="flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover"
            onClick={handleClick}>
            {<TiChevronRight size={40} />}
        </button>
        
    )
}

export default RedoButton;