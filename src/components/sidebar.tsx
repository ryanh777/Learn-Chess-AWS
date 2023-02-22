import { AppState } from "../@constants";
import AppStateButton from "./appStateButton";
import { IoMdCreate } from 'react-icons/io'
import { IoBook } from 'react-icons/io5'

const Sidebar = () => {
    return (
      <div className='flex flex-col w-20 h-screen bg-bgtertiary'>
          <AppStateButton state={AppState.Create} icon={<IoMdCreate size={34} />}/>
          <AppStateButton state={AppState.Learn} icon={<IoBook size={34} />}/>
          {/* <User dispatchLogout={props.dispatchLogout}/> */}
      </div>
    )
  }

  export default Sidebar;