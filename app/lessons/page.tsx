'use client';

import { Header } from '@/components/ui/header';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function Lessons() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Скоро начнем обучение!</h1>
          {session?.user && (
            <div className="mb-6">
              <p className="text-lg font-medium">Привет, {session.user.name || 'User'}</p>
              <p className="text-sm text-muted-foreground mb-4">Зарегистрирован как {session.user.email}</p>
              <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
                Выйти
              </Button>
            </div>
          )}
          <p className="text-lg text-muted-foreground">
          Мы создаем для вас уникальный опыт обучения, который будет именно таким, как вам нужно. Вскоре вы сможете погрузиться в увлекательные уроки и интерактивные материалы, которые помогут вам достичь своих целей. Ждите — впереди много интересного!
          </p>
        </div>
      </div>
    </main>
  );
}