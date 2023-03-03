import { Chess } from "chess.js";
import { ChildData, Move, Orientation, User } from "./@constants";

export const safeGameMutate = (
   game: Chess,
   modify: (game: Chess) => void
): Chess => {
   const update: Chess = Object.create(game);
   modify(update);
   return update;
};

export const fetchMove = async (id: string): Promise<Move> => {
   return fetch(`/data/${id}`).then((res) => res.json());
};

export async function postMove(data: Object) {
   return fetch("/api/data/", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   }).then((res) => res.json());
}

export async function getChildren(id: string): Promise<ChildData[]> {
   let childData: ChildData[] = [];
   await fetch(`/api/data/${id}`)
      .then((res) => res.json())
      .then((data) => {
         childData = data.childData;
      });
   return childData;
}

export const getRandomNextMove = async (move: Move): Promise<Move> => {
   const randomIndex = Math.floor(Math.random() * move.childData.length);
   return fetchMove(move.childData[randomIndex].id);
};

export const getBlackLearnStateFirstMove = async (
   user: User
): Promise<Move | undefined> => {
   const blackRoot: Move = await fetchMove(user.blackRootID);
   if (blackRoot.childData.length === 0) {
      alert("need saved black lines before learning");
      return;
   }
   return getRandomNextMove(blackRoot);
};

export const getRootMove = async (
   boardOrientation: Orientation,
   user: User
): Promise<Move> => {
   return boardOrientation === Orientation.white
      ? fetchMove(user.whiteRootID)
      : fetchMove(user.blackRootID);
};
