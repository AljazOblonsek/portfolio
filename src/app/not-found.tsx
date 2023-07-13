import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl font-bold">404 Not Found</h1>
      <h2 className="mt-4 text-3xl">
        Oops! It seems like there&apos;s nothing here 🤷‍♂️. Let&apos;s go back{' '}
        <Link href="/" className="text-violet-600 hover:underline" prefetch={false}>
          home
        </Link>{' '}
        🏠.
      </h2>
    </div>
  );
};

export default NotFound;
