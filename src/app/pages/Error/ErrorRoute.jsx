import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';

// ─────────────────────────────────────────────────────────────────
// Wire this up as: <Route path="/error/:code" element={<ErrorRoute />} />
//
// Then from anywhere a fetch call fails, redirect with the real
// status code attached:
//
//   const res = await fetch(BACKEND_URL, { ... });
//   if (!res.ok) {
//     navigate(`/error/${res.status}`);
//     return;
//   }
//
// Any unrecognised code (or none) falls back to a generic message —
// see DEFAULT_ERROR in ErrorPage.jsx.
// ─────────────────────────────────────────────────────────────────
export default function ErrorRoute() {
  const { code } = useParams();
  const parsed = Number(code);
  return <ErrorPage code={Number.isFinite(parsed) ? parsed : 404} />;
} 