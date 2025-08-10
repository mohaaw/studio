
import { redirect } from 'next/intl/server';

// This page only renders for the user's default locale
export default function RootPage() {
  redirect('/dashboard');
}
