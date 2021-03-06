import Head from "next/head";
import React from 'react';
import Project from "./projects/projects";
import TitleFragment from './TitleFragment'
export default function Home(){
  return (
    <TitleFragment title="Add Project">
      <Project />
    </TitleFragment>
    )
}