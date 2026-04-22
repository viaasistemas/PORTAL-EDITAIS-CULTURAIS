"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SessionContextType {
  session: any | null;
  loading: boolean;
  profilePhoto: string | null;
  updateProfilePhoto: (photo: string) => void;
  loginFake: () => void;
  logoutFake: () => void;
}

const SessionContext = createContext<SessionContextType>({ 
  session: null, 
  loading: true,
  profilePhoto: null,
  updateProfilePhoto: () => {},
  loginFake: () => {},
  logoutFake: () => {}
});

export const SessionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(localStorage.getItem('admin_photo'));
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const fakeUser = localStorage.getItem('fake_session');
    if (fakeUser) {
      setSession(JSON.parse(fakeUser));
      setLoading(false);
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) setSession(session);
        setLoading(false);
      });
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!localStorage.getItem('fake_session')) {
        setSession(session);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateProfilePhoto = (photo: string) => {
    localStorage.setItem('admin_photo', photo);
    setProfilePhoto(photo);
  };

  const loginFake = () => {
    const mockSession = { user: { email: 'admin@cultura.gov.br', id: 'fake-id' } };
    localStorage.setItem('fake_session', JSON.stringify(mockSession));
    setSession(mockSession);
  };

  const logoutFake = () => {
    localStorage.removeItem('fake_session');
    setSession(null);
    supabase.auth.signOut();
  };

  return (
    <SessionContext.Provider value={{ session, loading, profilePhoto, updateProfilePhoto, loginFake, logoutFake }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);