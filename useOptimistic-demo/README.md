# Ma Todo List - React 19 Optimistic UI

![React](https://img.shields.io/badge/React-19-blue) ![UI Optimistic](https://img.shields.io/badge/UI-Optimistic-green)

Une **Todo List moderne** avec React 19 utilisant une **UI optimiste**, offrant une interface réactive et fluide même pendant les synchronisations.

---

## Présentation

Cette application est une **liste de tâches (Todo List)** développée avec **React 19**. Elle utilise le hook `useOptimistic` pour afficher instantanément les modifications côté client avant la synchronisation avec le serveur simulé.

Les transitions non bloquantes sont gérées avec `startTransition` pour garantir une **expérience utilisateur fluide**, même lors de l’ajout, la suppression ou la mise à jour des tâches.

---

## Fonctionnalités

- Ajouter, supprimer et basculer l’état des tâches ✅
- UI optimiste pour des mises à jour instantanées
- Indicateurs de synchronisation (`Sync...`)
- Notifications pour succès, erreurs et avertissements
- Statistiques des tâches : total, complétées, en cours et en synchronisation
- Support des touches clavier (`Entrée` pour ajouter une tâche)
- Animations et transitions pour une interface moderne et réactive

---

## Technologies

- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icônes)
- **Hooks modernes** : `useOptimistic`, `startTransition`, `useMemo`, `useCallback`
