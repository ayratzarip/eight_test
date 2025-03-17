'use client';

import Image from 'next/image';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src="/assets/obi.png"
              alt="Coming Soon"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">Уже скоро</h1>
          <p className="text-lg text-muted-foreground mb-8">
          Мы вкладываем всю душу и много усилий, чтобы сделать обучение на нашей платформе по-настоящему захватывающим и полезным. Сейчас она еще в процессе разработки, но мы с огромным энтузиазмом готовимся показать вам, над чем так увлеченно работаем. Это будет что-то особенное, созданное с любовью именно для вас. Оставайтесь на связи — скоро расскажем больше! :)
          </p>
          
          <div className="flex justify-center gap-4">
            {session ? (
              <>
                <Button asChild>
                  <Link href="/lessons">Go to Lessons</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/account">My Account</Link>
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/auth/signin">Вход</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}