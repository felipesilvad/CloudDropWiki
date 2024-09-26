import React, { Suspense, lazy } from 'react';
import {Routes, Route} from 'react-router-dom'
import LoadingScreen from './SoC/LoadingScreen';
const CharsList = lazy(() => import ('./SoC/Chars/CharsList'));
const CharPage = lazy(() => import ('./SoC/Chars/CharPage'));
const Home = lazy(() => import ('./SoC/Home'));
const EventsListPage = lazy(() => import ('./SoC/Events/EventsListPage'));
const EventPage = lazy(() => import ('./SoC/Events/EventPage'));
const SkillsList = lazy(() => import ('./SoC/Skills/SkillsList'));
const TraitsList = lazy(() => import ('./SoC/Skills/TraitsList'));
const EffectsList = lazy(() => import ('./SoC/Skills/EffectsList'));
const GearsList = lazy(() => import ('./SoC/Gear/GearsList'));
const GearPage = lazy(() => import ('./SoC/Gear/GearPage'));
const TarotsList = lazy(() => import ('./SoC/Gear/TarotList'));
const EnemiesList = lazy(() => import ('./SoC/Stages/EnemiesList'));
const EngravingsComponent = lazy(() => import ('./SoC/Gear/EngravingsComponent'));

function Router() {
  return (
    <Routes>
      <Route path='/' exact element={
        <Suspense fallback={<LoadingScreen />}><Home /></Suspense>
      }/>
      <Route path='/chars' exact element={
        <Suspense  fallback={<LoadingScreen />}><CharsList /></Suspense>
      }/>
      <Route path='/chars/:id' exact element={
        <Suspense  fallback={<LoadingScreen />}><CharPage /></Suspense>
      }/>
      <Route path='/skills' exact element={
        <Suspense  fallback={<LoadingScreen />}><SkillsList /></Suspense>
      }/>
      <Route path='/traits' exact element={
        <Suspense  fallback={<LoadingScreen />}><TraitsList /></Suspense>
      }/>
      <Route path='/effects' exact element={
        <Suspense  fallback={<LoadingScreen />}><EffectsList /></Suspense>
      }/>
      <Route path='/gears' exact element={
        <Suspense  fallback={<LoadingScreen />}><GearsList /></Suspense>
      }/>
      <Route path='/gears/:id' exact element={
        <Suspense  fallback={<LoadingScreen />}><GearPage /></Suspense>
      }/>
      <Route path='/tarots' exact element={
        <Suspense  fallback={<LoadingScreen />}><TarotsList /></Suspense>
      }/>
      <Route path='/events' exact element={
        <Suspense  fallback={<LoadingScreen />}><EventsListPage /></Suspense>
      }/>
      <Route path='/events/:id' exact element={
        <Suspense  fallback={<LoadingScreen />}><EventPage /></Suspense>
      }/>
      <Route path='/enemies' exact element={
        <Suspense  fallback={<LoadingScreen />}><EnemiesList /></Suspense>
      }/>
      <Route path='/engravings' exact element={
        <Suspense  fallback={<LoadingScreen />}><EngravingsComponent /></Suspense>
      }/>
      {/* <Route path="/search" element={<SearchPage />} /> */}
    </Routes>
  );
}
export default Router;