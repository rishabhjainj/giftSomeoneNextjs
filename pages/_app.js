import "../styles/global.css";
import { AuthProvider } from "../auth/authContext";
import Router from "next/router";
import dynamic from 'next/dynamic'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
