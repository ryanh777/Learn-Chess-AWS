import { AiOutlineClear } from 'react-icons/ai'
import { getRootMove } from '../@helpers';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { reset } from '../redux/slices/board';

const ResetButton = () => {
    const dispatch = useAppDispatch();
    const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
    const user = useAppSelector((state) => state.user);

    const handleClick = async () => {
        dispatch(reset(await getRootMove(boardOrientation, user)))
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