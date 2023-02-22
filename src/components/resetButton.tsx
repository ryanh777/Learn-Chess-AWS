import { AiOutlineClear } from 'react-icons/ai'

const ResetButton = () => {

    const handleClick = async () => { }

    return (
        <button
            className="flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover"
            onClick={handleClick}>
            {<AiOutlineClear size={36} />}
        </button>
    )
}

export default ResetButton