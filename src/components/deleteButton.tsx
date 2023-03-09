import { BsTrashFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { flipDeleteState } from '../redux/slices/app';

const DeleteButton = () => {
    const dispatch = useAppDispatch();
    const deleteActive = useAppSelector((state) => state.app.deleteActive);

    const handleClick = async () => {
        dispatch(flipDeleteState());
    }

    return (
        <>
            {deleteActive ? 
                <button
                    className='text-buttonDelete'
                    onClick={handleClick}>{<BsTrashFill size={22}/>}
                </button>
            :
                <button
                    className='text-button hover:text-buttonHover'
                    onClick={handleClick}>{<BsTrashFill size={22}/>}
                </button>
            }
        </>
    )
}

export default DeleteButton;