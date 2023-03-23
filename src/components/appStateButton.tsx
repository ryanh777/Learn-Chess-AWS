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
                  className='flex justify-center p-1 lg:mb-2'>
                  {props.icon}
               </div>
               :
               <div
                  className='flex justify-center p-2 lg:mb-2'>
                  {props.icon}
               </div>
         }
      </>
   )
}
export default AppStateButton