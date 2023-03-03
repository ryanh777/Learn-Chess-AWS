import { AiOutlineClear } from 'react-icons/ai'
import { useAppDispatch } from '../redux/hooks';
import { reset } from '../redux/slices/board';

const ResetButton = () => {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        dispatch(reset())
    }

    return (
        <button
            className="flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover"
            onClick={handleClick}>
            {<AiOutlineClear size={36} />}
        </button>
    )
}

export default ResetButton