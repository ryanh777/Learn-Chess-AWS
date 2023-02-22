import { RiSave3Fill } from 'react-icons/ri'

const SaveButton = (): JSX.Element => {
    return (
        <button 
            className="flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover"
            >
            {<RiSave3Fill size={36}/>}
        </button>
    )
}   

export default SaveButton;