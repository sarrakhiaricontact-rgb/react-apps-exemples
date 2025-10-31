import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

/**
 * 🏗️ 1. Configuration du store Redux
 * Le store est le conteneur central de tout l’état global de l’application.
 * On y déclare les reducers utilisés (ici un seul : "game").
 */
export const store = configureStore({
  reducer: {
    game: gameReducer, // On enregistre le slice "game" dans le store
  },
});

/**
 * 🧠 2. Typage du store pour TypeScript
 *
 * Redux Toolkit permet d’inférer automatiquement les types du store :
 * - RootState → représente la forme complète de l’état global
 * - AppDispatch → représente la fonction dispatch typée
 */

/**
 * ✅ `RootState`
 * Type représentant l’ensemble de l’état global de Redux.
 * Ici, il correspond à : { game: GameStateInterface }
 *
 * Cela permet à TypeScript de connaître la structure exacte du store,
 * donc quand tu feras `useSelector((state) => state.game.player)`
 * il saura exactement ce qu’est `player`.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * ✅ `AppDispatch`
 * Type représentant la fonction `dispatch` du store.
 * Cela garantit que chaque action dispatchée est conforme aux types définis
 * dans tes slices Redux.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * ⚙️ 3. Création de hooks personnalisés typés
 *
 * Ces deux hooks sont des versions "typées" des hooks standards
 * de React Redux (`useDispatch` et `useSelector`).
 *
 * ✅ `useAppDispatch` → permet d’envoyer des actions en toute sécurité
 * ✅ `useAppSelector` → permet de lire l’état du store avec autocomplétion et sécurité de type
 *
 * Grâce à cela, tu n’as plus besoin de faire :
 * `useDispatch<AppDispatch>()` ou `useSelector<RootState>()`
 * dans chaque composant.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
