import { recoilPersist } from "https://cdn.skypack.dev/recoil-persist";
import { atom } from "recoil";

// # 리코일 퍼시스트 저장소 시작
export const { persistAtom: persistAtomCommon } = recoilPersist({
  key: "persistAtomCommon",
});

const { persistAtom: persistAtomTodos } = recoilPersist({
  key: "persistAtomTodos",
});

const { persistAtom: persistAtomLastTodoId } = recoilPersist({
  key: "persistAtomLastTodoId",
});

// ## todosStatus 시작
export const todosAtom = atom({
  key: "app/todosAtom",
  default: [],
  effects_UNSTABLE: [persistAtomTodos],
});

export const lastTodoIdAtom = atom({
  key: "app/lastTodoIdAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomLastTodoId],
});
