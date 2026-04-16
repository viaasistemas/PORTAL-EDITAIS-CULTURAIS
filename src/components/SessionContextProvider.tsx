"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface SessionContextType {
  session: any | null;
  loading: boolean;
  loginFake: () => void;
  logoutFake: () => void;
}

const SessionContext = createContext<SessionContextType>({ 
  session: null, 
  loading: true,
  loginFake: () => {},
  logoutFake: () => {}
});

export const SessionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se existe um login fake no localStorage
    const fakeUser = localStorage.getItem('fake_session');
    if (fakeUser) {
      setSession(JSON.parse(fakeUser));
      setLoading(false);
    } else {
      // Tentar buscar sessão real do Supabase se não houver fake
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
    <SessionContext.Provider value={{ session, loading, loginFake, logoutFake }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);