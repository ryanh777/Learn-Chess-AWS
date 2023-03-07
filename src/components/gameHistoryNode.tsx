import { Move } from '../@constants'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setIndex } from '../redux/slices/board'

interface Props {
    move: Move,
    count: number
}

const GameHistoryNode = (props: Props) => {
    const dispatch = useAppDispatch();
    const index = useAppSelector((state) => state.board.index);
    const movesLength = useAppSelector((state) => state.board.moveData.length);

    const handleClick = () => {
        dispatch(setIndex(movesLength - props.count - 1));
    }

  return (
    <>
      { props.count === movesLength - index - 1 ? 
        <div 
          className="px-1 mx-1 text-lg rounded-sm bg-button h-min">
          {props.move.move}
        </div>
        : 
        <div 
          className="mx-1 text-lg hover:cursor-pointer hover:text-white h-min" 
          onClick={handleClick}>
          {props.move.move}
        </div>
      }
    </>
  )
}

export default GameHistoryNode