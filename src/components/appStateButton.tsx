import { ReactNode } from "react"

interface Props {
   active: boolean,
   icon: ReactNode
}

const AppStateButton = (props: Props) => {

   return (
      <>
         {
            props.active ?
            <div
               className='flex items-center justify-center h-16 m-2 rounded-xl bg-buttonHover'>
               {props.icon}
            </div>
            :
            <div
               className='flex items-center justify-center h-16 m-2 transition-all duration-100 ease-linear cursor-pointer rounded-3xl bg-button hover:bg-buttonHover hover:rounded-xl'>
               {props.icon}
            </div>
         }
      </>
   )
}
export default AppStateButton